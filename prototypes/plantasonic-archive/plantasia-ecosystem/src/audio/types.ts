/**
 * Plantasia — Audio domain types.
 */

/** Real-time frequency analysis split into organism-relevant bands (0..1). */
export interface AudioBands {
  /** Sub/bass energy — drives the roots. */
  bass: number;
  /** Midrange energy — drives the branches. */
  mid: number;
  /** Treble energy — drives the leaves. */
  treble: number;
  /** Broadband noisiness — spawns spores. */
  noise: number;
  /** Overall loudness (RMS-ish) — global vitality. */
  level: number;
}

/** Lifecycle state of the audio context. */
export type AudioEngineState = 'idle' | 'starting' | 'running' | 'error';

/** A note request (scientific pitch notation, e.g. "C4"). */
export type Note = string;
