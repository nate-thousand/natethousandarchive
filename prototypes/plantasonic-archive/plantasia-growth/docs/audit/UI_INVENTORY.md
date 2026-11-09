# UI Inventory

This inventory covers visible screens, sections, panels, controls, and interactive elements in the current app.

## Screens And Stage Areas

### Welcome Screen

- Full-screen `welcomeScreen` dialog.
- Pollen canvas background.
- Glow overlay.
- Scanline overlay.
- Hidden accessible `Plantasia` heading.
- ASCII Plantasia logo.
- "PRESS ENTER TO START EXPERIENCE" button.
- Starts from click on the button, click on the start area, or Enter/Space when focused.

### Main App Stage

- Full-window `waveCanvas`.
- Canvas role/label describes live audio waveform or plant growth visualization.
- Stage content changes by mode:
  - EQ Mode waveform visualizer.
  - Growth Mode vine/growth visualizer.
  - Juno Flow Mode ASCII flower garden.

### How To Play Modal

- Modal dialog shown after startup.
- Backdrop.
- Header with "How to Play" title.
- Close button.
- Body instructions for the 25-key chromatic map.
- Lower-row keyboard display: `Z S X D C V G B H N J M`.
- Upper-row keyboard display: `Q 2 W 3 E R 5 T 6 Y 7 U I`.
- Hint explaining black-key digit mapping.
- Dismissed by close button, backdrop click, or Escape.

## Stage Toolbar

- Fixed top-right toolbar.
- `Inspect` / `Inspecting` button opens and closes diagnostics.
- Menu button opens the control surface drawer.
- The toolbar shifts left when the drawer is open on desktop.

## Diagnostics Panel

- Floating `dataPanel` / `inspector`.
- Header title: `Diagnostics`.
- Close button.
- Live preformatted data output with `aria-live`.
- Opened from the stage toolbar or the drawer's Advanced section.
- Shows current preset, scale, oscillator, attack, release, detune, filter, delay, echo, reverb, volume, frequency center, BPM, LFO, mode, MIDI input/output status, MIDI channel/device line, and active held voice count.

## Control Drawer

Right-side drawer on desktop and bottom sheet style on small screens.

### Drawer Header

- Brand title: `Plantasia`.
- Subtitle: `Generative synthesizer`.
- Close button.

### Transport Section

- Play button.
- Stop button.
- Tempo range slider, 40-180 BPM.

### Master Section

- Volume range slider, 0-100.
- Frequency range slider, 50-1000 Hz.

### Sound Section

- Preset select with 16 options:
  - Plants
  - Mold
  - Bacteria
  - Mushrooms
  - Lifeform Harmony
  - Plantasia Classic
  - Greenhouse Lush
  - Cosmic Dew
  - Daybeam
  - Spiral Back
  - Planet Rockflora
  - Myco-Murk
  - Microburst
  - Fibonacci Shift
  - Luna
  - Juno Flowers
- Mode select:
  - EQ Mode
  - Growth Mode
  - Juno Flow Mode
- Oscillator select:
  - Sine
  - Triangle
  - Saw
  - Square
  - Pulse
  - Noise
- Filter range slider, 100-8000 Hz.

### Modulation Section

- LFO Rate range slider, 0.01-10 Hz.
- LFO Rate numeric display.
- LFO Amount range slider, 0-1200.
- LFO Amount numeric display.
- Destination select:
  - Filter
  - Pitch
  - Volume
  - Pan
  - Flower Animation

### Effects Section

- Delay range slider, 0-1.
- Echo range slider, 0-1.
- Note: "Reverb depth follows echo send."

### MIDI Section

- Collapsible MIDI section.
- Mapping profile select:
  - Akai MPK Mini
  - Extended (16 pads)
- MIDI channel select:
  - All channels
  - Channels 1-16
- MIDI input device select.
- MIDI output device select.
- MIDI In toggle button.
- MIDI Out toggle button.
- Live MIDI status line.
- Nested collapsible MPK Mini map panel.
- MPK pad legend grid.
- MPK knob legend grid.
- MPK hint text.
- Active pad highlight state.

### Advanced Section

- `Open diagnostics` / `Close diagnostics` button.

## Canvas Interactions

- Pointer/touch down on a flower in Juno Flow mode triggers the corresponding note.
- Pointer up, cancel, or leave releases the note.
- Document-level pointer/touch starts warm the audio engine.

## Keyboard Interactions

- Enter starts the experience from the welcome state.
- Escape dismisses the play guide, closes the drawer, and closes diagnostics.
- Space toggles Play/Stop after startup.
- 25-key chromatic note map:
  - `Z S X D C V G B H N J M`
  - `Q 2 W 3 E R 5 T 6 Y 7 U I`
- Numeric scale shortcuts:
  - `1` through `9` map to scale indices.
- Held keyboard notes sustain until keyup or window blur.

## MIDI Interactions

- MPK Mini keys map to chromatic notes C3-C5.
- MPK Mini pads map to scale notes and actions.
- MPK Mini knobs map to delay, echo, filter, volume, BPM, LFO rate, LFO amount, and frequency.
- Extended profile maps selected note numbers to control actions and CC values to sliders.
- MIDI output sends short notes during generative playback when output is enabled.
