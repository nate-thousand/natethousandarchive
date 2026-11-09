/**
 * Plantasia — Akai MPK Mini default profile.
 *
 * Default CC/note mappings for the Akai MPK Mini MK2/MK3. All bindings can be
 * overridden through MIDI Learn. CC numbers follow the MPK Mini MK3 layout.
 */
import { createBinding } from '../mappings';
import type { MidiBinding } from '../types';
import type { MidiControllerProfile, MidiProfileBindingSpec } from './types';

/** MPK Mini knob CC numbers (typical MK2/MK3 layout). */
export const MPK_MINI_KNOB_CCS = [1, 2, 3, 4, 5, 6, 7, 8] as const;

/** MPK Mini pad note numbers (Bank A, channel 10). */
export const MPK_MINI_PAD_NOTES = [48, 49, 50, 51, 52, 53, 54, 55] as const;

const KNOB_TARGETS: MidiProfileBindingSpec['targetId'][] = [
  'gene.energy',
  'gene.growth',
  'gene.soil',
  'gene.harmony',
  'gene.wind',
  'macro.ambientDrift',
  'gene.water',
  'macro.evolution',
];

/** Knob labels matching the spec (Density=harmony proxy, Texture=water, Space=bloom, Resonance=water). */
export const MPK_MINI_KNOB_LABELS = [
  'Energy',
  'Growth',
  'Density',
  'Harmony',
  'Texture',
  'Space',
  'Resonance',
  'Evolution',
] as const;

const PAD_ACTIONS: MidiProfileBindingSpec['targetId'][] = [
  'action.seed',
  'action.grow',
  'action.bloom',
  'action.spores',
  'action.connect',
  'action.prune',
  'action.nourish',
  'action.mutate',
];

export const MPK_MINI_PROFILE_ID = 'akai-mpk-mini' as const;

export function isMpkMiniDevice(name: string): boolean {
  return /mpk\s*mini/i.test(name);
}

export function createMpkMiniBindingSpecs(): MidiProfileBindingSpec[] {
  const knobs = MPK_MINI_KNOB_CCS.map((cc, i) => ({
    targetId: KNOB_TARGETS[i] ?? ('gene.energy' as const),
    type: 'cc' as const,
    channel: 0,
    controller: cc,
  }));
  const pads = MPK_MINI_PAD_NOTES.map((note, i) => ({
    targetId: PAD_ACTIONS[i] ?? ('action.seed' as const),
    type: 'note' as const,
    channel: 9,
    controller: note,
  }));
  return [...knobs, ...pads];
}

export const akaiMpkMiniProfile: MidiControllerProfile = {
  id: MPK_MINI_PROFILE_ID,
  label: 'Akai MPK Mini',
  description:
    '8 knobs (CC 1–8) map to core botanical genes and macros; 8 pads trigger cultivation actions on channel 10.',
  createBindingSpecs: createMpkMiniBindingSpecs,
  matchDevice: (name) => isMpkMiniDevice(name),
};

/** Build Akai MPK Mini bindings with fresh IDs. */
export function createMpkMiniBindings(): MidiBinding[] {
  return createMpkMiniBindingSpecs().map((spec) =>
    createBinding(spec.targetId, spec.type, spec.channel, spec.controller),
  );
}
