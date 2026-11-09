/**
 * Plantasia — Particle system.
 *
 * Lightweight, pooled 2D particles for spores and ambient floating motes. The
 * system is unit-space agnostic: it stores positions in canvas pixels and is
 * driven by the renderer each frame. Noise energy from the audio analyser
 * increases the emission rate so the organism visibly "sheds" with sound.
 */
import { randomRange } from '@utils/random';

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  alive: boolean;
}

const MAX_PARTICLES = 240;

export class ParticleSystem {
  private readonly particles: Particle[] = [];

  constructor() {
    for (let i = 0; i < MAX_PARTICLES; i += 1) {
      this.particles.push({ x: 0, y: 0, vx: 0, vy: 0, life: 0, maxLife: 1, size: 1, alive: false });
    }
  }

  /** Emit a particle from a point with an upward, wind-influenced drift. */
  emit(x: number, y: number, wind: number): void {
    const particle = this.particles.find((p) => !p.alive);
    if (!particle) return;
    particle.x = x;
    particle.y = y;
    particle.vx = randomRange(-0.3, 0.3) + wind * 0.6;
    particle.vy = randomRange(-0.9, -0.3);
    particle.maxLife = randomRange(1.6, 3.4);
    particle.life = particle.maxLife;
    particle.size = randomRange(0.8, 2.4);
    particle.alive = true;
  }

  /** Advance all live particles by `dt` seconds. */
  update(dt: number, wind: number): void {
    for (const p of this.particles) {
      if (!p.alive) continue;
      p.life -= dt;
      if (p.life <= 0) {
        p.alive = false;
        continue;
      }
      p.x += (p.vx + Math.sin(p.life * 2) * 0.1 + wind * 0.2) * dt * 60;
      p.y += p.vy * dt * 60;
      p.vy *= 0.992;
    }
  }

  /** Iterate live particles for rendering. */
  forEachAlive(callback: (p: Particle, alpha: number) => void): void {
    for (const p of this.particles) {
      if (!p.alive) continue;
      callback(p, Math.max(0, p.life / p.maxLife));
    }
  }
}
