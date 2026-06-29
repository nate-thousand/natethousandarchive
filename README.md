# natethousandlabs-xyz

Static HTML prototypes and experiments.

**The single index is [`index.html`](index.html)** — open it with Live Server (port 5501 via the
workspace `.vscode/settings.json`). It lists **active** prototypes only (~4).

## Layout

- [`index.html`](index.html) — publishable prototype index
- [`prototypes/`](prototypes/) — active apps (top-level folders)
- [`prototypes/_archive/`](prototypes/_archive/) — frozen explorations, **local only** (gitignored)
- [`prototypes/README.md`](prototypes/README.md) — folder conventions + deploy notes
- [`SYNTH-DESIGN.md`](SYNTH-DESIGN.md) — methodology / lineage notes (if present)

## Active prototypes

| Folder | What |
|--------|------|
| `prototypes/dpad/` | Plantasonic D-pad mapping — open `index.html` via Live Server (run `npm run build` in `dpad/` once) |
| `prototypes/drop-drop/` | Shipped app ([`nate-thousand/drop-drop`](https://github.com/nate-thousand/drop-drop)) |
| `prototypes/floralizer/plantasonic-installation/` | Generative installation architecture (M1) |
| `prototypes/juno-flowers/` | ASCII garden synth — static HTML |

## Archive vs publish

- **`prototypes/_archive/`** — never pushed to GitHub, never deployed to Vercel. Browse locally only.
- **Everything else under `prototypes/`** — intended to publish (site index, per-app Vercel, or own repo).

Enforced by [`.gitignore`](.gitignore) and [`.vercelignore`](.vercelignore).

## Conventions

- **Active vs archived.** Ship from top-level `prototypes/<name>/`. When retiring, move to `_archive/` and drop from `index.html`.
- **Naming:** lowercase kebab-case. Variants use a suffix (`eq-2`, `plantasia-synth-phaser`).
- **Flat folders** — one `index.html` (or Vite entry) per folder; no nested `versions/`.

## Notes

- Active Plantasia product development lives in [`../plantasonic-xyz/`](../plantasonic-xyz/).
- Archived Plantasia explorations (`plantasia-*`, old synths, sketches, etc.) are in `prototypes/_archive/`.
- See the [workspace README](../README.md) for the overall structure.

To add a prototype: create `prototypes/<name>/`, add a row to `index.html`. To retire one: move it to `_archive/`.
