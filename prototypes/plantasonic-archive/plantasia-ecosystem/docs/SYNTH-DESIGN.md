# Synthesis & Design

This document covers two things: the **design system** that gives Plantasia its
atmosphere, and the **synthesis-through-nature** vocabulary that hides technical
jargon behind a living garden.

---

## Design system

### Tokens are the single source of truth

Every visual value lives once, as a **CSS variable**, in
`src/design-system/tokens`. Components consume only **semantic** tokens (e.g.
`--color-accent`), never raw palette values. TypeScript and the Canvas renderer
read these variables at runtime (`resolveToken`) — so the rule *"no hardcoded
colors, no magic numbers"* holds even in imperative code.

Token groups: **colors** (palette + semantic), **typography**, **spacing**,
**radius**, **borders**, **elevation**, **motion** (durations + easings),
**opacity**, **blur**, **glow**, **icons**.

### Bootstrap, neutralized

Bootstrap 5.0.2 provides only the grid and utility classes. Its entire visual
identity is overridden in `styles/bootstrap-overrides.css` by remapping
Bootstrap's own variables onto Plantasia tokens.

### Theming

`data-theme` on `<html>` switches between `dark` and `high-contrast`.
`data-reduced-motion` collapses animation. Both are driven by the Preferences
context and persisted.

### Visual direction

Minimal · organic · dark · living · atmospheric · monochromatic. Palette: black,
charcoal, deep forest, moss, muted lime, warm white. Subtle bloom, hairline
borders, soft gradients, animated backgrounds, fine film grain, and large
amounts of negative space.

### Motion

Nothing moves linearly. Easings (`--ease-organic`, `--ease-breath`,
`--ease-bloom`) evoke breathing and growth; durations are long and calm. GSAP
handles orchestrated entrances; CSS keyframes cover always-on ambient life.

---

## Synthesis through nature

Plantasia renames synthesis concepts as natural phenomena. The mapping is exact —
learning the garden *is* learning synthesis.

| In the garden | In synthesis        | What it does                         |
| ------------- | ------------------- | ------------------------------------ |
| Seed          | Oscillator / source | Where every sound begins             |
| Growth        | Envelope (ADSR)     | How a sound emerges and fades        |
| Roots         | Filter              | Shapes the low, grounding frequencies|
| Leaves        | High harmonics      | The bright detail up top             |
| Bloom         | Reverb              | Space and spatial expansion          |
| Spores        | Noise / granular    | Texture and grit                     |
| Sunlight      | Filter cutoff       | Brightness and openness              |
| Water         | Resonance           | Body and moisture of the tone        |
| Wind          | LFO / modulation    | Movement over time                   |
| Soil          | Sub / low-end       | Weight and grounding                 |
| Life          | Release / sustain   | How long a sound lingers             |
| Energy        | Amplitude / voices  | Vitality and presence                |
| Harmony       | Overtones / chords  | Harmonic richness                    |
| Mutation      | Randomization       | Controlled chance                    |
| Evolution     | Generative variation| Music that grows itself              |

### Genes → parameters

The eight **genes** (Sunlight, Water, Wind, Soil, Energy, Harmony, Growth, Life)
are normalized `0..1`. They are mapped to real synthesis units at a single
boundary — `audio/engine/geneMapping.ts` — so the UI and species data never deal
with Hz/dB/seconds directly. Genes serialize to a compact **DNA** string for
sharing and reproducibility.

### Audio → visualization

The renderer reads the engine's live analysis each frame:

- **Bass** stirs and thickens the **roots**.
- **Mid** sways the **branches**.
- **Treble** pulses the **leaves**.
- **Noise** sheds **spores** (particles).
- **Level** drives the **bloom** glow and overall breathing.
