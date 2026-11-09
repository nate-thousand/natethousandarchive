import { Page } from '@components/common/Page/Page';
import { Panel } from '@design-system/components/Panel';
import { Slider } from '@design-system/components/Slider';
import { Switch } from '@design-system/components/Switch';
import { SegmentedControl } from '@design-system/components/SegmentedControl';
import { PerformanceSettingsPanel } from '@components/performance/PerformanceSettingsPanel/PerformanceSettingsPanel';
import { usePreferences, type ThemeName } from '@context/preferences/preferences';
import './SettingsPage.css';

const THEME_OPTIONS: ReadonlyArray<{ value: ThemeName; label: string }> = [
  { value: 'dark', label: 'Dark' },
  { value: 'high-contrast', label: 'High Contrast' },
];

/** SettingsPage — audio, appearance, and accessibility preferences. */
export function SettingsPage() {
  const {
    masterVolume,
    setMasterVolume,
    theme,
    setTheme,
    reducedMotion,
    setReducedMotion,
    expertMode,
    toggleExpertMode,
  } = usePreferences();

  return (
    <Page
      eyebrow="System"
      title="Settings"
      lede="Tune Plantasia to your environment. All preferences are saved to this device."
      width="narrow"
    >
      <Panel title="Audio" eyebrow="Sound" icon="volume" variant="glass" data-animate>
        <Slider
          label="Master volume"
          value={masterVolume}
          min={0}
          max={1}
          step={0.01}
          unit="%"
          onChange={setMasterVolume}
        />
      </Panel>

      <Panel title="Appearance" eyebrow="Theme" icon="sunlight" variant="glass" data-animate>
        <div className="settings__row">
          <span className="settings__label">Color theme</span>
          <SegmentedControl label="Color theme" options={THEME_OPTIONS} value={theme} onChange={setTheme} />
        </div>
      </Panel>

      <PerformanceSettingsPanel />

      <Panel title="Accessibility" eyebrow="Comfort" icon="accessibility" variant="glass" data-animate>
        <div className="settings__stack">
          <Switch
            checked={reducedMotion}
            label="Reduce motion (calm the ecosystem)"
            onChange={setReducedMotion}
          />
          <Switch
            checked={expertMode}
            label="Expert mode (reveal advanced synthesis)"
            onChange={toggleExpertMode}
          />
        </div>
      </Panel>
    </Page>
  );
}
