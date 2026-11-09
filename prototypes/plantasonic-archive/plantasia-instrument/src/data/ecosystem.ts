export type BotanicalControlKey =
  | 'energy'
  | 'growth'
  | 'density'
  | 'evolution'
  | 'random'
  | 'life'
  | 'space'
  | 'texture'
  | 'harmony'
  | 'resonance';

export type BotanicalControls = Record<BotanicalControlKey, number>;

export type SpeciesName =
  | 'Fern'
  | 'Moss'
  | 'Coral'
  | 'Flower'
  | 'Tree'
  | 'Vine'
  | 'Crystal'
  | 'Alien'
  | 'Mushroom';

export type SpeciesProfile = {
  name: SpeciesName;
  description: string;
  branchBias: number;
  leafDensity: number;
  particleBehavior: 'drift' | 'pulse' | 'swarm' | 'spark' | 'fall';
  growthSpeed: number;
  motion: 'sway' | 'flutter' | 'breathe' | 'glitch' | 'spiral';
  audioMapping: {
    roots: string;
    leaves: string;
    bloom: string;
  };
};

export type EcosystemMetric = {
  label: string;
  value: string;
};

export const botanicalControlLabels: Record<BotanicalControlKey, string> = {
  energy: 'Energy',
  growth: 'Growth',
  density: 'Density',
  evolution: 'Evolution',
  random: 'Random',
  life: 'Life',
  space: 'Space',
  texture: 'Texture',
  harmony: 'Harmony',
  resonance: 'Resonance',
};

export const botanicalControlHints: Record<BotanicalControlKey, string> = {
  energy: 'Oscillator intensity',
  growth: 'Envelope shape',
  density: 'Voice count',
  evolution: 'Mutation drift',
  random: 'Chance modulation',
  life: 'Modulation depth',
  space: 'Reverb bloom',
  texture: 'Granular surface',
  harmony: 'Chord consonance',
  resonance: 'Filter resonance',
};

export const initialBotanicalControls: BotanicalControls = {
  energy: 62,
  growth: 48,
  density: 54,
  evolution: 36,
  random: 22,
  life: 68,
  space: 44,
  texture: 57,
  harmony: 72,
  resonance: 46,
};

export const cultivationActions = [
  { id: 'seed', label: 'Seed', icon: '•', shortcut: '1', state: 'seed' },
  { id: 'grow', label: 'Grow', icon: '↟', shortcut: '2', state: 'growth' },
  { id: 'bloom', label: 'Bloom', icon: '✶', shortcut: '3', state: 'bloom' },
  { id: 'spores', label: 'Spores', icon: '⁕', shortcut: '4', state: 'mycelium' },
  { id: 'connect', label: 'Connect', icon: '⌁', shortcut: '5', state: 'ecosystem' },
  { id: 'prune', label: 'Prune', icon: '⌫', shortcut: '6', state: 'growth' },
  { id: 'nourish', label: 'Nourish', icon: '◌', shortcut: '7', state: 'bloom' },
  { id: 'mutate', label: 'Mutate', icon: '✣', shortcut: '8', state: 'mutation' },
  { id: 'species', label: 'Species', icon: '◎', shortcut: 'S', state: 'ecosystem' },
  { id: 'chaos', label: 'Chaos', icon: '※', shortcut: 'C', state: 'mutation' },
  { id: 'reset', label: 'Reset', icon: '↺', shortcut: 'R', state: 'seed' },
] as const;

export const systemNavigation = [
  'Ecosystem',
  'Organisms',
  'Roots',
  'Flowers',
  'Signals',
  'Audio',
  'Visuals',
  'Presets',
  'AI',
  'Settings',
] as const;

export const aiActions = [
  'Generate Species',
  'Mutate Species',
  'Describe Current Sound',
  'Suggest Improvements',
  'Generate Preset Names',
  'Explain Sound Design',
  'Create Ambient Variations',
  'Save Organism DNA',
] as const;

