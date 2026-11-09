/**
 * Plantasia — Organism geometry types.
 *
 * The procedural generator produces a static, normalized "skeleton" of the
 * organism (coordinates in a unit space where the seed sits at origin and the
 * organism grows upward along -Y). The renderer animates and paints this
 * skeleton each frame; separating generation from rendering keeps both testable
 * and lets us regenerate only when species/genes/seed change.
 */

/** A drawable limb (root or branch) as a curved segment. */
export interface Segment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  /** Generation depth (0 = outermost tip). Drives thickness & motion. */
  depth: number;
  /** Base stroke thickness in unit space. */
  thickness: number;
  /** Curl control-point offset for the quadratic curve. */
  bend: number;
  kind: 'root' | 'branch';
  /** Random phase so each limb sways independently. */
  phase: number;
}

/** A point decoration: leaf, flower (bloom), or structural node. */
export interface Decoration {
  x: number;
  y: number;
  /** Base radius in unit space. */
  size: number;
  depth: number;
  phase: number;
  kind: 'leaf' | 'bloom' | 'node';
}

/** A spore emitter location (tips that shed particles). */
export interface Emitter {
  x: number;
  y: number;
  rate: number;
}

/** The complete generated organism skeleton. */
export interface OrganismStructure {
  segments: Segment[];
  decorations: Decoration[];
  emitters: Emitter[];
  /** Normalized bounding box of the generated geometry. */
  bounds: { minX: number; minY: number; maxX: number; maxY: number };
}
