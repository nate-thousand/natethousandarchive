# File Structure Audit

Plantasia is a compact static app. Most runtime behavior lives in `index.html`, with the reusable sound-engine layer split into `plantasia-engine.js`.

## Root Files

### `index.html`

Primary app entry point. It contains:

- Document metadata and external CSS/JS links.
- Welcome screen DOM.
- Main canvas.
- How-to-play modal.
- Diagnostics panel.
- Stage toolbar.
- Control drawer markup.
- Inline JavaScript for startup flow, drawer state, mode switching, visuals, synth UI binding, Web Audio wiring, transport, keyboard input, pointer input, MIDI, and diagnostics.

This is the highest-risk file for redesign because it mixes UI markup, state, audio orchestration, visual rendering, and input handling.

### `plantasia-engine.js`

Signature sound engine module exposed as `window.PlantasiaEngine`. It contains:

- Core constants such as neon green, smoothing, live attack, and growth stages.
- Legacy preset definitions and normalization into `sound`, `botanical`, `growth`, and `visuals` structures.
- Botanical audio graph creation and synchronization.
- Per-voice creation with oscillator imperfection, detune, panning, filters, sends, sub roots, and growth state.
- Living voice tick/update logic.
- Aggregate visual state calculation for canvas modes.

This file is the cleanest boundary for audio behavior and should be preserved carefully.

### `custom.css`

Current active stylesheet loaded by `index.html`. It defines:

- Plantasia black/white/neon token set.
- Bootstrap variable overrides.
- Full-screen canvas base styles.
- Shared button, select, range, focus, card, and form treatments.
- Stage toolbar.
- Diagnostics/inspector panel.
- Right-side control drawer.
- Drawer sections, parameter rows, transport cluster, collapsibles, MIDI legend.
- Mode body-class treatments.
- Welcome screen, ASCII intro, pollen canvas, glow, scanlines.
- How-to-play modal.
- Responsive behavior and reduced-motion overrides.

This file is the main style source for the current build.

### `plantasia.html`

Legacy/alternate entry point. It redirects immediately to `index.html` using both a meta refresh and a small script, with a fallback link.

### `plantasia-vines.css`

Older or alternate vine/drawer stylesheet. It defines a bottom drawer layout, older token names, and similar UI pieces to `custom.css`. It is not loaded by `index.html` in the current build, but it documents previous layout assumptions and could be confused with live styling.

### `foundation/bootstrap/CUSTOM.css`

Older foundation-to-Bootstrap override file. It defines a different token set, including `Roboto Mono`, cyan accent, and older green values. It is not loaded by `index.html` in the current build, but `plantasia-vines.css` references this token vocabulary.

### `README.md`

Human-facing project summary. It documents launch instructions, deployments, controls, current structure, and no-build static setup. It currently says 14 presets in the description while the app and roadmap indicate 16 implemented presets.

### `ROADMAP.md`

Feature checklist and current implementation status. It is the most detailed existing status doc and names the installation release as an ambient Juno flower field with playable synth, 16 presets, three visual modes, MIDI, and low-latency input.

### `HANDOFF.md`

Broader project context, goals, current feature groups, mode descriptions, and long-term architecture direction. It describes the desired move toward centralized state and modularity.

### `DESIGN_SIGNATURE_SOUND_ENGINE.md`

Design spec for the living botanical sound engine. It documents the intended audio philosophy and current implementation notes for oscillator drift, photosynthesis stages, root layer, wind, pollination delay, species/presets, signature effects, and audio-visual integration.

### `verify_milestone1.py`

Static verification script for Milestone 1. It inspects `index.html` for core synth, keyboard, polyphony, oscillator, filter, LFO, delay/echo, master controls, presets, visuals, and init-order checks.

### `verify_presets.py`

Static verification script for preset structure, UI/code sync, and roadmap preset mapping. It reads `index.html` and `plantasia-engine.js`.

### `vercel.json`

Static Vercel deployment config with no framework, no build command, no install command, and root output directory.

### `.gitignore`

Git ignore rules. It is modified in the current working tree but was not inspected for this audit because production app behavior does not depend on it.

## Current Runtime Dependencies

- Bootstrap 5.0.2 CSS from jsDelivr.
- GSAP 3.12.7 from jsDelivr.
- Google Fonts import in CSS.
- Browser Web Audio API.
- Browser Canvas 2D API.
- Optional Browser Web MIDI API.

## Important Ownership Boundaries

- App orchestration and UI state: `index.html`.
- Reusable sound engine: `plantasia-engine.js`.
- Active visual style system: `custom.css`.
- Deployment config: `vercel.json`.
- Project planning and specs: Markdown docs in the root.
