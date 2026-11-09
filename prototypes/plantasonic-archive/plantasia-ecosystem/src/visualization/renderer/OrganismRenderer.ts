/**
 * Plantasia — OrganismRenderer.
 *
 * Paints and animates a generated organism on a 2D canvas. Responsibilities:
 *   - DPR-aware sizing and a stable unit->pixel transform.
 *   - A continuous rAF loop so the organism is NEVER static (it breathes/sways
 *     even in silence).
 *   - Audio reactivity: bass thickens & stirs roots, mid sways branches, treble
 *     pulses leaves, noise sheds spores, overall level drives bloom glow.
 *   - Respect for reduced-motion (collapses animation to a calm steady state).
 *
 * The renderer is framework-agnostic; a React hook wires it to a <canvas>.
 */
import { clamp, lerp, TAU } from '@utils/math';
import type { AudioBands } from '@audio/types';
import type { PerformanceState } from '@performance/types';
import type { MotionProfile } from '@species/types';
import { ParticleSystem } from '@visualization/particles/ParticleSystem';
import type { OrganismStructure, Segment } from '@visualization/organism/types';
import type { RendererPalette } from './palette';

const ZERO_BANDS: AudioBands = { bass: 0, mid: 0, treble: 0, noise: 0, level: 0 };
const ZERO_PERF: PerformanceState = {
  velocity: 0,
  pressure: 0,
  polyPressure: {},
  sustain: false,
  activeNotes: [],
  macroValues: {},
  visualIntensity: 0,
  bloom: 0,
  motion: 0,
  particleDensity: 0,
  octave: 4,
  scaleLock: false,
  activeKeyboardKeys: [],
};

export interface RendererOptions {
  /** Live audio bands provider, polled each frame. */
  bandsProvider?: () => AudioBands;
  /** Live performance state (velocity, aftertouch, macros). */
  performanceProvider?: () => PerformanceState;
  /** When true, animation collapses to a calm steady pose. */
  reducedMotion?: boolean;
}

interface Transform {
  originX: number;
  originY: number;
  scale: number;
}

export class OrganismRenderer {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D | null;
  private readonly particles = new ParticleSystem();

  private structure: OrganismStructure | null = null;
  private palette: RendererPalette | null = null;
  private motion: MotionProfile = { sway: 0.4, tempo: 0.8, drift: 0.4 };

  private bandsProvider: () => AudioBands;
  private performanceProvider: () => PerformanceState;
  private reducedMotion: boolean;

  private rafId = 0;
  private running = false;
  private lastTime = 0;
  private width = 0;
  private height = 0;
  private dpr = 1;

  constructor(canvas: HTMLCanvasElement, options: RendererOptions = {}) {
    this.canvas = canvas;
    const context = canvas.getContext('2d');
    if (!context) {
      console.error('[OrganismRenderer] 2D canvas context unavailable — visualization disabled');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.ctx = null as any;
    } else {
      this.ctx = context;
    }
    this.bandsProvider = options.bandsProvider ?? (() => ZERO_BANDS);
    this.performanceProvider = options.performanceProvider ?? (() => ZERO_PERF);
    this.reducedMotion = options.reducedMotion ?? false;
    this.resize();
  }

  setOrganism(structure: OrganismStructure, palette: RendererPalette, motion: MotionProfile): void {
    this.structure = structure;
    this.palette = palette;
    this.motion = motion;
  }

  setReducedMotion(value: boolean): void {
    this.reducedMotion = value;
  }

  setBandsProvider(provider: () => AudioBands): void {
    this.bandsProvider = provider;
  }

  setPerformanceProvider(provider: () => PerformanceState): void {
    this.performanceProvider = provider;
  }

