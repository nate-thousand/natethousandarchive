/**
 * Plantasia — Gene utilities.
 *
 * Pure functions for creating, mutating, and combining organism genes. These
 * power the evolution / mutation / "intelligent randomize" features and are
 * deterministic when given a seeded RNG.
 */
import { clamp, lerp } from '@utils/math';
import { createRng } from '@utils/random';
import type { OrganismGenes } from './types';

/** Ordered list of gene keys — single source of truth for iteration/UI. */
export const GENE_KEYS = [
  'sunlight',
  'water',
  'wind',
  'soil',
  'energy',
  'harmony',
  'growth',
  'life',
] as const satisfies ReadonlyArray<keyof OrganismGenes>;

/** Human-facing metadata for each gene (living vocabulary, no synth jargon). */
export const GENE_META: Record<keyof OrganismGenes, { label: string; hint: string }> = {
  sunlight: { label: 'Sunlight', hint: 'Brightness and timbral openness' },
  water: { label: 'Water', hint: 'Body, moisture, and resonance' },
  wind: { label: 'Wind', hint: 'Movement and modulation' },
  soil: { label: 'Soil', hint: 'Low-end grounding and weight' },
  energy: { label: 'Energy', hint: 'Vitality and presence' },
  harmony: { label: 'Harmony', hint: 'Harmonic richness' },
  growth: { label: 'Growth', hint: 'How quickly the sound emerges' },
  life: { label: 'Life', hint: 'How long the sound lingers' },
};

/** A neutral, balanced gene set (all mid-values). */
export function neutralGenes(): OrganismGenes {
  return { sunlight: 0.5, water: 0.5, wind: 0.4, soil: 0.5, energy: 0.6, harmony: 0.5, growth: 0.4, life: 0.5 };
}

/**
 * Mutate genes by a normalized `amount` (0 = no change, 1 = full randomization).
 * Deterministic for a given seed, enabling reproducible "suggested mutations".
 */
export function mutateGenes(genes: OrganismGenes, amount: number, seed: number): OrganismGenes {
  const rng = createRng(seed);
  const next = { ...genes };
  for (const key of GENE_KEYS) {
    const drift = (rng() * 2 - 1) * amount;
    next[key] = clamp(genes[key] + drift, 0, 1);
  }
  return next;
}

/** Blend two gene sets (genetic crossover) by `bias` toward the second parent. */
export function crossbreedGenes(a: OrganismGenes, b: OrganismGenes, bias = 0.5): OrganismGenes {
  const next = {} as OrganismGenes;
  for (const key of GENE_KEYS) {
    next[key] = clamp(lerp(a[key], b[key], bias), 0, 1);
  }
  return next;
}

/** Generate an entirely new gene set from a seed (intelligent randomize). */
export function randomGenes(seed: number): OrganismGenes {
  const rng = createRng(seed);
  const next = {} as OrganismGenes;
  for (const key of GENE_KEYS) {
    next[key] = clamp(rng(), 0, 1);
  }
  return next;
}

/**
 * Encode genes into a short, shareable "DNA" string (hex). Useful for the AI
 * lab and future cloud sharing.
 */
export function encodeDna(genes: OrganismGenes): string {
  return GENE_KEYS.map((key) =>
    Math.round(genes[key] * 255)
      .toString(16)
      .padStart(2, '0'),
  ).join('');
}

/** Decode a DNA string back into genes. Returns neutral genes if malformed. */
export function decodeDna(dna: string): OrganismGenes {
  if (dna.length < GENE_KEYS.length * 2) return neutralGenes();
  const next = {} as OrganismGenes;
  GENE_KEYS.forEach((key, index) => {
    const byte = parseInt(dna.slice(index * 2, index * 2 + 2), 16);
    next[key] = Number.isNaN(byte) ? 0.5 : byte / 255;
  });
  return next;
}
