/**
 * Plantasia — PerformanceEngine.
 *
 * Central orchestrator for all performance input. Every note, CC, and action
 * from any input source flows through this engine before reaching audio or UI.
 *
 * Pipeline:
 *   Input Source → EventBus → PerformanceEngine
 *     → Scale Processor → Macro Processor → Modulation Engine → AudioEngine
 *
 * No UI component sends notes directly to Tone.js.
 */
import { clamp } from '@utils/math';
import type { Note } from '@audio/types';
import type { OrganismGenes } from '@species/types';
import { GENE_KEYS } from '@species/genes';
import { EventBus } from '../EventBus';
import { MidiLearn } from '../learn/MidiLearn';
import { MpeVoiceManager, isMpeMemberChannel } from '../mpe/MpeVoiceManager';
import { MacroProcessor, blendGenesWithMacros } from '../processors/MacroProcessor';
import { ModulationEngine } from '../processors/ModulationEngine';
import { quantizeToScale, midiToNote } from '../scales';
import { velocityToVisual, applyVelocityCurve } from '../velocity';
import type {
  InputMonitorEntry,
  MidiBinding,
  ParameterTargetId,
  PerformanceAction,
  PerformanceEvent,
  PerformanceModulation,
  PerformanceState,
  ScaleName,
  VelocityCurve,
} from '../types';
import { DEFAULT_PERFORMANCE_STATE, NEUTRAL_MODULATION } from '../types';
import { createId } from '@utils/id';

const SUSTAIN_CC = 64;
const MAX_MONITOR = 32;

/** Callbacks wired by PerformanceProvider — keeps engine framework-agnostic. */
export interface PerformanceCallbacks {
  ensureAudioStarted: () => Promise<void>;
  attackNote: (note: Note, velocity: number) => void;
  releaseNote: (note: Note) => void;
  releaseAll: () => void;
  applyModulation: (mod: PerformanceModulation, genes?: OrganismGenes) => void;
  getBaseGenes: () => OrganismGenes;
  setGene: (key: keyof OrganismGenes, value: number) => void;
  setGenes: (genes: OrganismGenes) => void;
  mutate: (amount: number) => void;
  randomize: () => void;
  regrow: () => void;
  setMasterVolume: (v: number) => void;
  setTempo: (bpm: number) => void;
  toggleGenerative: () => void;
}

export class PerformanceEngine {
  readonly bus = new EventBus();
  readonly midiLearn = new MidiLearn();
  readonly mpe = new MpeVoiceManager();

  private state: PerformanceState = { ...DEFAULT_PERFORMANCE_STATE };
  private callbacks: PerformanceCallbacks | null = null;
  private readonly macroProcessor = new MacroProcessor();
  private readonly modulationEngine = new ModulationEngine();
  private scale: ScaleName = 'chromatic';
  private velocityCurve: VelocityCurve = 'linear';
  private monitor: InputMonitorEntry[] = [];
  private heldNotes = new Map<number, number>();
  private sustainHeld = false;
  private notesToReleaseOnSustainUp = new Set<number>();

  constructor() {
    this.bus.subscribe((event) => this.handleEvent(event));
    this.midiLearn.setOnChange(() => {
      /* provider will re-render */
    });
  }

  /** Wire audio/ecosystem callbacks (called once by PerformanceProvider). */
  setCallbacks(callbacks: PerformanceCallbacks): void {
    this.callbacks = callbacks;
  }

  getState(): PerformanceState {
    return this.state;
  }

  getMonitor(): InputMonitorEntry[] {
    return this.monitor;
  }

  getBindings(): MidiBinding[] {
    return this.midiLearn.getBindings();
  }

  setScale(scale: ScaleName): void {
    this.scale = scale;
  }

  setScaleLock(enabled: boolean): void {
    this.state = { ...this.state, scaleLock: enabled };
    this.emitState();
  }

