export const musicalKeys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as const;

export type MusicalKey = (typeof musicalKeys)[number];

export const scales = [
  'Major',
  'Minor',
  'Dorian',
  'Lydian',
  'Mixolydian',
  'Pentatonic',
  'Whole Tone',
] as const;

export type ScaleName = (typeof scales)[number];

export type Harmony = {
  key: MusicalKey;
  scale: ScaleName;
  chord: string;
};

const chordSuffix: Record<ScaleName, string> = {
  Major: 'maj7',
  Minor: 'min7',
  Dorian: 'min9',
  Lydian: 'maj7#11',
  Mixolydian: '7',
  Pentatonic: 'sus2',
  'Whole Tone': 'aug',
};

export function currentChord(key: MusicalKey, scale: ScaleName): string {
  return `${key}${chordSuffix[scale]}`;
}
