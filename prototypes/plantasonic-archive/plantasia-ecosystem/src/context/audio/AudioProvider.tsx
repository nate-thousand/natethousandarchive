import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { getAudioEngine } from '@audio/index';
import type { AudioEngineState, Note } from '@audio/types';
import { useEcosystem } from '@context/ecosystem/ecosystem';
import { usePreferences } from '@context/preferences/preferences';
import { AudioContext, type AudioContextValue } from './audio';

/**
 * AudioProvider — bridges React state to the AudioEngine singleton:
 *   - rebuilds the instrument when the species changes,
 *   - pushes gene edits to the engine in real time,
 *   - mirrors master volume from preferences,
 *   - exposes transport + preview controls and the live analysis bands.
 */
export function AudioProvider({ children }: { children: ReactNode }) {
  const engine = useMemo(() => getAudioEngine(), []);
  const { species, organism } = useEcosystem();
  const { masterVolume } = usePreferences();

  const [state, setState] = useState<AudioEngineState>(() => engine.getState());
  const [isPlaying, setIsPlaying] = useState(false);
  const lastSpeciesId = useRef<string | null>(null);

  // Track engine lifecycle state.
  useEffect(() => engine.onStateChange(setState), [engine]);

  // Rebuild instrument on species change; otherwise just push gene updates.
  useEffect(() => {
    if (lastSpeciesId.current !== species.id) {
      engine.setSpecies(species, organism.genes);
      lastSpeciesId.current = species.id;
    } else {
      engine.applyGenes(organism.genes);
    }
  }, [engine, species, organism.genes]);

  // Mirror master volume.
  useEffect(() => {
    engine.setMasterVolume(masterVolume);
  }, [engine, masterVolume]);

  const start = useCallback(async () => {
    await engine.start();
  }, [engine]);

  const playNote = useCallback(
    (note: Note, duration = '8n') => {
      void engine.start().then(() => engine.playNote(note, duration));
    },
    [engine],
  );

  const playChord = useCallback(
    (notes: Note[], duration = '2n') => {
      void engine.start().then(() => engine.playChord(notes, duration));
    },
    [engine],
  );

  const togglePlay = useCallback(() => {
    if (engine.isPlaying()) {
      engine.stopGenerative();
      setIsPlaying(false);
      return;
    }
    void engine.start().then(() => {
      engine.startGenerative();
      setIsPlaying(true);
    });
  }, [engine]);

  const setTempo = useCallback((bpm: number) => engine.setTempo(bpm), [engine]);

  const getBands = useCallback(() => engine.getBands(), [engine]);

  const value = useMemo<AudioContextValue>(
    () => ({
      state,
      isRunning: state === 'running',
      isPlaying,
      start,
      playNote,
      playChord,
      togglePlay,
      setTempo,
      getBands,
    }),
    [state, isPlaying, start, playNote, playChord, togglePlay, setTempo, getBands],
  );

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
}
