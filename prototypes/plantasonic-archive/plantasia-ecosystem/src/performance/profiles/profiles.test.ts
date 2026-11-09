/**
 * Plantasia — MIDI controller profile tests.
 */
import { describe, expect, it } from 'vitest';
import { MidiLearn } from '@performance/learn/MidiLearn';
import {
  applyMidiProfile,
  buildProfileBindings,
  detectMidiProfileForDevice,
  mergeBindings,
  UNIVERSAL_PROFILE_ID,
  MPK_MINI_PROFILE_ID,
} from '@performance/profiles/registry';
import { createBinding } from '@performance/mappings';
import { isMpkMiniDevice } from '@performance/profiles/akaiMpkMini';

describe('detectMidiProfileForDevice', () => {
  it('recognizes Akai MPK Mini by name', () => {
    expect(isMpkMiniDevice('MPK mini Mk3')).toBe(true);
    expect(detectMidiProfileForDevice('MPK mini Mk3', 'Akai')).toBe(MPK_MINI_PROFILE_ID);
  });

  it('returns null for unknown controllers', () => {
    expect(detectMidiProfileForDevice('Launchkey Mini', 'Novation')).toBeNull();
  });
});

describe('universal profile', () => {
  it('maps CC 1–16 to controllable targets', () => {
    const bindings = buildProfileBindings(UNIVERSAL_PROFILE_ID);
    expect(bindings.length).toBe(16);
    expect(bindings.some((b) => b.controller === 1 && b.targetId === 'gene.wind')).toBe(true);
    expect(bindings.some((b) => b.controller === 7 && b.targetId === 'masterVolume')).toBe(true);
  });
});

describe('akai mpk mini profile', () => {
  it('includes knobs and pad action bindings', () => {
    const bindings = buildProfileBindings(MPK_MINI_PROFILE_ID);
    expect(bindings.filter((b) => b.type === 'cc').length).toBe(8);
    expect(bindings.filter((b) => b.type === 'note').length).toBe(8);
    expect(bindings.some((b) => b.targetId === 'action.bloom')).toBe(true);
  });
});

describe('applyMidiProfile', () => {
  it('replaces existing bindings', () => {
    const learn = new MidiLearn();
    learn.resetAll();
    learn.importStore({
      version: 1,
      bindings: [createBinding('macro.bloom', 'cc', 0, 99)],
    });
    applyMidiProfile(learn, UNIVERSAL_PROFILE_ID, 'replace');
    expect(learn.getBindings().length).toBe(16);
    expect(learn.getBindings().some((b) => b.controller === 99)).toBe(false);
  });

  it('merges without overwriting existing controls', () => {
    const learn = new MidiLearn();
    learn.resetAll();
    const existing = createBinding('macro.bloom', 'cc', 0, 1);
    learn.importStore({ version: 1, bindings: [existing] });
    applyMidiProfile(learn, UNIVERSAL_PROFILE_ID, 'merge');
    const cc1 = learn.getBindings().filter((b) => b.type === 'cc' && b.controller === 1);
    expect(cc1).toHaveLength(1);
    expect(cc1[0]?.targetId).toBe('macro.bloom');
    expect(learn.getBindings().length).toBe(16);
  });
});

describe('mergeBindings', () => {
  it('skips conflicting control assignments', () => {
    const a = createBinding('gene.energy', 'cc', 0, 1);
    const b = createBinding('gene.water', 'cc', 0, 1);
    const c = createBinding('gene.wind', 'cc', 0, 2);
    const merged = mergeBindings([a], [b, c]);
    expect(merged).toHaveLength(2);
    expect(merged[0]?.targetId).toBe('gene.energy');
    expect(merged[1]?.targetId).toBe('gene.wind');
  });
});
