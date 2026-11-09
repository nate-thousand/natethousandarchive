/**
 * Plantasia — AudioAnalyser.
 *
 * Wraps a Tone FFT + meter to produce normalized frequency bands the visual
 * layer consumes: bass moves roots, mid moves branches, treble moves leaves,
 * noisiness spawns spores. All values are smoothed and clamped to 0..1 so the
 * renderer never has to know about decibels.
 */
import * as Tone from 'tone';
import { clamp, mapRange } from '@utils/math';
import type { AudioBands } from '@audio/types';

const FFT_SIZE = 1024;
const MIN_DB = -100;
const MAX_DB = -10;
/** Exponential smoothing factor (0..1) — higher = snappier. */
const SMOOTHING = 0.4;

interface BandRange {
  low: number;
  high: number;
}

const RANGES: Record<'bass' | 'mid' | 'treble' | 'air', BandRange> = {
  bass: { low: 20, high: 250 },
  mid: { low: 250, high: 2000 },
  treble: { low: 2000, high: 8000 },
  air: { low: 8000, high: 16000 },
};

export class AudioAnalyser {
  /** Connect instruments here to be analysed. */
  readonly input: Tone.Gain;
  private readonly fft: Tone.Analyser;
  private readonly meter: Tone.Meter;
  private readonly smoothed: AudioBands = { bass: 0, mid: 0, treble: 0, noise: 0, level: 0 };

  constructor() {
    this.input = new Tone.Gain(1);
    this.fft = new Tone.Analyser('fft', FFT_SIZE);
    this.meter = new Tone.Meter({ smoothing: 0.8 });
    this.input.connect(this.fft);
    this.input.connect(this.meter);
  }

  /** Pass the analyser's input through to a destination (e.g. master out). */
  connect(destination: Tone.InputNode): void {
    this.input.connect(destination);
  }

  /** Sample current bands. Cheap enough to call once per animation frame. */
  getBands(): AudioBands {
    const values = this.fft.getValue() as Float32Array;
    const nyquist = Tone.getContext().sampleRate / 2;
    const binHz = nyquist / values.length;

    const bass = this.averageRange(values, binHz, RANGES.bass);
    const mid = this.averageRange(values, binHz, RANGES.mid);
    const treble = this.averageRange(values, binHz, RANGES.treble);
    const air = this.averageRange(values, binHz, RANGES.air);

    const meterValue = this.meter.getValue();
    const levelDb = typeof meterValue === 'number' ? meterValue : meterValue[0] ?? MIN_DB;
    const level = clamp(mapRange(levelDb, MIN_DB, 0, 0, 1), 0, 1);

    // Noisiness ~ relative high-frequency air content.
    const noise = clamp(air * 1.2, 0, 1);

    this.smoothed.bass = lerpTo(this.smoothed.bass, bass);
    this.smoothed.mid = lerpTo(this.smoothed.mid, mid);
    this.smoothed.treble = lerpTo(this.smoothed.treble, treble);
    this.smoothed.noise = lerpTo(this.smoothed.noise, noise);
    this.smoothed.level = lerpTo(this.smoothed.level, level);

    return { ...this.smoothed };
  }

  dispose(): void {
    this.input.dispose();
    this.fft.dispose();
    this.meter.dispose();
  }

  private averageRange(values: Float32Array, binHz: number, range: BandRange): number {
    const startBin = Math.max(1, Math.floor(range.low / binHz));
    const endBin = Math.min(values.length - 1, Math.ceil(range.high / binHz));
    if (endBin <= startBin) return 0;
    let sum = 0;
    for (let i = startBin; i <= endBin; i += 1) {
      sum += values[i] ?? MIN_DB;
    }
    const avgDb = sum / (endBin - startBin + 1);
    return clamp(mapRange(avgDb, MIN_DB, MAX_DB, 0, 1), 0, 1);
  }
}

function lerpTo(current: number, target: number): number {
  return current + (target - current) * SMOOTHING;
}