export const speciesProfiles: Record<SpeciesName, SpeciesProfile> = {
  Fern: {
    name: 'Fern',
    description: 'Feathery harmonic fronds with gentle recursive growth.',
    branchBias: 0.72,
    leafDensity: 0.86,
    particleBehavior: 'drift',
    growthSpeed: 0.58,
    motion: 'flutter',
    audioMapping: { roots: 'warm bass', leaves: 'soft highs', bloom: 'wide reverb' },
  },
  Moss: {
    name: 'Moss',
    description: 'Dense, low, granular life with clustered micro-motions.',
    branchBias: 0.34,
    leafDensity: 0.95,
    particleBehavior: 'swarm',
    growthSpeed: 0.28,
    motion: 'breathe',
    audioMapping: { roots: 'subtle bass', leaves: 'muted highs', bloom: 'short room' },
  },
  Coral: {
    name: 'Coral',
    description: 'Branching reef geometry with bright pulsing nodes.',
    branchBias: 0.88,
    leafDensity: 0.48,
    particleBehavior: 'pulse',
    growthSpeed: 0.42,
    motion: 'sway',
    audioMapping: { roots: 'stacked lows', leaves: 'glassy highs', bloom: 'tidal reverb' },
  },
  Flower: {
    name: 'Flower',
    description: 'Symmetrical bloom forms tuned for consonant openings.',
    branchBias: 0.54,
    leafDensity: 0.72,
    particleBehavior: 'spark',
    growthSpeed: 0.64,
    motion: 'breathe',
    audioMapping: { roots: 'round bass', leaves: 'open highs', bloom: 'large hall' },
  },
  Tree: {
    name: 'Tree',
    description: 'Stable trunk, deep roots, and broad harmonic canopy.',
    branchBias: 0.68,
    leafDensity: 0.62,
    particleBehavior: 'fall',
    growthSpeed: 0.38,
    motion: 'sway',
    audioMapping: { roots: 'deep bass', leaves: 'airy highs', bloom: 'woodland space' },
  },
  Vine: {
    name: 'Vine',
    description: 'Long curling tendrils that connect signal paths quickly.',
    branchBias: 0.81,
    leafDensity: 0.52,
    particleBehavior: 'drift',
    growthSpeed: 0.74,
    motion: 'spiral',
    audioMapping: { roots: 'rolling bass', leaves: 'moving highs', bloom: 'tape delay' },
  },
  Crystal: {
    name: 'Crystal',
    description: 'Angular growth with clean harmonics and sharp reflections.',
    branchBias: 0.46,
    leafDensity: 0.3,
    particleBehavior: 'spark',
    growthSpeed: 0.48,
    motion: 'breathe',
    audioMapping: { roots: 'focused bass', leaves: 'bright partials', bloom: 'shimmer' },
  },
  Alien: {
    name: 'Alien',
    description: 'Asymmetric organism with unstable mutation channels.',
    branchBias: 0.92,
    leafDensity: 0.58,
    particleBehavior: 'swarm',
    growthSpeed: 0.86,
    motion: 'glitch',
    audioMapping: { roots: 'warped bass', leaves: 'phase highs', bloom: 'unstable space' },
  },
  Mushroom: {
    name: 'Mushroom',
    description: 'Mycelial networks with soft caps and hidden routing.',
    branchBias: 0.6,
    leafDensity: 0.68,
    particleBehavior: 'pulse',
    growthSpeed: 0.36,
    motion: 'breathe',
    audioMapping: { roots: 'network bass', leaves: 'velvet highs', bloom: 'damp chamber' },
  },
};

export function deriveEcosystemMetrics(
  controls: BotanicalControls,
  species: SpeciesProfile,
): EcosystemMetric[] {
  const complexity = Math.round((controls.density + controls.evolution + species.branchBias * 100) / 3);
  const stability = Math.round(100 - controls.random * 0.55 - controls.evolution * 0.25);

  return [
    { label: 'Energy', value: `${controls.energy}%` },
    { label: 'Growth', value: `${controls.growth}%` },
    { label: 'Complexity', value: `${complexity}%` },
    { label: 'Mutations', value: `${Math.round(controls.evolution / 9)}` },
    { label: 'Stability', value: `${Math.max(12, stability)}%` },
  ];
}
