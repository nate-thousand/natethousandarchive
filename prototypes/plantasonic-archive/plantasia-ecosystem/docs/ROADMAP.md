# Roadmap

Plantasia v2 ships a complete, production-ready foundation. The architecture is
intentionally additive — every item below slots into the existing layers without
structural changes.

## ✅ v2.0 — Foundation (this release)

- Domain-driven, scalable architecture (UI / audio / visualization / logic).
- Complete, token-driven design system with dark + high-contrast themes.
- Responsive five-region application shell (mobile-first).
- Procedural organism renderer (Canvas) with full audio reactivity.
- Tone.js audio engine: subtractive / FM / AM(physical) / noise voices,
  effects (reverb, delay, chorus, tremolo), gene→parameter mapping, generative
  transport, real-time analysis.
- Species framework with 9 archetypes + factory presets.
- Genes/DNA: encode, decode, mutate, crossbreed, randomize.
- AI Laboratory (local heuristics): describe, suggest, name, randomize.
- Accessibility: keyboard, ARIA, reduced motion, high contrast.

## 🌿 v2.1 — Depth

- Full granular and physical-modeling engines (true GrainPlayer + modal synth).
- Modulation matrix UI (route Wind/LFOs to any gene).
- Per-organism effect editing with visual signal-chain.
- Save/load user organisms & presets (storage service is already in place).
- Polyphonic on-screen + computer-keyboard playing surface.

## 🌳 v2.2 — Performance & input

- [x] MIDI input (Web MIDI API, device management, Akai MPK Mini profile, MIDI Learn).
- [x] MPE support (architecture + voice manager; per-note synth routing TODO).
- [ ] Ableton Link sync.
- [ ] Recording / export of performances.
- [ ] Scene system for live performance.

## 🌸 v3.0 — Intelligence & sharing

- Real model-backed AI (generate species, ecosystems, harmonic variations)
  behind the existing `services/ai` interface.
- Organism DNA cloud sharing & discovery.
- Multi-organism ecosystems (organisms interacting and cross-pollinating).
- Collaborative gardens.

## Continuous

- Performance budgets (60fps renderer, lazy-loaded routes).
- Expanded test coverage (engine mapping, generator, components).
- More species and curated preset collections.