  setVelocityCurve(curve: VelocityCurve): void {
    this.velocityCurve = curve;
    this.modulationEngine.setVelocityCurve(curve);
  }

  setOctave(octave: number): void {
    this.state = { ...this.state, octave: clamp(octave, 1, 7) };
    this.emitState();
  }

  /** External entry point for input sources. */
  ingest(event: PerformanceEvent): void {
    this.bus.publish(event);
  }

  /** Set a macro value (0..1) and re-apply. */
  setMacro(macroId: string, value: number): void {
    this.state = {
      ...this.state,
      macroValues: { ...this.state.macroValues, [macroId]: clamp(value, 0, 1) },
    };
    this.applyMacrosAndModulation();
    this.emitState();
  }

  panic(): void {
    this.heldNotes.clear();
    this.notesToReleaseOnSustainUp.clear();
    this.sustainHeld = false;
    this.mpe.clear();
    this.callbacks?.releaseAll();
    this.callbacks?.applyModulation(NEUTRAL_MODULATION);
    this.state = {
      ...DEFAULT_PERFORMANCE_STATE,
      octave: this.state.octave,
      scaleLock: this.state.scaleLock,
    };
    this.emitState();
  }

  private async handleEvent(event: PerformanceEvent): Promise<void> {
    try {
      await this.handleEventInner(event);
    } catch (error) {
      console.error('[PerformanceEngine] event handling failed', event, error);
    }
  }

  private async handleEventInner(event: PerformanceEvent): Promise<void> {
    this.addMonitor(event);

    if (this.midiLearn.isLearning()) {
      const binding = this.midiLearn.handleLearnEvent(event);
      if (binding) return;
    }

    const binding = this.midiLearn.resolveBinding(event);
    if (binding && event.type !== 'noteOn' && event.type !== 'noteOff') {
      this.applyBinding(binding, event);
      return;
    }

    if (binding && event.type === 'noteOn') {
      this.applyBinding(binding, event);
      return;
    }

    if (event.type === 'noteOff') {
      const offBinding = this.midiLearn.resolveBinding(event);
      if (offBinding?.targetId.startsWith('action.')) {
        return;
      }
    }

    switch (event.type) {
      case 'noteOn':
        await this.handleNoteOn(event);
        break;
      case 'noteOff':
        this.handleNoteOff(event);
        break;
      case 'cc':
        this.handleCc(event);
        break;
      case 'pitchBend':
        this.handlePitchBend(event);
        break;
      case 'channelPressure':
        this.handleChannelPressure(event);
        break;
      case 'polyAftertouch':
        this.handlePolyAftertouch(event);
        break;
      case 'sustain':
        this.handleSustain(event);
        break;
      case 'action':
        this.handleAction(event);
        break;
      case 'panic':
        this.panic();
        break;
      case 'programChange':
        break;
      default:
        break;
    }
  }

  private async handleNoteOn(event: PerformanceEvent): Promise<void> {
    if (event.note === undefined) return;
    let midi = event.note;
    if (this.state.scaleLock) {
      midi = quantizeToScale(midi, this.scale);
    }

    const velocity = event.velocity ?? 90;
    const normVel = applyVelocityCurve(velocity, this.velocityCurve);

    if (isMpeMemberChannel(event.channel ?? 0)) {
      this.mpe.setVoice(event.channel ?? 0, { note: midi, pressure: normVel, active: true });
    }

    this.heldNotes.set(midi, velocity);
    this.updateVelocityState(velocity);
    this.applyMacrosAndModulation();

    await this.callbacks?.ensureAudioStarted();
    this.callbacks?.attackNote(midiToNote(midi), normVel);

    this.state = {
      ...this.state,
      activeNotes: [...this.heldNotes.keys()],
    };
    this.emitState();
  }

