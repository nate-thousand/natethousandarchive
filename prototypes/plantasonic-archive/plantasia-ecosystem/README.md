# 🌱 Plantasia

**A living sound ecosystem.** Plantasia is not a synthesizer — it is a digital garden
where you cultivate organisms that generate music through growth, evolution, and
mutation. Tend it, and it sings.

Plantasia is, at once:

- a musical instrument,
- a generative art installation,
- an educational synthesis tool, and
- an ambient performance environment.

---

## Quick start

**Do not use Live Server, “Open with Live Preview”, or open `index.html` directly.**
This app is TypeScript + React and must run through Vite.

```bash
cd plantasia-ecosystem   # from the prototypes folder
npm install         # install dependencies
npm start           # free stale ports + start Vite → http://localhost:5180
npm run build       # type-check + production build
npm run preview     # preview the production build
```

When the dev server is running, look for the **v2.1** badge in the top bar.
If you see “Wrong server — use Vite, not Live Server”, close that tab and use the URL above.

Other scripts:

```bash
npm run typecheck     # strict TypeScript, no emit
npm run lint          # ESLint
npm run format        # Prettier (write)
npm run test          # Vitest (run once)
npm run test:watch    # Vitest (watch)
```

> Audio requires a user gesture to start (browser policy). Click **Bring it to
> life** / **Perform**, or press **Space**.

---

## Tech stack

React · TypeScript · Vite · Bootstrap 5.0.2 (layout/utilities only) · Tone.js ·
GSAP · Canvas + SVG · CSS Variables · React Router · Bootstrap Icons · ESLint ·
Prettier · Vitest.

---

## Architecture

Plantasia is organized by **domain**, with strict separation between UI, audio,
visualization, and business logic. Each layer is independently testable and only
talks to the layers below it.

```text
src/
  app/              App root, router, navigation manifest
  components/
    common/         Cross-cutting UI (Page scaffold)
    ecosystem/      Domain-aware reusable UI (GeneList, SignalBars, SpeciesCard)
    layout/         The five-region shell (TopBar, sidebars, center, bottom)
  design-system/
    tokens/         CSS-variable tokens (colors, type, spacing, motion, effects, icons)
    components/      Reusable primitives (Button, Knob, Slider, Panel, ...)
  audio/            Tone.js engine, effects, gene→param mapping, presets
  species/          The Species framework (definitions, genes, registry)
  visualization/    Procedural organism generator + Canvas renderer + particles
  hooks/            React hooks (renderer wiring, GSAP, media query, shortcuts)
  context/          Global state providers (Preferences, Ecosystem, Audio)
  services/         Storage + AI insight (swappable business logic)
  utils/            Pure helpers (math, random, ids, classnames)
  pages/            Routed pages (Home, Studio, Performance, Libraries, ...)
  styles/           Global stylesheet, Bootstrap overrides, animations
```

Path aliases (`@audio`, `@species`, `@design-system`, …) keep imports clean; see
`tsconfig.app.json` and `vite.config.ts`.

### Data flow

```text
Preferences ─┐
             ├─► Ecosystem (active organism: species + genes + seed)
             │       │
             │       ├─► AudioEngine  (Tone.js)  ──► live analysis bands ─┐
             │       └─► OrganismRenderer (Canvas) ◄──────────────────────┘
             └─► theme / motion / volume
```

The **ecosystem** is the single source of truth. Audio and visualization both
derive from it; the renderer reacts to the audio engine's analysis in real time
(bass → roots, mid → branches, treble → leaves, noise → spores, level → bloom).

---

## Design system

A complete, token-driven design system. **CSS variables are the single source of
truth** for every value; TypeScript reads them (never hardcodes). Bootstrap is
used purely for layout/utilities — its visual identity is fully overridden in
`src/styles/bootstrap-overrides.css`.

Tokens: colors (palette + semantic), typography, spacing, radius, borders,
elevation, motion (durations/easings), opacity, blur, glow, and icons. Theming
(dark / high-contrast) and reduced-motion are first-class.

See [`docs/SYNTH-DESIGN.md`](docs/SYNTH-DESIGN.md) for the design philosophy and
the garden→synthesis vocabulary.

---

## Accessibility

Keyboard shortcuts (Space = perform, M = pulse), full ARIA semantics on custom
controls, a skip link, screen-reader-only readouts for the canvas, high-contrast
theme, and reduced-motion support (OS preference + manual toggle).

---

## Documentation

- [VISION.md](docs/VISION.md) — what Plantasia is and why.
- [ROADMAP.md](docs/ROADMAP.md) — where it's going.
- [SYNTH-DESIGN.md](docs/SYNTH-DESIGN.md) — design system + synthesis mapping.
- [CHANGELOG.md](docs/CHANGELOG.md) — release history.

## License

MIT.
