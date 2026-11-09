/**
 * Plantasia — Procedural organism generator.
 *
 * Grows a deterministic organism skeleton from a species' FormProfile, the
 * organism's genes, and a seed. The same inputs always grow the same body
 * (reproducible "DNA"). Output is normalized unit-space geometry consumed by the
 * renderer. Generation is bounded by a hard segment cap to stay performant.
 */
import { lerp } from '@utils/math';
import { createRng } from '@utils/random';
import type { OrganismGenes, SpeciesDefinition } from '@species/types';
import type { Decoration, Emitter, OrganismStructure, Segment } from './types';

const MAX_SEGMENTS = 2600;
const BASE_LENGTH = 0.2;

interface GrowthContext {
  rng: () => number;
  segments: Segment[];
  decorations: Decoration[];
  emitters: Emitter[];
  form: SpeciesDefinition['form'];
  genes: OrganismGenes;
}

/** Grow one limb and recurse into its children. */
function grow(
  ctx: GrowthContext,
  x: number,
  y: number,
  angle: number,
  length: number,
  depth: number,
  kind: 'root' | 'branch',
): void {
  if (depth <= 0 || ctx.segments.length >= MAX_SEGMENTS) {
    spawnTip(ctx, x, y, depth, kind);
    return;
  }

  const { rng, form } = ctx;
  const curlJitter = (rng() - 0.5) * form.curl;
  const tipAngle = angle + curlJitter * 0.6;
  const x2 = x + Math.cos(tipAngle) * length;
  const y2 = y + Math.sin(tipAngle) * length;

  ctx.segments.push({
    x1: x,
    y1: y,
    x2,
    y2,
    depth,
    thickness: lerp(0.002, 0.02, depth / 7),
    bend: curlJitter * form.curl,
    kind,
    phase: rng() * Math.PI * 2,
  });

  // Junction node.
  if (rng() < 0.4) {
    ctx.decorations.push({ x: x2, y: y2, size: 0.006, depth, phase: rng() * Math.PI * 2, kind: 'node' });
  }

  // Foliage along the limb (branches only).
  if (kind === 'branch' && rng() < form.foliage) {
    ctx.decorations.push({
      x: lerp(x, x2, 0.6),
      y: lerp(y, y2, 0.6),
      size: lerp(0.008, 0.02, ctx.genes.sunlight),
      depth,
      phase: rng() * Math.PI * 2,
      kind: 'leaf',
    });
  }

  const childCount = Math.max(2, Math.round(form.branching));
  const nextLength = length * form.taper;
  for (let i = 0; i < childCount; i += 1) {
    const t = childCount === 1 ? 0.5 : i / (childCount - 1);
    const childAngle = tipAngle + (t - 0.5) * form.spread + (rng() - 0.5) * form.curl * 0.5;
    grow(ctx, x2, y2, childAngle, nextLength, depth - 1, kind);
  }
}

/** Place a tip decoration (leaf, bloom) and possibly a spore emitter. */
function spawnTip(ctx: GrowthContext, x: number, y: number, depth: number, kind: 'root' | 'branch'): void {
  if (kind === 'root') return;
  const { rng, form, genes } = ctx;
  if (rng() < form.flowering) {
    ctx.decorations.push({
      x,
      y,
      size: lerp(0.014, 0.03, genes.energy),
      depth,
      phase: rng() * Math.PI * 2,
      kind: 'bloom',
    });
  } else {
    ctx.decorations.push({
      x,
      y,
      size: lerp(0.008, 0.018, genes.sunlight),
      depth,
      phase: rng() * Math.PI * 2,
      kind: 'leaf',
    });
  }
  if (rng() < form.sporeRate) {
    ctx.emitters.push({ x, y, rate: form.sporeRate });
  }
}

/** Compute the normalized bounding box of all generated geometry. */
function computeBounds(segments: Segment[]): OrganismStructure['bounds'] {
  const bounds = { minX: 0, minY: 0, maxX: 0, maxY: 0 };
  for (const s of segments) {
    bounds.minX = Math.min(bounds.minX, s.x1, s.x2);
    bounds.minY = Math.min(bounds.minY, s.y1, s.y2);
    bounds.maxX = Math.max(bounds.maxX, s.x1, s.x2);
    bounds.maxY = Math.max(bounds.maxY, s.y1, s.y2);
  }
  return bounds;
}

/**
 * Generate an organism skeleton.
 * @param species The archetype providing the form profile.
 * @param genes   The organism's current genes (affect scale & density).
 * @param seed    Deterministic seed (same seed -> same body).
 */
export function generateOrganism(
  species: SpeciesDefinition,
  genes: OrganismGenes,
  seed: number,
): OrganismStructure {
  const ctx: GrowthContext = {
    rng: createRng(seed),
    segments: [],
    decorations: [],
    emitters: [],
    form: species.form,
    genes,
  };

  const length = lerp(BASE_LENGTH * 0.7, BASE_LENGTH * 1.3, genes.growth);
  const upward = -Math.PI / 2;
  const downward = Math.PI / 2;

  // Canopy grows up from the seed.
  grow(ctx, 0, 0, upward, length, species.form.depth, 'branch');
  // Roots grow down with fewer generations and gentler spread.
  const rootDepth = Math.max(2, species.form.depth - 2);
  grow(ctx, 0, 0, downward, length * 0.7, rootDepth, 'root');

  return {
    segments: ctx.segments,
    decorations: ctx.decorations,
    emitters: ctx.emitters,
    bounds: computeBounds(ctx.segments),
  };
}
