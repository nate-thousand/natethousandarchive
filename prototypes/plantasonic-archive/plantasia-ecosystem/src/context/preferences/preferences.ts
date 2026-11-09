/**
 * Plantasia — Preferences context definition & hook.
 *
 * Holds user-level preferences that affect the whole app: theme (dark /
 * high-contrast), reduced motion, expert mode (progressive disclosure of
 * advanced controls), and master volume. The provider (separate file) applies
 * these to the DOM and persists them.
 */
import { createContext, useContext } from 'react';

export type ThemeName = 'dark' | 'high-contrast';

export interface PreferencesState {
  theme: ThemeName;
  reducedMotion: boolean;
  expertMode: boolean;
  /** Master volume on a 0..1 scale. */
  masterVolume: number;
}

export interface PreferencesContextValue extends PreferencesState {
  setTheme: (theme: ThemeName) => void;
  toggleHighContrast: () => void;
  setReducedMotion: (value: boolean) => void;
  toggleExpertMode: () => void;
  setMasterVolume: (value: number) => void;
}

export const DEFAULT_PREFERENCES: PreferencesState = {
  theme: 'dark',
  reducedMotion: false,
  expertMode: false,
  masterVolume: 0.8,
};

export const PreferencesContext = createContext<PreferencesContextValue | null>(null);

/** Access user preferences. Throws if used outside the provider. */
export function usePreferences(): PreferencesContextValue {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error('usePreferences must be used within <PreferencesProvider>');
  return ctx;
}
