/**
 * Plantasia — Web MIDI input source.
 *
 * Device discovery, connection management, and message parsing. Supports
 * multiple devices, auto-applies controller profiles on connect, and works with
 * any class-compliant USB MIDI device.
 */
import type { PerformanceEngine } from '../engine/PerformanceEngine';
import type { MidiDeviceInfo, PerformanceEvent } from '../types';
import type { BuiltinMidiProfileId } from '../profiles/types';
import {
  applyMidiProfile,
  detectMidiProfileForDevice,
  MPK_MINI_PROFILE_ID,
} from '../profiles/registry';
import { isMpkMiniDevice } from '../profiles/akaiMpkMini';
import type { MappingStore } from '../mappings';

type DeviceChangeHandler = (devices: MidiDeviceInfo[]) => void;
type ProfileDetectedHandler = (profileId: BuiltinMidiProfileId, device: MidiDeviceInfo) => void;

export class MidiInputSource {
  private access: MIDIAccess | null = null;
  private enabled = false;
  private autoApplyProfile = true;
  private readonly activeInputs = new Map<string, MIDIInput>();
  private onDeviceChange: DeviceChangeHandler | null = null;
  private onProfileDetected: ProfileDetectedHandler | null = null;
  private selectedDeviceId: string | 'all' = 'all';
  private appliedProfiles = new Set<string>();

  constructor(private readonly engine: PerformanceEngine) {}

  setOnDeviceChange(handler: DeviceChangeHandler): void {
    this.onDeviceChange = handler;
  }

  setOnProfileDetected(handler: ProfileDetectedHandler): void {
    this.onProfileDetected = handler;
  }

  setAutoApplyProfile(enabled: boolean): void {
    this.autoApplyProfile = enabled;
  }

  setSelectedDevice(id: string | 'all'): void {
    this.selectedDeviceId = id;
    this.reattachInputs();
  }

  isSupported(): boolean {
    return typeof navigator !== 'undefined' && 'requestMIDIAccess' in navigator;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  async enable(): Promise<boolean> {
    if (!this.isSupported()) return false;
    try {
      this.access = await navigator.requestMIDIAccess({ sysex: false });
      this.access.onstatechange = () => this.syncDevices();
      this.enabled = true;
      this.syncDevices();
      return true;
    } catch {
      return false;
    }
  }

  disable(): void {
    this.enabled = false;
    this.appliedProfiles.clear();
    for (const input of this.activeInputs.values()) {
      input.onmidimessage = null;
    }
    this.activeInputs.clear();
    this.notifyDevices();
  }

  getDevices(): MidiDeviceInfo[] {
    if (!this.access) return [];
    return [...this.access.inputs.values()].map((input) => ({
      id: input.id,
      name: input.name ?? 'Unknown Device',
      manufacturer: input.manufacturer ?? '',
      state: input.state as 'connected' | 'disconnected',
      profileId: this.resolveDeviceProfileId(input.name ?? '', input.manufacturer ?? ''),
    }));
  }

  /** Apply a built-in profile immediately (Settings → MIDI profile buttons). */
  applyProfile(profileId: BuiltinMidiProfileId): MappingStore {
    applyMidiProfile(this.engine.midiLearn, profileId, 'replace');
    return this.engine.midiLearn.getStore();
  }

  /** @deprecated Use applyProfile('akai-mpk-mini'). */
  applyMpkMiniProfile(): MappingStore {
    return this.applyProfile(MPK_MINI_PROFILE_ID);
  }

  private resolveDeviceProfileId(name: string, manufacturer: string): string | undefined {
    return detectMidiProfileForDevice(name, manufacturer) ?? undefined;
  }

  private syncDevices(): void {
    if (!this.access || !this.enabled) return;
    this.reattachInputs();
    this.notifyDevices();
    this.maybeAutoApplyProfiles();
  }

  private maybeAutoApplyProfiles(): void {
    if (!this.access || !this.autoApplyProfile) return;

    for (const input of this.access.inputs.values()) {
      if (input.state !== 'connected') continue;
      if (this.appliedProfiles.has(input.id)) continue;

      const profileId = detectMidiProfileForDevice(input.name ?? '', input.manufacturer ?? '');
      if (!profileId) continue;

      applyMidiProfile(this.engine.midiLearn, profileId, 'replace');
      this.appliedProfiles.add(input.id);

      const device: MidiDeviceInfo = {
        id: input.id,
        name: input.name ?? 'Unknown Device',
        manufacturer: input.manufacturer ?? '',
        state: 'connected',
        profileId,
      };
      this.onProfileDetected?.(profileId, device);

      if (isMpkMiniDevice(input.name ?? '')) {
        // Legacy hook — profile already applied above.
      }
    }
  }

  private reattachInputs(): void {
    if (!this.access) return;
    for (const input of this.activeInputs.values()) {
      input.onmidimessage = null;
    }
    this.activeInputs.clear();

    for (const input of this.access.inputs.values()) {
      if (input.state !== 'connected') continue;
      if (this.selectedDeviceId !== 'all' && input.id !== this.selectedDeviceId) continue;
      input.onmidimessage = (msg) => this.handleMessage(msg, input.id);
      this.activeInputs.set(input.id, input);
    }
  }

  private handleMessage(msg: MIDIMessageEvent, deviceId: string): void {
    const data = msg.data;
    if (!data || data.length < 1) return;

    const status = data[0] ?? 0;
    const channel = status & 0x0f;
    const command = status & 0xf0;
    const timestamp = msg.timeStamp || Date.now();

    let event: PerformanceEvent | null = null;

    switch (command) {
      case 0x90: {
        const note = data[1] ?? 0;
        const velocity = data[2] ?? 0;
        if (velocity === 0) {
          event = { type: 'noteOff', source: 'midi', channel, note, timestamp };
        } else {
          event = { type: 'noteOn', source: 'midi', channel, note, velocity, timestamp };
        }
        break;
      }
      case 0x80: {
        const note = data[1] ?? 0;
        event = { type: 'noteOff', source: 'midi', channel, note, timestamp };
        break;
      }
      case 0xb0: {
        const cc = data[1] ?? 0;
        const value = (data[2] ?? 0) / 127;
        event = { type: 'cc', source: 'midi', channel, cc, value, timestamp };
        break;
      }
      case 0xe0: {
        const lsb = data[1] ?? 0;
        const msb = data[2] ?? 0;
        const bend = ((msb << 7) | lsb) / 16383 * 2 - 1;
        event = { type: 'pitchBend', source: 'midi', channel, pitchBend: bend, timestamp };
        break;
      }
      case 0xd0: {
        const pressure = (data[1] ?? 0) / 127;
        event = { type: 'channelPressure', source: 'midi', channel, value: pressure, timestamp };
        break;
      }
      case 0xa0: {
        const note = data[1] ?? 0;
        const pressure = (data[2] ?? 0) / 127;
        event = { type: 'polyAftertouch', source: 'midi', channel, note, value: pressure, timestamp };
        break;
      }
      case 0xc0:
        event = { type: 'programChange', source: 'midi', channel, value: data[1], timestamp };
        break;
      default:
        break;
    }

    if (event) {
      void deviceId;
      this.engine.ingest(event);
    }
  }

  private notifyDevices(): void {
    this.onDeviceChange?.(this.getDevices());
  }
}
