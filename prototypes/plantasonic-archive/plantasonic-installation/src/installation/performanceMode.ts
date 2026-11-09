/**
 * performanceMode.ts
 * ----------------------------------------------------------------------------
 * MILESTONE 9 — Performance Mode
 *
 * Purpose
 *   Keeps the installation running smoothly for hours/days on varied hardware
 *   by monitoring live frame timing and adapting quality. Critical for gallery
 *   and long-running deployments.
 *
 * Responsibilities
 *   - Sample frame time / FPS and detect sustained drops.
 *   - Step quality presets up/down (see config/render-config.json quality).
 *   - Throttle particle counts, bloom, and render scale under load.
 *   - Expose a stable target experience for kiosk/showcase modes.
 *
 * Dependencies
 *   - config/render-config.json (quality presets, fps targets, budgets)
 *   - installationEngine.ts (provides frame metrics, receives directives)
 *
 * Future implementation notes
 *   - Architectural pass only. Define the monitoring/adaptation contract; no
 *     measurement or preset switching yet.
 * ----------------------------------------------------------------------------
 */

export type QualityPreset = "performance" | "balanced" | "showcase";

export interface FrameMetrics {
  fps: number;
  frameTimeMs: number;
  drawCalls: number;
  particles: number;
}

export class PerformanceMode {
  /** Feed one frame's metrics into the monitor. */
  sample(_metrics: FrameMetrics): void {
    throw new Error("PerformanceMode.sample: not implemented (Milestone 9)");
  }

  /** Current recommended quality preset. */
  recommendedPreset(): QualityPreset {
    throw new Error("PerformanceMode.recommendedPreset: not implemented (Milestone 9)");
  }

  /** Force a preset (e.g. kiosk lock to 'showcase'). */
  lockPreset(_preset: QualityPreset): void {
    throw new Error("PerformanceMode.lockPreset: not implemented (Milestone 9)");
  }
}
