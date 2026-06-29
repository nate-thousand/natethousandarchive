# Prototypes

Active experiments live as **top-level folders** here. Frozen / superseded work lives in
[`_archive/`](_archive/) and is **gitignored + excluded from Vercel** — keep it locally for
reference, but do not publish it.

**GitHub:** [nate-thousand/natethousandarchive](https://github.com/nate-thousand/natethousandarchive)

## Active (publishable)

| Folder | Entry | Notes |
|--------|-------|-------|
| [`dpad/`](dpad/) | [`index.html`](dpad/index.html) | Plantasonic D-pad mapping — pre-built `dist/assets/dpad.js` committed for Live Server |
| [`floralizer/plantasonic-installation/`](floralizer/plantasonic-installation/) | `README.md` | M1 installation architecture (TypeScript, no web UI yet) |
| [`juno-flowers/`](juno-flowers/) | [`index.html`](juno-flowers/index.html) | ASCII garden synth — static deploy via `vercel.json` |
| [`plantasia-engine-test/`](plantasia-engine-test/) | [`index.html`](plantasia-engine-test/index.html) | Engine spike — `npm install && npm run dev` |

**Shipped externally:** [Drop Drop](https://github.com/nate-thousand/drop-drop) — local archive at `_archive/drop-drop/`.

## Archive (local only)

[`_archive/`](_archive/) holds **39** frozen prototypes (Plantasia explorations, old EQ/shapes
iterations, AI card generator, sampler, drop-drop, etc.). The folder is listed in `.gitignore` and
`.vercelignore` so it never reaches GitHub or Vercel.

To browse archived work locally, open paths under `prototypes/_archive/<name>/index.html`
with Live Server. They are intentionally **not** linked from the root [`index.html`](../index.html).

## Conventions

- **Naming:** lowercase kebab-case (`eq`, `eq-2`, `plantasia-synth-phaser`).
- **One folder per build** — variants are sibling folders, not nested `versions/`.
- **Curated index** — [`../index.html`](../index.html) lists only active prototypes.
- **Retiring a prototype** — move its folder into `_archive/` and remove its row from `index.html`.

## Deploy

- **Site index:** deploy `natethousandlabs-xyz/` as a static root; `_archive/` is stripped by `.vercelignore`.
- **Per-app Vercel projects** (e.g. `juno-flowers`, `plantasia-engine-test`) deploy from their own folder.
- **D-pad:** edit `src/`, run `npm run build`, commit `dist/assets/dpad.js`.
