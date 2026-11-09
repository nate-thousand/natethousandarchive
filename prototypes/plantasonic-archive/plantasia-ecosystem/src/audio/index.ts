/** Plantasia — Audio layer public surface. */
export * from './types';
export { getAudioEngine, AudioEngine } from './engine/AudioEngine';
export { resolveSynthParams } from './engine/geneMapping';
export type { ResolvedSynthParams } from './engine/geneMapping';
export { FACTORY_PRESETS } from './presets/presets';
export type { Preset } from './presets/presets';
