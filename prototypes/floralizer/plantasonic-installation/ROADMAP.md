# Plantasonic — Roadmap

A ten-milestone architecture for an **AI-first, data-driven, real-time generative botanical installation**.

Every milestone builds on the foundation established in Milestone 1 and plugs into it without restructuring. The guiding principle throughout: **definitions and configuration drive the system; we never ship a static library of hundreds of images.**

| # | Milestone | Status |
|---|-----------|--------|
| 1 | Generative Asset Pipeline | ✅ Foundation complete |
| 2 | Botanical Scene Graph | ⬜ Next |
| 3 | Audio Intelligence | ⬜ Planned |
| 4 | Behavior Engine | ⬜ Planned |
| 5 | AI Director | ⬜ Planned |
| 6 | State Engine | ⬜ Planned |
| 7 | Realtime Renderer | ⬜ Planned |
| 8 | Installation Engine | ⬜ Planned |
| 9 | Performance Mode | ⬜ Planned |
| 10 | Version 1.0 Release | ⬜ Planned |

---

## Milestone 1 — Generative Asset Pipeline

**Goals**
- Establish the metadata-driven foundation the whole project builds on.
- Define how AI-generated assets are described, prompted, queued, cached, and varied — without generating a single image yet.

**Deliverables**
- Full project structure (`docs/`, `assets/`, `config/`, `src/`, `definitions/`, `tests/`, `scripts/`).
- `config/style-dna.json` — single source of truth for visual identity.
- `definitions/botanical-assets.json` — metadata-only asset definitions.
- `src/generation/promptBuilder.ts`, `assetQueue.ts`, `assetCache.ts`, `proceduralVariants.ts` (documented contracts).

**Completion checklist**
- [x] Folder structure created and version-controlled.
- [x] Style DNA authored (palette, lighting, dithering, composition, negatives, suffix, animation language, future models).
- [x] Botanical assets defined as metadata only — no images.
- [x] Prompt builder reads Style DNA + definitions and supports variables, providers, versioning (contract).
- [x] Asset queue supports missing/retry/batch/priority/workers (contract).
- [x] Asset cache supports hashing, dedupe, versioning, metadata, history (contract).
- [x] Procedural variant system documents all planned operations.

**Future expansion notes**
- Add provider adapters (Midjourney, Flux, SDXL, Sora) behind the prompt builder.
- Add a background worker runtime for the queue.
- Wire `proceduralVariants` realtime ops into the renderer.

---

## Milestone 2 — Botanical Scene Graph

**Goals**
- Turn flat asset definitions into composable, layered, navigable scenes.

**Deliverables**
- `src/scene/` scene loader/composer.
- `src/renderer/sceneGraph.ts` runtime tree implementation.
- Validation for `definitions/scene-library.json`.

**Completion checklist**
- [ ] Scene definitions parse and validate.
- [ ] Scene graph instantiates nodes from layer/asset references.
- [ ] Add/remove/reparent + traversal implemented.
- [ ] Asset and behavior ids resolve against definition libraries.

**Future expansion notes**
- Nested sub-scenes and reusable scene fragments.
- Spatial indexing for large scenes.

---

## Milestone 3 — Audio Intelligence

**Goals**
- Produce a rich, normalized analysis of incoming audio for the rest of the system. (Analysis only — the existing sound engine is untouched.)

**Deliverables**
- `src/audio/` capture + FFT + feature extraction.
- Rolling mood vectors (energy, valence, density, brightness).

**Completion checklist**
- [ ] Input sources selectable per `config/audio-config.json`.
- [ ] Core features extracted (RMS, bands, centroid, flux, ZCR, onsets, tempo).
- [ ] Mood vectors published on a stable interval.
- [ ] `AudioFrame` contract finalized for downstream consumers.

**Future expansion notes**
- ML-based genre/instrument tagging.
- Multi-source mixing and ducking.

---

## Milestone 4 — Behavior Engine

**Goals**
- Make specimens feel alive and audio-reactive by evaluating behaviors per frame.

