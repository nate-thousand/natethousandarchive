/**
 * Plantasia — Performance context definition & hook.
 */
import { createContext, useContext } from 'react';
import type {
  InputMonitorEntry,
  MidiBinding,
  MidiDeviceInfo,
  ParameterTargetId,
  PerformanceState,
  ScaleName,
  VelocityCurve,
} from '@performance/types';
import type { BuiltinMidiProfileId, MidiProfileId } from '@performance/profiles/types';
import type { MidiControllerProfile } from '@performance/profiles/types';

export interface PerformanceContextValue {
  state: PerformanceState;
  monitor: InputMonitorEntry[];
  bindings: MidiBinding[];
  devices: MidiDeviceInfo[];
  midiSupported: boolean;
  midiEnabled: boolean;
  keyboardEnabled: boolean;
  learnTarget: ParameterTargetId | null;
  velocityCurve: VelocityCurve;
  scale: ScaleName;
  selectedDeviceId: string | 'all';
  activeProfileId: MidiProfileId;
  autoApplyDeviceProfile: boolean;
  midiProfiles: readonly MidiControllerProfile[];

  setMidiEnabled: (enabled: boolean) => Promise<boolean>;
  setKeyboardEnabled: (enabled: boolean) => void;
  setSelectedDevice: (id: string | 'all') => void;
  setOctave: (octave: number) => void;
  setScaleLock: (enabled: boolean) => void;
  setScale: (scale: ScaleName) => void;
  setVelocityCurve: (curve: VelocityCurve) => void;
  setMacro: (macroId: string, value: number) => void;
  panic: () => void;

  startLearn: (targetId: ParameterTargetId) => void;
  cancelLearn: () => void;
  deleteBinding: (id: string) => void;
  resetMappings: () => void;
  exportMappings: () => string;
  importMappings: (json: string) => void;
  applyMidiProfile: (profileId: BuiltinMidiProfileId) => void;
  /** @deprecated Use applyMidiProfile('akai-mpk-mini') */
  applyMpkMiniProfile: () => void;
  setAutoApplyDeviceProfile: (enabled: boolean) => void;
}

export const PerformanceContext = createContext<PerformanceContextValue | null>(null);

export function usePerformance(): PerformanceContextValue {
  const ctx = useContext(PerformanceContext);
  if (!ctx) throw new Error('usePerformance must be used within <PerformanceProvider>');
  return ctx;
}

/** Safe access when performance layer may be unavailable (e.g. tests). */
export function useOptionalPerformance(): PerformanceContextValue | null {
  return useContext(PerformanceContext);
}

export interface PerformancePreferences {
  midiEnabled: boolean;
  keyboardEnabled: boolean;
  velocityCurve: VelocityCurve;
  scale: ScaleName;
  scaleLock: boolean;
  selectedDeviceId: string | 'all';
  activeProfileId: MidiProfileId;
  autoApplyDeviceProfile: boolean;
}

export const DEFAULT_PERFORMANCE_PREFERENCES: PerformancePreferences = {
  midiEnabled: false,
  keyboardEnabled: true,
  velocityCurve: 'linear',
  scale: 'chromatic',
  scaleLock: false,
  selectedDeviceId: 'all',
  activeProfileId: 'universal',
  autoApplyDeviceProfile: true,
};

const VELOCITY_CURVES = new Set<VelocityCurve>(['linear', 'soft', 'hard', 'exponential']);
const SCALES = new Set<ScaleName>([
  'chromatic',
  'major',
  'minor',
  'pentatonicMajor',
  'pentatonicMinor',
]);
const PROFILE_IDS = new Set<MidiProfileId>(['universal', 'akai-mpk-mini', 'custom']);

/** Coerce persisted prefs so corrupt localStorage cannot crash the app. */
export function normalizePerformancePreferences(
  raw: Partial<PerformancePreferences> | null | undefined,
): PerformancePreferences {
  const base = DEFAULT_PERFORMANCE_PREFERENCES;
  if (!raw || typeof raw !== 'object') return base;
  return {
    midiEnabled: Boolean(raw.midiEnabled),
    keyboardEnabled: raw.keyboardEnabled ?? base.keyboardEnabled,
    velocityCurve: VELOCITY_CURVES.has(raw.velocityCurve as VelocityCurve)
      ? (raw.velocityCurve as VelocityCurve)
      : base.velocityCurve,
    scale: SCALES.has(raw.scale as ScaleName) ? (raw.scale as ScaleName) : base.scale,
    scaleLock: Boolean(raw.scaleLock),
    selectedDeviceId:
      raw.selectedDeviceId === 'all' || typeof raw.selectedDeviceId === 'string'
        ? raw.selectedDeviceId
        : base.selectedDeviceId,
    activeProfileId: PROFILE_IDS.has(raw.activeProfileId as MidiProfileId)
      ? (raw.activeProfileId as MidiProfileId)
      : base.activeProfileId,
    autoApplyDeviceProfile: raw.autoApplyDeviceProfile ?? base.autoApplyDeviceProfile,
  };
}
