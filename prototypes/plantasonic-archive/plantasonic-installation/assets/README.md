# assets/ — Artifact Layer

This directory holds **derived, reproducible binary outputs**. With the exception of `.gitkeep` markers and this README, its contents are **git-ignored** (see `.gitignore`). Nothing here is a source of truth — every artifact can be regenerated from `definitions/` + `config/style-dna.json` + cache keys.

| Folder | Contents |
|--------|----------|
| `definitions/` | Generated/derived definition artifacts (e.g. expanded variant manifests). |
| `cache/` | Content-addressed generated assets, keyed by hash (see `src/generation/assetCache.ts`). |
| `generated/` | Raw model outputs before processing. |
| `source/` | Source inputs fed into generation (reference frames, masks). |
| `videos/` | Generated/derived video. |
| `textures/` | Generated/derived textures and overlays. |

> Do **not** hand-add image files here. Add a definition in `definitions/` instead. This keeps the project data-driven and the repository small.
