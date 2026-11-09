import * as Tone from 'tone';
import type { PlantasiaPreset, SynthSettings } from '../data/presets';
import type { BotanicalControls } from '../data/ecosystem';

/**
 * Botanical -> synthesis mapping. The UI only ever speaks in botanical terms;
 * this module is the single place that translates them into Tone.js parameters.
 *
 *   Energy   = oscillator intensity      Roots   = bass
 *   Growth   = envelope                  Leaves  = highs
 *   Density  = voices                    Bloom   = reverb
 *   Life     = modulation                Spores  = granular particles
 *   Space    = reverb size               Water   = delay
 *   Texture  = brightness/grain          Sunlight= brightness
 *   Harmony  = chord consonance          Wind    = LFO
 *   Resonance= filter resonance
 */

type EngineNodes = {
  synth: Tone.PolySynth;
  filter: Tone.Filter;
  delay: Tone.FeedbackDelay;
  reverb: Tone.Reverb;
  lfo: Tone.LFO;
  analyser: Tone.Analyser;
  meter: Tone.Meter;
};

let nodes: EngineNodes | null = null;
let started = false;
let lastSettings: SynthSettings | null = null;

const NOTE_POOL = ['C3', 'E3', 'G3', 'B3', 'D4', 'A3'];

/**
 * Tone params throw on exponential ramps before the AudioContext is running
 * (their valid range is [0, 0] while suspended). Until the user starts audio we
 * set values immediately; afterwards we ramp smoothly.
 */
type RampParam = {
  value: unknown;
  linearRampTo: (value: number, time: number) => unknown;
};

function setParam(param: RampParam, value: number, time = 0.2): void {
  if (started) {
    // Linear (not exponential) ramps so values of 0 — common for wet/mix
    // params — don't throw the "Value must be within [0, 0]" range error.
    param.linearRampTo(value, time);
  } else {
    (param as { value: number }).value = value;
  }
}

function ensureNodes(): EngineNodes {
  if (nodes) {
    return nodes;
  }

  const analyser = new Tone.Analyser('waveform', 1024);
  const meter = new Tone.Meter();
  const reverb = new Tone.Reverb({ decay: 3, wet: 0.4 });
  const delay = new Tone.FeedbackDelay({ delayTime: 0.25, feedback: 0.3, wet: 0.2 });
  const filter = new Tone.Filter({ frequency: 1800, type: 'lowpass', Q: 1 });
  const synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: 'sine' },
    envelope: { attack: 0.2, decay: 0.2, sustain: 0.6, release: 1.5 },
  });
  const lfo = new Tone.LFO({ frequency: 0.3, min: 800, max: 2400 });

  synth.connect(filter);
  filter.connect(delay);
  delay.connect(reverb);
  reverb.toDestination();
  reverb.connect(analyser);
  reverb.connect(meter);
  lfo.connect(filter.frequency);
  lfo.start();

  nodes = { synth, filter, delay, reverb, lfo, analyser, meter };
  return nodes;
}

export async function initAudio(): Promise<void> {
  ensureNodes();
  if (!started) {
    await Tone.start();
    started = true;
    console.info('[Plantasia audio] Tone.js context started');
  }
}

function applySettings(settings: SynthSettings): void {
  const engine = ensureNodes();
  lastSettings = settings;
  engine.synth.set({
    oscillator: { type: settings.oscillator },
    envelope: { attack: settings.envelope.attack, release: settings.envelope.release },
  });
  setParam(engine.filter.frequency, settings.filterHz);
  setParam(engine.delay.wet, settings.effects.delay);
  setParam(engine.reverb.wet, settings.effects.reverb);
}

export function playPreset(preset: PlantasiaPreset): void {
  const engine = ensureNodes();
  applySettings(preset.synth);
  if (!started) {
    console.info('[Plantasia audio] preset staged (awaiting user gesture)', preset.name);
    return;
  }
  engine.synth.triggerAttackRelease(['C3', 'G3', 'B3'], '2n');
}

export function stopAudio(): void {
  if (!nodes) {
    return;
  }
  nodes.synth.releaseAll();
  console.info('[Plantasia audio] released all voices');
}

/**
 * Maps the live botanical controls onto the underlying synth graph. Called
 * whenever a circular control changes so audio tracks the organism.
 */
export function applyBotanicalControls(controls: BotanicalControls): void {
  const engine = ensureNodes();
  const brightness = 600 + (controls.texture / 100) * 6000;
  setParam(engine.filter.frequency, brightness, 0.15);
  setParam(engine.filter.Q, 0.5 + (controls.resonance / 100) * 12, 0.15);
  setParam(engine.delay.wet, (controls.space / 100) * 0.6);
  setParam(engine.reverb.wet, (controls.space / 100) * 0.7);
  setParam(engine.lfo.frequency, 0.05 + (controls.life / 100) * 4);
  engine.synth.set({
    volume: -18 + (controls.energy / 100) * 14,
    envelope: {
      attack: 0.02 + (1 - controls.growth / 100) * 0.6,
      release: 0.6 + (controls.growth / 100) * 3,
    },
  });
}

export function triggerChord(notes: string[] = NOTE_POOL.slice(0, 3)): void {
  const engine = ensureNodes();
  if (!started) {
    return;
  }
  engine.synth.triggerAttackRelease(notes, '4n');
}

export function setTempo(bpm: number): void {
  const transport = Tone.getTransport();
  if (started) {
    transport.bpm.rampTo(bpm, 0.3);
  } else {
    transport.bpm.value = bpm;
  }
}

export function getWaveform(): Float32Array {
  const engine = ensureNodes();
  const value = engine.analyser.getValue();
  return value instanceof Float32Array ? value : new Float32Array(0);
}

export function getLevel(): number {
  const engine = ensureNodes();
  const value = engine.meter.getValue();
  const db = typeof value === 'number' ? value : value[0] ?? -Infinity;
  if (!Number.isFinite(db)) {
    return 0;
  }
  return Math.min(1, Math.max(0, (db + 60) / 60));
}

export function updateParameter(
  parameter: keyof SynthSettings | string,
  value: string | number,
): void {
  if (!lastSettings) {
    console.info('[Plantasia audio] update parameter (no preset yet)', { parameter, value });
    return;
  }

  const next: SynthSettings = {
    ...lastSettings,
    envelope: { ...lastSettings.envelope },
    effects: { ...lastSettings.effects },
  };

  switch (parameter) {
    case 'oscillator':
      next.oscillator = value as SynthSettings['oscillator'];
      break;
    case 'filterHz':
      next.filterHz = Number(value);
      break;
    case 'attack':
      next.envelope.attack = Number(value);
      break;
    case 'release':
      next.envelope.release = Number(value);
      break;
    case 'delay':
      next.effects.delay = Number(value);
      break;
    case 'reverb':
      next.effects.reverb = Number(value);
      break;
    default:
      console.info('[Plantasia audio] update parameter', { parameter, value });
      return;
  }

  applySettings(next);
}
