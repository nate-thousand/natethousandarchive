/**
 * stateMachine.ts
 * ----------------------------------------------------------------------------
 * MILESTONE 4 — Behavior Engine  /  MILESTONE 6 — State Engine
 *
 * Purpose
 *   A reusable finite-state-machine primitive used both for per-asset behavior
 *   states (idle -> reacting -> blooming) and, at a higher level, for the
 *   installation's overall state. Kept generic so multiple systems can reuse it.
 *
 * Responsibilities
 *   - Define states, transitions, and guards.
 *   - Drive transitions from external signals (audio onset, director cue, time).
 *   - Emit enter/exit events for hooks.
 *
 * Dependencies
 *   - None at this layer; consumers wire it to audio/director signals.
 *
 * Future implementation notes
 *   - Architectural pass only. Define the FSM contract; no transition logic yet.
 * ----------------------------------------------------------------------------
 */

export interface StateTransition<S extends string, E extends string> {
  from: S;
  event: E;
  to: S;
  /** Optional guard; transition only fires when it returns true. */
  guard?: (context: unknown) => boolean;
}

export interface StateMachineDefinition<S extends string, E extends string> {
  initial: S;
  states: S[];
  transitions: StateTransition<S, E>[];
}

export class StateMachine<S extends string, E extends string> {
  constructor(_definition: StateMachineDefinition<S, E>) {}

  current(): S {
    throw new Error("StateMachine.current: not implemented (Milestone 4)");
  }

  /** Send an event; returns the resulting state. */
  send(_event: E, _context?: unknown): S {
    throw new Error("StateMachine.send: not implemented (Milestone 4)");
  }

  onEnter(_state: S, _handler: () => void): void {
    throw new Error("StateMachine.onEnter: not implemented (Milestone 4)");
  }

  onExit(_state: S, _handler: () => void): void {
    throw new Error("StateMachine.onExit: not implemented (Milestone 4)");
  }
}
