/**
 * Plantasia — Universal MIDI controller profile.
 *
 * Works with any class-compliant controller: maps the first 16 CCs and common
 * performance controls to genes, macros, and globals. CC 64 (sustain) is handled
 * by the engine directly — not duplicated here.
 */
import type { MidiControllerProfile, MidiProfileBindingSpec } from './types';

/** Standard CC → target map (channel 0 — most USB controllers). */
const UNIVERSAL_CC_MAP: ReadonlyArray<[number, MidiProfileBindingSpec['targetId']]> = [
  [1, 'gene.wind'], // Mod wheel
  [2, 'gene.life'], // Breath
  [3, 'gene.energy'],
  [4, 'gene.harmony'],
  [5, 'gene.growth'],
  [6, 'gene.soil'],
  [7, 'masterVolume'],
  [8, 'gene.water'],
  [9, 'macro.bloom'],
  [10, 'macro.ambientDrift'],
  [11, 'gene.sunlight'], // Expression
  [12, 'macro.evolution'],
  [13, 'macro.storm'],
  [14, 'macro.morningDew'],
  [15, 'tempo'],
  [16, 'macro.roots'],
];

export const UNIVERSAL_PROFILE_ID = 'universal' as const;

export function createUniversalBindingSpecs(): MidiProfileBindingSpec[] {
  return UNIVERSAL_CC_MAP.map(([controller, targetId]) => ({
    targetId,
    type: 'cc',
    channel: 0,
    controller,
  }));
}

export const universalMidiProfile: MidiControllerProfile = {
  id: UNIVERSAL_PROFILE_ID,
  label: 'Universal Controller',
  description:
    'Generic CC mapping for any MIDI controller — knobs and faders on CC 1–16 control genes, macros, and master volume.',
  createBindingSpecs: createUniversalBindingSpecs,
};
