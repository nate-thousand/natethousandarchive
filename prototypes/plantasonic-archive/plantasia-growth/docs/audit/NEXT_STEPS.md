# Recommended Next Steps

This sequence keeps the current working concept intact while preparing the app for a new Plantasia brand and design system.

## 1. Establish A Baseline Before Redesign

Create a manual smoke-test checklist for the current app:

- Open `index.html`.
- Start from welcome with Enter and click.
- Confirm Juno Flow starts with Juno Flowers.
- Close the play guide.
- Open and close drawer.
- Open and close diagnostics.
- Play and stop generative playback.
- Test keyboard notes across both rows.
- Test numeric scale shortcuts.
- Switch EQ, Growth, and Juno Flow modes.
- Change preset, oscillator, filter, volume, frequency, BPM, LFO, delay, and echo.
- Test pointer/touch flower triggering.
- Test MIDI if hardware is available.
- Test mobile width behavior.

Run existing static checks:

- `python3 verify_milestone1.py`
- `python3 verify_presets.py`

Current note: `verify_milestone1.py` passes. `verify_presets.py` needs maintenance before it can be used as a reliable gate because it currently parses nested preset-schema objects as if they were top-level presets.

## 2. Resolve Documentation Drift

Before design changes, align docs and metadata with the current implementation:

- Update preset count references from 14 to 16 where appropriate.
- Clarify that `custom.css` is the active stylesheet.
- Mark `plantasia-vines.css` and `foundation/bootstrap/CUSTOM.css` as legacy/alternate unless they are intentionally revived.
- Separate shipped behavior from roadmap aspirations.

## 3. Freeze Runtime Contracts

Document the current DOM ids, keyboard maps, MIDI maps, mode values, and preset keys as behavior contracts.

Do not rename these during the first design-system pass:

- Control ids.
- Mode values: `eq`, `growth`, `juno-flow`.
- Preset keys.
- Keyboard note maps.
- MIDI note/CC maps.
- Canvas id.
- Startup ids.
- Drawer and diagnostics ids.

## 4. Define Canonical Tokens

Create a single token source before changing appearance:

- Color tokens.
- Type tokens.
- Spacing tokens.
- Radius tokens.
- Shadow/glow tokens.
- Motion tokens.
- Z-index/layer tokens.
- Breakpoints.
- Canvas palette tokens.

Then map those tokens into:

- Bootstrap variables.
- Plantasia CSS variables.
- Canvas renderer palettes.
- Preset/species visual palettes.

## 5. Extract CSS Primitives Without Changing Behavior

Start with CSS organization, not JavaScript refactors:

- Button variants.
- Focus ring.
- Drawer surface.
- Overlay surface.
- Parameter row.
- Range slider.
- Select.
- Collapsible header.
- Diagnostics panel shell.
- Modal shell.

Keep selectors compatible with the current HTML while introducing clearer names.

## 6. Create Component Boundaries In Place

After tokens and CSS primitives are stable, define component boundaries around existing markup:

- Welcome experience.
- Stage toolbar.
- Control drawer.
- Drawer section.
- Parameter row.
- Transport controls.
- Sound controls.
- Modulation controls.
- Effects controls.
- MIDI panel.
- MPK legend.
- Diagnostics panel.
- Play guide modal.

The first pass can be documentation and naming only. Avoid changing behavior until the boundaries are clear.

## 7. Tokenize Canvas Visuals

The brand will not be complete until canvas colors and effects are part of the system.

Recommended order:

1. Move Juno palette values into named constants.
2. Move vine/growth colors into named constants.
3. Connect preset visual palettes to semantic names.
4. Add a small adapter that translates design tokens into canvas RGB/hex values.
5. Verify all three modes after each change.

## 8. Preserve The Sound Engine

During visual redesign, avoid structural changes to `plantasia-engine.js`.

Safe work:

- Document sound parameters.
- Rename labels externally if needed.
- Add read-only mapping docs between botanical names and controls.

Riskier work for later:

- Changing audio graph routing.
- Changing growth stage timing.
- Changing preset schema.
- Changing voice creation/release behavior.

## 9. Introduce The New Brand In Layers

Apply the new Plantasia brand in a staged way:

1. Tokens only.
2. Static surfaces and text.
3. Buttons and controls.
4. Drawer and panels.
5. Welcome screen.
6. Canvas palettes.
7. Motion/easing.
8. Preset/species naming and content.

After each layer, run the smoke test and static verification scripts.

## 10. Add Automated Confidence Over Time

The app would benefit from lightweight tests before deeper refactors:

- Repair `verify_presets.py` so it understands the current nested preset schema.
- Browser smoke test for startup and controls.
- Accessibility checks for dialogs, buttons, labels, and focus.
- Visual snapshots for each mode.
- Static checks for required ids and mode values.
- MIDI mapping unit-style checks using synthetic messages.
- Performance profiling target for canvas loops.

## Safest Immediate Plan

The safest next action after this audit is a design-system preparation pass that only:

- Reconciles docs.
- Declares tokens.
- Marks legacy CSS.
- Adds behavior-contract documentation.
- Does not change UI appearance.
- Does not change app behavior.

Once that is complete, the visual brand can be applied with much lower risk.