  /** Match the backing store to the element size and device pixel ratio. */
  resize(): void {
    if (!this.ctx) return;
    const rect = this.canvas.getBoundingClientRect();
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = Math.max(1, rect.width);
    this.height = Math.max(1, rect.height);
    this.canvas.width = Math.floor(this.width * this.dpr);
    this.canvas.height = Math.floor(this.height * this.dpr);
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.lastTime = performance.now();
    this.rafId = requestAnimationFrame(this.loop);
  }

  stop(): void {
    this.running = false;
    cancelAnimationFrame(this.rafId);
  }

  dispose(): void {
    this.stop();
  }

  private loop = (now: number): void => {
    if (!this.running) return;
    const dt = clamp((now - this.lastTime) / 1000, 0, 0.05);
    this.lastTime = now;
    this.render(now / 1000, dt);
    this.rafId = requestAnimationFrame(this.loop);
  };

  private transform(): Transform {
    return {
      originX: this.width / 2,
      originY: this.height * 0.72,
      scale: Math.min(this.width, this.height) * 0.34,
    };
  }

  /** Horizontal sway offset for a point at unit-height `unitY`. */
  private sway(unitY: number, time: number, phase: number, mid: number): number {
    if (this.reducedMotion) return 0;
    const canopy = Math.max(0, -unitY); // canopy points have negative unitY
    const amplitude = this.motion.sway * (0.03 + mid * 0.05);
    return Math.sin(time * this.motion.tempo + phase + canopy * 2) * amplitude * canopy;
  }

  private render(time: number, dt: number): void {
    if (!this.ctx) return;
    const { ctx } = this;
    ctx.clearRect(0, 0, this.width, this.height);
    if (!this.structure || !this.palette) return;

    const bands = this.bandsProvider();
    const perf = this.performanceProvider();
    const t = this.transform();
    const perfBoost = 1 + perf.visualIntensity * 0.15 + perf.pressure * 0.1;
    const breathe = this.reducedMotion
      ? 1
      : (1 + Math.sin(time * 0.6) * 0.02 + bands.level * 0.05) * perfBoost;

    this.renderConnections(time, t, bands);
    this.renderSegments(time, t, bands, breathe);
    this.renderDecorations(time, t, bands, breathe, perf);
    this.updateAndRenderParticles(dt, time, t, bands, perf);
  }

  /** Faint web of connections between nearby nodes (mycelial network feel). */
  private renderConnections(time: number, t: Transform, bands: AudioBands): void {
    const ctx = this.ctx;
    if (!ctx) return;
    const { structure, palette } = this;
    if (!structure || !palette) return;
    ctx.save();
    ctx.globalAlpha = 0.08 + bands.mid * 0.12;
    ctx.strokeStyle = palette.signal;
    ctx.lineWidth = 0.5;
    const nodes = structure.decorations.filter((d) => d.kind === 'node');
    for (let i = 0; i < nodes.length; i += 3) {
      const a = nodes[i];
      const b = nodes[(i + 2) % nodes.length];
      if (!a || !b) continue;
      const ax = t.originX + (a.x + this.sway(a.y, time, a.phase, bands.mid)) * t.scale;
      const ay = t.originY + a.y * t.scale;
      const bx = t.originX + (b.x + this.sway(b.y, time, b.phase, bands.mid)) * t.scale;
      const by = t.originY + b.y * t.scale;
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(bx, by);
      ctx.stroke();
    }
    ctx.restore();
  }

  private renderSegments(time: number, t: Transform, bands: AudioBands, breathe: number): void {
    const ctx = this.ctx;
    if (!ctx) return;
    const { structure, palette } = this;
    if (!structure || !palette) return;
    ctx.save();
    ctx.lineCap = 'round';
    for (const seg of structure.segments) {
      this.drawSegment(seg, time, t, bands, breathe);
    }
    ctx.restore();
  }

