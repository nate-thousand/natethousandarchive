/**
 * installationEngine.ts
 * ----------------------------------------------------------------------------
 * MILESTONE 8 — Installation Engine
 *
 * Purpose
 *   The top-level orchestrator that boots and runs the whole installation. It
 *   wires together audio analysis, the AI Director, the scene graph, the
 *   behavior engine, and the renderer into a single coherent runtime loop.
 *
 * Responsibilities
 *   - Initialize subsystems in the correct order.
 *   - Own the master update loop (audio -> director -> behavior -> render).
 *   - Manage lifecycle (start, pause, resume, stop) and graceful recovery.
 *   - Surface health/metrics to performanceMode.ts.
 *
 * Dependencies
 *   - Audio Intelligence, AI Director, State Engine, Behavior Engine,
 *     Scene Graph, Realtime Renderer (all later milestones).
 *   - config/*.json for runtime defaults.
 *
 * Future implementation notes
 *   - Architectural pass only. Define the lifecycle/loop contract; no wiring or
 *     subsystem instantiation yet.
 * ----------------------------------------------------------------------------
 */

export type EngineState = "idle" | "starting" | "running" | "paused" | "stopped";

export interface EngineConfig {
  renderConfigPath: string;
  audioConfigPath: string;
  styleDNAPath: string;
}

export class InstallationEngine {
  constructor(_config: EngineConfig) {}

  /** Initialize and start all subsystems and the master loop. */
  async start(): Promise<void> {
    throw new Error("InstallationEngine.start: not implemented (Milestone 8)");
  }

  pause(): void {
    throw new Error("InstallationEngine.pause: not implemented (Milestone 8)");
  }

  resume(): void {
    throw new Error("InstallationEngine.resume: not implemented (Milestone 8)");
  }

  stop(): void {
    throw new Error("InstallationEngine.stop: not implemented (Milestone 8)");
  }

  getState(): EngineState {
    throw new Error("InstallationEngine.getState: not implemented (Milestone 8)");
  }
}
