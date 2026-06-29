# Juno Flowers

Black-and-white ASCII garden synth built around **Juno Flow mode** and the **Juno Flowers** preset — warm saw tones, text-rendered flower visuals, and MIDI-ready performance. Forked from [Plantasia](../plantasia/) for independent development.

## Launch

Open [`index.html`](index.html) in a browser (or [`plantasia.html`](plantasia.html) as alternate entry).

No build step — static HTML/CSS/JS.

**Local only** — this project is not synced with GitHub or Vercel yet. Shipped Plantasia lives in [`../plantasia/`](../plantasia/).

## Controls

- **☰ Drawer** — open/close the control panel
- **Juno Flow Mode** — default performance mode; reduced ASCII flower bed with 25-key input mapping
- **Juno Flowers preset** — default sound palette on launch
- **Presets** — additional lifeform-inspired sound palettes (inherited from Plantasia fork)
- **OSC/WAVE** — override oscillator waveform
- **LFO** — modulate filter, pitch, or pan
- **Play / Stop** — start or stop generative playback
- **Keyboard 1–9** — hold scale notes; combine for chords (e.g. 1+3+5). **Space** = play/stop
- **MPK Mini** — pads P1–P5 sustained scale notes; keys chromatic; mix any inputs for chords
- **MPK Bank A** (pads 36–43): notes 1–5, preset+, play, stop
- **MPK Bank B** (pads 44–51): delay/echo/filter, diagnostics, volume
- **MPK knobs K1–K8** (CC 70–77): delay, echo, filter, volume, BPM, LFO, frequency
- **Joystick** — filter (CC1) · **MIDI Ch 1** · **CC mode OFF** on controller

## Structure

```text
juno-flowers/
├── index.html              ← main synth app (Juno Flow, MIDI, ASCII garden)
├── plantasia-engine.js     ← signature sound engine (to be renamed later)
├── custom.css              ← UI styles
├── ROADMAP.md              ← feature checklist
├── DESIGN_SIGNATURE_SOUND_ENGINE.md  ← sonic identity & engine design spec
├── HANDOFF.md              ← project context
└── plantasia.html          ← legacy redirect
```

## Lineage

Forked from Plantasia at workspace cleanup (June 2026). Code filenames still use `plantasia-*` prefixes — rename in a later pass as this project diverges.

## License

Personal project — use and modify freely.
