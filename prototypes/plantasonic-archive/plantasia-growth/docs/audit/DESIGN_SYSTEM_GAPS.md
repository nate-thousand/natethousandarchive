# Design System Gaps

This app already has a strong visual direction, but it is not yet a formal Plantasia design system. The gaps below should be addressed before applying a new AI-native brand layer.

## Token Gaps

- There is no single canonical token source. `custom.css`, `plantasia-vines.css`, and `foundation/bootstrap/CUSTOM.css` define overlapping but different token sets.
- Canvas visual colors are mostly hard-coded in JavaScript instead of shared with CSS tokens.
- Preset visual palettes are data-driven in the engine but not connected to CSS variables.
- The active green differs across files: `#39ff14`, `#3af779`, and `#00ff7f`.
- Typography tokens are split between Inter and older Roboto Mono assumptions.
- Spacing scale differs between active and older CSS.
- Motion durations and easings exist in CSS, JS constants, and GSAP calls without a unified motion token set.
- Z-index layers are implicit rather than documented.
- Breakpoints are hard-coded, mostly around `700px`.

## Component Gaps

- Most UI structure is written directly in `index.html`; there are no reusable components yet.
- The drawer, modal, toolbar, diagnostics panel, parameter rows, sliders, selects, buttons, and MIDI legend repeat patterns but are not formalized.
- Button variants are expressed through Bootstrap classes plus custom classes, which makes ownership unclear.
- Range sliders are styled by selectors rather than a reusable primitive.
- Collapsible sections are behavior helpers plus CSS classes, not a component contract.
- The app has active/pressed/focus states, but no documented state matrix.
- The MPK legend is generated with raw `innerHTML`, not a reusable renderer pattern.

## Brand Gaps

- Plantasia does not yet have a documented brand palette beyond black, white, neon green, and warm haze accents.
- There is no defined relationship between botanical species, sound personality, and visual identity.
- Presets are still called presets in the UI, while the signature engine spec recommends moving toward "Species".
- Botanical effect names are partially implemented in engine data but not exposed in the control UI.
- The welcome logo is ASCII text, not a reusable brand asset or wordmark system.
- There is no iconography system.
- There is no illustration/glyph system outside canvas code.
- Tone of voice for labels, help text, and diagnostics is not documented.

## Accessibility Gaps

- Some accessibility attributes exist, especially for welcome, modal, canvas, and live status areas.
- There is no full keyboard/focus audit.
- The play guide focus behavior is present, but focus trapping is not implemented.
- Drawer focus management is partial.
- Canvas interactions need non-pointer equivalents for all meaningful actions.
- Color contrast should be rechecked after any palette change, especially muted text and neon-on-dark states.
- Reduced motion exists but canvas visual intensity and loops are not fully motion-tokenized.
- MIDI-only interactions have no complete non-MIDI equivalents for some hardware shortcuts.

## Architecture Gaps

- `index.html` mixes markup, UI state, audio orchestration, canvas rendering, MIDI, keyboard input, pointer input, and diagnostics.
- There is no module boundary for UI controls.
- There is no module boundary for visual renderers.
- There is no formal app state event system.
- Existing docs recommend a centralized state object, but implementation still has multiple state pockets.
- Styling is partly tokenized but not isolated from Bootstrap implementation details.
- Production behavior depends on CDN-loaded Bootstrap and GSAP.

## Documentation Gaps

- No current visual spec for the existing UI.
- No component usage guidelines.
- No state/interaction matrix.
- No complete keyboard shortcut reference in documentation.
- No MIDI implementation reference beyond README and code.
- No browser support matrix for Web Audio/Web MIDI.
- No test plan for visual, audio, MIDI, and accessibility behavior after redesign.
- README mentions 14 presets in some copy, while current implementation exposes 16.

## Testing Gaps

- Existing verification scripts are static and focused on feature presence and preset consistency.
- `verify_presets.py` currently fails against the nested preset schema because its regex treats nested objects such as `sound`, `growth`, `morningMist`, `roots`, and `visuals` as top-level preset keys.
- There is no automated browser smoke test.
- There is no audio regression test.
- There is no visual regression baseline.
- There is no accessibility test baseline.
- There is no MIDI simulation test.
- There is no responsive layout test.
- There is no performance budget or FPS profiling output.

## AI-Native Design System Gaps

If the goal is a new AI-native design system, the app still needs:

- A clear semantic token model that can be transformed by AI tools without breaking behavior.
- Named component primitives and stable slots.
- A documented design intent for each mode.
- A schema for species/preset visual and sound attributes.
- A mapping between synth parameters and visual tokens.
- Guardrails for generated UI changes.
- Test fixtures for startup, controls, modes, keyboard, pointer, MIDI, and playback.
- A change checklist that distinguishes visual-only changes from behavior-affecting changes.
