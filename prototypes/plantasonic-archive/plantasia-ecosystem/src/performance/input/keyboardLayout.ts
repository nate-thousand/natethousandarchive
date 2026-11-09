/**
 * Plantasia — Computer keyboard piano layout.
 *
 * QWERTY row maps to one chromatic octave. Z/X shift octave down/up.
 */
export const KEYBOARD_NOTE_MAP: Record<string, number> = {
  a: 0,
  w: 1,
  s: 2,
  e: 3,
  d: 4,
  f: 5,
  t: 6,
  g: 7,
  y: 8,
  h: 9,
  u: 10,
  j: 11,
  k: 12,
};

/** Keys that trigger performance actions instead of notes. */
export const KEYBOARD_ACTION_KEYS: Record<string, 'octaveUp' | 'octaveDown' | 'panic' | 'sustain'> = {
  z: 'octaveDown',
  x: 'octaveUp',
  escape: 'panic',
  c: 'sustain',
};

/** Keys reserved for global transport (not piano when performance mode active). */
export const GLOBAL_SHORTCUT_KEYS = new Set([' ']);

/** Default velocity for keyboard notes (simulated — no pressure sensitivity). */
export const KEYBOARD_DEFAULT_VELOCITY = 90;

/** Velocity variation by key position (deeper keys = slightly louder). */
export function keyboardKeyVelocity(key: string): number {
  const semitone = KEYBOARD_NOTE_MAP[key];
  if (semitone === undefined) return KEYBOARD_DEFAULT_VELOCITY;
  return Math.min(127, KEYBOARD_DEFAULT_VELOCITY + Math.floor(semitone * 2.5));
}
