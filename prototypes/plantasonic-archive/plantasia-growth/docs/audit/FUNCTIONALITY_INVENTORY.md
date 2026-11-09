# Functionality Inventory

## Startup Flow

- The app starts in `welcome-active` state with the main app hidden from assistive and pointer interaction.
- Click, Enter, or Space starts the experience.
- Startup fades out the welcome screen with GSAP.
- On completion, startup:
  - Hides the welcome screen.
  - Removes `welcome-active`.
  - Enables the app root.
  - Cancels welcome pollen animation.
  - Selects `junoflowers`.
  - Forces `juno-flow` mode.
  - Initializes and resumes audio.
  - Starts the active visual loop.
  - Shows the How To Play guide.
  - Focuses the drawer menu button.

## State Model

The current state is mostly centralized in `synthState`, with additional local state for visuals, audio nodes, MIDI, drawer/modals, and held voices.

`synthState` tracks:

- `mode`
- `bpm`
- `volume`
- `baseFreq`
- `preset`
- `waveform`
- `filterHz`
- `filterType`
- `filterQ`
- `lfoRate`
- `lfoAmount`
- `lfoDest`
- `delayMix`
- `echoFeedback`
- `reverbDepth`

`synthVisual` tracks derived visual parameters such as filter openness, volume scale, echo glow, tempo pulse, LFO visual value, flower LFO, brightness, chorus shimmer, reverb haze, wind pan, resonance glow, growth level, growth stage, delay trail, canopy spread, and palette.

Other important state containers:

- `activeVoices`: held keyboard, pointer, and MIDI voices.
- `polyNotes`: scheduled short notes for generative playback.
- `junoScene`: flower garden, pollen, grass, sky dots, and falling glyphs.
- `vine`, `growthPollen`, `growthSparkles`: growth mode scene state.
- `midiAccess`, `midiOutput`, MIDI toggles, active MIDI notes, and mappings.
- Drawer, diagnostics, welcome, and play-guide booleans.

## Presets

The app exposes 16 preset options. `plantasia-engine.js` defines the preset registry and normalizes legacy flat presets into a richer shape.

Implemented preset keys:

- `plants`
- `mold`
- `bacteria`
- `mushrooms`
- `harmony`
- `plantasiaClassic`
- `greenhouse`
- `cosmicdew`
- `daybeam`
- `spiralback`
- `rockflora`
- `mycomurk`
- `microburst`
- `fibonaccishift`
- `luna`
- `junoflowers`

Presets can define:

- Scale/frequency set.
- Color or visual palette.
- Sound parameters: waveform, filter type/frequency/Q, attack, release, detune, pan, delay, echo, reverb, drift, chorus, saturation, stereo width, sub amount, high-frequency rolloff.
- Botanical parameters: Morning Mist, Roots, Pollen, Photosynthesis, Canopy, Wind.
- Growth behavior: speed, bloom intensity, movement amount, particle amount.
- Visual personality: flower type, environment, particle style, lighting, animation style.

Changing a preset updates synth state, UI controls, audio graph, current wave color, visual targets, and active generative scheduling if playback is running.

## Audio Behavior

### Web Audio Graph

Audio is initialized lazily after user interaction. The app uses `AudioContext` with `latencyHint: 'interactive'`.

Core audio pieces:

- Master gain.
- Analyser node with `fftSize = 2048`.
- Botanical graph from `PlantasiaEngine.createBotanicalGraph()`.
- Master limiter/compressor.
- Global LFO oscillator and gain.
- Noise buffer for noise waveform.
- Custom periodic wave for pulse waveform.

The botanical graph includes:

- `liveBus`
- Roots low shelf.
- Photosynthesis waveshaper.
- Live biquad filter.
- Pollen short stereo delays/merge.
- Delay send, feedback, and wet gain.
- Morning Mist delay/damped feedback/wet gain.
- Wind panner driven by slow LFO.
- Master limiter.

### Voice Behavior

Held notes use the signature engine path through `PlantasiaEngine.createLiveVoice()`.

Each live voice can include:

- Multiple detuned oscillators.
- Noise or pulse waveform support.
- Optional sub oscillator.
- Per-voice biquad filter.
- Voice gain.
- Stereo panner.
- Delay and reverb sends.
- Optional per-voice LFO for pitch, volume, or pan.
- Randomized drift, filter offset, attack scale, release scale, pan base, phase offset, and chorus depth variation.
- Growth metadata from seed through pollination.

The engine updates held voices over time with living modulation:

- Growth stage changes based on hold duration and preset growth speed.
- Filter frequency drifts and opens.
- Pan wanders.
- Oscillator detune wanders.
- Reverb and delay sends evolve.
- Brightness/shimmer can lift voice gain slightly.

