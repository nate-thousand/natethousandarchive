/**
 * Plantasia — Icon registry.
 *
 * Maps semantic, domain-specific icon names to Bootstrap Icons class names.
 * Components reference these keys (via the `<Icon>` primitive), never raw
 * `bi-*` strings, so the underlying icon set can be swapped centrally.
 */
export const icons = {
  // Navigation / pages
  home: 'bi-house',
  studio: 'bi-easel',
  performance: 'bi-broadcast',
  speciesLibrary: 'bi-flower1',
  presetLibrary: 'bi-collection',
  ai: 'bi-stars',
  settings: 'bi-sliders',
  docs: 'bi-journal-text',
  about: 'bi-info-circle',

  // Domain — the living vocabulary
  seed: 'bi-circle',
  growth: 'bi-graph-up-arrow',
  roots: 'bi-diagram-3',
  leaves: 'bi-flower3',
  bloom: 'bi-flower2',
  spores: 'bi-asterisk',
  sunlight: 'bi-brightness-high',
  water: 'bi-droplet',
  wind: 'bi-wind',
  soil: 'bi-layers',
  life: 'bi-heart-pulse',
  energy: 'bi-lightning-charge',
  mutation: 'bi-shuffle',
  harmony: 'bi-music-note-beamed',
  evolution: 'bi-infinity',
  dna: 'bi-bezier2',

  // Transport / controls
  play: 'bi-play-fill',
  pause: 'bi-pause-fill',
  stop: 'bi-stop-fill',
  record: 'bi-record-circle',
  mute: 'bi-volume-mute',
  volume: 'bi-volume-up',
  metronome: 'bi-clock',

  // UI affordances
  expand: 'bi-arrows-angle-expand',
  collapse: 'bi-arrows-angle-contract',
  menu: 'bi-list',
  close: 'bi-x-lg',
  chevronLeft: 'bi-chevron-left',
  chevronRight: 'bi-chevron-right',
  chevronDown: 'bi-chevron-down',
  add: 'bi-plus-lg',
  remove: 'bi-dash-lg',
  search: 'bi-search',
  save: 'bi-bookmark',
  random: 'bi-dice-5',
  expert: 'bi-toggles',
  accessibility: 'bi-universal-access',
  warning: 'bi-exclamation-triangle',
  check: 'bi-check-lg',
} as const;

export type IconName = keyof typeof icons;
