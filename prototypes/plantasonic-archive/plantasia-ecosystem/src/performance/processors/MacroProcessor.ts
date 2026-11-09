/**
 * Plantasia — Macro processor.
 *
 * Applies performance macro values to gene offsets and visual multipliers.
 */
import { clamp } from '@utils/math';
import type { OrganismGenes } from '@species/types';
import { GENE_KEYS } from '@species/genes';
import { getMacro, PERFORMANCE_MACROS } from '../macros';

export interface MacroResult {
  geneOffsets: Partial<OrganismGenes>;
  visual: { bloom: number; motion: number; particleDensity: number };
}

export class MacroProcessor {
  /** Compute combined macro offsets from all active macro values. */
  apply(macroValues: Record<string, number>): MacroResult {
    const geneOffsets = {} as Partial<OrganismGenes>;
    let bloom = 0;
    let motion = 0;
    let particleDensity = 0;

    for (const macro of PERFORMANCE_MACROS) {
      const value = macroValues[macro.id] ?? 0;
      if (value <= 0) continue;

      for (const key of GENE_KEYS) {
        const offset = macro.geneOffsets[key];
        if (offset !== undefined) {
          geneOffsets[key] = (geneOffsets[key] ?? 0) + offset * value;
        }
      }
      bloom = Math.max(bloom, macro.visual.bloom * value);
      motion = Math.max(motion, macro.visual.motion * value);
      particleDensity = Math.max(particleDensity, macro.visual.particleDensity * value);
    }

    return { geneOffsets, visual: { bloom, motion, particleDensity } };
  }

  /** Apply a single macro value to genes (returns clamped gene patch). */
  applySingle(macroId: string, value: number, base: OrganismGenes): OrganismGenes {
    const macro = getMacro(macroId);
    if (!macro) return base;
    const next = { ...base };
    for (const key of GENE_KEYS) {
      const offset = macro.geneOffsets[key];
      if (offset !== undefined) {
        next[key] = clamp(base[key] + offset * value, 0, 1);
      }
    }
    return next;
  }
}

/** Blend base genes with macro offsets. */
export function blendGenesWithMacros(base: OrganismGenes, offsets: Partial<OrganismGenes>): OrganismGenes {
  const next = { ...base };
  for (const key of GENE_KEYS) {
    const offset = offsets[key];
    if (offset !== undefined) {
      next[key] = clamp(base[key] + offset, 0, 1);
    }
  }
  return next;
}
