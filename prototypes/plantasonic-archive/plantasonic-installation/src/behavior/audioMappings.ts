/**
 * audioMappings.ts
 * ----------------------------------------------------------------------------
 * MILESTONE 3 — Audio Intelligence  /  MILESTONE 4 — Behavior Engine
 *
 * Purpose
 *   Declarative routing from analyzed audio features to behavior parameters.
 *   Keeps the "what reacts to what" mapping as data, separate from the math in
 *   the behavior engine, so the reactivity feel can be tuned without code
 *   changes.
 *
 * Responsibilities
 *   - Define mapping entries (source feature -> target parameter) with scaling,
 *     smoothing, and clamping.
 *   - Provide named mapping presets reusable across behaviors.
 *   - Read defaults from config/audio-config.json.
 *
 * Dependencies
 *   - config/audio-config.json (bands, reactivity defaults)
 *   - definitions/behavior-library.json (audioBehaviors)
 *
 * Future implementation notes
 *   - Architectural pass only. Define the mapping shape; no live audio routing.
 *   - The existing sound engine is out of scope and must not be modified.
 * ----------------------------------------------------------------------------
 */

export type AudioFeature =
  | "rms"
  | "peak"
  | "energy"
  | "spectralCentroid"
  | "spectralFlux"
  | "zeroCrossingRate"
  | "onset"
  | "tempo"
  | `band.${string}`;

export type BehaviorParam =
  | "scale"
  | "rotation"
  | "opacity"
  | "emissiveGain"
  | "driftSpeed"
  | "bloomIntensity";

export interface MappingEntry {
  source: AudioFeature;
  target: BehaviorParam;
  /** Multiplier applied to the normalized feature value. */
  gain: number;
  /** Smoothing factor [0..1], higher is smoother. */
  smoothing: number;
  /** Output clamp range. */
  clamp: [number, number];
}

export interface MappingPreset {
  id: string;
  entries: MappingEntry[];
}

/** Look up a mapping preset by behavior id. Implementation deferred. */
export function getMappingPreset(_behaviorId: string): MappingPreset {
  throw new Error("audioMappings.getMappingPreset: not implemented (Milestone 3)");
}
