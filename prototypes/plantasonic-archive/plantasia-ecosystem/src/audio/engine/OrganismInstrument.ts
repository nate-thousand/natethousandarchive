/**
 * Plantasia — OrganismInstrument.
 *
 * A self-contained, disposable voice graph for a single species:
 *
 *   synth -> filter (roots/soil) -> vibrato (wind) -> effects -> output
 *
 * The instrument hides all Tone.js specifics behind a small, garden-flavored
 * API (trigger / applyGenes). Different SoundEngineTypes select different
 * underlying Tone synths while keeping the same external interface.
 */
import * as Tone from 'tone';
import type { OrganismGenes, SoundProfile, SpeciesDefinition } from '@species/types';
import type { Note } from '@audio/types';
import type { PerformanceModulation } from '@performance/types';
import { EffectChain } from '@audio/effects/effectChain';
import { resolveSynthParams } from './geneMapping';

const RAMP_TIME = 0.08;

/** Choose a Tone voice class for the given engine type. */
function buildSynth(sound: SoundProfile): {
  poly?: Tone.PolySynth;
  noise?: Tone.NoiseSynth;
} {
  switch (sound.engine) {
    case 'noise':
      return { noise: new Tone.NoiseSynth({ noise: { type: 'pink' } }) };
    case 'fm':
      return { poly: new Tone.PolySynth(Tone.FMSynth) };
    case 'physical':
      // AMSynth approximates a struck/physical body until a true modal model lands.
      return { poly: new Tone.PolySynth(Tone.AMSynth) };
    case 'granular':
    case 'subtractive':
    default:
      return { poly: new Tone.PolySynth(Tone.Synth) };
  }
}

export class OrganismInstrument {
  private readonly poly?: Tone.PolySynth;
  private readonly noise?: Tone.NoiseSynth;
  private readonly filter: Tone.Filter;
  private readonly vibrato: Tone.Vibrato;
  private readonly effects: EffectChain;
  private readonly output: Tone.Gain;
  private readonly octave: number;
  private readonly envelopeBase: SoundProfile['envelope'];
  private perfMod: PerformanceModulation | null = null;

  constructor(species: SpeciesDefinition, genes: OrganismGenes) {
    const { poly, noise } = buildSynth(species.sound);
    this.poly = poly;
    this.noise = noise;
    this.octave = species.sound.octave;
    this.envelopeBase = species.sound.envelope;

    this.filter = new Tone.Filter({ type: 'lowpass', frequency: 2000, Q: 1 });
    this.vibrato = new Tone.Vibrato({ frequency: 4, depth: 0 });
    this.effects = new EffectChain(species.sound.effects);
    this.output = new Tone.Gain(1);

    const source: Tone.ToneAudioNode = this.poly ?? (this.noise as Tone.NoiseSynth);
    source.connect(this.filter);
    this.filter.connect(this.vibrato);
    this.vibrato.connect(this.effects.input);
    this.effects.output.connect(this.output);

    if (this.poly) {
      this.poly.set({ oscillator: { type: species.sound.waveform } });
    }
    this.applyGenes(genes);
  }

  /** Apply normalized genes, smoothly ramping continuous parameters. */
  applyGenes(genes: OrganismGenes): void {
    this.applyResolvedParams(genes);
  }

  /** Apply runtime performance modulation on top of current genes. */
  applyPerformanceMod(mod: PerformanceModulation, genes: OrganismGenes): void {
    this.perfMod = mod;
    this.applyResolvedParams(genes);
  }

  private applyResolvedParams(genes: OrganismGenes): void {
    const params = resolveSynthParams(genes, this.envelopeBase);
    const mod = this.perfMod;

    const cutoff = params.cutoff * (1 + (mod?.brightness ?? 0) * 0.5);
    const resonance = params.resonance + (mod?.resonance ?? 0) * 3;
    const vibratoDepth = params.vibratoDepth + (mod?.vibratoDepth ?? 0) * 0.3;
    const volumeDb = params.volumeDb + (mod ? 20 * Math.log10(mod.volumeScale) : 0);
    const attack = params.envelope.attack * (mod?.attackScale ?? 1);

    this.filter.frequency.rampTo(cutoff, RAMP_TIME);
    this.filter.Q.rampTo(resonance, RAMP_TIME);
    this.vibrato.depth.rampTo(vibratoDepth, RAMP_TIME);
    this.vibrato.frequency.rampTo(params.vibratoRate, RAMP_TIME);
    this.output.gain.rampTo(Tone.dbToGain(volumeDb), RAMP_TIME);

    if (this.poly) {
      this.poly.set({
        detune: params.detune,
        envelope: { ...params.envelope, attack },
      });
    }
    if (this.noise) {
      this.noise.set({ envelope: { ...params.envelope, attack } });
    }
  }

  /** Trigger a note for a fixed duration (seconds or notation). */
  triggerAttackRelease(note: Note, duration: Tone.Unit.Time, time?: number, velocity = 0.8): void {
    if (this.noise) {
      this.noise.triggerAttackRelease(duration, time, velocity);
      return;
    }
    this.poly?.triggerAttackRelease(this.transpose(note), duration, time, velocity);
  }

  /** Begin sustaining a note (held until `releaseNote`). */
  attackNote(note: Note, velocity = 0.8, mod?: PerformanceModulation): void {
    if (mod) this.perfMod = mod;
    const volScale = mod?.volumeScale ?? 1;
    const effectiveVelocity = clampVelocity(velocity * volScale);
    if (this.noise) {
      this.noise.triggerAttack(undefined, effectiveVelocity);
      return;
    }
    this.poly?.triggerAttack(this.transpose(note), undefined, effectiveVelocity);
  }

  /** Release a previously attacked note. */
  releaseNote(note: Note): void {
    if (this.noise) {
      this.noise.triggerRelease();
      return;
    }
    this.poly?.triggerRelease(this.transpose(note));
  }

  /** Silence everything immediately. */
  releaseAll(): void {
    this.noise?.triggerRelease();
    this.poly?.releaseAll();
  }

  /** Connect the instrument's output to a destination node. */
  connect(destination: Tone.InputNode): void {
    this.output.connect(destination);
  }

  dispose(): void {
    this.poly?.dispose();
    this.noise?.dispose();
    this.filter.dispose();
    this.vibrato.dispose();
    this.effects.dispose();
    this.output.dispose();
  }

  private transpose(note: Note): Note {
    if (this.octave === 0) return note;
    return Tone.Frequency(note).transpose(this.octave * 12).toNote();
  }
}

function clampVelocity(v: number): number {
  return Math.max(0.01, Math.min(1, v));
}
