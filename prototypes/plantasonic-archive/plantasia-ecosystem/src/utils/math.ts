/**
 * Plantasia — Math & numeric utilities.
 *
 * Pure, framework-agnostic helpers used across audio, visualization, and UI.
 * Centralizing these avoids magic numbers and duplicated formulas.
 */

/** Constrain `value` to the inclusive range [min, max]. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Linear interpolation between `a` and `b` by factor `t` (0..1). */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Re-map a value from one numeric range to another. */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number {
  if (inMax - inMin === 0) return outMin;
  return outMin + ((value - inMin) * (outMax - outMin)) / (inMax - inMin);
}

/** Normalize a value within [min, max] to the range 0..1. */
export function normalize(value: number, min: number, max: number): number {
  return mapRange(value, min, max, 0, 1);
}

/** Smoothstep easing (Hermite) for organic interpolation. */
export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

/** Wrap a value into the range [0, max). */
export function wrap(value: number, max: number): number {
  return ((value % max) + max) % max;
}

/** Two PI — a frequent constant in oscillator and growth math. */
export const TAU = Math.PI * 2;

/** Convert degrees to radians. */
export function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/** Round to a fixed number of decimal places. */
export function roundTo(value: number, decimals = 2): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}
