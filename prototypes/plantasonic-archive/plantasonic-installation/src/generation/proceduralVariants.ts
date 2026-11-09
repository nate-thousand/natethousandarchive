/**
 * proceduralVariants.ts
 * ----------------------------------------------------------------------------
 * MILESTONE 1 — Generative Asset Pipeline
 *
 * Purpose
 *   Expands a small set of AI-generated base assets into a large, varied visual
 *   vocabulary using cheap procedural transforms — so the installation feels
 *   endlessly novel without generating (or storing) hundreds of images.
 *
 * Responsibilities
 *   - Define the catalog of supported procedural operations.
 *   - Compose operations into named variant recipes.
 *   - Produce deterministic variants from a seed (reproducible).
 *
 * Planned procedural operations (documentation only in this milestone):
 *   - rotation        : rotate the source asset
 *   - scale           : uniform / non-uniform scaling
 *   - mirror          : horizontal / vertical reflection
 *   - crop            : reframe a region of the source
 *   - warp            : non-linear coordinate distortion
 *   - displacement    : displace pixels by a map/noise field
 *   - pixelSort       : sort pixels along thresholds for glitch streaks
 *   - meshDeformation : deform on a triangle/grid mesh
 *   - noise           : additive/multiplicative procedural noise
 *   - particles       : emit particles seeded from the asset's emissive areas
 *   - opticalFlow     : motion-vector driven warping across frames
 *   - dithering       : re-quantize using the Style DNA dither matrix
 *   - masking         : reveal/hide regions via procedural masks
 *   - glitch          : datamosh / channel-shift style corruption
 *
 * Dependencies
 *   - config/style-dna.json (dithering matrix, palette, pixel grid)
 *   - assetCache.ts (variants may be cached by recipe + seed)
 *   - Future: the renderer, which can apply some operations live on the GPU.
 *
 * Future implementation notes
 *   - No implementation required yet. This declares the operation set and the
 *     recipe shape so the renderer and queue can be designed against it.
 *   - Lightweight ops (rotation, scale, mirror, dither) should run live in the
 *     renderer; heavy ops (meshDeformation, opticalFlow) may be precomputed.
 * ----------------------------------------------------------------------------
 */

export type ProceduralOp =
  | "rotation"
  | "scale"
  | "mirror"
  | "crop"
  | "warp"
  | "displacement"
  | "pixelSort"
  | "meshDeformation"
  | "noise"
  | "particles"
  | "opticalFlow"
  | "dithering"
  | "masking"
  | "glitch";

export interface ProceduralStep {
  op: ProceduralOp;
  /** Operation-specific parameters. */
  params: Record<string, number | string | boolean>;
}

export interface VariantRecipe {
  /** Name surfaced in botanical-assets.json variants[]. */
  name: string;
  /** Ordered chain of procedural operations. */
  steps: ProceduralStep[];
  /** Optional seed for deterministic randomness. */
  seed?: number;
}

/** Operations that are cheap enough to run live in the renderer. */
export const REALTIME_OPS: ProceduralOp[] = [
  "rotation",
  "scale",
  "mirror",
  "crop",
  "noise",
  "dithering",
  "masking",
];

/** Operations expected to be precomputed and cached. */
export const PRECOMPUTE_OPS: ProceduralOp[] = [
  "warp",
  "displacement",
  "pixelSort",
  "meshDeformation",
  "opticalFlow",
  "glitch",
];

/**
 * Resolve a named variant recipe for an asset. Implementation deferred.
 */
export function resolveRecipe(
  _assetId: string,
  _variantName: string
): VariantRecipe {
  throw new Error(
    "proceduralVariants.resolveRecipe: not implemented (Milestone 1)"
  );
}
