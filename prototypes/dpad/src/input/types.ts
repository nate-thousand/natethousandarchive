/** Ecological controls exposed by the Plantasonic / Seed sound world. */
export type EcologicalControl = 'growth' | 'bloom' | 'roots' | 'mold' | 'bacteria';

export type DpadDirection = 'up' | 'down' | 'left' | 'right' | 'center';

/** Minimal engine surface the D-pad layer depends on — facade or SpeciesManager. */
export interface DpadEngine {
  initialize?(): Promise<void>;
  loadSpecies?(id: string): Promise<void>;
  loadPreset?(presetId: string): Promise<void>;
  start?(): Promise<void>;
  getState?(): string;
  setControl(control: EcologicalControl, value: number): void;
  applyEcology?(ecology: Partial<Record<EcologicalControl, number>>): void;
  noteOn(note: string, velocity?: number): void;
  noteOff(note: string): void;
  allNotesOff(): void;
}

export interface DpadMappingState {
  activeDirection: DpadDirection | null;
  bloom: number;
  roots: number;
  mold: number;
  growth: number;
  bacteria: number;
  lastEvent: string;
}

export interface DpadPlantasonicMapping {
  onPress(direction: DpadDirection): void;
  onHold(direction: DpadDirection): void;
  onRelease(direction: DpadDirection): void;
  onDoubleTap(direction: DpadDirection): void;
  panic(): void;
  getState(): DpadMappingState;
  dispose(): void;
}

export interface DpadPlantasonicOptions {
  /** Root note for center / seed pulse. Default C4. */
  rootNote?: string;
  /** Normalized resting ecology when controls ease back. */
  restingEcology?: Partial<Record<EcologicalControl, number>>;
  /** Impulse added on short press (0–1). */
  pressImpulse?: number;
  /** Increment per throttled hold tick (0–1). */
  holdStep?: number;
  /** Minimum ms between hold updates. */
  holdThrottleMs?: number;
  /** Ease-back lerp factor per animation frame (0–1). */
  easeFactor?: number;
  onStateChange?: (state: DpadMappingState) => void;
}
