/**
 * Plantasia — AudioEngine.
 *
 * The single orchestrator for sound. It owns the master bus, the analyser, the
 * currently active OrganismInstrument, and the transport. The browser requires
 * audio to start from a user gesture, so `start()` must be called from a click /
 * keypress before any sound is produced.
 *
 * Signal flow:  instrument -> masterGain -> analyser -> destination
 *
 * Consumers (React) talk to the engine through the `useAudioEngine` hook and the
 * AudioContext provider — never to Tone.js directly.
 */
import * as Tone from 'tone';
import { clamp } from '@utils/math';
import type { OrganismGenes, SpeciesDefinition } from '@species/types';
import type { AudioBands, AudioEngineState, Note } from '@audio/types';
import type { PerformanceModulation } from '@performance/types';
import { pick, randomRange } from '@utils/random';
import { OrganismInstrument } from './OrganismInstrument';
import { AudioAnalyser } from './AudioAnalyser';

type StateListener = (state: AudioEngineState) => void;

const DEFAULT_TEMPO = 72;

/** A calm, consonant pool of notes (C major pentatonic across octaves). */
const GENERATIVE_SCALE: Note[] = [
  'C3', 'D3', 'E3', 'G3', 'A3',
  'C4', 'D4', 'E4', 'G4', 'A4',
  'C5', 'D5', 'E5',
];

export class AudioEngine {
  private masterGain: Tone.Gain | null = null;
  private analyser: AudioAnalyser | null = null;
  private instrument: OrganismInstrument | null = null;
  private currentSpecies: SpeciesDefinition | null = null;
  private currentGenes: OrganismGenes | null = null;
  private state: AudioEngineState = 'idle';
  private readonly listeners = new Set<StateListener>();
  private generativeLoop: Tone.Loop | null = null;
  private playing = false;
  private performanceMod: PerformanceModulation | null = null;

  /** Current lifecycle state. */
  getState(): AudioEngineState {
    return this.state;
  }

  /** Subscribe to state changes; returns an unsubscribe function. */
  onStateChange(listener: StateListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /**
   * Resume the audio context (must be triggered by a user gesture) and build the
   * master bus. Idempotent — safe to call repeatedly.
   */
  async start(): Promise<void> {
    if (this.state === 'running' || this.state === 'starting') return;
    this.setState('starting');
    try {
      await Tone.start();
      Tone.getTransport().bpm.value = DEFAULT_TEMPO;

      if (!this.masterGain) {
        this.masterGain = new Tone.Gain(0.8);
        this.analyser = new AudioAnalyser();
        this.masterGain.connect(this.analyser.input);
        this.analyser.connect(Tone.getDestination());
      }

      // Rebuild the instrument now that the context is live.
      if (this.currentSpecies && this.currentGenes) {
        this.setSpecies(this.currentSpecies, this.currentGenes);
      }
      this.setState('running');
    } catch (error) {
      console.error('[AudioEngine] failed to start', error);
      this.setState('error');
    }
  }

  /**
   * Swap the active species (rebuilds the instrument). Genes default to the
   * species baseline. Stores selection so it survives a later `start()`.
   */
  setSpecies(species: SpeciesDefinition, genes?: OrganismGenes): void {
    this.currentSpecies = species;
    this.currentGenes = genes ?? { ...species.genes };

    if (!this.masterGain) return; // not started yet; will build on start()

    this.instrument?.dispose();
    this.instrument = new OrganismInstrument(species, this.currentGenes);
    this.instrument.connect(this.masterGain);
  }

  /** Update the genes of the active organism in real time. */
  applyGenes(genes: OrganismGenes): void {
    this.currentGenes = genes;
    this.instrument?.applyGenes(genes);
  }

  /** Apply runtime performance modulation (velocity, aftertouch) on top of genes. */
  applyPerformanceModulation(mod: PerformanceModulation, genes?: OrganismGenes): void {
    this.performanceMod = mod;
    const targetGenes = genes ?? this.currentGenes;
    if (targetGenes) {
      this.instrument?.applyPerformanceMod(mod, targetGenes);
    }
  }

  /** Play a single note for a duration (e.g. previewing). */
  playNote(note: Note, duration: Tone.Unit.Time = '8n', velocity = 0.8): void {
    this.instrument?.triggerAttackRelease(note, duration, undefined, velocity);
  }

  /** Play several notes simultaneously (a chord / harmony). */
  playChord(notes: Note[], duration: Tone.Unit.Time = '2n', velocity = 0.7): void {
    notes.forEach((note) => this.instrument?.triggerAttackRelease(note, duration, undefined, velocity));
  }

  attackNote(note: Note, velocity = 0.8): void {
    this.instrument?.attackNote(note, velocity, this.performanceMod ?? undefined);
  }

  releaseNote(note: Note): void {
    this.instrument?.releaseNote(note);
  }

  releaseAll(): void {
    this.instrument?.releaseAll();
  }

  /** Set master volume on a friendly 0..1 scale. */
  setMasterVolume(level: number): void {
    this.masterGain?.gain.rampTo(clamp(level, 0, 1), 0.05);
  }

  /** Set the global tempo in BPM. */
  setTempo(bpm: number): void {
    Tone.getTransport().bpm.rampTo(clamp(bpm, 20, 240), 0.1);
  }

  /** Whether the generative transport is currently running. */
  isPlaying(): boolean {
    return this.playing;
  }

  /**
   * Begin a slow, evolving generative performance. The density and harmonic
   * thickness are driven by the active organism's `energy` and `harmony` genes,
   * so different organisms perform differently.
   */
  startGenerative(): void {
    if (this.playing) return;
    this.playing = true;
    this.generativeLoop?.dispose();
    this.generativeLoop = new Tone.Loop((time) => {
      const genes = this.currentGenes;
      const density = genes ? 0.35 + genes.energy * 0.55 : 0.6;
      if (Math.random() > density) return;
      const chordSize = genes && genes.harmony > 0.6 ? (Math.random() > 0.5 ? 3 : 2) : 1;
      const notes = Array.from({ length: chordSize }, () => pick(GENERATIVE_SCALE));
      const velocity = randomRange(0.45, 0.8);
      notes.forEach((note) => this.instrument?.triggerAttackRelease(note, '2n', time, velocity));
    }, '2n');
    this.generativeLoop.humanize = true;
    this.generativeLoop.start(0);
    Tone.getTransport().start();
  }

  /** Stop the generative performance and silence the organism. */
  stopGenerative(): void {
    this.playing = false;
    this.generativeLoop?.dispose();
    this.generativeLoop = null;
    Tone.getTransport().stop();
    this.releaseAll();
  }

  /** Read current analysis bands (returns zeros before start). */
  getBands(): AudioBands {
    return this.analyser?.getBands() ?? { bass: 0, mid: 0, treble: 0, noise: 0, level: 0 };
  }

  dispose(): void {
    this.stopGenerative();
    this.instrument?.dispose();
    this.analyser?.dispose();
    this.masterGain?.dispose();
    this.instrument = null;
    this.analyser = null;
    this.masterGain = null;
    this.setState('idle');
  }

  private setState(state: AudioEngineState): void {
    this.state = state;
    this.listeners.forEach((listener) => listener(state));
  }
}

let singleton: AudioEngine | null = null;

/** Access the process-wide AudioEngine singleton. */
export function getAudioEngine(): AudioEngine {
  if (!singleton) singleton = new AudioEngine();
  return singleton;
}
