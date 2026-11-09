import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { getAudioEngine } from '@audio/index';
import { PerformanceEngine } from '@performance/engine/PerformanceEngine';
import { InputManager } from '@performance/input/InputManager';
import { exportMappings, importMappings as parseMappings } from '@performance/mappings';
import {
  applyMidiProfileIfEmpty,
  listMidiProfiles,
  MPK_MINI_PROFILE_ID,
} from '@performance/profiles/registry';
import type { BuiltinMidiProfileId } from '@performance/profiles/types';
import type { PerformanceState } from '@performance/types';
import { useEcosystem } from '@context/ecosystem/ecosystem';
import { usePreferences } from '@context/preferences/preferences';
import { STORAGE_KEYS, loadValue, saveValue } from '@services/storage/storage';
import {
  DEFAULT_PERFORMANCE_PREFERENCES,
  normalizePerformancePreferences,
  PerformanceContext,
  type PerformanceContextValue,
  type PerformancePreferences,
} from './performance';

function resolveStartupProfile(prefs: PerformancePreferences): BuiltinMidiProfileId {
  if (prefs.activeProfileId === 'akai-mpk-mini') return MPK_MINI_PROFILE_ID;
  return 'universal';
}

/**
 * PerformanceProvider — wires the PerformanceEngine to audio, ecosystem, and
 * input sources. All note/CC events route through the engine; UI never calls
 * Tone.js directly.
 */
