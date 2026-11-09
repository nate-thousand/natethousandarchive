/**
 * Plantasia — Velocity curves.
 *
 * Maps MIDI velocity (0–127) to normalized values (0–1) using selectable curves.
 * Used by the PerformanceEngine for amplitude, brightness, attack, and visuals.
 */
import { clamp } from '@utils/math';
import type { VelocityCurve } from './types';

/** Convert MIDI velocity to 0..1 using the selected curve. */
export function applyVelocityCurve(velocity: number, curve: VelocityCurve = 'linear'): number {
  const v = clamp(velocity / 127, 0, 1);
  switch (curve) {
    case 'soft':
      return v * v;
    case 'hard':
      return Math.sqrt(v);
    case 'exponential':
      return v === 0 ? 0 : Math.pow(v, 1.8);
    case 'linear':
    default:
      return v;
  }
}

/** Derive visual modulation from velocity (bloom, particles, motion). */
export function velocityToVisual(velocity: number, curve: VelocityCurve = 'linear'): {
  bloom: number;
  motion: number;
  particleDensity: number;
  intensity: number;
} {
  const v = applyVelocityCurve(velocity, curve);
  return {
    bloom: v * 0.85,
    motion: v * 0.6,
    particleDensity: v * 0.9,
    intensity: v,
  };
}

/** Derive audio modulation offsets from velocity. */
export function velocityToModulation(velocity: number, curve: VelocityCurve = 'linear'): {
  volumeScale: number;
  brightness: number;
  attackScale: number;
} {
  const v = applyVelocityCurve(velocity, curve);
  return {
    volumeScale: 0.35 + v * 0.65,
    brightness: v * 0.35,
    attackScale: 0.5 + v * 0.5,
  };
}
