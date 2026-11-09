import { describe, expect, it } from 'vitest';
import { clamp, lerp, mapRange, normalize, smoothstep, wrap } from './math';

describe('math utils', () => {
  it('clamps values to range', () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-1, 0, 10)).toBe(0);
    expect(clamp(99, 0, 10)).toBe(10);
  });

  it('interpolates linearly', () => {
    expect(lerp(0, 10, 0.5)).toBe(5);
    expect(lerp(0, 10, 0)).toBe(0);
    expect(lerp(0, 10, 1)).toBe(10);
  });

  it('re-maps ranges', () => {
    expect(mapRange(5, 0, 10, 0, 100)).toBe(50);
    expect(mapRange(0, 0, 0, 0, 100)).toBe(0); // guards divide-by-zero
  });

  it('normalizes into 0..1', () => {
    expect(normalize(5, 0, 10)).toBe(0.5);
  });

  it('smoothsteps within bounds', () => {
    expect(smoothstep(0, 1, 0)).toBe(0);
    expect(smoothstep(0, 1, 1)).toBe(1);
    expect(smoothstep(0, 1, 0.5)).toBeCloseTo(0.5);
  });

  it('wraps values', () => {
    expect(wrap(7, 5)).toBe(2);
    expect(wrap(-1, 5)).toBe(4);
  });
});
