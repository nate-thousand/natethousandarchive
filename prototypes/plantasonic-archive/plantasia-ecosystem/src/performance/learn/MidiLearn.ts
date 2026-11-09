/**
 * Plantasia — MIDI Learn manager.
 *
 * Handles the learn workflow: select target → enable learn → capture next
 * MIDI message → bind → persist.
 */
import type { MidiBinding, ParameterTargetId, PerformanceEvent } from '../types';
import {
  createBinding,
  findBindingForControl,
  loadMappings,
  saveMappings,
  type MappingStore,
} from '../mappings';

export class MidiLearn {
  private store: MappingStore;
  private learnTarget: ParameterTargetId | null = null;
  private onChange: ((store: MappingStore) => void) | null = null;

  constructor() {
    this.store = loadMappings();
  }

  setOnChange(handler: (store: MappingStore) => void): void {
    this.onChange = handler;
  }

  getStore(): MappingStore {
    return this.store;
  }

  getBindings(): MidiBinding[] {
    return this.store.bindings;
  }

  /** Begin learning a binding for the given target. */
  startLearn(targetId: ParameterTargetId): void {
    this.learnTarget = targetId;
  }

  cancelLearn(): void {
    this.learnTarget = null;
  }

  isLearning(): boolean {
    return this.learnTarget !== null;
  }

  getLearnTarget(): ParameterTargetId | null {
    return this.learnTarget;
  }

  /**
   * Process an incoming performance event during learn mode.
   * Returns the created binding if learn succeeded.
   */
  handleLearnEvent(event: PerformanceEvent): MidiBinding | null {
    if (!this.learnTarget) return null;

    let binding: MidiBinding | null = null;

    if (event.type === 'cc' && event.cc !== undefined) {
      binding = createBinding(this.learnTarget, 'cc', event.channel ?? 0, event.cc);
    } else if (event.type === 'noteOn' && event.note !== undefined) {
      binding = createBinding(this.learnTarget, 'note', event.channel ?? 0, event.note);
    } else if (event.type === 'pitchBend') {
      binding = createBinding(this.learnTarget, 'pitchBend', event.channel ?? 0, 0);
    } else if (event.type === 'channelPressure') {
      binding = createBinding(this.learnTarget, 'channelPressure', event.channel ?? 0, 0);
    } else if (event.type === 'polyAftertouch' && event.note !== undefined) {
      binding = createBinding(this.learnTarget, 'polyAftertouch', event.channel ?? 0, event.note);
    }

    if (binding) {
      this.store.bindings = this.store.bindings.filter((b) => b.targetId !== this.learnTarget);
      this.store.bindings.push(binding);
      this.learnTarget = null;
      this.persist();
      return binding;
    }
    return null;
  }

  deleteBinding(id: string): void {
    this.store.bindings = this.store.bindings.filter((b) => b.id !== id);
    this.persist();
  }

  updateBinding(id: string, patch: Partial<MidiBinding>): void {
    this.store.bindings = this.store.bindings.map((b) => (b.id === id ? { ...b, ...patch } : b));
    this.persist();
  }

  resetAll(): void {
    this.store = { bindings: [], version: 1 };
    this.persist();
  }

  importStore(store: MappingStore): void {
    this.store = store;
    this.persist();
  }

  resolveBinding(event: PerformanceEvent): MidiBinding | undefined {
    if (event.type === 'cc' && event.cc !== undefined) {
      return findBindingForControl(this.store.bindings, 'cc', event.channel ?? 0, event.cc);
    }
    if (event.type === 'noteOn' && event.note !== undefined) {
      return findBindingForControl(this.store.bindings, 'note', event.channel ?? 0, event.note);
    }
    if (event.type === 'pitchBend') {
      return findBindingForControl(this.store.bindings, 'pitchBend', event.channel ?? 0, 0);
    }
    if (event.type === 'channelPressure') {
      return findBindingForControl(this.store.bindings, 'channelPressure', event.channel ?? 0, 0);
    }
    if (event.type === 'polyAftertouch' && event.note !== undefined) {
      return findBindingForControl(this.store.bindings, 'polyAftertouch', event.channel ?? 0, event.note);
    }
    return undefined;
  }

  private persist(): void {
    saveMappings(this.store);
    this.onChange?.(this.store);
  }
}
