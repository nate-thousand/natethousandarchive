/**
 * ui/index.ts
 * ----------------------------------------------------------------------------
 * SUPPORTING — Operator / Debug Interface
 *
 * Purpose
 *   Optional operator-facing controls and debug overlays (FPS, audio meters,
 *   scene selector, generation queue status). The installation itself is
 *   immersive and chrome-free; the UI is for setup and monitoring only.
 *
 * Responsibilities
 *   - Render optional debug HUD and operator controls.
 *   - Read from the State Engine; never own state directly.
 *   - Stay strictly separate from the immersive render output.
 *
 * Dependencies
 *   - src/state (read-only), installation metrics.
 *
 * Future implementation notes
 *   - Architectural pass only. No UI components yet. The existing UI must not
 *     be redesigned in this milestone.
 * ----------------------------------------------------------------------------
 */

export {};