  private drawSegment(seg: Segment, time: number, t: Transform, bands: AudioBands, breathe: number): void {
    const ctx = this.ctx;
    const { palette } = this;
    if (!ctx || !palette) return;

    // Roots respond to bass, branches to mid.
    const energy = seg.kind === 'root' ? bands.bass : bands.mid;
    const sway1 = this.sway(seg.y1, time, seg.phase, energy);
    const sway2 = this.sway(seg.y2, time, seg.phase, energy);

    const x1 = t.originX + (seg.x1 + sway1) * t.scale;
    const y1 = t.originY + seg.y1 * t.scale * breathe;
    const x2 = t.originX + (seg.x2 + sway2) * t.scale;
    const y2 = t.originY + seg.y2 * t.scale * breathe;

    const midX = (x1 + x2) / 2 + seg.bend * t.scale * 0.5;
    const midY = (y1 + y2) / 2;

    ctx.strokeStyle = seg.kind === 'root' ? palette.root : palette.branch;
    ctx.lineWidth = Math.max(0.4, seg.thickness * t.scale * (1 + energy * 0.6));
    ctx.globalAlpha = seg.kind === 'root' ? 0.55 : 0.9;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo(midX, midY, x2, y2);
    ctx.stroke();
  }

  private renderDecorations(
    time: number,
    t: Transform,
    bands: AudioBands,
    breathe: number,
    perf: PerformanceState,
  ): void {
    const ctx = this.ctx;
    if (!ctx) return;
    const { structure, palette } = this;
    if (!structure || !palette) return;
    ctx.save();
    for (const dec of structure.decorations) {
      const swayX = this.sway(dec.y, time, dec.phase, bands.mid);
      const x = t.originX + (dec.x + swayX) * t.scale;
      const y = t.originY + dec.y * t.scale * breathe;

      if (dec.kind === 'node') {
        ctx.globalAlpha = 0.5 + bands.level * 0.4;
        ctx.fillStyle = palette.node;
        ctx.beginPath();
        ctx.arc(x, y, Math.max(0.6, dec.size * t.scale), 0, TAU);
        ctx.fill();
        continue;
      }

      const isBloom = dec.kind === 'bloom';
      const pulse = this.reducedMotion
        ? 1
        : 1 + Math.sin(time * 2 + dec.phase) * 0.15 + bands.treble * 0.5 + perf.bloom * 0.4;
      const radius = Math.max(1, dec.size * t.scale * pulse);
      const color = isBloom ? palette.bloom : palette.leaf;

      if (isBloom) {
        const glow = ctx.createRadialGradient(x, y, 0, x, y, radius * 2.4);
        glow.addColorStop(0, color);
        glow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.globalAlpha = 0.25 + bands.level * 0.4 + perf.bloom * 0.3;
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, radius * 2.4, 0, TAU);
        ctx.fill();
      }

      ctx.globalAlpha = isBloom ? 0.95 : lerp(0.5, 0.85, bands.treble);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, TAU);
      ctx.fill();
    }
    ctx.restore();
  }

  private updateAndRenderParticles(
    dt: number,
    time: number,
    t: Transform,
    bands: AudioBands,
    perf: PerformanceState,
  ): void {
    const ctx = this.ctx;
    if (!ctx) return;
    const { structure, palette } = this;
    if (!structure || !palette) return;

    if (!this.reducedMotion) {
      for (const emitter of structure.emitters) {
        const chance =
          (this.motion.drift * 0.04 + bands.noise * 0.5 + perf.particleDensity * 0.4) * emitter.rate;
        if (Math.random() < chance) {
          const x = t.originX + emitter.x * t.scale;
          const y = t.originY + emitter.y * t.scale;
          this.particles.emit(x, y, bands.mid + Math.sin(time) * 0.1);
        }
      }
    }
    this.particles.update(dt, this.motion.drift);

    ctx.save();
    ctx.fillStyle = palette.spore;
    this.particles.forEachAlive((p, alpha) => {
      ctx.globalAlpha = alpha * 0.7;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, TAU);
      ctx.fill();
    });
    ctx.restore();
  }
}
