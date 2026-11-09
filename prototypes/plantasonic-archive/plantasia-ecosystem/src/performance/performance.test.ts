/**
 * Plantasia — Performance layer unit tests.
 */
import { describe, expect, it } from 'vitest';
import { applyVelocityCurve, velocityToVisual } from '@performance/velocity';
import { noteToMidi, quantizeToScale } from '@performance/scales';
import { MidiLearn } from '@performance/learn/MidiLearn';
import { createBinding } from '@performance/mappings';

describe('applyVelocityCurve', () => {
  it('maps full velocity to 1 with linear curve', () => {
    expect(applyVelocityCurve(127, 'linear')).toBeCloseTo(1, 2);
  });

  it('softens low velocities with soft curve', () => {
    expect(applyVelocityCurve(64, 'soft')).toBeLessThan(applyVelocityCurve(64, 'linear'));
  });
});

describe('velocityToVisual', () => {
  it('increases bloom with higher velocity', () => {
    const low = velocityToVisual(40, 'linear');
    const high = velocityToVisual(120, 'linear');
    expect(high.bloom).toBeGreaterThan(low.bloom);
  });
});

describe('quantizeToScale', () => {
  it('snaps notes to pentatonic scale degrees', () => {
    const snapped = quantizeToScale(62, 'pentatonicMajor');
    expect([60, 62, 64, 67, 69, 72]).toContain(snapped);
  });
});

describe('noteToMidi', () => {
  it('maps octave 4 semitone 0 to middle C', () => {
    expect(noteToMidi(4, 0)).toBe(60);
  });
});

describe('MidiLearn', () => {
  it('creates a binding when learning a CC message', () => {
    const learn = new MidiLearn();
    learn.resetAll();
    learn.startLearn('gene.energy');
    const binding = learn.handleLearnEvent({
      type: 'cc',
      source: 'midi',
      channel: 0,
      cc: 1,
      value: 0.5,
      timestamp: Date.now(),
    });
    expect(binding).not.toBeNull();
    expect(binding?.targetId).toBe('gene.energy');
    expect(learn.getBindings()).toHaveLength(1);
  });

  it('resolves bindings by control', () => {
    const learn = new MidiLearn();
    learn.resetAll();
    learn.importStore({
      version: 1,
      bindings: [createBinding('macro.bloom', 'cc', 0, 7)],
    });
    const match = learn.resolveBinding({
      type: 'cc',
      source: 'midi',
      channel: 0,
      cc: 7,
      value: 0.8,
      timestamp: Date.now(),
    });
    expect(match?.targetId).toBe('macro.bloom');
  });
});
