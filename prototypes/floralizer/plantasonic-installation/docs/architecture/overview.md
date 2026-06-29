# Architecture Overview

Plantasonic is organized into three horizontal layers:

1. **Data layer** (`config/`, `definitions/`) — the durable, committed description of the installation. Style DNA, asset metadata, behavior/scene/transition libraries.
2. **System layer** (`src/`) — modular, independent runtime systems that consume the data layer.
3. **Artifact layer** (`assets/`) — derived, reproducible, git-ignored binary outputs (generated images, variants, textures, video).

## Runtime data flow

```
audio in → Audio Intelligence → AI Director → State Engine → Behavior Engine → Scene Graph → Realtime Renderer → display
                                     ▲                                              ▲
                                     └──────────────── definitions + config ───────┘
                                  Generative Asset Pipeline supplies cached visuals
```

## Module ownership

| Concern | Owner | Milestone |
|---------|-------|-----------|
| Visual identity | `config/style-dna.json` | 1 |
| Asset metadata | `definitions/botanical-assets.json` | 1 |
| Prompting / queue / cache / variants | `src/generation/*` | 1 |
| Scene composition | `src/scene/`, `src/renderer/sceneGraph.ts` | 2 |
| Audio features + mood | `src/audio/` | 3 |
| Per-node reactivity | `src/behavior/*` | 4 |
| Curation | `src/director/` (added M5) | 5 |
| Canonical state | `src/state/` | 6 |
| Rendering | `src/renderer/*` | 7 |
| Orchestration | `src/installation/installationEngine.ts` | 8 |
| Adaptive quality | `src/installation/performanceMode.ts` | 9 |

## Boundaries (invariants)

- The renderer never owns state — it reads from the State Engine.
- The audio layer only *analyzes*; it never modifies the sound engine.
- Visual identity exists only in Style DNA.
- No system hardcodes content — content comes from `definitions/`.
