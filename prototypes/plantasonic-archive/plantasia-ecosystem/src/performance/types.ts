/**
 * Plantasia — Performance layer domain types.
 *
 * All input sources (keyboard, MIDI, future OSC/sequencer/AI) emit
 * PerformanceEvents that flow through the PerformanceEngine pipeline.
 */
import type { OrganismGenes } from '@species/types';

/** Identifies where an event originated. */
export type InputSourceId = 'keyboard' | 'midi' | 'mpe' | 'macro' | 'sequencer' | 'ai' | 'automation';

export type PerformanceEventType =
  | 'noteOn'
  | 'noteOff'
  | 'cc'
  | 'pitchBend'
  | 'channelPressure'
  | 'polyAftertouch'
  | 'programChange'
  | 'sustain'
  | 'action'
  | 'panic';

/** Garden-flavored performance actions (pads, buttons). */
export type PerformanceAction =
  | 'seed'
  | 'grow'
  | 'bloom'
  | 'spores'
  | 'connect'
  | 'prune'
  | 'nourish'
  | 'mutate'
  | 'octaveUp'
  | 'octaveDown'
  | 'panic';

/** A single normalized event from any input source. */
export interface PerformanceEvent {
  type: PerformanceEventType;
  source: InputSourceId;
  timestamp: number;
  channel?: number;
  /** MIDI note number 0–127. */
  note?: number;
  /** MIDI velocity 0–127. */
  velocity?: number;
  /** Normalized control value 0–1. */
  value?: number;
  cc?: number;
  /** Pitch bend -1..1. */
  pitchBend?: number;
  action?: PerformanceAction;
  /** MPE member channel (2–15) when applicable. */
  mpeChannel?: number;
}

/** Live performance state consumed by audio + visualization. */
export interface PerformanceState {
  /** Latest note-on velocity, normalized 0..1. */
  velocity: number;
  /** Channel aftertouch, normalized 0..1. */
  pressure: number;
  /** Per-note poly aftertouch (MIDI note -> 0..1). */
  polyPressure: Record<number, number>;
  sustain: boolean;
  /** Currently held MIDI note numbers. */
  activeNotes: number[];
  /** Macro slot values 0..1. */
  macroValues: Record<string, number>;
  /** Combined visual intensity from velocity + pressure. */
  visualIntensity: number;
  bloom: number;
  motion: number;
  particleDensity: number;
  /** Keyboard octave offset from middle C (4). */
  octave: number;
  scaleLock: boolean;
  /** Keys currently pressed on the computer keyboard (for visual feedback). */
  activeKeyboardKeys: string[];
}

export const DEFAULT_PERFORMANCE_STATE: PerformanceState = {
  velocity: 0,
  pressure: 0,
  polyPressure: {},
  sustain: false,
  activeNotes: [],
  macroValues: {},
  visualIntensity: 0,
  bloom: 0,
  motion: 0,
  particleDensity: 0,
  octave: 4,
  scaleLock: false,
  activeKeyboardKeys: [],
};

/** Runtime modulation applied on top of genes (not persisted). */
export interface PerformanceModulation {
  brightness: number;
  resonance: number;
  vibratoDepth: number;
  attackScale: number;
  volumeScale: number;
}

export const NEUTRAL_MODULATION: PerformanceModulation = {
  brightness: 0,
  resonance: 0,
  vibratoDepth: 0,
  attackScale: 1,
  volumeScale: 1,
};

/** Velocity curve presets for future customization. */
export type VelocityCurve = 'linear' | 'soft' | 'hard' | 'exponential';

/** Scale names for scale-lock processor. */
export type ScaleName = 'chromatic' | 'major' | 'minor' | 'pentatonicMajor' | 'pentatonicMinor';

/** A controllable parameter target for MIDI Learn and macros. */
export type ParameterTargetId =
  | `gene.${keyof OrganismGenes}`
  | 'macro.bloom'
  | 'macro.forestDensity'
  | 'macro.morningDew'
  | 'macro.storm'
  | 'macro.photosynthesis'
  | 'macro.mutation'
  | 'macro.evolution'
  | 'macro.ambientDrift'
  | 'macro.twilight'
  | 'macro.roots'
  | 'macro.leaves'
  | 'masterVolume'
  | 'tempo'
  | 'action.seed'
  | 'action.grow'
  | 'action.bloom'
  | 'action.spores'
  | 'action.connect'
  | 'action.prune'
  | 'action.nourish'
  | 'action.mutate';

/** MIDI control binding (CC, note, pitch bend, etc.). */
export interface MidiBinding {
  id: string;
  targetId: ParameterTargetId;
  type: 'cc' | 'note' | 'pitchBend' | 'channelPressure' | 'polyAftertouch';
  channel: number;
  controller: number;
  min?: number;
  max?: number;
  inverted?: boolean;
}

/** Connected MIDI device metadata. */
export interface MidiDeviceInfo {
  id: string;
  name: string;
  manufacturer: string;
  state: 'connected' | 'disconnected';
  /** Built-in profile ID when hardware is recognized. */
  profileId?: string;
}

/** Monitored input event for the UI input monitor. */
export interface InputMonitorEntry {
  id: string;
  timestamp: number;
  source: InputSourceId;
  label: string;
  value: string;
}

/** MPE voice state — architecture ready for per-note expression. */
export interface MpeVoice {
  note: number;
  channel: number;
  pitchBend: number;
  pressure: number;
  timbre: number;
  /** TODO: wire to dedicated per-note synth voice when MPE synth lands. */
  active: boolean;
}
