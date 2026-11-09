# Style DNA — Schema Reference

`config/style-dna.json` is the **single source of truth** for Plantasonic's visual identity. Every prompt, procedural variant, and renderer pass derives its look from this file. No other file may duplicate these values.

## Top-level fields

| Field | Type | Purpose |
|-------|------|---------|
| `version` | string | Semver of the Style DNA. Contributes to cache keys. |
| `name` / `description` | string | Human context. |
| `visualLanguage` | object | Summary, keywords, references, mood. |
| `palette` | object | Indexed color model, primary/accent/neutral ramps, `maxColors`. |
| `background` | object | Background gradient, vignette, grain. |
| `lighting` | object | Emissive model, rim light, bloom settings, shadow rules. |
| `pixelDensity` | object | Authoring resolution, render scale, pixel grid, upscale strategy. |
| `dithering` | object | Algorithm, matrix size, strength, targets. |
| `texture` | object | Surface rules and overlays. |
| `composition` | object | Framing, aspect ratios, symmetry, negative space. |
| `negativePrompts` | string[] | Global exclusions appended to every prompt. |
| `promptSuffix` | string | Style clause appended after each asset's `promptSubject`. |
| `animationLanguage` | object | Easing, tempo, motion primitives, audio coupling. |
| `futureAIModels` | object | Primary + planned providers; abstraction notes. |

## Rules

- **Cache impact:** changing `version` (and most nested values) changes generated-asset cache keys, triggering regeneration. Bump intentionally.
- **Model agnostic:** adding a provider must not require editing this file — provider syntax lives in adapters.
- **Quantization first:** color count is capped (`palette.maxColors`) to preserve the indexed, dithered aesthetic.

## Consumers

- `src/generation/promptBuilder.ts` — composes prompts.
- `src/generation/proceduralVariants.ts` — dithering matrix, palette, pixel grid.
- `src/renderer/*` — post-processing (bloom, dither, grain, vignette).
