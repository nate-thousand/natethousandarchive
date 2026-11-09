/**
 * Plantasia — Parameter target registry.
 *
 * Central catalog of every controllable parameter in Plantasia. MIDI Learn,
 * macros, and future automation all reference these IDs — never raw CC numbers
 * in UI components.
 */
import { GENE_META, GENE_KEYS } from '@species/genes';
import type { ParameterTargetId } from './types';

export interface ParameterTarget {
  id: ParameterTargetId;
  label: string;
  category: 'gene' | 'macro' | 'global' | 'action';
  min: number;
  max: number;
}

/** All gene targets derived from GENE_KEYS. */
const GENE_TARGETS: ParameterTarget[] = GENE_KEYS.map((key) => ({
  id: `gene.${key}` as ParameterTargetId,
  label: GENE_META[key].label,
  category: 'gene',
  min: 0,
  max: 1,
}));

/** Performance macro targets (Feature 083). */
const MACRO_TARGETS: ParameterTarget[] = [
  { id: 'macro.bloom', label: 'Bloom', category: 'macro', min: 0, max: 1 },
  { id: 'macro.forestDensity', label: 'Forest Density', category: 'macro', min: 0, max: 1 },
  { id: 'macro.morningDew', label: 'Morning Dew', category: 'macro', min: 0, max: 1 },
  { id: 'macro.storm', label: 'Storm', category: 'macro', min: 0, max: 1 },
  { id: 'macro.photosynthesis', label: 'Photosynthesis', category: 'macro', min: 0, max: 1 },
  { id: 'macro.mutation', label: 'Mutation', category: 'macro', min: 0, max: 1 },
  { id: 'macro.evolution', label: 'Evolution', category: 'macro', min: 0, max: 1 },
  { id: 'macro.ambientDrift', label: 'Ambient Drift', category: 'macro', min: 0, max: 1 },
  { id: 'macro.twilight', label: 'Twilight', category: 'macro', min: 0, max: 1 },
  { id: 'macro.roots', label: 'Roots', category: 'macro', min: 0, max: 1 },
  { id: 'macro.leaves', label: 'Leaves', category: 'macro', min: 0, max: 1 },
];

const GLOBAL_TARGETS: ParameterTarget[] = [
  { id: 'masterVolume', label: 'Master Volume', category: 'global', min: 0, max: 1 },
  { id: 'tempo', label: 'Tempo', category: 'global', min: 40, max: 160 },
];

const ACTION_TARGETS: ParameterTarget[] = [
  { id: 'action.seed', label: 'Seed', category: 'action', min: 0, max: 1 },
  { id: 'action.grow', label: 'Grow', category: 'action', min: 0, max: 1 },
  { id: 'action.bloom', label: 'Bloom', category: 'action', min: 0, max: 1 },
  { id: 'action.spores', label: 'Spores', category: 'action', min: 0, max: 1 },
  { id: 'action.connect', label: 'Connect', category: 'action', min: 0, max: 1 },
  { id: 'action.prune', label: 'Prune', category: 'action', min: 0, max: 1 },
  { id: 'action.nourish', label: 'Nourish', category: 'action', min: 0, max: 1 },
  { id: 'action.mutate', label: 'Mutate', category: 'action', min: 0, max: 1 },
];

export const PARAMETER_TARGETS: readonly ParameterTarget[] = [
  ...GENE_TARGETS,
  ...MACRO_TARGETS,
  ...GLOBAL_TARGETS,
  ...ACTION_TARGETS,
];

const targetMap = new Map(PARAMETER_TARGETS.map((t) => [t.id, t]));

export function getParameterTarget(id: ParameterTargetId): ParameterTarget | undefined {
  return targetMap.get(id);
}

export function listTargetsByCategory(category: ParameterTarget['category']): ParameterTarget[] {
  return PARAMETER_TARGETS.filter((t) => t.category === category);
}
