import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { clamp } from '@utils/math';
import { STORAGE_KEYS, loadValue, saveValue } from '@services/storage/storage';
import {
  DEFAULT_PREFERENCES,
  PreferencesContext,
  type PreferencesContextValue,
  type PreferencesState,
  type ThemeName,
} from './preferences';

/** Detect the user's OS-level reduced-motion preference. */
function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * PreferencesProvider — owns preference state, syncs it to the document root
 * (data-theme / data-reduced-motion) and to localStorage, and exposes setters.
 */
export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PreferencesState>(() => {
    const stored = loadValue<Partial<PreferencesState>>(STORAGE_KEYS.preferences, {});
    return {
      ...DEFAULT_PREFERENCES,
      reducedMotion: stored.reducedMotion ?? prefersReducedMotion(),
      ...stored,
    };
  });

  // Reflect preferences onto the document & persist them.
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', state.theme);
    root.setAttribute('data-reduced-motion', String(state.reducedMotion));
    saveValue(STORAGE_KEYS.preferences, state);
  }, [state]);

  const setTheme = useCallback((theme: ThemeName) => setState((s) => ({ ...s, theme })), []);

  const toggleHighContrast = useCallback(
    () => setState((s) => ({ ...s, theme: s.theme === 'high-contrast' ? 'dark' : 'high-contrast' })),
    [],
  );

  const setReducedMotion = useCallback(
    (value: boolean) => setState((s) => ({ ...s, reducedMotion: value })),
    [],
  );

  const toggleExpertMode = useCallback(
    () => setState((s) => ({ ...s, expertMode: !s.expertMode })),
    [],
  );

  const setMasterVolume = useCallback(
    (value: number) => setState((s) => ({ ...s, masterVolume: clamp(value, 0, 1) })),
    [],
  );

  const value = useMemo<PreferencesContextValue>(
    () => ({ ...state, setTheme, toggleHighContrast, setReducedMotion, toggleExpertMode, setMasterVolume }),
    [state, setTheme, toggleHighContrast, setReducedMotion, toggleExpertMode, setMasterVolume],
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}
