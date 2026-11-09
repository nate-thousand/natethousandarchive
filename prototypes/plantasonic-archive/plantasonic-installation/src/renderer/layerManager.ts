/**
 * layerManager.ts
 * ----------------------------------------------------------------------------
 * MILESTONE 7 — Realtime Renderer
 *
 * Purpose
 *   Resolves scene graph nodes into ordered, composited render layers and owns
 *   blend modes, parallax, and per-layer post-processing. Layering is core to
 *   the depth and bloom of the Plantasonic look.
 *
 * Responsibilities
 *   - Map nodes to layers (see config/render-config.json -> layers).
 *   - Maintain z-ordering and parallax offsets driven by the camera.
 *   - Manage offscreen buffers for layered compositing.
 *   - Apply per-layer blend modes and effects.
 *
 * Dependencies
 *   - config/render-config.json (layer count, blend, parallax, zSpacing)
 *   - sceneGraph.ts (source of nodes)
 *   - cameraController.ts (parallax input)
 *
 * Future implementation notes
 *   - Architectural pass only; no framebuffer/GPU allocation yet.
 * ----------------------------------------------------------------------------
 */

export type BlendMode = "normal" | "screen" | "add" | "multiply" | "overlay";

export interface RenderLayer {
  index: number;
  blendMode: BlendMode;
  parallax: number;
  opacity: number;
  effects: string[];
  nodeIds: string[];
}

export class LayerManager {
  /** Rebuild layer assignments from the current scene graph. */
  rebuild(): RenderLayer[] {
    throw new Error("LayerManager.rebuild: not implemented (Milestone 7)");
  }

  /** Update parallax offsets for the given camera position. */
  applyParallax(_cameraX: number, _cameraY: number): void {
    throw new Error("LayerManager.applyParallax: not implemented (Milestone 7)");
  }

  /** Ordered layers, back to front, for compositing. */
  getOrderedLayers(): RenderLayer[] {
    throw new Error("LayerManager.getOrderedLayers: not implemented (Milestone 7)");
  }
}
