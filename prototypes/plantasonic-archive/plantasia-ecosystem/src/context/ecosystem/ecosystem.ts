/**
 * Plantasia — Ecosystem context definition & hook.
 *
 * The ecosystem is the live state of what the cultivator is currently growing:
 * the active organism (species + genes + seed) and the operations that evolve
 * it (set a gene, mutate, crossbreed, randomize, regrow, load a preset). Audio
 * and visualization both derive from this single source of truth.
 */
import { createContext, useContext } from 'react';
import type { Organism, OrganismGenes, SpeciesDefinition } from '@species/types';

export interface EcosystemContextValue {
  /** The currently cultivated organism. */
  organism: Organism;
  /** The resolved species definition for the organism. */
  species: SpeciesDefinition;
  /** Switch to a different species (grows a fresh organism). */
  selectSpecies: (speciesId: string) => void;
  /** Cultivate a fresh organism of a species with specific genes (load a preset). */
  applyPreset: (speciesId: string, genes: OrganismGenes, name?: string) => void;
  /** Update a single gene in real time. */
  setGene: (key: keyof OrganismGenes, value: number) => void;
  /** Replace the whole gene set. */
  setGenes: (genes: OrganismGenes) => void;
  /** Mutate genes by a normalized amount (suggested mutation). */
  mutate: (amount: number) => void;
  /** Generate an entirely new, intelligent random gene set. */
  randomize: () => void;
  /** Regrow the body with a new seed (same species & genes). */
  regrow: () => void;
  /** Rename the active organism. */
  rename: (name: string) => void;
}

export const EcosystemContext = createContext<EcosystemContextValue | null>(null);

/** Access the live ecosystem. Throws if used outside the provider. */
export function useEcosystem(): EcosystemContextValue {
  const ctx = useContext(EcosystemContext);
  if (!ctx) throw new Error('useEcosystem must be used within <EcosystemProvider>');
  return ctx;
}
