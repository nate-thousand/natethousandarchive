/** Plantasia — Performance layer public surface. */
export * from './types';
export { EventBus } from './EventBus';
export { PerformanceEngine } from './engine/PerformanceEngine';
export type { PerformanceCallbacks } from './engine/PerformanceEngine';
export { InputManager } from './input/InputManager';
export { KeyboardInputSource } from './input/KeyboardInputSource';
export { MidiInputSource } from './input/MidiInputSource';
export { KEYBOARD_NOTE_MAP, KEYBOARD_ACTION_KEYS } from './input/keyboardLayout';
export { MidiLearn } from './learn/MidiLearn';
export { MpeVoiceManager, isMpeMemberChannel } from './mpe/MpeVoiceManager';
export { PARAMETER_TARGETS, getParameterTarget, listTargetsByCategory } from './targets';
export { PERFORMANCE_MACROS, getMacro } from './macros';
export { applyVelocityCurve, velocityToVisual, velocityToModulation } from './velocity';
export { quantizeToScale, midiToNote, noteToMidi } from './scales';
export {
  loadMappings,
  saveMappings,
  exportMappings,
  importMappings,
  createBinding,
  MAPPINGS_STORAGE_KEY,
} from './mappings';
export type { MappingStore } from './mappings';
export {
  listMidiProfiles,
  getMidiProfile,
  detectMidiProfileForDevice,
  buildProfileBindings,
  applyMidiProfile,
  applyMidiProfileIfEmpty,
  mergeBindings,
  resolveActiveProfileLabel,
  isBuiltinProfileId,
  UNIVERSAL_PROFILE_ID,
  MPK_MINI_PROFILE_ID,
} from './profiles/registry';
export type { ApplyProfileMode } from './profiles/registry';
export type {
  BuiltinMidiProfileId,
  MidiProfileId,
  MidiControllerProfile,
  MidiProfileBindingSpec,
} from './profiles/types';
export { universalMidiProfile, createUniversalBindingSpecs } from './profiles/universal';
export {
  akaiMpkMiniProfile,
  createMpkMiniBindings,
  createMpkMiniBindingSpecs,
  isMpkMiniDevice,
  MPK_MINI_KNOB_CCS,
  MPK_MINI_PAD_NOTES,
  MPK_MINI_KNOB_LABELS,
} from './profiles/akaiMpkMini';
