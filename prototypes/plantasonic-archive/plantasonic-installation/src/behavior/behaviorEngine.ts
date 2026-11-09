/**
 * behaviorEngine.ts
 * ----------------------------------------------------------------------------
 * MILESTONE 4 — Behavior Engine
 *
 * Purpose
 *   Evaluates the behaviors bound to each scene node every frame, turning audio
 *   features and time into concrete transform/visual deltas. It is the layer
 *   that makes static specimens feel alive and audio-reactive.
 *
 * Responsibilities
 *   - Resolve behavior ids (from definitions/behavior-library.json) into
 *     evaluators.
 *   - Combine motion behaviors (time-driven) and audio behaviors
 *     (feature-driven) per node.
 *   - Output transform/opacity/emissive deltas the renderer applies.
 *   - Stay deterministic given the same inputs.
 *
 * Dependencies
 *   - definitions/behavior-library.json
 *   - audioMappings.ts (feature -> parameter routing)
 *   - sceneGraph.ts (nodes to mutate)
 *
 * Future implementation notes
 *   - Architectural pass only. Define the evaluation contract; no per-behavior
 *     math yet.
 * ----------------------------------------------------------------------------
 */

import type { SceneNode } from "../renderer/sceneGraph";

export interface AudioFrame {
  rms: number;
  energy: number;
  bands: Record<string, number>;
  onset: boolean;
  [feature: string]: number | boolean | Record<string, number>;
}

export interface BehaviorOutput {
  nodeId: string;
  deltaRotation: number;
  deltaScale: number;
  deltaOpacity: number;
  emissiveGain: number;
}

export class BehaviorEngine {
  /** Evaluate all behaviors for a node given time and the current audio frame. */
  evaluateNode(
    _node: SceneNode,
    _timeSeconds: number,
    _audio: AudioFrame
  ): BehaviorOutput {
    throw new Error("BehaviorEngine.evaluateNode: not implemented (Milestone 4)");
  }

  /** Evaluate the whole graph for one frame. */
  tick(_timeSeconds: number, _audio: AudioFrame): BehaviorOutput[] {
    throw new Error("BehaviorEngine.tick: not implemented (Milestone 4)");
  }
}
