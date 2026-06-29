import type {
  DpadDirection,
  DpadEngine,
  DpadMappingState,
  DpadPlantasonicMapping,
  DpadPlantasonicOptions,
  EcologicalControl,
} from './types.js';

/** Seed / Plantasonic default ecology (normalized 0–1). */
export const SEED_BASELINE: Record<EcologicalControl, number> = {
  growth: 0.42,
  bloom: 0.48,
  roots: 0.35,
  mold: 0.12,
  bacteria: 0.18,
};

const DIRECTION_CONTROL: Record<DpadDirection, EcologicalControl | null> = {
  up: 'bloom',
  down: 'roots',
  left: 'mold',
  right: 'growth',
  center: null,
};

const DOUBLE_TAP_BURST: Record<Exclude<DpadDirection, 'center'>, EcologicalControl> = {
  up: 'bloom',
  down: 'roots',
  left: 'mold',
  right: 'growth',
};

const SEED_PULSE_CHORD = ['C4', 'E4', 'G4'] as const;

function clamp01(value: number): number {
  if (Number.isNaN(value)) return 0;
  return Math.max(0, Math.min(1, value));
}

function mergeBaseline(
  partial?: Partial<Record<EcologicalControl, number>>,
): Record<EcologicalControl, number> {
  return {
    growth: partial?.growth ?? SEED_BASELINE.growth,
    bloom: partial?.bloom ?? SEED_BASELINE.bloom,
    roots: partial?.roots ?? SEED_BASELINE.roots,
    mold: partial?.mold ?? SEED_BASELINE.mold,
    bacteria: partial?.bacteria ?? SEED_BASELINE.bacteria,
  };
}

/**
 * Maps D-pad directions to Plantasonic / Seed ecological controls.
 *
 * UP → bloom · DOWN → roots · LEFT → mold · RIGHT → growth · CENTER → seed pulse
 *
 * No Tone.js — only normalized engine.setControl / noteOn / noteOff calls.
 */
