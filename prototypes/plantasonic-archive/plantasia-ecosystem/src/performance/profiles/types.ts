/**
 * Plantasia — MIDI controller profile types.
 *
 * Profiles ship default CC/note mappings for known hardware. Any controller
 * can use the universal profile; device-specific profiles auto-apply on connect.
 */
import type { MidiBinding, ParameterTargetId } from '../types';

/** Built-in profile identifiers (custom = user-edited via MIDI Learn). */
export type BuiltinMidiProfileId = 'universal' | 'akai-mpk-mini';

export type MidiProfileId = BuiltinMidiProfileId | 'custom';

export interface MidiProfileBindingSpec {
  targetId: ParameterTargetId;
  type: MidiBinding['type'];
  channel: number;
  controller: number;
}

export interface MidiControllerProfile {
  id: BuiltinMidiProfileId;
  label: string;
  description: string;
  /** Return binding specs (IDs assigned when applied). */
  createBindingSpecs: () => MidiProfileBindingSpec[];
  /** Optional device auto-detection (name + manufacturer from Web MIDI). */
  matchDevice?: (name: string, manufacturer: string) => boolean;
}
