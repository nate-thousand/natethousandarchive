# Plantasia App Overview

Plantasia is a static browser-based audiovisual synthesizer inspired by Mort Garson's Plantasia. It combines playable Web Audio synthesis, generative playback, MIDI control, and canvas-based plant visuals into a single-page instrument.

The app currently launches from `index.html`. `plantasia.html` is a redirect entry point for older links. There is no build step, package manager, framework, or server runtime. The deployed app is plain HTML, CSS, and JavaScript with Bootstrap and GSAP loaded from CDNs.

## Main Concept

Plantasia is meant to feel like a living musical garden rather than a conventional synth panel. Notes trigger both sound and botanical visual responses. The current installation build emphasizes an ambient "Juno Flow" flower field where keyboard, pointer, generative playback, and MIDI input all bloom the garden.

## Primary User Experience

The first screen is a full-screen terminal-style welcome overlay with ASCII Plantasia lettering, scanlines, glow, and drifting pollen. The user starts by clicking the call-to-action or pressing Enter.

After startup, the app fades into the main canvas, selects the `junoflowers` preset, enters `juno-flow` mode, initializes audio, starts the visual loop, and opens a "How to Play" modal. The control drawer is available from a top-right menu button. Diagnostics are available from an adjacent Inspect button or from the drawer.

The main stage is a full-window canvas. Depending on the active mode, it renders one of three experiences:

- EQ Mode: waveform visualizer with trails and note pulse.
- Growth Mode: generative vine growth with leaves, flowers, pollen, sparkles, and flashes.
- Juno Flow Mode: 25 ASCII flower instruments mapped to a chromatic C3-C5 keyboard.

## Key Features

- Static app, no build step.
- Full-screen canvas stage.
- Welcome screen with Enter/click startup.
- GSAP transitions for welcome, modal, drawer, and diagnostics.
- Web Audio synth engine with polyphony, detune, saturation, filtering, delay, echo, reverb-like "Morning Mist", chorus-like "Pollen", wind panning, sub/root layer, limiter, and per-voice living modulation.
- 16 implemented presets in the UI.
- Three visual modes: EQ, Growth, and Juno Flow.
- Control drawer with transport, master, sound, modulation, effects, MIDI, and advanced controls.
- Keyboard note input using a 25-key chromatic map plus numeric scale-note shortcuts.
- Space toggles Play/Stop after startup.
- Pointer/touch flower triggering in Juno Flow mode.
- Web MIDI input and output support with MPK Mini mapping and an extended profile.
- Diagnostics panel showing current preset, scale, synth parameters, MIDI status, mode, and active voices.

## Current Product Shape

The app is already more than a synth demo. It has a distinctive audio engine, a signature visual identity, and a coherent installation flow. The implementation is still concentrated in a large `index.html` script, so future design work should document and extract patterns before touching behavior.
