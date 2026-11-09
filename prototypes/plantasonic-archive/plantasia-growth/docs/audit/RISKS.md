# Redesign And Refactor Risks

These are the main things that could break if visual design, CSS, layout, or component structure changes without a careful plan.

## High-Risk Areas

### `index.html` Is A Large Mixed Responsibility File

The current app markup and behavior are tightly coupled in one file. Moving DOM elements, renaming ids, or changing class names can break JavaScript that uses `getElementById`, query selectors, body classes, and direct event listeners.

Critical ids include:

- `welcomeScreen`
- `welcomePollen`
- `welcomeStartArea`
- `welcomeStartBtn`
- `appRoot`
- `waveCanvas`
- `playGuide`
- `playGuideClose`
- `playGuideBackdrop`
- `dataPanel`
- `infoDisplay`
- `openDataPanel`
- `closeDataPanel`
- `openDrawer`
- `drawer`
- `closeDrawer`
- `play`
- `stop`
- All synth/MIDI control ids such as `bpm`, `volume`, `freq`, `preset`, `performanceMode`, `waveformSelect`, `filter`, `lfoRate`, `lfoAmt`, `lfoDest`, `delay`, `echo`, and MIDI selects/buttons.

### Control IDs Are Behavior Contracts

Sliders and selects are not just visual controls. They are read by `readUISynthState()`, synchronized by `syncUIFromSynthState()`, updated by MIDI CC handlers, and displayed in diagnostics. Renaming or replacing them without preserving ids/events can break audio, MIDI, and diagnostics.

### Canvas Rendering Depends On Global State

The canvas renderers depend on shared variables such as `canvas`, `synthState`, `synthVisual`, `activeVoices`, `vine`, `junoScene`, animation frame ids, and current palette values. Visual refactors can accidentally duplicate loops, fail to cancel loops, or desync mode state.

### Web Audio Initialization Depends On User Gesture Timing

Audio starts after user interaction and is warmed from pointer/touch/play flows. Redesigning the welcome screen, buttons, or startup sequence could cause browsers to block audio resume or introduce latency again.

### Modes Have Side Effects

Mode switching cancels animation frames, resets scenes, applies body classes, updates select state, optionally changes preset, and starts a new visual loop. A visual-only redesign can break behavior if it changes `performanceMode` or mode body classes.

### MIDI Wiring Depends On DOM Controls

MIDI setup populates selects, binds input handlers, maps controls to sliders, and updates button text/ARIA state. Changing the MIDI panel structure or ids can break hardware support.

### Keyboard Handling Depends On Focus Rules

Keyboard note input is suppressed when form controls are focused. Changing focus behavior, wrapping controls, or adding focus traps could make notes fire while editing controls, or prevent notes from playing.

## Style-Specific Risks

### Multiple CSS Histories

`custom.css` is active, but older files contain similar selectors and different tokens. Reusing old styles without checking whether they are loaded could reintroduce outdated layout assumptions.

### Bootstrap And Custom Classes Are Intertwined

Controls use both Bootstrap classes and custom Plantasia classes. Replacing Bootstrap class names may remove inherited sizing, form behavior, or button states. Replacing custom classes may remove theme-specific treatments.

### CSS Variables Do Not Cover Canvas Colors

Changing CSS tokens will not automatically update Juno palettes, vine colors, or preset palettes in JavaScript. Brand updates must include CSS and JS palette paths.

### Drawer Layout Is Sensitive

The drawer relies on width, fixed positioning, transform animation, pointer events, overflow behavior, and toolbar offset. Small CSS changes could trap controls offscreen or leave invisible elements clickable.

### Responsive Behavior Is Narrowly Defined

Most responsive behavior switches at `700px`. A new layout system should verify mobile portrait, mobile landscape, tablet, and desktop instead of assuming the existing breakpoint is enough.

### Reduced Motion Is Partial

CSS transitions are reduced, and GSAP durations can be zeroed, but canvas loops still animate. A future system should not assume the current reduced-motion handling is complete.

## Audio And Interaction Risks

### Held Notes Need Clean Release

Keyboard, pointer, and MIDI notes persist in `activeVoices` until release events. Changes to keyup, pointerup/cancel/leave, blur, or MIDI note-off behavior can leave stuck notes.

### Generative Playback Does Not Own Held Voices

Play/Stop controls affect interval playback, but not all held notes. Redesigning transport should preserve this distinction unless behavior is intentionally changed.

### Active Voice Limit Protects Performance

`MAX_VOICES` trims voices when too many are held. Removing or bypassing this can hurt performance or audio stability.

### MIDI Output Sends Timed Note-Offs

MIDI output uses a timeout for note-off. Changes to playback timing or output routing can leave external devices hanging if note-offs are missed.

### Direct `innerHTML` Is Used In MPK Legend

Current strings are internal, but if labels ever become user-generated, this pattern becomes a safety risk.

## Accessibility Risks

- Removing ARIA attributes from dialogs, live status, toolbar buttons, or canvas would reduce current accessibility support.
- Visual redesign may lower contrast for secondary text and muted controls.
- A new modal/drawer system could create focus traps or focus loss if not designed deliberately.
- Canvas-only flower interactions need keyboard equivalents preserved through the existing key maps.

## Deployment Risks

- `vercel.json` assumes static output from the repo root.
- `plantasia.html` redirects legacy links to `index.html`; removing it could break existing launch links.
- CDN reliance means Bootstrap and GSAP availability/version assumptions matter.
- Google Fonts import affects rendering and network behavior.

## Documentation Risks

- Existing docs and metadata disagree on preset count.
- Existing docs describe both current and planned states; redesign work should avoid treating roadmap aspirations as shipped behavior.
- The sound engine spec recommends future naming and features that are not fully reflected in the UI yet.

## Safest Guardrails

- Preserve ids and event contracts until components are extracted with tests.
- Keep `plantasia-engine.js` behavior stable during visual work.
- Treat `custom.css` as the active style source.
- Do not remove `plantasia.html` during design work.
- Keep keyboard, pointer, MIDI, and generative playback smoke tests in every redesign step.
- Tokenize canvas palettes deliberately; do not assume CSS-only changes cover the full visual system.
