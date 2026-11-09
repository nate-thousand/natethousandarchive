import { describe, expect, it } from 'vitest';
import { GENE_KEYS, decodeDna, encodeDna, mutateGenes, neutralGenes, randomGenes } from './genes';

describe('genes', () => {
  it('encodes and decodes DNA within tolerance', () => {
    const genes = neutralGenes();
    const dna = encodeDna(genes);
    const decoded = decodeDna(dna);
    for (const key of GENE_KEYS) {
      expect(decoded[key]).toBeCloseTo(genes[key], 1);
    }
  });

  it('produces a DNA string of the expected length', () => {
    expect(encodeDna(neutralGenes())).toHaveLength(GENE_KEYS.length * 2);
  });

  it('mutation is deterministic for a given seed', () => {
    const base = neutralGenes();
    expect(mutateGenes(base, 0.2, 42)).toEqual(mutateGenes(base, 0.2, 42));
  });

  it('keeps all genes within 0..1', () => {
    const random = randomGenes(123);
    for (const key of GENE_KEYS) {
      expect(random[key]).toBeGreaterThanOrEqual(0);
      expect(random[key]).toBeLessThanOrEqual(1);
    }
  });

  it('decodes malformed DNA to neutral genes', () => {
    expect(decodeDna('zz')).toEqual(neutralGenes());
  });
});
