/**
 * Plantasia — Species domain types.
 *
 * A Species is the unit that ties the three layers of Plantasia together:
 *   - SOUND  (how the organism sings — the synthesis engine + parameters)
 *   - FORM   (how the organism looks & grows — the visual/structural profile)
 *   - MOTION (how the organism moves — the animation profile)
 *
 * Every preset the user saves is an instance of a species with mutated genes.
 * Keeping these types framework-agnostic lets the audio engine, the canvas
 * renderer, and the UI all consume the same definition without coupling.
 */

import type { ColorTokenKey } from '@design-system/tokens/tokens';
import type { IconName } from '@design-system/tokens/icons/icons';

/** The synthesis architecture an organism uses to make sound. */
export type SoundEngineType = 'subtractive' | 'fm' | 'granular' | 'physical' | 'noise';

/** Source waveform for oscillator-based engines. */
export type Waveform = 'sine' | 'triangle' | 'sawtooth' | 'square';

/**
 * The "genes" that drive both sound and growth. Values are normalized 0..1 so
 * they can be mutated, interpolated, and visualized uniformly. The audio engine
 * maps them to real units (Hz, dB, seconds) at the boundary.
 */
export interface OrganismGenes {
  /** Brightness of the timbre — maps to filter cutoff / FM ratio. */
  sunlight: number;
  /** Body & moisture — maps to filter resonance / sustain. */
  water: number;
  /** Movement & modulation depth — maps to LFO depth. */
  wind: number;
  /** Low-end grounding — maps to sub level / detune spread. */
  soil: number;
  /** Overall vitality — maps to amplitude / voice count. */
  energy: number;
  /** Harmonic richness — maps to overtones / FM index. */
  harmony: number;
  /** How fast the envelope grows in — maps to attack. */
  growth: number;
  /** How long the sound persists — maps to release. */
  life: number;
}

/** Envelope expressed in garden terms (maps to ADSR). */
export interface GrowthEnvelope {
  /** germinate -> attack (seconds) */
  germinate: number;
  /** sprout -> decay (seconds) */
  sprout: number;
  /** sustain level (0..1) */
  sustain: number;
  /** wither -> release (seconds) */
  wither: number;
}

/** A single effect in the organism's signal chain. */
export interface EffectConfig {
  type: 'bloom' | 'echo' | 'haze' | 'drift';
  /** Wet/dry mix 0..1. */
  amount: number;
  /** Effect-specific normalized parameter (size, time, rate...). */
  shape: number;
}

/** The complete sound profile for a species. */
export interface SoundProfile {
  engine: SoundEngineType;
  waveform: Waveform;
  /** Default octave offset from the played note. */
  octave: number;
  envelope: GrowthEnvelope;
  /** Maximum simultaneous voices (polyphony). */
  voices: number;
  effects: EffectConfig[];
}

/** How an organism is structured and grows visually. */
export interface FormProfile {
  /** Branch generations grown from the seed. */
  depth: number;
  /** Children spawned per node. */
  branching: number;
  /** Angular spread of children (radians). */
  spread: number;
  /** How much each generation shrinks (0..1). */
  taper: number;
  /** Curl/irregularity of growth (0..1). */
  curl: number;
  /** Density of leaves along branches (0..1). */
  foliage: number;
  /** Likelihood a tip becomes a bloom (0..1). */
  flowering: number;
  /** Spore/particle emission rate (0..1). */
  sporeRate: number;
}

/** How an organism moves over time. */
export interface MotionProfile {
  /** Breathing amplitude (0..1). */
  sway: number;
  /** Breathing speed multiplier. */
  tempo: number;
  /** Ambient particle drift speed (0..1). */
  drift: number;
}

/** Accent colors a species contributes to the palette (token keys only). */
export interface SpeciesPalette {
  primary: ColorTokenKey;
  secondary: ColorTokenKey;
  accent: ColorTokenKey;
}

/** Difficulty/experience surfacing for progressive disclosure. */
export type SpeciesTier = 'beginner' | 'intermediate' | 'expert';

/** The full, immutable definition of a species archetype. */
export interface SpeciesDefinition {
  id: string;
  /** Common, friendly name (e.g. "Fern"). */
  name: string;
  /** Evocative latin-style binomial for flavor (e.g. "Pteridium sonans"). */
  binomial: string;
  /** One-line poetic description. */
  description: string;
  tier: SpeciesTier;
  icon: IconName;
  palette: SpeciesPalette;
  /** Baseline genes for a freshly-seeded organism of this species. */
  genes: OrganismGenes;
  sound: SoundProfile;
  form: FormProfile;
  motion: MotionProfile;
}

/** A living, cultivated instance of a species (a saved or active organism). */
export interface Organism {
  id: string;
  speciesId: string;
  /** Display name given by the cultivator. */
  name: string;
  /** Deterministic seed — same seed grows the same body. */
  seed: number;
  /** Current (possibly mutated) genes. */
  genes: OrganismGenes;
  /** ISO timestamp of creation. */
  cultivatedAt: string;
}
