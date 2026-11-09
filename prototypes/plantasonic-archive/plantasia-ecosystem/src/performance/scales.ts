/**
 * Plantasia — Scale processor.
 *
 * Quantizes MIDI notes to a selected scale when scale-lock is enabled.
 */
import type { ScaleName } from './types';

/** Semitone offsets from root within one octave. */
const SCALES: Record<ScaleName, number[]> = {
  chromatic: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10],
  pentatonicMajor: [0, 2, 4, 7, 9],
  pentatonicMinor: [0, 3, 5, 7, 10],
};

/** Quantize a MIDI note to the nearest scale degree. */
export function quantizeToScale(note: number, scale: ScaleName, root = 0): number {
  if (scale === 'chromatic') return note;
  const degrees = SCALES[scale];
  const octave = Math.floor(note / 12);
  const pitchClass = ((note % 12) - root + 12) % 12;

  let closest = degrees[0] ?? 0;
  let minDist = 12;
  for (const degree of degrees) {
    const dist = Math.abs(pitchClass - degree);
    if (dist < minDist) {
      minDist = dist;
      closest = degree;
    }
  }
  return octave * 12 + root + closest;
}

/** Convert MIDI note number to Tone.js note string. */
export function midiToNote(midi: number): string {
  const names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const octave = Math.floor(midi / 12) - 1;
  const name = names[midi % 12] ?? 'C';
  return `${name}${octave}`;
}

/** Convert octave + semitone offset to MIDI. */
export function noteToMidi(octave: number, semitone: number): number {
  return (octave + 1) * 12 + semitone;
}
