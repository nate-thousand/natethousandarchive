/**
 * audio/index.ts
 * ----------------------------------------------------------------------------
 * MILESTONE 3 — Audio Intelligence
 *
 * Purpose
 *   Entry point for the audio analysis subsystem. Captures an input source and
 *   produces a normalized per-frame AudioFrame (RMS, bands, onsets, mood) for
 *   the rest of the installation to react to.
 *
 * Responsibilities
 *   - Acquire input (mic / line-in / internal synth / file) per audio-config.
 *   - Run FFT + feature extraction (centroid, flux, ZCR, onsets, tempo).
 *   - Compute rolling mood vectors (energy, valence, density, brightness).
 *   - Publish frames to the behavior engine and AI Director.
 *
 * Dependencies
 *   - config/audio-config.json
 *   - Consumers: src/behavior (audioMappings, behaviorEngine), AI Director.
 *
 * Future implementation notes
 *   - Architectural pass only. The existing sound engine must NOT be modified;
 *     this module only analyzes audio, it does not synthesize it.
 * ----------------------------------------------------------------------------
 */

export {};
