# Plantasia v2

Plantasia v2 is a fresh app for a living audiovisual instrument: sound, interaction, and procedural ASCII organism visuals are treated as one expressive system.

## Current State

This is the first runnable app shell. It includes:

- A Vite + React entry point.
- Bootstrap layout and controls.
- Plantasia design tokens in `src/styles/tokens.css`.
- Bootstrap variable mapping in `src/styles/bootstrap-theme.css`.
- Plantasia-specific organism styles in `src/styles/plantasia.css`.
- Placeholder preset data in `src/data/presets.ts`.
- Placeholder audio functions in `src/audio/audioEngine.ts`.
- ASCII organism states in `src/ascii/organism.ts`.

## Run

```bash
npm install
npm run dev
```

## Sound Engine

The real sound engine has not been migrated yet. `src/audio/audioEngine.ts` currently logs placeholder actions for `initAudio()`, `playPreset()`, `stopAudio()`, and `updateParameter()`.

The old Plantasia app should only inform future audio engine logic, preset data, working synth parameters, interaction behavior, and utility functions. Do not copy the old UI or old CSS into v2.

## Framework Relationship

This repository also contains `ai-product-framework/`, the reusable framework Plantasia depends on for AI-assisted product standards. The framework remains product agnostic; Plantasia-specific implementation belongs in the v2 app folders.
