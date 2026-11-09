/**
 * Plantasia — Modulation engine.
 *
 * Combines velocity, aftertouch, and macro offsets into runtime audio modulation
 * that sits on top of (not replacing) the gene-based synthesis params.
 */
import { clamp, lerp } from '@utils/math';
import type { PerformanceModulation, PerformanceState } from '../types';
import { NEUTRAL_MODULATION } from '../types';
import { velocityToModulation } from '../velocity';
import type { VelocityCurve } from '../types';

export class ModulationEngine {
  private curve: VelocityCurve = 'linear';

  setVelocityCurve(curve: VelocityCurve): void {
    this.curve = curve;
  }

  /** Compute combined modulation from performance state. */
  compute(state: PerformanceState): PerformanceModulation {
    const vel = velocityToModulation(state.velocity * 127, this.curve);
    const pressure = state.pressure;

    return {
      volumeScale: vel.volumeScale * (1 + pressure * 0.15),
      brightness: clamp(vel.brightness + pressure * 0.25, 0, 1),
      vibratoDepth: clamp(pressure * 0.4, 0, 1),
      attackScale: vel.attackScale,
      resonance: clamp(pressure * 0.3, 0, 1),
    };
  }

  /** Map aftertouch to expressive visual parameters. */
  computeVisual(state: PerformanceState): { bloom: number; motion: number; particleDensity: number } {
    const pressure = state.pressure;
    const velBloom = state.bloom;
    return {
      bloom: clamp(lerp(velBloom, 1, pressure * 0.5), 0, 1),
      motion: clamp(lerp(state.motion, 1, pressure * 0.4), 0, 1),
      particleDensity: clamp(lerp(state.particleDensity, 1, pressure * 0.6), 0, 1),
    };
  }

  reset(): PerformanceModulation {
    return { ...NEUTRAL_MODULATION };
  }
}
