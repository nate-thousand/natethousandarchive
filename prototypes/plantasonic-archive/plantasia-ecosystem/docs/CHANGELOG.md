# Changelog

All notable changes to Plantasia are documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/), and this project adheres to
[Semantic Versioning](https://semver.org/).

## [2.0.0] — Foundation

The first release of the rebuilt Plantasia: a living sound ecosystem, architected
from scratch for long-term scalability.

### Added

- **Architecture** — domain-driven structure with strict separation of UI,
  audio, visualization, and business logic; path aliases for every layer.
- **Design system** — complete CSS-variable token system (colors, typography,
  spacing, radius, borders, elevation, motion, opacity, blur, glow, icons), a
  typed TS access layer, dark + high-contrast themes, and a full Bootstrap
  override layer. Reusable primitives: Button, IconButton, Icon, Panel, Badge,
  Knob, Slider, Switch, SegmentedControl, Divider.
- **Application shell** — responsive, mobile-first five-region layout (Top Status
  Bar, Left Cultivation Sidebar, Center Living Ecosystem, Right Information
  Panels, Bottom Performance Controls) with off-canvas drawers on small screens.
- **Living ecosystem** — procedural organism generator (roots, branches, leaves,
  blooms, nodes, spores, connections) and a continuously-animating Canvas
  renderer with full real-time audio reactivity and a particle system.
- **Audio engine** — Tone.js-based engine with subtractive / FM / AM(physical) /
  noise voices, an effect chain (reverb, delay, chorus, tremolo), gene→parameter
  mapping, a generative transport, master bus, and real-time frequency analysis.
- **Species framework** — 9 species archetypes (Fern, Tree, Flower, Moss, Coral,
  Mushroom, Crystal, Alien, Vine), a registry, and factory presets. Genes/DNA
  with encode, decode, mutate, crossbreed, and randomize.
- **Pages** — Home, Studio, Performance, Species Library, Preset Library, AI
  Laboratory, Settings, Documentation, About, with React Router navigation.
- **AI Laboratory** — local-heuristic insight service (describe, suggest
  mutations, name, intelligent randomize) behind a swappable interface.
- **Animation framework** — GSAP-powered staggered entrances + ambient CSS
  keyframes, all reduced-motion aware.
- **Accessibility** — keyboard shortcuts, ARIA roles on custom controls, skip
  link, screen-reader readouts, high-contrast theme, reduced-motion support.
- **Tooling** — Vite, strict TypeScript, ESLint, Prettier, Vitest (with initial
  unit tests), and vendor code-splitting.
