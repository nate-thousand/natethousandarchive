/**
 * Plantasia — Species registry.
 *
 * Central lookup and organism-creation helpers. The registry is the single
 * access point for species so the rest of the app never imports definitions
 * directly — making future dynamic/AI-generated species a drop-in extension.
 */
import { createId } from '@utils/id';
import { hashString } from '@utils/random';
import { SPECIES_DEFINITIONS } from './definitions';
import type { Organism, SpeciesDefinition } from './types';

const byId = new Map<string, SpeciesDefinition>(SPECIES_DEFINITIONS.map((s) => [s.id, s]));

/** All registered species. */
export function listSpecies(): readonly SpeciesDefinition[] {
  return SPECIES_DEFINITIONS;
}

/** Look up a species by id, or `undefined` if unknown. */
export function getSpecies(id: string): SpeciesDefinition | undefined {
  return byId.get(id);
}

/** Look up a species by id, throwing if missing (use when id is trusted). */
export function requireSpecies(id: string): SpeciesDefinition {
  const species = byId.get(id);
  if (!species) throw new Error(`Unknown species: ${id}`);
  return species;
}

/** The default species new cultivators start with. */
export const DEFAULT_SPECIES_ID = 'fern';

/**
 * Cultivate a fresh organism from a species. A name seeds the deterministic
 * RNG so the same name+species always grows the same body.
 */
export function cultivateOrganism(speciesId: string, name?: string): Organism {
  const species = requireSpecies(speciesId);
  const displayName = name?.trim() || `${species.name} ${Math.floor(Math.random() * 900 + 100)}`;
  return {
    id: createId('organism'),
    speciesId: species.id,
    name: displayName,
    seed: hashString(`${species.id}:${displayName}`),
    genes: { ...species.genes },
    cultivatedAt: new Date().toISOString(),
  };
}
