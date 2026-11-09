import { useRef, useState } from 'react';
import { Panel } from '@design-system/components/Panel';
import { Switch } from '@design-system/components/Switch';
import { Slider } from '@design-system/components/Slider';
import { Button } from '@design-system/components/Button';
import { Badge } from '@design-system/components/Badge';
import { SegmentedControl } from '@design-system/components/SegmentedControl';
import { KeyboardVisualizer } from '@components/performance/KeyboardVisualizer/KeyboardVisualizer';
import { usePerformance } from '@context/performance/performance';
import { PERFORMANCE_MACROS } from '@performance/macros';
import { resolveActiveProfileLabel } from '@performance/profiles/registry';
import { listTargetsByCategory, getParameterTarget } from '@performance/targets';
import type { ParameterTargetId, ScaleName, VelocityCurve } from '@performance/types';
import './PerformanceSettingsPanel.css';

const VELOCITY_OPTIONS: ReadonlyArray<{ value: VelocityCurve; label: string }> = [
  { value: 'linear', label: 'Linear' },
  { value: 'soft', label: 'Soft' },
  { value: 'hard', label: 'Hard' },
  { value: 'exponential', label: 'Exp' },
];

const SCALE_OPTIONS: ReadonlyArray<{ value: ScaleName; label: string }> = [
  { value: 'chromatic', label: 'Chromatic' },
  { value: 'major', label: 'Major' },
  { value: 'minor', label: 'Minor' },
  { value: 'pentatonicMajor', label: 'Penta Maj' },
  { value: 'pentatonicMinor', label: 'Penta Min' },
];

/**
 * PerformanceSettingsPanel — MIDI, keyboard, learn, macros, and monitoring.
 * Central UI for Milestone 8 performance input configuration.
 */
