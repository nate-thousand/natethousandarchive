/**
 * Plantasia — Performance EventBus.
 *
 * Lightweight pub/sub for performance events and state changes. Input sources
 * publish events; the PerformanceEngine subscribes and processes them.
 */
import type { PerformanceEvent, PerformanceState } from './types';

type EventHandler = (event: PerformanceEvent) => void;
type StateHandler = (state: PerformanceState) => void;

export class EventBus {
  private readonly eventHandlers = new Set<EventHandler>();
  private readonly stateHandlers = new Set<StateHandler>();

  subscribe(handler: EventHandler): () => void {
    this.eventHandlers.add(handler);
    return () => this.eventHandlers.delete(handler);
  }

  onStateChange(handler: StateHandler): () => void {
    this.stateHandlers.add(handler);
    return () => this.stateHandlers.delete(handler);
  }

  publish(event: PerformanceEvent): void {
    this.eventHandlers.forEach((handler) => handler(event));
  }

  emitState(state: PerformanceState): void {
    this.stateHandlers.forEach((handler) => handler(state));
  }
}
