# Old App Migration Plan

## Purpose

Plan a controlled migration from the original Plantasia app into Plantasia v2 without copying the old visual design, old UI, or old CSS.

Plantasia v2 should be rebuilt fresh from:

- `VISION.md`
- `docs/brand/ASCII_GRAMMAR.md`
- `docs/design-system/`
- `src/tokens/plantasia-bootstrap.scss`
- The organism-based interaction model

The old app is a source for working behavior only: audio engine logic, preset data, synth parameters, interaction behavior, and utility functions.

## 1. Original App Location

Primary source:

| Path | Role |
| --- | --- |
| `../plantasia-growth/` | Original working Plantasia app. This is the canonical source for audio engine, presets, interaction behavior, verification scripts, and shipped static app behavior. |

Important related source:

| Path | Role |
| --- | --- |
| `../juno-flowers/` | Experimental fork. Use only as a comparison point if v1 behavior is unclear. Do not treat it as canonical unless a specific feature proves newer or better. |
| `../plantasia-sketches/` | Older prototype history. Treat as visual/reference archive only. Do not migrate UI or CSS from here. |

Plantasia v2 target:

| Path | Role |
| --- | --- |
| `./` | Fresh Plantasia v2 structure. Do not overwrite it. Add source code incrementally into existing `src/` folders. |

## 2. Files To Inspect

Inspect these v1 files before migrating any behavior:

| File | Inspect For |
| --- | --- |
| `../plantasia-growth/plantasia-engine.js` | Preset registry, botanical graph, live voice creation, living modulation, growth stages, visual state calculation. |
| `../plantasia-growth/index.html` | App orchestration, input behavior, transport, audio initialization, MIDI behavior, pointer/keyboard interaction, old UI markup to avoid copying. |
| `../plantasia-growth/DESIGN_SIGNATURE_SOUND_ENGINE.md` | Intended sound-engine philosophy and known implementation gaps. |
| `../plantasia-growth/ROADMAP.md` | Current shipped behavior, preset status, feature status, and verification expectations. |
| `../plantasia-growth/HANDOFF.md` | Context and long-term architecture notes. |
| `../plantasia-growth/docs/audit/FUNCTIONALITY_INVENTORY.md` | Existing behavior inventory and migration warnings. |
| `../plantasia-growth/docs/audit/FILE_STRUCTURE.md` | Ownership boundaries for original app files. |
| `../plantasia-growth/docs/audit/RISKS.md` | Web Audio, MIDI, DOM, release, and redesign risks. |
| `../plantasia-growth/verify_presets.py` | Static validation rules for preset shape and UI/code sync. |
| `../plantasia-growth/verify_milestone1.py` | Static checks for core synth, keyboard, polyphony, LFO, delay, controls, and visual hooks. |

Inspect these only to avoid accidental copying:

| File | Inspect For |
| --- | --- |
| `../plantasia-growth/custom.css` | Old active visual style source. Do not import into v2 unless a functional accessibility or input behavior requires a tiny extracted rule. |
| `../plantasia-growth/plantasia-vines.css` | Older alternate visual assumptions. Do not migrate. |
| `../plantasia-growth/foundation/bootstrap/CUSTOM.css` | Older token/style history. Do not migrate. |
| `../plantasia-growth/plantasia.html` | Legacy redirect behavior only. Do not use as app structure. |

## 3. Files Containing Audio Engine Logic

Primary audio engine:

| File | Audio Logic |
| --- | --- |
| `../plantasia-growth/plantasia-engine.js` | `LEGACY_PRESETS`, `normalizePreset()`, `buildPresetRegistry()`, `getGrowthStage()`, `createBotanicalGraph()`, `wireBotanicalOutputs()`, `syncBotanical()`, `createLiveVoice()`, `tickLivingVoice()`, `tickAllLivingVoices()`, `computeVisualState()`. |

Audio orchestration mixed into UI:

| File | Audio Logic |
| --- | --- |
| `../plantasia-growth/index.html` | `synthState`, `initAudio()`, `syncAudioEngine()`, `createVoiceSource()`, `getNoiseBuffer()`, `getPulseWave()`, `routeGlobalLfo()`, `buildToneParams()`, `resolveStartTime()`, `ensureLiveAudioReady()`, `ensureAudioReady()`, `warmAudioEngine()`, `playLiveVoice()`, `holdNote()`, `releaseNote()`, `scheduleNotes()`, `playTone()`, `midiNoteToFreq()`, `pitchFromBase()`, `getLfoDepth()`. |

