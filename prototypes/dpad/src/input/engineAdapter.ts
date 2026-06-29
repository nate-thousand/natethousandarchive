import type { DpadEngine, EcologicalControl } from './types.js';

const ECOLOGY_CONTROLS: EcologicalControl[] = ['growth', 'bloom', 'roots', 'mold', 'bacteria'];

function clamp01(value: number): number {
  if (Number.isNaN(value)) return 0;
  return Math.max(0, Math.min(1, value));
}

/**
 * Wrap PlantasiaEngine, SpeciesManager, or any duck-typed host so the D-pad
 * layer always speaks normalized 0–1 ecology + note events.
 */
export function createDpadEngineAdapter(engine: unknown): DpadEngine {
  const host = engine as Record<string, unknown>;

  const setControl = (control: EcologicalControl, value: number) => {
    const normalized = clamp01(value);
    if (typeof host.setControl === 'function') {
      (host.setControl as DpadEngine['setControl'])(control, normalized);
      return;
    }
    if (typeof host.applyEcology === 'function') {
      (host.applyEcology as DpadEngine['applyEcology'])!({ [control]: normalized });
    }
  };

  return {
    initialize: typeof host.initialize === 'function'
      ? () => (host.initialize as () => Promise<void>)()
      : typeof host.init === 'function'
        ? () => (host.init as () => Promise<void>)()
        : undefined,

    loadSpecies: typeof host.loadSpecies === 'function'
      ? (id: string) => (host.loadSpecies as (id: string) => Promise<void>)(id)
      : undefined,

    loadPreset: typeof host.loadPreset === 'function'
      ? (presetId: string) => (host.loadPreset as (id: string) => Promise<void>)(presetId)
      : undefined,

    start: typeof host.start === 'function'
      ? () => (host.start as () => Promise<void>)()
      : undefined,

    getState: typeof host.getState === 'function'
      ? () => String((host.getState as () => string)())
      : undefined,

    setControl,

    applyEcology: typeof host.applyEcology === 'function'
      ? (ecology) => {
          const normalized: Partial<Record<EcologicalControl, number>> = {};
          for (const key of ECOLOGY_CONTROLS) {
            if (ecology[key] !== undefined) normalized[key] = clamp01(ecology[key]!);
          }
          (host.applyEcology as NonNullable<DpadEngine['applyEcology']>)(normalized);
        }
      : (ecology) => {
          for (const key of ECOLOGY_CONTROLS) {
            if (ecology[key] !== undefined) setControl(key, ecology[key]!);
          }
        },

    noteOn: (note, velocity = 0.8) => {
      if (typeof host.noteOn === 'function') {
        (host.noteOn as DpadEngine['noteOn'])(note, velocity);
      }
    },

    noteOff: (note) => {
      if (typeof host.noteOff === 'function') {
        (host.noteOff as DpadEngine['noteOff'])(note);
      }
    },

    allNotesOff: () => {
      if (typeof host.allNotesOff === 'function') {
        (host.allNotesOff as DpadEngine['allNotesOff'])();
      }
    },
  };
}