export function createDpadPlantasonicMapping(
  engine: DpadEngine,
  options: DpadPlantasonicOptions = {},
): DpadPlantasonicMapping {
  const pressImpulse = options.pressImpulse ?? 0.08;
  const holdStep = options.holdStep ?? 0.022;
  const holdThrottleMs = options.holdThrottleMs ?? 64;
  const easeFactor = options.easeFactor ?? 0.06;
  const rootNote = options.rootNote ?? 'C4';

  const resting = mergeBaseline(options.restingEcology);
  const values: Record<EcologicalControl, number> = { ...resting };

  let activeDirection: DpadDirection | null = null;
  let lastEvent = 'idle';
  let centerHeld = false;
  let pulseNotesActive: string[] = [];
  let rootsDroneTimer = 0;

  const holdTimestamps: Partial<Record<DpadDirection, number>> = {};
  const easing = new Set<EcologicalControl>();
  let easeRaf = 0;
  let disposed = false;

  const pushEcology = (control: EcologicalControl, value: number) => {
    values[control] = clamp01(value);
    engine.setControl(control, values[control]);
  };

  const emit = () => {
    options.onStateChange?.(getState());
  };

  const setEvent = (message: string) => {
    lastEvent = message;
    emit();
  };

  const bump = (control: EcologicalControl, amount: number, label: string) => {
    easing.delete(control);
    pushEcology(control, values[control] + amount);
    setEvent(label);
  };

  const burstTo = (control: EcologicalControl, target: number, label: string) => {
    easing.delete(control);
    pushEcology(control, target);
    setEvent(label);
    easing.add(control);
    startEaseLoop();
  };

  const startEaseLoop = () => {
    if (easeRaf || disposed) return;
    const tick = () => {
      if (disposed) return;
      let animating = false;
      for (const control of [...easing]) {
        const current = values[control];
        const target = resting[control];
        if (Math.abs(current - target) < 0.004) {
          pushEcology(control, target);
          easing.delete(control);
          continue;
        }
        pushEcology(control, current + (target - current) * easeFactor);
        animating = true;
      }
      if (animating) {
        easeRaf = requestAnimationFrame(tick);
      } else {
        easeRaf = 0;
      }
      emit();
    };
    easeRaf = requestAnimationFrame(tick);
  };

  const releasePulseNotes = () => {
    for (const note of pulseNotesActive) engine.noteOff(note);
    pulseNotesActive = [];
  };

  const seedPulse = (velocity = 0.78) => {
    releasePulseNotes();
    const notes = SEED_PULSE_CHORD.map((n) => (n === 'C4' ? rootNote : n));
    pulseNotesActive = notes;
    for (const note of notes) {
      engine.noteOn(note, note === rootNote ? velocity : velocity * 0.72);
    }
    setEvent(`seed pulse · ${notes.join(' ')}`);
  };

  const getState = (): DpadMappingState => ({
    activeDirection,
    bloom: values.bloom,
    roots: values.roots,
    mold: values.mold,
    growth: values.growth,
    bacteria: values.bacteria,
    lastEvent,
  });

  return {
    onPress(direction) {
      if (disposed) return;
      activeDirection = direction;

      const control = DIRECTION_CONTROL[direction];
      if (control) {
        bump(control, pressImpulse, `${direction} press · ${control} +${pressImpulse.toFixed(2)}`);
        return;
      }

      if (direction === 'center' && !centerHeld) {
        centerHeld = true;
        seedPulse();
      }
    },

    onHold(direction) {
      if (disposed) return;
      const now = performance.now();
      if (now - (holdTimestamps[direction] ?? 0) < holdThrottleMs) return;
      holdTimestamps[direction] = now;

      activeDirection = direction;
      const control = DIRECTION_CONTROL[direction];
      if (!control) return;

      bump(control, holdStep, `${direction} hold · ${control}`);
    },

    onRelease(direction) {
      if (disposed) return;
      holdTimestamps[direction] = undefined;

      if (activeDirection === direction) activeDirection = null;

      const control = DIRECTION_CONTROL[direction];
      if (control) {
        easing.add(control);
        startEaseLoop();
        setEvent(`${direction} release · ${control} easing back`);
        return;
      }

      if (direction === 'center' && centerHeld) {
        centerHeld = false;
        releasePulseNotes();
        setEvent('seed pulse release');
      }
    },

    onDoubleTap(direction) {
      if (disposed) return;

      if (direction === 'center') {
        Object.assign(values, resting);
        engine.applyEcology?.(resting);
        engine.allNotesOff();
        releasePulseNotes();
        easing.clear();
        if (easeRaf) cancelAnimationFrame(easeRaf);
        easeRaf = 0;
        activeDirection = null;
        centerHeld = false;
        setEvent('double tap center · reset to seed baseline');
        return;
      }

      const control = DOUBLE_TAP_BURST[direction];
      const labels: Record<typeof direction, string> = {
        up: 'double tap up · full bloom burst',
        down: 'double tap down · deep roots drone',
        left: 'double tap left · mold glitch burst',
        right: 'double tap right · growth expansion burst',
      };

      burstTo(control, 1, labels[direction]);

      if (direction === 'down') {
        engine.noteOn('C2', 0.65);
        if (rootsDroneTimer) window.clearTimeout(rootsDroneTimer);
        rootsDroneTimer = window.setTimeout(() => engine.noteOff('C2'), 900);
      }
    },

    panic() {
      if (disposed) return;
      engine.allNotesOff();
      releasePulseNotes();
      centerHeld = false;
      activeDirection = null;
      holdTimestamps.up = undefined;
      holdTimestamps.down = undefined;
      holdTimestamps.left = undefined;
      holdTimestamps.right = undefined;
      holdTimestamps.center = undefined;
      if (rootsDroneTimer) window.clearTimeout(rootsDroneTimer);
      rootsDroneTimer = 0;
      setEvent('panic · notes off, direction cleared');
    },

    getState,

    dispose() {
      disposed = true;
      if (easeRaf) cancelAnimationFrame(easeRaf);
      if (rootsDroneTimer) window.clearTimeout(rootsDroneTimer);
      easeRaf = 0;
      rootsDroneTimer = 0;
      easing.clear();
      engine.allNotesOff();
      releasePulseNotes();
      activeDirection = null;
      centerHeld = false;
    },
  };
}

/** Bootstrap: unlock audio, load Plantasonic preset, start Seed sound world. */
export async function initPlantasonicSeed(engine: DpadEngine): Promise<void> {
  await engine.initialize?.();
  if (engine.loadPreset) {
    await engine.loadPreset('plantasonic');
  } else {
    await engine.loadSpecies?.('seed');
    engine.applyEcology?.(SEED_BASELINE);
  }
  await engine.start?.();
  if (engine.getState?.() !== 'running') {
    throw new Error('Sound engine failed to reach running state');
  }
}
