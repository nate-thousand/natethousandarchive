/**
 * Plantasia — Keyboard input source.
 *
 * Maps QWERTY keys to piano notes via the PerformanceEngine. Prevents key
 * repeat retriggering and respects enable/disable toggle.
 */
import type { PerformanceEngine } from '../engine/PerformanceEngine';
import type { PerformanceEvent } from '../types';
import { noteToMidi } from '../scales';
import {
  GLOBAL_SHORTCUT_KEYS,
  KEYBOARD_ACTION_KEYS,
  KEYBOARD_NOTE_MAP,
  keyboardKeyVelocity,
} from './keyboardLayout';

export class KeyboardInputSource {
  private enabled = true;
  private readonly pressed = new Set<string>();
  private readonly onWindowKeyDown: (e: KeyboardEvent) => void;
  private readonly onWindowKeyUp: (e: KeyboardEvent) => void;

  constructor(private readonly engine: PerformanceEngine) {
    this.onWindowKeyDown = (e) => this.handleKeyDown(e);
    this.onWindowKeyUp = (e) => this.handleKeyUp(e);
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    if (!enabled) {
      this.releaseAll();
    }
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  attach(): void {
    window.addEventListener('keydown', this.onWindowKeyDown);
    window.addEventListener('keyup', this.onWindowKeyUp);
  }

  detach(): void {
    window.removeEventListener('keydown', this.onWindowKeyDown);
    window.removeEventListener('keyup', this.onWindowKeyUp);
    this.releaseAll();
  }

  private isEditableTarget(target: EventTarget | null): boolean {
    if (!(target instanceof HTMLElement)) return false;
    const tag = target.tagName.toLowerCase();
    return tag === 'input' || tag === 'textarea' || tag === 'select' || target.isContentEditable;
  }

  private handleKeyDown(e: KeyboardEvent): void {
    if (!this.enabled || this.isEditableTarget(e.target)) return;

    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key.toLowerCase();
    if (GLOBAL_SHORTCUT_KEYS.has(key)) return;

    const action = KEYBOARD_ACTION_KEYS[key];
    if (action) {
      e.preventDefault();
      if (action === 'sustain') {
        const on = !this.engine.getState().sustain;
        this.ingest({ type: 'sustain', source: 'keyboard', value: on ? 1 : 0, timestamp: Date.now() });
      } else {
        this.ingest({ type: 'action', source: 'keyboard', action, timestamp: Date.now() });
      }
      return;
    }

    const semitone = KEYBOARD_NOTE_MAP[key];
    if (semitone === undefined) return;
    if (this.pressed.has(key)) return;

    e.preventDefault();
    this.pressed.add(key);
    const octave = this.engine.getState().octave;
    const midi = noteToMidi(octave, semitone);
    const velocity = keyboardKeyVelocity(key);

    this.ingest({
      type: 'noteOn',
      source: 'keyboard',
      note: midi,
      velocity,
      timestamp: Date.now(),
    });
    this.engine.setActiveKeyboardKeys([...this.pressed]);
  }

  private handleKeyUp(e: KeyboardEvent): void {
    if (!this.enabled) return;
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key.toLowerCase();
    const semitone = KEYBOARD_NOTE_MAP[key];
    if (semitone === undefined) return;
    if (!this.pressed.has(key)) return;

    e.preventDefault();
    this.pressed.delete(key);
    const octave = this.engine.getState().octave;
    const midi = noteToMidi(octave, semitone);

    this.ingest({
      type: 'noteOff',
      source: 'keyboard',
      note: midi,
      timestamp: Date.now(),
    });
    this.engine.setActiveKeyboardKeys([...this.pressed]);
  }

  private releaseAll(): void {
    for (const key of this.pressed) {
      const semitone = KEYBOARD_NOTE_MAP[key];
      if (semitone === undefined) continue;
      const octave = this.engine.getState().octave;
      this.ingest({
        type: 'noteOff',
        source: 'keyboard',
        note: noteToMidi(octave, semitone),
        timestamp: Date.now(),
      });
    }
    this.pressed.clear();
    this.engine.setActiveKeyboardKeys([]);
  }

  private ingest(event: PerformanceEvent): void {
    this.engine.ingest(event);
  }
}