### Generative Playback

The Play button starts a timed interval using the current BPM. Each tick picks a random frequency from the active preset scale, plays a short note, and optionally sends a MIDI note out.

The Stop button clears the interval and resets play button state. Stop does not explicitly release currently held keyboard/MIDI/pointer voices; those release through their own keyup/noteoff/pointerup paths.

### LFO

The LFO has rate, amount, and destination controls.

Destinations:

- Filter: global LFO routes to live filter frequency.
- Pitch: per-voice LFO can route to oscillator detune.
- Volume: per-voice LFO can route to voice gain.
- Pan: per-voice LFO can route to stereo panner.
- Flower Animation: visual-only flower sway/breathing.

## Visual Behavior

### EQ Mode

EQ mode uses analyser time-domain data to draw a waveform trail. Visual intensity responds to volume, brightness, echo glow, and note pulse.

### Growth Mode

Growth mode maintains a vine scene with points, tip position, pulse, growth bursts, pollen, and sparkles. Notes add pulse, accelerate growth, flash the screen, and spawn particles near the vine tip.

Visuals respond to:

- Volume scale.
- Echo glow.
- LFO sway.
- Growth level.
- Reverb haze.
- Active voice count.
- Preset-specific growth properties.

### Juno Flow Mode

Juno Flow initializes a 25-flower ASCII garden mapped to chromatic MIDI notes C3-C5. Each flower has a note frequency, key label, stem, petals, leaf slots, bloom state, sway, burst timers, pop particles, and held state.

Notes cause:

- Flower held state.
- Burst timer and peak scaling.
- Stem bend.
- Bright timer.
- Petal pulse.
- Bloom increase.
- Pop particles.

The garden also renders sky dots, falling glyphs, grass, pollen, haze, and wind-shifted flowers.

## Mode Switching

Mode select values are `eq`, `growth`, and `juno-flow`.

Switching modes:

- Updates `synthState.mode`.
- Syncs the select control.
- Cancels visual animation frames.
- Clears EQ trail frames.
- Resets vine or Juno scene as needed.
- Applies body classes `mode-eq`, `mode-growth`, or `mode-juno-flow`.
- Starts the relevant visual loop.
- Optionally suggests `junoflowers` when entering Juno Flow.

## MIDI Behavior

The app attempts MIDI setup on load and again when Play is clicked. If Web MIDI is available, it requests access with `sysex: false`, populates input/output device lists, binds message handlers, listens for state changes, and updates the MIDI status line.

MIDI input behavior:

- Channel filter can be all channels or a specific channel.
- Note-on with velocity zero is treated as note-off.
- Note-on can trigger MPK pad actions, extended control actions, scale notes, or direct chromatic MIDI notes.
- Note-off releases held MIDI voices.
- Control changes map to sliders.

MPK Mini mapping:

- Pads 36-40: scale notes 1-5.
- Pad 41: preset plus.
- Pad 42: play.
- Pad 43: stop.
- Bank B style notes 44-51: delay/echo/filter adjustments, diagnostics, and mode.
- CC 1 and 70-77: filter, delay, echo, volume, BPM, LFO rate, LFO amount, frequency.

## Browser APIs And External Libraries

- Canvas 2D API for all visuals.
- Web Audio API for synthesis, effects, analyser, panning, filters, oscillators, gain, delay, dynamics compression, periodic waves, and buffers.
- Web MIDI API for hardware MIDI input/output.
- `requestAnimationFrame` and `cancelAnimationFrame` for visual loops.
- `setInterval` for generative playback and diagnostics refresh.
- `setTimeout` for MIDI note-off and MPK pad highlight clearing.
- `performance.now()` for timing, MIDI event offsets, visual movement, debounce, and growth stages.
- `matchMedia('(prefers-reduced-motion: reduce)')` for motion reduction.
- DOM event APIs for keyboard, pointer, resize, blur, controls, and modal/drawer actions.
- GSAP for transitions and matchMedia-based motion config.
- Bootstrap CSS classes and variables for base control styling.

## Animations And Motion

- Welcome ASCII flicker, CTA pulse, terminal glow, scanlines, and pollen canvas drift.
- GSAP fade for welcome exit and play-guide open/close.
- GSAP slide/stagger for drawer open/close.
- GSAP fade/translate for diagnostics panel.
- Canvas animation loops for EQ waveform, vine growth, Juno flower garden, pollen, grass, sky dots, falling glyphs, and particles.
- CSS reduced-motion media query reduces animation and transition durations.