Use `plantasia-engine.js` as the first extraction source. Treat `index.html` audio code as behavior to modularize, not as a file to copy wholesale.

## 4. Files Containing Preset Data

| File | Preset Content |
| --- | --- |
| `../plantasia-growth/plantasia-engine.js` | Canonical preset data in `LEGACY_PRESETS`, including 16 implemented keys: `plants`, `mold`, `bacteria`, `mushrooms`, `harmony`, `plantasiaClassic`, `greenhouse`, `cosmicdew`, `daybeam`, `spiralback`, `rockflora`, `mycomurk`, `microburst`, `fibonaccishift`, `luna`, `junoflowers`. |
| `../plantasia-growth/index.html` | Preset UI order in `PRESET_ORDER` and the old `<select id="preset">` options. Use for ordering and shipped-key confirmation only. |
| `../plantasia-growth/verify_presets.py` | Validation expectations for required fields, waveform values, filter values, safe echo feedback, and preset count. |
| `../plantasia-growth/ROADMAP.md` | Names shipped presets and notes that the app has 16 playable presets even though some docs still mention 14. |

Presets should become v2 data, not UI markup.

Recommended v2 destinations:

- `src/data/presets.ts` or `src/data/presets.js`
- `src/audio/presetSchema.ts` or `src/audio/presetSchema.js`
- `docs/product/FEATURE_MAP.md` for human-facing preset/species names when ready

## 5. UI-Only Files Not To Copy

Do not copy these into v2:

| File | Reason |
| --- | --- |
| `../plantasia-growth/custom.css` | Old active visual language: black/neon/Inter/drawer/diagnostics/welcome styles. v2 has a new token-based Bootstrap theme and ASCII grammar. |
| `../plantasia-growth/plantasia-vines.css` | Older vine/drawer styling with outdated assumptions. |
| `../plantasia-growth/foundation/bootstrap/CUSTOM.css` | Old token experiment, not v2 theme. |
| `../plantasia-growth/index.html` markup | Old welcome screen, toolbar, drawer, diagnostics, modal, form controls, canvas layout, and Bootstrap class composition. Use only to identify behavior contracts. |
| `../plantasia-sketches/plantasia-app.css` | Prototype CSS history. |
| `../plantasia-sketches/plantasia-style.css` | Prototype CSS history. |
| `../plantasia-sketches-*/` (initial, fractal, immersive, …) | Prototype UI history. |

Old visual renderers should not be copied as v2 visuals:

- EQ waveform renderer
- Growth vine renderer
- Juno flower garden renderer
- Welcome pollen renderer
- Drawer animation
- Diagnostics panel animation

These may inspire behavior mapping only. v2 visuals must be rebuilt around the organism model and ASCII grammar.

## 6. Functions That Can Be Reused Safely

Safest direct extraction candidates from `plantasia-engine.js`:

| Function / Constant | Safe Reuse Notes |
| --- | --- |
| `LEGACY_PRESETS` | Reuse as source data, then rename and normalize into v2 species/preset data. Remove old visual palette dependency where needed. |
| `defaultSound()` | Reuse as schema default, but move to a typed/data module. |
| `defaultBotanical()` | Reuse as botanical parameter defaults. |
| `defaultGrowth()` | Reuse as growth parameter defaults. |
| `normalizePreset()` | Reuse logic after making it pure and module-based. |
| `buildPresetRegistry()` | Reuse after replacing global cache behavior if needed. |
| `getGrowthStage()` | Reuse as the bridge between sound hold duration and organism state. |
| `STAGE_BLEND` | Reuse as audio-growth mapping; review names against v2 ASCII grammar. |
| `createBotanicalGraph()` | Reuse Web Audio graph logic, but wrap it in a v2 audio service and avoid globals. |
| `wireBotanicalOutputs()` | Reuse with clear output contracts. |
| `syncBotanical()` | Reuse parameter sync behavior. |
| `createLiveVoice()` | Reuse carefully; it is core sound behavior but depends on injected helpers and Web Audio node lifetime. |
| `tickLivingVoice()` | Reuse for living modulation. |
| `tickAllLivingVoices()` | Reuse for aggregate organism state. |
| `computeVisualState()` | Reuse only as an audio-to-organism state adapter, not as old visual styling. |

Safe utility extraction candidates from `index.html`:

