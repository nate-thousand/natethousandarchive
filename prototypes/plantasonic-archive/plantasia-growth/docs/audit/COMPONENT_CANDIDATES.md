# Component Candidates

These are UI pieces that should become reusable design-system components before a larger visual redesign.

## High-Priority Components

### App Stage

The full-window canvas stage should be treated as a component boundary even if rendering stays imperative. It owns the canvas element, ARIA label, resize behavior, and mode-specific rendering entry points.

Candidate API:

- `mode`
- `visualState`
- `onPointerNoteStart`
- `onPointerNoteEnd`

### Welcome Experience

The welcome overlay has a clear reusable structure:

- Full-screen dialog.
- Animated background canvas.
- Glow/scanline overlays.
- ASCII or brand mark slot.
- CTA button.
- Keyboard/click start behavior.

It should become a branded launch/splash component.

### Modal / Dialog

The How To Play guide is the first modal pattern. It should become a reusable dialog with:

- Backdrop.
- Panel.
- Header.
- Title.
- Close button.
- Body slot.
- Escape/backdrop dismissal.
- Reduced-motion-aware transitions.

### Stage Toolbar

The top-right toolbar and its buttons should become reusable stage controls:

- Toolbar container.
- Toolbar button.
- Active state.
- Label/icon handling.
- Drawer-open offset behavior.

### Control Drawer

The right-side drawer is a major component:

- Header/brand area.
- Close action.
- Scrollable body.
- Section stack.
- Desktop side-panel behavior.
- Mobile bottom-sheet behavior.
- Motion/reduced-motion behavior.

### Drawer Section

Each section repeats a pattern:

- Section title.
- Body stack.
- Optional note text.
- Optional collapse affordance.
- Border separation.

This should be extracted before adding new controls.

### Parameter Row

The most repeated control pattern:

- Label.
- Range slider or select.
- Optional inline value.
- Optional unit.
- Responsive horizontal-to-vertical layout.

Variants:

- Slider row.
- Select row.
- Inline value row.
- Compact modulation row.

### Button System

The app uses several button roles that should be standardized:

- Primary action button.
- Outline action button.
- Stop/destructive-looking outline button.
- Close icon button.
- Toolbar button.
- Collapsible header button.
- Toggle button with `aria-pressed`.

Active, hover, focus, disabled, and pressed states should be normalized.

### Range Slider

Sliders are central to the synth. They need a reusable style and interaction contract:

- Track.
- Thumb.
- Active/focus styling.
- Compact variant.
- Numeric value display.
- Units.
- MIDI/keyboard-driven updates.

### Select Control

Preset, mode, waveform, LFO destination, MIDI mapping, channel, input, and output all use select controls. A branded select wrapper would keep spacing, labels, and state consistent.

## Audio/Visual Domain Components

### Preset Selector

The preset select should become a domain component that can later evolve into a Species selector.

Responsibilities:

- Display preset/species names.
- Preserve stable preset keys.
- Trigger preset changes.
- Optionally show category or description later.

### Mode Selector

The mode selector should become a reusable mode control with stable values for:

- `eq`
- `growth`
- `juno-flow`

It should own labels, ordering, and future transition hooks.

### Transport Controls

Play, Stop, and Tempo belong together as a synth transport component.

Responsibilities:

- Playing state.
- Play/stop actions.
- BPM slider.
- Spacebar compatibility remains outside or is passed in as an app-level shortcut.

### Master Controls

Volume and frequency center are currently grouped together and should become a master-control component.

### Sound Controls

Preset, mode, oscillator, and filter are grouped as sound controls. This could remain a section component or split into domain controls depending on future complexity.

### Modulation Controls

LFO rate, amount, destination, and live readouts are cohesive enough to become a component.

### Effects Controls

Delay and Echo currently form a small effects section. In a branded system, these may map to botanical names such as Pollination, Morning Mist, Rain, or Sap.

## MIDI Components

### MIDI Panel

The MIDI area has enough behavior to become its own component:

- Mapping profile.
- Channel select.
- Input select.
- Output select.
- MIDI In/Out toggles.
- Status line.
- Device refresh/binding hooks.

### Collapsible Section

Both the MIDI section and MPK map use collapsible headers. Extract a generic collapsible section before restyling.

### MPK Legend

The MPK legend should become a hardware map component:

- Pad grid.
- Knob grid.
- Active pad highlight.
- Bank labels/hints.
- Profile-specific visibility.

## Feedback Components

### Diagnostics Panel

The diagnostics panel can become a reusable inspector component:

- Floating panel shell.
- Header/title/close action.
- Preformatted body.
- Live region behavior.
- Collapsed/visible motion.

### Status Line

MIDI status and diagnostics text use status-like patterns. A small status component could handle live updates, subdued text color, and wrapping.

## Visual Primitive Candidates

These are not DOM components yet, but should become named primitives in the design system:

- Neon glow treatment.
- Terminal scanlines.
- ASCII logo/wordmark treatment.
- Pollen particle treatment.
- Flower glyph palette.
- Vine/growth palette.
- Haze overlay.
- Focus ring.
- Active pressed state.
- Drawer surface.
- Overlay surface.

## Extraction Order Recommendation

Start by documenting tokens and CSS primitives, then extract UI shell patterns without changing behavior:

1. Tokens and state classes.
2. Button primitives.
3. Parameter row.
4. Drawer section.
5. Drawer shell.
6. Modal shell.
7. Diagnostics shell.
8. MIDI/MPK panel.
9. Preset/mode domain controls.
10. Canvas mode renderer boundaries.
