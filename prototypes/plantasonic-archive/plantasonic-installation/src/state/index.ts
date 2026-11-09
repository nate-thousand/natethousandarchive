/**
 * state/index.ts
 * ----------------------------------------------------------------------------
 * MILESTONE 6 — State Engine
 *
 * Purpose
 *   The single source of runtime truth: which scene is active, transition
 *   progress, current mood, performance preset, and director intent. Other
 *   systems read from and subscribe to this store rather than holding their own
 *   copies.
 *
 * Responsibilities
 *   - Hold the canonical installation state.
 *   - Provide subscribe/select access for subsystems.
 *   - Coordinate scene/transition state with behavior/stateMachine.ts.
 *   - Support snapshot/restore for resilience and replay.
 *
 * Dependencies
 *   - behavior/stateMachine.ts (FSM primitive)
 *   - Consumed by installation, renderer, behavior, and AI Director.
 *
 * Future implementation notes
 *   - Architectural pass only. No store implementation yet.
 * ----------------------------------------------------------------------------
 */

export {};