export function PerformanceSettingsPanel() {
  const perf = usePerformance();
  const importRef = useRef<HTMLInputElement>(null);
  const [learnSelection, setLearnSelection] = useState<ParameterTargetId>('gene.energy');

  const connectedDevices = perf.devices.filter((d) => d.state === 'connected');

  const handleImport = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') perf.importMappings(reader.result);
    };
    reader.readAsText(file);
  };

  return (
    <div className="perf-settings">
      <Panel title="Input Sources" eyebrow="Performance" icon="play" variant="glass" data-animate>
        <div className="perf-settings__stack">
          <Switch
            checked={perf.keyboardEnabled}
            label="Computer keyboard (QWERTY piano)"
            onChange={perf.setKeyboardEnabled}
          />
          <Switch
            checked={perf.midiEnabled}
            label="Web MIDI input"
            disabled={!perf.midiSupported}
            onChange={(v) => void perf.setMidiEnabled(v)}
          />
          {!perf.midiSupported && (
            <p className="perf-settings__note">Web MIDI is not available in this browser.</p>
          )}
          <div className="perf-settings__row">
            <span className="perf-settings__label">MIDI device</span>
            <select
              className="perf-settings__select"
              value={perf.selectedDeviceId}
              disabled={!perf.midiEnabled}
              onChange={(e) => perf.setSelectedDevice(e.target.value)}
              aria-label="MIDI input device"
            >
              <option value="all">All devices</option>
              {perf.devices.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} {d.state === 'disconnected' ? '(offline)' : ''}
                </option>
              ))}
            </select>
          </div>
          <div className="perf-settings__status">
            <Badge tone={connectedDevices.length > 0 ? 'positive' : 'neutral'} dot>
              {connectedDevices.length > 0
                ? `${connectedDevices.length} device${connectedDevices.length > 1 ? 's' : ''} connected`
                : 'No MIDI devices'}
            </Badge>
            <Badge tone="accent">{resolveActiveProfileLabel(perf.activeProfileId)}</Badge>
            {connectedDevices.map((d) =>
              d.profileId ? (
                <Badge key={d.id} tone="positive">
                  {d.name} detected
                </Badge>
              ) : null,
            )}
          </div>
        </div>
      </Panel>

      <Panel title="Controller Profile" eyebrow="Mapping" icon="settings" variant="glass" data-animate>
        <p className="perf-settings__note">
          Start with a built-in profile for any USB MIDI controller, or use Akai MPK Mini for knobs +
          pads. Custom mappings via MIDI Learn below.
        </p>
        <div className="perf-settings__profile-grid">
          {perf.midiProfiles.map((profile) => (
            <button
              key={profile.id}
              type="button"
              className={`perf-settings__profile-card${
                perf.activeProfileId === profile.id ? ' perf-settings__profile-card--active' : ''
              }`}
              onClick={() => perf.applyMidiProfile(profile.id)}
              disabled={!perf.midiEnabled}
            >
              <span className="perf-settings__profile-name">{profile.label}</span>
              <span className="perf-settings__profile-desc">{profile.description}</span>
            </button>
          ))}
        </div>
        <Switch
          checked={perf.autoApplyDeviceProfile}
          label="Auto-detect hardware (MPK Mini, etc.)"
          disabled={!perf.midiEnabled}
          onChange={perf.setAutoApplyDeviceProfile}
        />
      </Panel>

      <Panel title="Keyboard" eyebrow="Play" icon="harmony" variant="glass" data-animate>
        <KeyboardVisualizer />
        <div className="perf-settings__row perf-settings__row--top">
          <span className="perf-settings__label">Octave</span>
          <div className="perf-settings__inline">
            <Button variant="outline" size="sm" onClick={() => perf.setOctave(perf.state.octave - 1)}>
              −
            </Button>
            <span className="perf-settings__value">{perf.state.octave}</span>
            <Button variant="outline" size="sm" onClick={() => perf.setOctave(perf.state.octave + 1)}>
              +
            </Button>
          </div>
        </div>
        <div className="perf-settings__stack perf-settings__stack--top">
          <Switch
            checked={perf.state.scaleLock}
            label="Scale lock"
            onChange={perf.setScaleLock}
          />
          {perf.state.scaleLock && (
            <SegmentedControl
              label="Scale"
              options={SCALE_OPTIONS}
              value={perf.scale}
              onChange={perf.setScale}
            />
          )}
        </div>
      </Panel>

      <Panel title="Expression" eyebrow="Velocity" icon="energy" variant="glass" data-animate>
        <SegmentedControl
          label="Velocity curve"
          options={VELOCITY_OPTIONS}
          value={perf.velocityCurve}
          onChange={perf.setVelocityCurve}
        />
        <div className="perf-settings__meters">
          <span>Velocity {Math.round(perf.state.velocity * 100)}%</span>
          <span>Pressure {Math.round(perf.state.pressure * 100)}%</span>
          <span>Bloom {Math.round(perf.state.bloom * 100)}%</span>
        </div>
      </Panel>

      <Panel title="Performance Macros" eyebrow="Live" icon="mutation" variant="glass" data-animate>
        <div className="perf-settings__macros">
          {PERFORMANCE_MACROS.map((macro) => (
            <Slider
              key={macro.id}
              label={macro.label}
              value={perf.state.macroValues[macro.id] ?? 0}
              min={0}
              max={1}
              step={0.01}
              onChange={(v) => perf.setMacro(macro.id, v)}
            />
          ))}
        </div>
      </Panel>

      <Panel title="MIDI Learn" eyebrow="Mapping" icon="settings" variant="glass" data-animate>
        <div className="perf-settings__learn">
          <label className="perf-settings__label" htmlFor="learn-target">
            Parameter
          </label>
          <select
            id="learn-target"
            className="perf-settings__select"
            value={learnSelection}
            onChange={(e) => setLearnSelection(e.target.value as ParameterTargetId)}
          >
            {(['gene', 'macro', 'global', 'action'] as const).map((cat) => (
              <optgroup key={cat} label={cat}>
                {listTargetsByCategory(cat).map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          {perf.learnTarget ? (
            <Button variant="primary" size="sm" onClick={perf.cancelLearn}>
              Cancel learn…
            </Button>
          ) : (
            <Button variant="primary" size="sm" onClick={() => perf.startLearn(learnSelection)}>
              Learn
            </Button>
          )}
          {perf.learnTarget && (
            <p className="perf-settings__learn-active">
              Move a control on your MIDI device to bind{' '}
              <strong>{getParameterTarget(perf.learnTarget)?.label ?? perf.learnTarget}</strong>
            </p>
          )}
        </div>

        <div className="perf-settings__bindings">
          <h4 className="perf-settings__subhead">Mappings ({perf.bindings.length})</h4>
          {perf.bindings.length === 0 ? (
            <p className="perf-settings__note">
              No mappings yet. Apply Universal or MPK Mini above, or use Learn.
            </p>
          ) : (
            <ul className="perf-settings__binding-list">
              {perf.bindings.map((b) => (
                <li key={b.id} className="perf-settings__binding">
                  <span>{getParameterTarget(b.targetId)?.label ?? b.targetId}</span>
                  <span className="perf-settings__binding-meta">
                    {b.type} ch{b.channel + 1} #{b.controller}
                  </span>
                  <Button variant="ghost" size="sm" onClick={() => perf.deleteBinding(b.id)}>
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="perf-settings__actions">
          <Button
            variant="outline"
            size="sm"
            onClick={() => perf.applyMidiProfile('universal')}
            disabled={!perf.midiEnabled}
          >
            Universal defaults
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={perf.applyMpkMiniProfile}
            disabled={!perf.midiEnabled}
          >
            MPK Mini defaults
          </Button>
          <Button variant="outline" size="sm" onClick={() => {
            const blob = new Blob([perf.exportMappings()], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'plantasia-midi-mappings.json';
            a.click();
            URL.revokeObjectURL(url);
          }}>
            Export
          </Button>
          <Button variant="outline" size="sm" onClick={() => importRef.current?.click()}>
            Import
          </Button>
          <input
            ref={importRef}
            type="file"
            accept="application/json,.json"
            className="perf-settings__file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImport(file);
              e.target.value = '';
            }}
          />
          <Button variant="ghost" size="sm" onClick={perf.resetMappings}>
            Reset mappings
          </Button>
        </div>
      </Panel>

      <Panel title="Input Monitor" eyebrow="Debug" icon="harmony" variant="glass" data-animate>
        <ul className="perf-settings__monitor">
          {perf.monitor.length === 0 ? (
            <li className="perf-settings__monitor-empty">No input yet — play keys or move a MIDI control.</li>
          ) : (
            perf.monitor.slice(0, 12).map((entry) => (
              <li key={entry.id} className="perf-settings__monitor-row">
                <Badge tone="neutral">{entry.source}</Badge>
                <span>{entry.label}</span>
                <span className="perf-settings__monitor-value">{entry.value}</span>
              </li>
            ))
          )}
        </ul>
      </Panel>

      <Panel title="Safety" eyebrow="Reset" icon="pause" variant="glass" data-animate>
        <div className="perf-settings__actions">
          <Button variant="primary" iconStart="pause" onClick={perf.panic}>
            Panic (all notes off)
          </Button>
        </div>
      </Panel>
    </div>
  );
}