| Function / Constant | Safe Reuse Notes |
| --- | --- |
| `midiNoteToFreq()` | Pure utility. Move to `src/audio/` or `src/utils/`. |
| `pitchFromBase()` | Reuse concept; rewrite to accept state as an argument. |
| `getLfoDepth()` | Reuse mapping; rewrite as pure function. |
| `getNoiseBuffer()` | Reuse if noise waveform remains supported. |
| `getPulseWave()` | Reuse if pulse waveform remains supported. |
| `createVoiceSource()` | Reuse after removing closure/global dependencies. |
| `resolveStartTime()` | Reuse for low-latency MIDI scheduling. |
| `buildToneParams()` | Reuse behavior but rewrite as pure `buildVoiceParams(state, preset, input)`. |
| `trimVoicesIfNeeded()` | Reuse behavior in a v2 voice manager. |
| `holdNote()` / `releaseNote()` | Reuse behavior pattern, but rewrite around v2 state/store boundaries. |
| `scheduleNotes()` | Reuse generative playback idea; rewrite as a transport module. |
| `MPK_MINI_PADS`, `MPK_MINI_CC_MAP`, `ccSliderMap` | Reuse mappings as data, but adapt control targets to v2 organism/action names. |
| `handleMidiMessage()` | Reuse parsing logic; rewrite DOM/control actions. |

## 7. Parts To Rewrite For v2

Rewrite these from scratch:

| Area | Rewrite Reason |
| --- | --- |
| App shell and layout | v2 should not recreate the old drawer/welcome/toolbar UI. |
| Visual system | v2 organism is the instrument. There is no separate visualizer. |
| Canvas rendering | Old EQ/growth/Juno renderers do not match the v2 ASCII grammar. |
| Control model | Old parameter-editing drawer conflicts with cultivation-first interaction. |
| CSS | Old CSS should not be imported. Use `src/styles/plantasia.css`, `src/tokens/plantasia-bootstrap.scss`, and v2 docs. |
| Diagnostics UI | Rebuild later as a v2 debugging surface, not old floating inspector. |
| Welcome flow | Rebuild around v2 product definition if needed. |
| Preset UI | Reframe as species/ecosystem/preset identity, not old select-first workflow. |
| Mode names | Replace old `eq`, `growth`, `juno-flow` modes with v2 organism interaction states. |
| Visual state naming | Map `synthVisual` concepts to organism state: density, branching, bloom, tension, harmony, mutation, energy, life state. |

Rewrite or heavily adapt these:

- `readUISynthState()`
- `syncUIFromSynthState()`
- `applyPresetToSynth()`
- `bindSynthControls()`
- `setMode()`
- `triggerModeNoteVisual()`
- `drawEqVisualizerFrame()`
- `growVineFrame()`
- `drawJunoFrame()`
- `renderMpkLegend()`
- Old DOM-specific MIDI button actions

## 8. Risks When Extracting Sound Code

1. Web Audio must initialize from a user gesture; moving `initAudio()` or `warmAudioEngine()` can reintroduce browser audio blocking or latency.
2. `createLiveVoice()` assumes injected helpers and a valid botanical graph; missing any injected dependency can create silent voices.
3. Voice release must stop oscillators and LFOs; incomplete `releaseNote()` migration can create stuck notes or CPU leaks.
4. `activeVoices` must remain bounded by `MAX_VOICES`; removing trimming can hurt performance.
5. LFO routing currently splits global filter LFO and per-voice pitch/volume/pan LFO; collapsing this can change sound behavior.
6. Preset `pan` values can be functions; serialization or JSON conversion must preserve or replace function behavior.
7. Some preset visual palette data should not drive v2 visuals directly; map it intentionally to organism tokens or ignore it.
8. `computeVisualState()` contains useful audio-to-visual signals but old names may imply visualizer thinking; rename for organism state.
9. MIDI event timing uses `e.receivedTime` and `performance.now()`; changing this can increase latency.
10. Generative playback `stop` does not own held voices; changing transport semantics may alter existing interaction behavior.
11. `syncBotanical()` uses parameter smoothing; removing smoothing can create clicks or unstable audio changes.
12. The old app uses globals and closure state heavily; migrate behind explicit module APIs before wiring UI.

## 9. Exact Order For Migrating The Sound Engine Into v2

1. Create a v2 audio architecture document that maps old engine concepts to v2 modules:
   - `src/audio/`
   - `src/engine/`
   - `src/organism/`
   - `src/data/`
2. Add a static source inventory document or comments in the migration task naming the old files being read; do not copy code yet.
3. Create v2 module boundaries:
   - `src/audio/audioContext`
   - `src/audio/botanicalGraph`
   - `src/audio/voices`
   - `src/audio/lfo`
   - `src/audio/transport`
   - `src/engine/plantasiaEngine`
   - `src/organism/organismState`