**Deliverables**
- `src/behavior/behaviorEngine.ts`, `audioMappings.ts`, `stateMachine.ts` implementations.

**Completion checklist**
- [ ] Behavior ids resolve from `behavior-library.json`.
- [ ] Motion + audio behaviors combine deterministically per node.
- [ ] Audio→parameter mappings are data-driven and tunable.
- [ ] FSM primitive drives per-asset state.

**Future expansion notes**
- Behavior blending and weighted layering.
- Authoring tools for new behaviors.

---

## Milestone 5 — AI Director

**Goals**
- An autonomous curator that selects scenes, transitions, and intensity based on audio mood and time, keeping the installation fresh and intentional.

**Deliverables**
- `src/director/` (added this milestone) decision engine consuming mood + state.

**Completion checklist**
- [ ] Maps mood vectors to scene/transition choices.
- [ ] Schedules transitions using `transition-library.json`.
- [ ] Avoids repetition; supports pacing and "energy arcs".
- [ ] Exposes manual override hooks.

**Future expansion notes**
- LLM-driven narrative arcs.
- Learned preferences from past sessions.

---

## Milestone 6 — State Engine

**Goals**
- A single canonical runtime store all systems read from and subscribe to.

**Deliverables**
- `src/state/` store with subscribe/select, snapshot/restore.

**Completion checklist**
- [ ] Canonical state holds active scene, transition, mood, preset, intent.
- [ ] Subscriptions/selectors implemented.
- [ ] Snapshot/restore for resilience.
- [ ] Integrated with `behavior/stateMachine.ts`.

**Future expansion notes**
- Time-travel debugging and session replay.
- Networked/multi-display shared state.

---

## Milestone 7 — Realtime Renderer

**Goals**
- Render the scene graph at 60fps with the signature dithered, bloomed, layered look.

**Deliverables**
- `src/renderer/layerManager.ts`, `cameraController.ts` implementations + render loop.
- Post-processing chain (dither, bloom, grain, vignette).

**Completion checklist**
- [ ] Layered compositing with blend modes + parallax.
- [ ] Camera presets and idle drift.
- [ ] Post-processing matches Style DNA.
- [ ] Realtime procedural ops applied on GPU.

**Future expansion notes**
- WebGPU backend.
- Multi-display / projection mapping.

---

## Milestone 8 — Installation Engine

**Goals**
- Orchestrate all subsystems into one robust runtime.

**Deliverables**
- `src/installation/installationEngine.ts` implementation + master loop.

**Completion checklist**
- [ ] Subsystems initialize in correct order.
- [ ] Master loop: audio → director → behavior → render.
- [ ] Lifecycle (start/pause/resume/stop) + recovery.
- [ ] Metrics surfaced to Performance Mode.

**Future expansion notes**
- Remote control / show-control integration.
- Scheduled programming.

---

## Milestone 9 — Performance Mode

**Goals**
- Run smoothly for hours/days on varied hardware.

**Deliverables**
- `src/installation/performanceMode.ts` implementation.

**Completion checklist**
- [ ] Live FPS/frame-time sampling.
- [ ] Adaptive quality preset stepping.
- [ ] Particle/bloom/render-scale throttling under load.
- [ ] Kiosk lock mode.

**Future expansion notes**
- Per-GPU calibration profiles.
- Thermal-aware throttling.

---

## Milestone 10 — Version 1.0 Release

**Goals**
- Ship a stable, documented, deployable installation.

**Deliverables**
- Packaging, deployment scripts in `scripts/`, full docs, demo configuration.

**Completion checklist**
- [ ] End-to-end run verified on target hardware.
- [ ] Documentation complete (`docs/`).
- [ ] Versioned release tagged.
- [ ] Reproducible build + deploy.

**Future expansion notes**
- Plugin ecosystem for new asset/behavior packs.
- Cloud-synced installations.

---

## Versioning

The project version is tracked in `package.json`. Milestone 1 sets the version to `0.1.0`. Each subsequent milestone bumps the minor version; `1.0.0` corresponds to Milestone 10.