export function PerformanceProvider({ children }: { children: ReactNode }) {
  const engineRef = useRef<PerformanceEngine | null>(null);
  const inputRef = useRef<InputManager | null>(null);
  const mountedRef = useRef(true);

  if (!engineRef.current) engineRef.current = new PerformanceEngine();
  if (!inputRef.current) inputRef.current = new InputManager(engineRef.current);

  const engine = engineRef.current;
  const input = inputRef.current;
  const audioEngine = useMemo(() => getAudioEngine(), []);
  const midiProfiles = useMemo(() => listMidiProfiles(), []);

  const { organism, setGene, setGenes, mutate, randomize, regrow } = useEcosystem();
  const { setMasterVolume } = usePreferences();

  const [prefs, setPrefs] = useState<PerformancePreferences>(() =>
    normalizePerformancePreferences(loadValue(STORAGE_KEYS.performance, DEFAULT_PERFORMANCE_PREFERENCES)),
  );
  const [state, setState] = useState<PerformanceState>(() => engine.getState());
  const [monitor, setMonitor] = useState(() => engine.getMonitor());
  const [bindings, setBindings] = useState(() => engine.getBindings());
  const [devices, setDevices] = useState(() => input.midi.getDevices());
  const [learnTarget, setLearnTarget] = useState(() => engine.midiLearn.getLearnTarget());
  const learnTargetRef = useRef(learnTarget);
  learnTargetRef.current = learnTarget;

  const organismGenesRef = useRef(organism.genes);
  organismGenesRef.current = organism.genes;

  const prefsRef = useRef(prefs);
  prefsRef.current = prefs;

  useEffect(() => {
    saveValue(STORAGE_KEYS.performance, prefs);
  }, [prefs]);

  useEffect(() => {
    engine.setCallbacks({
      ensureAudioStarted: () => audioEngine.start(),
      attackNote: (note, velocity) => {
        void audioEngine.start().then(() => audioEngine.attackNote(note, velocity));
      },
      releaseNote: (note) => audioEngine.releaseNote(note),
      releaseAll: () => audioEngine.releaseAll(),
      applyModulation: (mod, genes) => audioEngine.applyPerformanceModulation(mod, genes),
      getBaseGenes: () => organismGenesRef.current,
      setGene,
      setGenes,
      mutate,
      randomize,
      regrow,
      setMasterVolume,
      setTempo: (bpm) => audioEngine.setTempo(bpm),
      toggleGenerative: () => {
        if (audioEngine.isPlaying()) audioEngine.stopGenerative();
        else void audioEngine.start().then(() => audioEngine.startGenerative());
      },
    });
  }, [engine, audioEngine, setGene, setGenes, mutate, randomize, regrow, setMasterVolume]);

  useEffect(() => {
    mountedRef.current = true;

    const boot = () => {
      engine.setVelocityCurve(prefs.velocityCurve);
      engine.setScale(prefs.scale);
      engine.setScaleLock(prefs.scaleLock);
      input.setKeyboardEnabled(prefs.keyboardEnabled);
      input.setAutoApplyDeviceProfile(prefs.autoApplyDeviceProfile);

      input.midi.setSelectedDevice(prefs.selectedDeviceId);
      input.midi.setOnDeviceChange((next) => {
        if (mountedRef.current) setDevices(next);
      });
      input.midi.setOnProfileDetected((profileId) => {
        if (!mountedRef.current) return;
        setPrefs((p) => ({ ...p, activeProfileId: profileId }));
        setBindings([...engine.getBindings()]);
      });

      if (prefs.midiEnabled) {
        void input.setMidiEnabled(true).then((ok) => {
          if (!ok || !mountedRef.current) return;
          if (
            engine.getBindings().length === 0 &&
            prefsRef.current.activeProfileId !== 'custom'
          ) {
            applyMidiProfileIfEmpty(engine.midiLearn, resolveStartupProfile(prefsRef.current));
            setBindings([...engine.getBindings()]);
          }
          setDevices(input.midi.getDevices());
        });
      }

      input.attach();
    };

    const frame = requestAnimationFrame(boot);

    const refreshMonitor = () => {
      if (mountedRef.current) setMonitor([...engine.getMonitor()]);
    };

    const unsubState = engine.bus.onStateChange((s) => {
      if (!mountedRef.current) return;
      setState({ ...s });
      refreshMonitor();
    });

    const unsubEvents = engine.bus.subscribe(() => refreshMonitor());

    engine.midiLearn.setOnChange(() => {
      if (!mountedRef.current) return;
      const wasLearning = learnTargetRef.current !== null;
      setBindings([...engine.midiLearn.getBindings()]);
      const nextLearnTarget = engine.midiLearn.getLearnTarget();
      setLearnTarget(nextLearnTarget);
      if (wasLearning && nextLearnTarget === null) {
        setPrefs((p) => ({ ...p, activeProfileId: 'custom' }));
      }
    });

    return () => {
      mountedRef.current = false;
      cancelAnimationFrame(frame);
      unsubState();
      unsubEvents();
      input.detach();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setMidiEnabled = useCallback(
    async (enabled: boolean) => {
      if (enabled) {
        input.setAutoApplyDeviceProfile(prefsRef.current.autoApplyDeviceProfile);
      }
      const ok = await input.setMidiEnabled(enabled);
      if (ok && enabled && engine.getBindings().length === 0 && prefsRef.current.activeProfileId !== 'custom') {
        applyMidiProfileIfEmpty(engine.midiLearn, resolveStartupProfile(prefsRef.current));
        setBindings([...engine.getBindings()]);
      }
      setPrefs((p) => ({ ...p, midiEnabled: enabled && ok }));
      setDevices(input.midi.getDevices());
      return ok;
    },
    [engine, input],
  );

  const applyMidiProfileHandler = useCallback(
    (profileId: BuiltinMidiProfileId) => {
      input.applyMidiProfile(profileId);
      setPrefs((p) => ({ ...p, activeProfileId: profileId }));
      setBindings([...engine.getBindings()]);
    },
    [engine, input],
  );

  const value = useMemo<PerformanceContextValue>(
    () => ({
      state,
      monitor,
      bindings,
      devices,
      midiSupported: input.midi.isSupported(),
      midiEnabled: prefs.midiEnabled,
      keyboardEnabled: prefs.keyboardEnabled,
      learnTarget,
      velocityCurve: prefs.velocityCurve,
      scale: prefs.scale,
      selectedDeviceId: prefs.selectedDeviceId,
      activeProfileId: prefs.activeProfileId,
      autoApplyDeviceProfile: prefs.autoApplyDeviceProfile,
      midiProfiles,

      setMidiEnabled,
      setKeyboardEnabled: (enabled) => {
        input.setKeyboardEnabled(enabled);
        setPrefs((p) => ({ ...p, keyboardEnabled: enabled }));
      },
      setSelectedDevice: (id) => {
        input.midi.setSelectedDevice(id);
        setPrefs((p) => ({ ...p, selectedDeviceId: id }));
        setDevices(input.midi.getDevices());
      },
      setOctave: (octave) => engine.setOctave(octave),
      setScaleLock: (enabled) => {
        engine.setScaleLock(enabled);
        setPrefs((p) => ({ ...p, scaleLock: enabled }));
      },
      setScale: (scale) => {
        engine.setScale(scale);
        setPrefs((p) => ({ ...p, scale }));
      },
      setVelocityCurve: (curve) => {
        engine.setVelocityCurve(curve);
        setPrefs((p) => ({ ...p, velocityCurve: curve }));
      },
      setMacro: (macroId, v) => engine.setMacro(macroId, v),
      panic: () => engine.panic(),

      startLearn: (targetId) => {
        engine.midiLearn.startLearn(targetId);
        setLearnTarget(targetId);
      },
      cancelLearn: () => {
        engine.midiLearn.cancelLearn();
        setLearnTarget(null);
      },
      deleteBinding: (id) => {
        engine.midiLearn.deleteBinding(id);
        setBindings([...engine.getBindings()]);
        setPrefs((p) => ({ ...p, activeProfileId: 'custom' }));
      },
      resetMappings: () => {
        engine.midiLearn.resetAll();
        setBindings([]);
        setPrefs((p) => ({ ...p, activeProfileId: 'universal' }));
      },
      exportMappings: () => exportMappings(engine.midiLearn.getStore()),
      importMappings: (json) => {
        engine.midiLearn.importStore(parseMappings(json));
        setBindings([...engine.getBindings()]);
        setPrefs((p) => ({ ...p, activeProfileId: 'custom' }));
      },
      applyMidiProfile: applyMidiProfileHandler,
      applyMpkMiniProfile: () => applyMidiProfileHandler(MPK_MINI_PROFILE_ID),
      setAutoApplyDeviceProfile: (enabled) => {
        input.setAutoApplyDeviceProfile(enabled);
        setPrefs((p) => ({ ...p, autoApplyDeviceProfile: enabled }));
      },
    }),
    [
      state,
      monitor,
      bindings,
      devices,
      prefs,
      learnTarget,
      engine,
      input,
      setMidiEnabled,
      applyMidiProfileHandler,
      midiProfiles,
    ],
  );

  return <PerformanceContext.Provider value={value}>{children}</PerformanceContext.Provider>;
}
