/**
 * sceneGraph.ts
 * ----------------------------------------------------------------------------
 * MILESTONE 2 — Botanical Scene Graph  /  MILESTONE 7 — Realtime Renderer
 *
 * Purpose
 *   The retained-mode tree of everything currently on screen. Nodes reference
 *   botanical assets and carry transform, behavior, and layer assignment. The
 *   scene graph is the structural backbone the renderer walks each frame.
 *
 * Responsibilities
 *   - Represent scenes (from definitions/scene-library.json) as a node tree.
 *   - Hold transforms, asset references, behavior bindings, and z/layer info.
 *   - Support add/remove/reparent and efficient traversal.
 *   - Stay rendering-backend agnostic (the renderer consumes this).
 *
 * Dependencies
 *   - definitions/scene-library.json, botanical-assets.json
 *   - layerManager.ts (resolves nodes into draw layers)
 *   - behaviorEngine (mutates node transforms per frame)
 *
 * Future implementation notes
 *   - Architectural pass only. Define node shape and tree contract; no render
 *     loop or GPU code here yet.
 * ----------------------------------------------------------------------------
 */

export interface Transform {
  x: number;
  y: number;
  z: number;
  rotation: number;
  scaleX: number;
  scaleY: number;
  opacity: number;
}

export interface SceneNode {
  id: string;
  assetId?: string;
  variant?: string;
  layer: number;
  transform: Transform;
  behaviorIds: string[];
  children: SceneNode[];
}

export class SceneGraph {
  /** Build a scene graph from a scene definition id. */
  loadScene(_sceneId: string): SceneNode {
    throw new Error("SceneGraph.loadScene: not implemented (Milestone 2)");
  }

  addNode(_parentId: string, _node: SceneNode): void {
    throw new Error("SceneGraph.addNode: not implemented (Milestone 2)");
  }

  removeNode(_nodeId: string): void {
    throw new Error("SceneGraph.removeNode: not implemented (Milestone 2)");
  }

  /** Depth-first traversal callback for the renderer. */
  traverse(_visit: (node: SceneNode) => void): void {
    throw new Error("SceneGraph.traverse: not implemented (Milestone 2)");
  }
}
