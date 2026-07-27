# Prototype Lab Archive

Static HTML prototypes and experiments.

> **Status:** Historical prototype lab. Active flagship projects are listed on the [GitHub profile](https://github.com/nate-thousand).

**The single index is [`index.html`](index.html)** — open it with Live Server (port 5501 via the
workspace `.vscode/settings.json`). It lists **active** prototypes only.

**GitHub:** [nate-thousand/natethousandarchive](https://github.com/nate-thousand/natethousandarchive)

## Layout

- [`index.html`](index.html) — publishable prototype index
- [`prototypes/`](prototypes/) — active apps (top-level folders)
- [`prototypes/_archive/`](prototypes/_archive/) — frozen explorations, **local only** (gitignored)
- [`prototypes/README.md`](prototypes/README.md) — folder conventions + deploy notes

## Active prototypes

| Folder | Entry | Notes |
|--------|-------|-------|
| [`prototypes/dpad/`](prototypes/dpad/) | [`index.html`](prototypes/dpad/index.html) | Plantasonic D-pad mapping — pre-built bundle, works on Live Server |
| [`prototypes/floralizer/plantasonic-installation/`](prototypes/floralizer/plantasonic-installation/) | `README.md` | Generative installation architecture (M1) |
| [`prototypes/juno-flowers/`](prototypes/juno-flowers/) | [`index.html`](prototypes/juno-flowers/index.html) | ASCII garden synth — static HTML |
| [`prototypes/plantasia-engine-test/`](prototypes/plantasia-engine-test/) | [`index.html`](prototypes/plantasia-engine-test/index.html) | Engine spike — Vite + React (`npm install && npm run dev`) |

**Shipped / archived:** [Drop Drop](https://github.com/nate-thousand/drop-drop) — local copy in `prototypes/_archive/drop-drop/`.

## Archive vs publish

- **`prototypes/_archive/`** — never pushed to GitHub, never deployed to Vercel. Browse locally only.
- **Everything else under `prototypes/`** — published via [natethousandarchive](https://github.com/nate-thousand/natethousandarchive).

Enforced by [`.gitignore`](.gitignore) and [`.vercelignore`](.vercelignore).

## Conventions

- **Active vs archived.** Ship from top-level `prototypes/<name>/`. When retiring, move to `_archive/` and update `index.html`.
- **Naming:** lowercase kebab-case. Variants use a suffix (`eq-2`, `plantasia-synth-phaser`).
- **Flat folders** — one `index.html` (or Vite entry) per folder; no nested `versions/`.
- **D-pad builds:** after editing `prototypes/dpad/src/`, run `npm run build` in that folder and commit `dist/`.

## Notes

- Active Plantasia product development lives in [`../plantasonic-xyz/`](../plantasonic-xyz/).
- Archived Plantasia explorations (`plantasia-*`, old synths, sketches, etc.) are in `prototypes/_archive/`.
- See the [workspace README](../README.md) for the overall structure.

To add a prototype: create `prototypes/<name>/`, add a row to `index.html`. To retire one: move it to `_archive/`.

