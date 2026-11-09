/**
 * Plantasia — Audio context definition & hook.
 *
 * Exposes a React-friendly surface over the AudioEngine singleton. Components
 * never import the engine directly; they use this context so lifecycle, state,
 * and wiring stay centralized.
 */
import { createContext, useContext } from 'react';
import type { AudioBands, AudioEngineState, Note } from '@audio/types';

export interface AudioContextValue {
  /** Engine lifecycle state. */
  state: AudioEngineState;
  /** Convenience: whether the engine is producing sound. */
  isRunning: boolean;
  /** Whether the transport is currently running. */
  isPlaying: boolean;
  /** Resume the audio context (call from a user gesture). */
  start: () => Promise<void>;
  /** Preview a single note. */
  playNote: (note: Note, duration?: string) => void;
  /** Play a chord / harmony. */
  playChord: (notes: Note[], duration?: string) => void;
  /** Start / stop the generative transport. */
  togglePlay: () => void;
  /** Set the global tempo in BPM. */
  setTempo: (bpm: number) => void;
  /** Read live analysis bands (for the visualizer). */
  getBands: () => AudioBands;
}

export const AudioContext = createContext<AudioContextValue | null>(null);

/** Access the audio controls. Throws if used outside the provider. */
export function useAudio(): AudioContextValue {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error('useAudio must be used within <AudioProvider>');
  return ctx;
}
