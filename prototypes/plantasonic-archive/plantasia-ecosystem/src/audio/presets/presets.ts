/**
 * Plantasia — Factory presets.
 *
 * A preset is a named, shareable gene configuration for a species. These ship
 * with the app; user-saved and AI-generated presets use the same shape and are
 * persisted via the storage service.
 */
import type { OrganismGenes } from '@species/types';
import { encodeDna } from '@species/genes';

export interface Preset {
  id: string;
  name: string;
  speciesId: string;
  description: string;
  genes: OrganismGenes;
  /** Compact DNA string for display / sharing. */
  dna: string;
  /** Whether this is a built-in (read-only) preset. */
  builtIn: boolean;
}

interface PresetSeed {
  id: string;
  name: string;
  speciesId: string;
  description: string;
  genes: OrganismGenes;
}

function seal(seed: PresetSeed): Preset {
  return { ...seed, dna: encodeDna(seed.genes), builtIn: true };
}

export const FACTORY_PRESETS: readonly Preset[] = [
  seal({
    id: 'preset-dawn-fern',
    name: 'Dawn Fern',
    speciesId: 'fern',
    description: 'Soft morning pads, slowly unfurling.',
    genes: { sunlight: 0.4, water: 0.7, wind: 0.4, soil: 0.4, energy: 0.5, harmony: 0.6, growth: 0.7, life: 0.8 },
  }),
  seal({
    id: 'preset-elder-tree',
    name: 'Elder Tree',
    speciesId: 'tree',
    description: 'Deep, sustaining warmth from ancient roots.',
    genes: { sunlight: 0.45, water: 0.5, wind: 0.25, soil: 0.9, energy: 0.75, harmony: 0.55, growth: 0.25, life: 0.9 },
  }),
  seal({
    id: 'preset-glass-bloom',
    name: 'Glass Bloom',
    speciesId: 'crystal',
    description: 'Bright, ringing harmonics like sunlit ice.',
    genes: { sunlight: 0.95, water: 0.2, wind: 0.35, soil: 0.4, energy: 0.8, harmony: 0.95, growth: 0.3, life: 0.5 },
  }),
  seal({
    id: 'preset-spore-cloud',
    name: 'Spore Cloud',
    speciesId: 'mushroom',
    description: 'Granular, percussive bursts drifting on the wind.',
    genes: { sunlight: 0.4, water: 0.6, wind: 0.75, soil: 0.5, energy: 0.7, harmony: 0.4, growth: 0.9, life: 0.35 },
  }),
  seal({
    id: 'preset-deep-vine',
    name: 'Deep Vine',
    speciesId: 'vine',
    description: 'Echoing tendrils that stretch into rhythm.',
    genes: { sunlight: 0.5, water: 0.65, wind: 0.7, soil: 0.5, energy: 0.6, harmony: 0.5, growth: 0.8, life: 0.7 },
  }),
];
