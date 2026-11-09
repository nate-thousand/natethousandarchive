import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { hashString } from '@utils/random';
import type { Organism, OrganismGenes } from '@species/types';
import {
  DEFAULT_SPECIES_ID,
  cultivateOrganism,
  mutateGenes,
  randomGenes,
  requireSpecies,
} from '@species/index';
import { EcosystemContext, type EcosystemContextValue } from './ecosystem';

/**
 * EcosystemProvider — owns the active organism and the evolution operations.
 * Gene edits are immutable state updates so React re-renders consumers and the
 * audio engine (via AudioProvider) stays in sync.
 */
export function EcosystemProvider({ children }: { children: ReactNode }) {
  const [organism, setOrganism] = useState<Organism>(() => cultivateOrganism(DEFAULT_SPECIES_ID));

  const species = useMemo(() => requireSpecies(organism.speciesId), [organism.speciesId]);

  const selectSpecies = useCallback((speciesId: string) => {
    setOrganism(cultivateOrganism(speciesId));
  }, []);

  const applyPreset = useCallback((speciesId: string, genes: OrganismGenes, name?: string) => {
    setOrganism({ ...cultivateOrganism(speciesId, name), genes: { ...genes } });
  }, []);

  const setGene = useCallback((key: keyof OrganismGenes, value: number) => {
    setOrganism((current) => ({ ...current, genes: { ...current.genes, [key]: value } }));
  }, []);

  const setGenes = useCallback((genes: OrganismGenes) => {
    setOrganism((current) => ({ ...current, genes }));
  }, []);

  const mutate = useCallback((amount: number) => {
    setOrganism((current) => ({
      ...current,
      genes: mutateGenes(current.genes, amount, Date.now()),
    }));
  }, []);

  const randomize = useCallback(() => {
    setOrganism((current) => ({ ...current, genes: randomGenes(Date.now()) }));
  }, []);

  const regrow = useCallback(() => {
    setOrganism((current) => ({ ...current, seed: hashString(`${current.id}:${Date.now()}`) }));
  }, []);

  const rename = useCallback((name: string) => {
    setOrganism((current) => ({ ...current, name: name.trim() || current.name }));
  }, []);

  const value = useMemo<EcosystemContextValue>(
    () => ({
      organism,
      species,
      selectSpecies,
      applyPreset,
      setGene,
      setGenes,
      mutate,
      randomize,
      regrow,
      rename,
    }),
    [organism, species, selectSpecies, applyPreset, setGene, setGenes, mutate, randomize, regrow, rename],
  );

  return <EcosystemContext.Provider value={value}>{children}</EcosystemContext.Provider>;
}
