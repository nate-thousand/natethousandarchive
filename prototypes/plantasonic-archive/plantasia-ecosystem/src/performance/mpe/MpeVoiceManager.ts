/**
 * Plantasia — MPE Voice Manager.
 *
 * Architecture for MIDI Polyphonic Expression: per-note pitch bend, pressure,
 * timbre, and modulation. Full per-note synth routing is TODO — this manager
 * tracks voice state and exposes it to the ModulationEngine.
 */
import type { MpeVoice } from '../types';

/** MPE zone: lower zone uses channels 2–8, upper 9–15 (future split support). */
export const MPE_LOWER_ZONE = { first: 2, last: 8 } as const;
export const MPE_MASTER_CHANNEL = 1;

export class MpeVoiceManager {
  private readonly voices = new Map<number, MpeVoice>();

  /** Register or update an MPE voice for a member channel. */
  setVoice(channel: number, partial: Partial<MpeVoice> & { note: number }): void {
    const existing = this.voices.get(channel);
    this.voices.set(channel, {
      note: partial.note,
      channel,
      pitchBend: partial.pitchBend ?? existing?.pitchBend ?? 0,
      pressure: partial.pressure ?? existing?.pressure ?? 0,
      timbre: partial.timbre ?? existing?.timbre ?? 0,
      active: partial.active ?? true,
    });
  }

  releaseVoice(channel: number): void {
    const voice = this.voices.get(channel);
    if (voice) this.voices.set(channel, { ...voice, active: false, pressure: 0 });
  }

  getVoice(channel: number): MpeVoice | undefined {
    return this.voices.get(channel);
  }

  getActiveVoices(): MpeVoice[] {
    return [...this.voices.values()].filter((v) => v.active);
  }

  /** Aggregate pressure across active MPE voices (for global modulation fallback). */
  aggregatePressure(): number {
    const active = this.getActiveVoices();
    if (active.length === 0) return 0;
    return active.reduce((sum, v) => sum + v.pressure, 0) / active.length;
  }

  /**
   * TODO: Route per-note pitch bend to individual synth voices when MPE-capable
   * voice allocation is implemented in OrganismInstrument.
   */
  applyPerNoteModulation(): void {
    // Placeholder for future MPE synth integration.
  }

  clear(): void {
    this.voices.clear();
  }
}

/** Returns true if a MIDI channel is an MPE member channel. */
export function isMpeMemberChannel(channel: number): boolean {
  return channel >= MPE_LOWER_ZONE.first && channel <= MPE_LOWER_ZONE.last;
}
