/**
 * Plantasia — MIDI mapping persistence helpers.
 */
import { createId } from '@utils/id';
import { loadValue, saveValue } from '@services/storage/storage';
import type { MidiBinding, ParameterTargetId } from './types';

export const MAPPINGS_STORAGE_KEY = 'midi-mappings';

export interface MappingStore {
  bindings: MidiBinding[];
  version: 1;
}

export function createBinding(
  targetId: ParameterTargetId,
  type: MidiBinding['type'],
  channel: number,
  controller: number,
): MidiBinding {
  return { id: createId('map'), targetId, type, channel, controller };
}

export function loadMappings(): MappingStore {
  return loadValue<MappingStore>(MAPPINGS_STORAGE_KEY, { bindings: [], version: 1 });
}

export function saveMappings(store: MappingStore): void {
  saveValue(MAPPINGS_STORAGE_KEY, store);
}

export function exportMappings(store: MappingStore): string {
  return JSON.stringify(store, null, 2);
}

export function importMappings(json: string): MappingStore {
  const parsed = JSON.parse(json) as MappingStore;
  if (!parsed.bindings || !Array.isArray(parsed.bindings)) {
    throw new Error('Invalid mapping file');
  }
  return { bindings: parsed.bindings, version: 1 };
}

export function findBindingForControl(
  bindings: MidiBinding[],
  type: MidiBinding['type'],
  channel: number,
  controller: number,
): MidiBinding | undefined {
  return bindings.find((b) => b.type === type && b.channel === channel && b.controller === controller);
}