4. Extract pure constants first:
   - `SYNTH_SMOOTH`
   - `LIVE_ATTACK_SEC`
   - `GROWTH_STAGES`
   - `GROWTH_THRESHOLDS_MS`
   - `STAGE_BLEND`
5. Extract pure utility functions:
   - `midiNoteToFreq()`
   - `getLfoDepth()`
   - `getGrowthStage()`
   - `pitchFromBase()` rewritten to accept explicit state
6. Extract preset schema/default helpers:
   - `defaultSound()`
   - `defaultBotanical()`
   - `defaultGrowth()`
   - `normalizePreset()`
   - `buildPresetRegistry()`
7. Extract Web Audio source helpers:
   - `getNoiseBuffer()`
   - `getPulseWave()`
   - `createVoiceSource()`
8. Extract botanical graph:
   - `createBotanicalGraph()`
   - `wireBotanicalOutputs()`
   - `syncBotanical()`
9. Extract voice lifecycle:
   - `createLiveVoice()`
   - `tickLivingVoice()`
   - `tickAllLivingVoices()`
   - `releaseNote()` behavior as v2 voice-manager logic
10. Create a v2 engine facade with explicit methods:
    - `initializeFromUserGesture()`
    - `setPreset()`
    - `setParameters()`
    - `noteOn()`
    - `noteOff()`
    - `tick()`
    - `dispose()`
11. Map old `computeVisualState()` output into v2 organism state:
    - `growthLevel`
    - `growthStage`
    - `density`
    - `energy`
    - `tension`
    - `harmony`
    - `mutation`
    - `lifeState`
12. Add tests or verification scripts before connecting UI:
    - Preset registry builds.
    - All preset scales contain valid frequencies.
    - Audio graph creates without throwing in a browser-capable environment.
    - Voice lifecycle returns nodes and releases them.
13. Wire only a minimal non-visual interaction harness for manual sound testing.
14. After sound works, connect v2 organism rendering to the new organism-state adapter.
15. Only then build v2 UI around cultivation actions.

## 10. Exact Order For Migrating Presets Into v2

1. Treat `../plantasia-growth/plantasia-engine.js` `LEGACY_PRESETS` as the canonical preset source.
2. Copy preset data into a dedicated v2 data module only after the sound-engine module boundary exists.
3. Rename the concept from presets to species only if product docs confirm the public language; keep internal compatibility names during initial migration.
4. Preserve the 16 shipped keys initially:
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
5. Preserve `PRESET_ORDER` as data, not UI markup.
6. Replace function-valued fields such as `pan` with named behaviors:
   - `randomWide`
   - `randomNarrow`
   - `slowSine`
   - `center`
7. Preserve sound fields exactly first:
   - `scale`
   - `waveform`
   - `filterType`
   - `filterFreq`
   - `filterQ`
   - `attack`
   - `release`
   - `detuneCents`
   - `delay`
   - `echo`
   - `reverb`
   - `drift`
   - `chorus`
   - `saturation`
   - `stereoWidth`
   - `subAmount`
   - `hfRolloff`
8. Preserve botanical fields exactly first:
   - `morningMist`
   - `roots`
   - `pollen`
   - `photosynthesis`
   - `canopy`
   - `wind`
9. Preserve growth fields exactly first:
   - `speed`
   - `bloomIntensity`
   - `movementAmount`
   - `particleAmount`
10. Move old visual fields into a quarantined metadata block:
    - Keep for reference.
    - Do not drive v2 visuals directly.
    - Later map intentionally to ASCII grammar tokens.
11. Port `verify_presets.py` expectations into a v2-friendly verification script or test.
12. Validate:
    - Every preset builds through `normalizePreset()`.
    - Every scale frequency is positive and audible.
    - Every waveform maps to supported v2 voice sources.
    - Every filter type maps to Web Audio biquad types.
    - Echo feedback remains capped at `0.72`.
13. Add a compatibility layer so old preset keys can be loaded while v2 product naming evolves.
14. Only after validation, expose presets/species through v2 interaction design.

## Stop Conditions

Stop migration work if:

- A change requires copying old UI markup.
- A change requires importing old CSS.
- Audio initialization cannot be tested from a user gesture.
- Preset data cannot be validated independently from UI.
- A function depends on old DOM ids that do not exist in v2.
- An old visualizer concept starts replacing the v2 organism model.

## Migration Principle

Framework teaches. Plantasia implements. The old app informs sound behavior only.

The v2 organism is the instrument; there is no separate visualizer.
