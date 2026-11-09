/**
 * Plantasia — Performance macro definitions.
 *
 * Each macro simultaneously adjusts multiple synthesis/visual parameters.
 * Values are normalized 0..1 and applied by the MacroProcessor.
 */
import type { OrganismGenes } from '@species/types';

export interface MacroDefinition {
  id: string;
  label: string;
  /** Gene offsets applied when macro = 1.0 (added to current genes, clamped). */
  geneOffsets: Partial<OrganismGenes>;
  /** Visual multipliers at macro = 1.0. */
  visual: { bloom: number; motion: number; particleDensity: number };
}

export const PERFORMANCE_MACROS: readonly MacroDefinition[] = [
  {
    id: 'bloom',
    label: 'Bloom',
    geneOffsets: { sunlight: 0.3, energy: 0.2, harmony: 0.15 },
    visual: { bloom: 1, motion: 0.4, particleDensity: 0.5 },
  },
  {
    id: 'forestDensity',
    label: 'Forest Density',
    geneOffsets: { soil: 0.25, water: 0.2, energy: 0.15 },
    visual: { bloom: 0.3, motion: 0.2, particleDensity: 0.6 },
  },
  {
    id: 'morningDew',
    label: 'Morning Dew',
    geneOffsets: { water: 0.35, growth: 0.2, life: 0.25 },
    visual: { bloom: 0.6, motion: 0.3, particleDensity: 0.4 },
  },
  {
    id: 'storm',
    label: 'Storm',
    geneOffsets: { wind: 0.4, energy: 0.3, harmony: -0.1 },
    visual: { bloom: 0.2, motion: 0.9, particleDensity: 0.8 },
  },
  {
    id: 'photosynthesis',
    label: 'Photosynthesis',
    geneOffsets: { sunlight: 0.4, energy: 0.3, growth: 0.2 },
    visual: { bloom: 0.8, motion: 0.5, particleDensity: 0.3 },
  },
  {
    id: 'mutation',
    label: 'Mutation',
    geneOffsets: { wind: 0.2, harmony: 0.3, growth: 0.15 },
    visual: { bloom: 0.5, motion: 0.6, particleDensity: 0.7 },
  },
  {
    id: 'evolution',
    label: 'Evolution',
    geneOffsets: { harmony: 0.25, life: 0.2, energy: 0.15 },
    visual: { bloom: 0.4, motion: 0.5, particleDensity: 0.5 },
  },
  {
    id: 'ambientDrift',
    label: 'Ambient Drift',
    geneOffsets: { wind: 0.3, life: 0.3, water: 0.15 },
    visual: { bloom: 0.3, motion: 0.7, particleDensity: 0.4 },
  },
  {
    id: 'twilight',
    label: 'Twilight',
    geneOffsets: { sunlight: -0.2, life: 0.25, water: 0.15 },
    visual: { bloom: 0.7, motion: 0.2, particleDensity: 0.2 },
  },
  {
    id: 'roots',
    label: 'Roots',
    geneOffsets: { soil: 0.4, water: 0.15, energy: 0.1 },
    visual: { bloom: 0.1, motion: 0.3, particleDensity: 0.2 },
  },
  {
    id: 'leaves',
    label: 'Leaves',
    geneOffsets: { sunlight: 0.25, harmony: 0.2, wind: 0.1 },
    visual: { bloom: 0.6, motion: 0.5, particleDensity: 0.3 },
  },
];

const macroMap = new Map(PERFORMANCE_MACROS.map((m) => [m.id, m]));

export function getMacro(id: string): MacroDefinition | undefined {
  return macroMap.get(id);
}