  private handleNoteOff(event: PerformanceEvent): void {
    if (event.note === undefined) return;
    const midi = event.note;

    if (isMpeMemberChannel(event.channel ?? 0)) {
      this.mpe.releaseVoice(event.channel ?? 0);
    }

    if (this.sustainHeld || this.state.sustain) {
      this.notesToReleaseOnSustainUp.add(midi);
    } else {
      this.heldNotes.delete(midi);
      this.callbacks?.releaseNote(midiToNote(midi));
    }

    this.state = {
      ...this.state,
      activeNotes: [...this.heldNotes.keys()],
    };
    this.emitState();
  }

  private handleCc(event: PerformanceEvent): void {
    if (event.cc === SUSTAIN_CC) {
      const on = (event.value ?? 0) > 0.5;
      this.handleSustain({ ...event, type: 'sustain', value: on ? 1 : 0 });
      return;
    }
    if (event.cc !== undefined && event.value !== undefined) {
      this.applyCcToNearestGene(event.cc, event.value);
    }
  }

  private handlePitchBend(event: PerformanceEvent): void {
    if (isMpeMemberChannel(event.channel ?? 0)) {
      this.mpe.setVoice(event.channel ?? 0, {
        note: this.mpe.getVoice(event.channel ?? 0)?.note ?? 60,
        pitchBend: event.pitchBend ?? 0,
        active: true,
      });
      // TODO: apply per-note pitch bend to synth voice
    }
  }

  private handleChannelPressure(event: PerformanceEvent): void {
    const pressure = event.value ?? 0;
    this.state = { ...this.state, pressure };
    this.applyMacrosAndModulation();
    this.emitState();
  }

  private handlePolyAftertouch(event: PerformanceEvent): void {
    if (event.note === undefined) return;
    const pressure = event.value ?? 0;
    this.state = {
      ...this.state,
      polyPressure: { ...this.state.polyPressure, [event.note]: pressure },
    };
    if (isMpeMemberChannel(event.channel ?? 0)) {
      this.mpe.setVoice(event.channel ?? 0, { note: event.note, pressure, active: true });
    }
    this.applyMacrosAndModulation();
    this.emitState();
  }

  private handleSustain(event: PerformanceEvent): void {
    const on = (event.value ?? 0) > 0.5;
    this.sustainHeld = on;
    this.state = { ...this.state, sustain: on };

    if (!on) {
      for (const midi of this.notesToReleaseOnSustainUp) {
        this.heldNotes.delete(midi);
        this.callbacks?.releaseNote(midiToNote(midi));
      }
      this.notesToReleaseOnSustainUp.clear();
      this.state = { ...this.state, activeNotes: [...this.heldNotes.keys()] };
    }
    this.emitState();
  }

  private handleAction(event: PerformanceEvent): void {
    if (!event.action) return;
    switch (event.action) {
      case 'octaveUp':
        this.setOctave(this.state.octave + 1);
        break;
      case 'octaveDown':
        this.setOctave(this.state.octave - 1);
        break;
      case 'panic':
        this.panic();
        break;
      case 'mutate':
        this.callbacks?.mutate(0.18);
        break;
      case 'seed':
        this.callbacks?.randomize();
        break;
      case 'grow':
        this.callbacks?.regrow();
        break;
      case 'bloom':
        this.setMacro('bloom', 1);
        break;
      case 'spores':
        this.setMacro('storm', 0.8);
        break;
      case 'connect':
        this.callbacks?.setGene('harmony', 0.85);
        break;
      case 'prune':
        this.callbacks?.setGene('growth', 0.25);
        break;
      case 'nourish':
        this.callbacks?.setGene('energy', 0.85);
        this.callbacks?.setGene('water', 0.75);
        break;
      default:
        break;
    }
  }

  private applyBinding(binding: MidiBinding, event: PerformanceEvent): void {
    const raw = event.value ?? (event.velocity !== undefined ? event.velocity / 127 : 0);
    const value = binding.inverted ? 1 - raw : raw;
    this.applyTarget(binding.targetId, value, event);
  }

