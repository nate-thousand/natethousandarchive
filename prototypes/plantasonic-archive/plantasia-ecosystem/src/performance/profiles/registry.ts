/**
 * Plantasia — MIDI profile registry.
 *
 * Resolves built-in profiles, detects hardware, and applies bindings to MidiLearn.
 */
import { createBinding } from '../mappings';
import type { MidiBinding } from '../types';
import type { MidiLearn } from '../learn/MidiLearn';
import { akaiMpkMiniProfile, isMpkMiniDevice, MPK_MINI_PROFILE_ID } from './akaiMpkMini';
import type { BuiltinMidiProfileId, MidiControllerProfile, MidiProfileBindingSpec, MidiProfileId } from './types';
import { universalMidiProfile, UNIVERSAL_PROFILE_ID } from './universal';

export { isMpkMiniDevice, MPK_MINI_PROFILE_ID, UNIVERSAL_PROFILE_ID };

const PROFILES: readonly MidiControllerProfile[] = [universalMidiProfile, akaiMpkMiniProfile];

const profileMap = new Map<BuiltinMidiProfileId, MidiControllerProfile>(
  PROFILES.map((p) => [p.id, p]),
);

export function listMidiProfiles(): readonly MidiControllerProfile[] {
  return PROFILES;
}

export function getMidiProfile(id: BuiltinMidiProfileId): MidiControllerProfile | undefined {
  return profileMap.get(id);
}

/** Detect the best built-in profile for a connected device, if any. */
export function detectMidiProfileForDevice(name: string, manufacturer = ''): BuiltinMidiProfileId | null {
  for (const profile of PROFILES) {
    if (profile.matchDevice?.(name, manufacturer)) return profile.id;
  }
  return null;
}

export function specsToBindings(specs: MidiProfileBindingSpec[]): MidiBinding[] {
  return specs.map((spec) =>
    createBinding(spec.targetId, spec.type, spec.channel, spec.controller),
  );
}

export function buildProfileBindings(profileId: BuiltinMidiProfileId): MidiBinding[] {
  const profile = getMidiProfile(profileId);
  if (!profile) return [];
  return specsToBindings(profile.createBindingSpecs());
}

function bindingKey(b: Pick<MidiBinding, 'type' | 'channel' | 'controller'>): string {
  return `${b.type}:${b.channel}:${b.controller}`;
}

/** Merge incoming bindings without overwriting existing control assignments. */
export function mergeBindings(existing: MidiBinding[], incoming: MidiBinding[]): MidiBinding[] {
  const keys = new Set(existing.map(bindingKey));
  const merged = [...existing];
  for (const binding of incoming) {
    const key = bindingKey(binding);
    if (!keys.has(key)) {
      merged.push(binding);
      keys.add(key);
    }
  }
  return merged;
}

export type ApplyProfileMode = 'replace' | 'merge';

/** Apply a built-in profile to the active MidiLearn store. */
export function applyMidiProfile(
  learn: MidiLearn,
  profileId: BuiltinMidiProfileId,
  mode: ApplyProfileMode = 'replace',
): MidiBinding[] {
  const incoming = buildProfileBindings(profileId);
  if (mode === 'replace') {
    learn.importStore({ bindings: incoming, version: 1 });
    return incoming;
  }
  const merged = mergeBindings(learn.getBindings(), incoming);
  learn.importStore({ bindings: merged, version: 1 });
  return merged;
}

/** Apply profile only when the user has no custom mappings yet. */
export function applyMidiProfileIfEmpty(learn: MidiLearn, profileId: BuiltinMidiProfileId): boolean {
  if (learn.getBindings().length > 0) return false;
  applyMidiProfile(learn, profileId, 'replace');
  return true;
}

export function isBuiltinProfileId(id: string): id is BuiltinMidiProfileId {
  return id === UNIVERSAL_PROFILE_ID || id === MPK_MINI_PROFILE_ID;
}

export function resolveActiveProfileLabel(profileId: MidiProfileId): string {
  if (profileId === 'custom') return 'Custom (MIDI Learn)';
  return getMidiProfile(profileId)?.label ?? profileId;
}

export { createMpkMiniBindingSpecs } from './akaiMpkMini';
export { createUniversalBindingSpecs } from './universal';
