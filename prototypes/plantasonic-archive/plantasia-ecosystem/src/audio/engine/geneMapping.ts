/**
 * Plantasia — Gene → synthesis parameter mapping.
 *
 * The boundary where the garden vocabulary (normalized 0..1 genes) becomes real
 * synthesis units (Hz, dB, seconds, ratios). Keeping this isolated means the UI
 * and species data never deal with raw audio numbers, and the mapping can be
 * tuned in one place.
 */
import { clamp, lerp, mapRange } from '@utils/math';
import type { GrowthEnvelope, OrganismGenes } from '@species/types';

/** Resolved, engine-ready parameters derived from genes. */
export interface ResolvedSynthParams {
  /** Low-pass filter cutoff in Hz. */
  cutoff: number;
  /** Filter resonance (Q). */
  resonance: number;
  /** Output level in decibels. */
  volumeDb: number;
  /** Voice detune spread in cents. */
  detune: number;
  /** FM harmonicity ratio. */
  harmonicity: number;
  /** FM modulation index. */
  modulationIndex: number;
  /** Vibrato (wind) depth, 0..1. */
  vibratoDepth: number;
  /** Vibrato rate in Hz. */
  vibratoRate: number;
  /** ADSR envelope in seconds / level. */
  envelope: { attack: number; decay: number; sustain: number; release: number };
}

/** Exponentially map a 0..1 gene to a frequency range (more musical). */
function toFrequency(value: number, min: number, max: number): number {
  return min * (max / min) ** clamp(value, 0, 1);
}

/**
 * Combine a species' base envelope with the organism's growth/life genes so two
 * organisms of the same species can still articulate differently.
 */
function resolveEnvelope(base: GrowthEnvelope, genes: OrganismGenes) {
  return {
    attack: clamp(base.germinate * lerp(0.5, 1.8, genes.growth), 0.005, 6),
    decay: clamp(base.sprout * lerp(0.6, 1.4, genes.harmony), 0.01, 4),
    sustain: clamp(base.sustain * lerp(0.7, 1.1, genes.energy), 0, 1),
    release: clamp(base.wither * lerp(0.6, 2, genes.life), 0.02, 8),
  };
}

/** Map a full gene set + species envelope into engine-ready parameters. */
export function resolveSynthParams(genes: OrganismGenes, envelope: GrowthEnvelope): ResolvedSynthParams {
  return {
    cutoff: toFrequency(genes.sunlight, 180, 14000),
    resonance: mapRange(genes.water, 0, 1, 0.3, 9),
    volumeDb: mapRange(genes.energy, 0, 1, -24, -6),
    detune: mapRange(genes.soil, 0, 1, 0, 28),
    harmonicity: mapRange(genes.harmony, 0, 1, 0.5, 4),
    modulationIndex: mapRange(genes.harmony, 0, 1, 1, 14),
    vibratoDepth: mapRange(genes.wind, 0, 1, 0, 0.5),
    vibratoRate: mapRange(genes.wind, 0, 1, 0.3, 6.5),
    envelope: resolveEnvelope(envelope, genes),
  };
}