  private applyTarget(targetId: ParameterTargetId, value: number, event?: PerformanceEvent): void {
    if (targetId.startsWith('gene.')) {
      const key = targetId.replace('gene.', '') as keyof OrganismGenes;
      this.callbacks?.setGene(key, clamp(value, 0, 1));
      return;
    }
    if (targetId.startsWith('macro.')) {
      const macroId = targetId.replace('macro.', '');
      this.setMacro(macroId, value);
      return;
    }
    if (targetId === 'masterVolume') {
      this.callbacks?.setMasterVolume(clamp(value, 0, 1));
      return;
    }
    if (targetId === 'tempo') {
      this.callbacks?.setTempo(Math.round(40 + value * 120));
      return;
    }
    if (targetId.startsWith('action.') && (event?.type === 'noteOn' || event?.type === 'cc')) {
      const action = targetId.replace('action.', '') as PerformanceAction;
      this.handleAction({ ...event!, type: 'action', action, timestamp: Date.now(), source: event!.source });
    }
  }

  private applyCcToNearestGene(cc: number, value: number): void {
    const geneIndex = cc % GENE_KEYS.length;
    const key = GENE_KEYS[geneIndex];
    if (key) this.callbacks?.setGene(key, value);
  }

  private updateVelocityState(velocity: number): void {
    const norm = applyVelocityCurve(velocity, this.velocityCurve);
    const visual = velocityToVisual(velocity, this.velocityCurve);
    this.state = {
      ...this.state,
      velocity: norm,
      bloom: visual.bloom,
      motion: visual.motion,
      particleDensity: visual.particleDensity,
      visualIntensity: visual.intensity,
    };
  }

  private applyMacrosAndModulation(): void {
    if (!this.callbacks) return;
    const base = this.callbacks.getBaseGenes();
    const macroResult = this.macroProcessor.apply(this.state.macroValues);
    const modulated = blendGenesWithMacros(base, macroResult.geneOffsets);
    const mod = this.modulationEngine.compute(this.state);
    // Transient performance blend — do not persist macro offsets into ecosystem state.
    this.callbacks.applyModulation(mod, modulated);

    const visual = this.modulationEngine.computeVisual({
      ...this.state,
      bloom: Math.max(this.state.bloom, macroResult.visual.bloom),
      motion: Math.max(this.state.motion, macroResult.visual.motion),
      particleDensity: Math.max(this.state.particleDensity, macroResult.visual.particleDensity),
    });
    this.state = { ...this.state, ...visual, visualIntensity: Math.max(this.state.visualIntensity, visual.bloom) };
  }

  private addMonitor(event: PerformanceEvent): void {
    const label = this.formatMonitorLabel(event);
    const entry: InputMonitorEntry = {
      id: createId('mon'),
      timestamp: event.timestamp,
      source: event.source,
      label,
      value: this.formatMonitorValue(event),
    };
    this.monitor = [entry, ...this.monitor].slice(0, MAX_MONITOR);
  }

  private formatMonitorLabel(event: PerformanceEvent): string {
    switch (event.type) {
      case 'noteOn':
        return `Note On ${event.note}`;
      case 'noteOff':
        return `Note Off ${event.note}`;
      case 'cc':
        return `CC ${event.cc}`;
      case 'pitchBend':
        return 'Pitch Bend';
      case 'channelPressure':
        return 'Aftertouch';
      case 'action':
        return `Action ${event.action}`;
      default:
        return event.type;
    }
  }

  private formatMonitorValue(event: PerformanceEvent): string {
    if (event.velocity !== undefined) return `vel ${event.velocity}`;
    if (event.value !== undefined) return `${Math.round(event.value * 100)}%`;
    return '';
  }

  private emitState(): void {
    this.bus.emitState(this.state);
  }

  /** Update keyboard visual feedback keys. */
  setActiveKeyboardKeys(keys: string[]): void {
    this.state = { ...this.state, activeKeyboardKeys: keys };
    this.emitState();
  }

  dispose(): void {
    this.callbacks = null;
    this.panic();
  }
}
