# Plantasonic

**An AI-first, data-driven, real-time generative botanical installation.**

Plantasonic is a living, audio-reactive garden of bioluminescent specimens. Instead of shipping a static library of hundreds of images, the installation is described entirely by **definitions, configuration, and modular systems**. Visuals are produced by an AI generation pipeline, expanded with procedural variation, arranged by a scene graph, animated by an audio-driven behavior engine, and curated in real time by an AI director.

> **Status:** Milestone 1 — *Generative Asset Pipeline* (foundational architecture). No rendering, no AI generation, and no static image library exist yet. This milestone establishes the scalable foundation everything else plugs into.

---

## Vision

- **AI first** — every visual asset originates from a generative model, described by metadata and the project's Style DNA rather than hand-authored files.
- **Data driven** — assets, behaviors, scenes, and transitions are all defined in JSON. Code consumes definitions; it does not hardcode content.
- **Real time** — the installation renders and reacts live to sound, never plays back pre-rendered video.
- **Modular & reusable** — each system (generation, scene graph, audio, behavior, director, state, renderer) is independent and composable.
- **Scalable** — a handful of base assets expand into endless variety through procedural transforms, so the repo never bloats with image dumps.

---

## Architecture Overview

The runtime is a one-directional pipeline orchestrated by the Installation Engine:

1. **Audio Intelligence** analyzes incoming sound into a normalized `AudioFrame` + mood vector.
2. **AI Director** reads mood/time and decides which **Scene** and **Transitions** to run.
3. **State Engine** holds the canonical truth (active scene, transition, mood, preset).
4. **Behavior Engine** evaluates per-node behaviors against the audio frame.
5. **Realtime Renderer** walks the **Scene Graph**, composites layers, and applies the Style DNA look.
6. **Performance Mode** monitors frame timing and adapts quality.

Content for all of this comes from the **definition + configuration layer**, and visuals come from the **Generative Asset Pipeline** (prompt builder → queue → provider → cache → procedural variants).

### System Diagram

```
                         ┌───────────────────────────────────────────────┐
                         │              DEFINITIONS + CONFIG               │
                         │  style-dna.json · botanical-assets.json         │
                         │  behavior/scene/transition-library.json         │
                         │  render-config.json · audio-config.json         │
                         └───────────────┬───────────────────────────────┘
                                         │ (data drives everything)
                                         ▼
   ┌──────────────────────────── GENERATIVE ASSET PIPELINE ────────────────────────────┐
   │  promptBuilder ──▶ assetQueue ──▶ [provider adapters*] ──▶ assetCache               │
   │                                            └──────────▶ proceduralVariants          │
   └───────────────────────────────────────────┬───────────────────────────────────────┘
                                                │ cached assets + variants
                                                ▼
        ┌──────────────┐     ┌──────────────┐     ┌───────────────┐     ┌──────────────┐
 audio  │    AUDIO     │────▶│  AI DIRECTOR │────▶│ STATE ENGINE  │────▶│  BEHAVIOR    │
 in ───▶│ INTELLIGENCE │     │  (curator)   │     │ (truth store) │     │   ENGINE     │
        └──────────────┘     └──────────────┘     └───────┬───────┘     └──────┬───────┘
                                                          │                    │
                                                          ▼                    ▼
                                                  ┌───────────────────────────────────┐
                                                  │           SCENE GRAPH             │
                                                  └────────────────┬──────────────────┘
                                                                   ▼
                                                  ┌───────────────────────────────────┐
                                                  │        REALTIME RENDERER          │
                                                  │  layers · camera · post-process   │
                                                  └────────────────┬──────────────────┘
                                                                   ▼
        ┌────────────────────────── INSTALLATION ENGINE (orchestrator) ──────────────────────────┐
        │           master loop · lifecycle · PERFORMANCE MODE (adaptive quality)                 │
        └─────────────────────────────────────────────────────────────────────────────────────────┘

  * provider adapters (Midjourney, Flux, SDXL, Sora, ...) are added in a later milestone.
```

---

## Folder Structure

```
plantasonic-installation/
├── README.md                 # this file
├── ROADMAP.md                # ten-milestone architecture
├── package.json              # project + version (0.1.0)
├── tsconfig.json             # strict TypeScript config + path aliases
├── .gitignore
├── docs/
│   ├── architecture/         # system design docs
│   ├── concepts/             # vision, aesthetic, philosophy
│   └── research/             # references, experiments
├── assets/                   # binary outputs (git-ignored, never committed)
│   ├── definitions/          # generated/derived definition artifacts
│   ├── cache/                # content-addressed generated assets
│   ├── generated/            # raw model outputs
│   ├── source/               # source inputs for generation
│   ├── videos/               # generated/derived video
│   └── textures/             # generated/derived textures
├── config/
│   ├── style-dna.json        # single source of truth for visual identity
│   ├── render-config.json    # renderer budgets + quality presets
│   └── audio-config.json     # audio analysis + reactivity contract
├── definitions/              # the data layer (committed, drives the system)
│   ├── botanical-assets.json # metadata-only asset definitions
│   ├── behavior-library.json # reusable audio + motion behaviors
│   ├── scene-library.json    # composed, layered scenes
│   └── transition-library.json
├── src/
│   ├── audio/                # M3 audio intelligence
│   ├── behavior/             # M4 behaviorEngine, audioMappings, stateMachine
│   ├── camera/               # M7 camera primitives
│   ├── generation/           # M1 promptBuilder, assetQueue, assetCache, proceduralVariants
│   ├── installation/         # M8/M9 installationEngine, performanceMode
│   ├── renderer/             # M7 sceneGraph, layerManager, cameraController
│   ├── scene/                # M2 scene loader/composer
│   ├── state/                # M6 state engine
│   ├── ui/                   # operator/debug interface
│   └── utils/                # shared helpers
├── tests/
└── scripts/
```

> **Why is `assets/` git-ignored?** Generated imagery is reproducible from definitions + Style DNA + cache keys. Committing hundreds of images would defeat the data-driven design. The definition layer is the durable artifact; the pixels are derived.

---

## Development Philosophy

- **Definitions over assets.** If you find yourself adding image files by hand, stop — add a definition instead.
- **One source of truth.** Visual identity lives only in `config/style-dna.json`. Never duplicate palette/lighting/dither settings elsewhere.
- **Contracts before code.** Each module ships a documented contract (purpose, responsibilities, dependencies, future notes) before implementation, so systems can be designed against stable interfaces.
- **Deterministic + cacheable.** Prompts, hashes, and procedural variants are deterministic so results are reproducible and never duplicated.
- **Plug in, don't restructure.** Every future milestone attaches to this foundation without reshaping it.
- **Respect boundaries.** The audio analysis layer never modifies the sound engine; the renderer never owns state; UI never owns state.

---

## Getting Started (developers)

```bash
# install dev tooling (TypeScript)
npm install

# type-check the architecture contracts
npm run typecheck
```

There is intentionally nothing to run yet — Milestone 1 is an architectural pass. See [ROADMAP.md](./ROADMAP.md) for what comes next.

---

## Next Milestone

**Milestone 2 — Botanical Scene Graph:** turn the flat asset/scene definitions into a composable, layered, navigable runtime tree. See the roadmap for goals and the completion checklist.
