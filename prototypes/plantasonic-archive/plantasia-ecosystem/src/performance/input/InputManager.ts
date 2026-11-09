/**
 * Plantasia — Input Manager.
 *
 * Owns all input sources and coordinates enable/disable state. Input sources
 * publish events to the shared PerformanceEngine — never to audio directly.
 */
import type { BuiltinMidiProfileId } from '../profiles/types';
import type { PerformanceEngine } from '../engine/PerformanceEngine';
import { KeyboardInputSource } from './KeyboardInputSource';
import { MidiInputSource } from './MidiInputSource';

export class InputManager {
  readonly keyboard: KeyboardInputSource;
  readonly midi: MidiInputSource;

  constructor(engine: PerformanceEngine) {
    this.keyboard = new KeyboardInputSource(engine);
    this.midi = new MidiInputSource(engine);
  }

  setKeyboardEnabled(enabled: boolean): void {
    this.keyboard.setEnabled(enabled);
  }

  async setMidiEnabled(enabled: boolean): Promise<boolean> {
    if (enabled) {
      return this.midi.enable();
    }
    this.midi.disable();
    return true;
  }

  applyMidiProfile(profileId: BuiltinMidiProfileId): void {
    this.midi.applyProfile(profileId);
  }

  setAutoApplyDeviceProfile(enabled: boolean): void {
    this.midi.setAutoApplyProfile(enabled);
  }

  attach(): void {
    this.keyboard.attach();
  }

  detach(): void {
    this.keyboard.detach();
    this.midi.disable();
  }
}
