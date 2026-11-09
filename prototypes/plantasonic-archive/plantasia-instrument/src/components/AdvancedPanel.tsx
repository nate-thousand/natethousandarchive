import type { SynthSettings } from '../data/presets';

type AdvancedPanelProps = {
  settings: SynthSettings;
  onChange: <K extends keyof SynthSettings>(key: K, value: SynthSettings[K]) => void;
};

/**
 * Raw synthesis terminology. Only rendered when Advanced Mode is enabled so the
 * default UI stays purely botanical. Preserves the original v1 control surface.
 */
export function AdvancedPanel({ settings, onChange }: AdvancedPanelProps) {
  return (
    <div className="advanced-panel" role="group" aria-label="Advanced synthesis controls">
      <div className="advanced-field">
        <label htmlFor="adv-osc">Oscillator</label>
        <select
          id="adv-osc"
          className="form-select form-select-sm advanced-input"
          value={settings.oscillator}
          onChange={(event) => onChange('oscillator', event.target.value as SynthSettings['oscillator'])}
        >
          <option value="sine">Sine</option>
          <option value="triangle">Triangle</option>
          <option value="sawtooth">Sawtooth</option>
          <option value="square">Square</option>
        </select>
      </div>

      <div className="advanced-field">
        <label htmlFor="adv-filter">Filter {settings.filterHz} Hz</label>
        <input
          id="adv-filter"
          className="form-range advanced-input"
          type="range"
          min={100}
          max={8000}
          step={10}
          value={settings.filterHz}
          onChange={(event) => onChange('filterHz', Number(event.target.value))}
        />
      </div>

      <div className="advanced-field">
        <label htmlFor="adv-attack">Attack {settings.envelope.attack.toFixed(2)}s</label>
        <input
          id="adv-attack"
          className="form-range advanced-input"
          type="range"
          min={0.01}
          max={2}
          step={0.01}
          value={settings.envelope.attack}
          onChange={(event) =>
            onChange('envelope', { ...settings.envelope, attack: Number(event.target.value) })
          }
        />
      </div>

      <div className="advanced-field">
        <label htmlFor="adv-release">Release {settings.envelope.release.toFixed(2)}s</label>
        <input
          id="adv-release"
          className="form-range advanced-input"
          type="range"
          min={0.1}
          max={4}
          step={0.1}
          value={settings.envelope.release}
          onChange={(event) =>
            onChange('envelope', { ...settings.envelope, release: Number(event.target.value) })
          }
        />
      </div>

      <div className="advanced-field">
        <label htmlFor="adv-delay">Delay {settings.effects.delay.toFixed(2)}</label>
        <input
          id="adv-delay"
          className="form-range advanced-input"
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={settings.effects.delay}
          onChange={(event) =>
            onChange('effects', { ...settings.effects, delay: Number(event.target.value) })
          }
        />
      </div>

      <div className="advanced-field">
        <label htmlFor="adv-reverb">Reverb {settings.effects.reverb.toFixed(2)}</label>
        <input
          id="adv-reverb"
          className="form-range advanced-input"
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={settings.effects.reverb}
          onChange={(event) =>
            onChange('effects', { ...settings.effects, reverb: Number(event.target.value) })
          }
        />
      </div>
    </div>
  );
}
