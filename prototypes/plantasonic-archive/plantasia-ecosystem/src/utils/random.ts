/**
 * Plantasia — Deterministic & convenience randomness.
 *
 * A seeded PRNG (mulberry32) powers reproducible organism "DNA" so the same
 * seed always grows the same creature — essential for sharing and AI features.
 */

/** Create a seeded pseudo-random generator returning floats in [0, 1). */
export function createRng(seed: number): () => number {
  let a = seed >>> 0;
  return function next(): number {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Hash a string into a 32-bit unsigned integer (for seeding from names/DNA). */
export function hashString(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Random float in [min, max) using an optional generator. */
export function randomRange(min: number, max: number, rng: () => number = Math.random): number {
  return min + rng() * (max - min);
}

/** Random integer in [min, max] inclusive. */
export function randomInt(min: number, max: number, rng: () => number = Math.random): number {
  return Math.floor(randomRange(min, max + 1, rng));
}

/** Pick a random element from a non-empty array. */
export function pick<T>(items: readonly T[], rng: () => number = Math.random): T {
  const index = Math.floor(rng() * items.length);
  return items[index] as T;
}
