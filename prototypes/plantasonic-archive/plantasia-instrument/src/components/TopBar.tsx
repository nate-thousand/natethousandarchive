import type { Harmony } from '../data/harmony';

type TopBarProps = {
  ecosystemName: string;
  bpm: number;
  harmony: Harmony;
  life: number;
  cpu: number;
  recording: boolean;
  advanced: boolean;
  onToggleAdvanced: () => void;
  onBpmChange: (bpm: number) => void;
  onSave: () => void;
  onLoad: () => void;
  onToggleRecord: () => void;
  onFullscreen: () => void;
};

const iconButtonClass = 'btn btn-sm topbar-btn';

export function TopBar({
  ecosystemName,
  bpm,
  harmony,
  life,
  cpu,
  recording,
  advanced,
  onToggleAdvanced,
  onBpmChange,
  onSave,
  onLoad,
  onToggleRecord,
  onFullscreen,
}: TopBarProps) {
  return (
    <header className="topbar" role="banner">
      <div className="topbar-group">
        <span className="topbar-logo" aria-hidden="true">
          ✦
        </span>
        <span className="topbar-title">Plantasia</span>
        <span className="topbar-ecosystem text-secondary">{ecosystemName}</span>
      </div>

      <div className="topbar-group topbar-readouts" role="group" aria-label="Ecosystem status">
        <label className="topbar-stat">
          <span className="topbar-stat-label">BPM</span>
          <input
            className="topbar-bpm"
            type="number"
            min={40}
            max={220}
            value={bpm}
            onChange={(event) => onBpmChange(Number(event.target.value))}
            aria-label="Tempo in beats per minute"
          />
        </label>
        <span className="topbar-stat">
          <span className="topbar-stat-label">Key</span>
          <span className="topbar-stat-value">{harmony.key}</span>
        </span>
        <span className="topbar-stat">
          <span className="topbar-stat-label">Scale</span>
          <span className="topbar-stat-value">{harmony.scale}</span>
        </span>
        <span className="topbar-stat">
          <span className="topbar-stat-label">Life</span>
          <span className="topbar-stat-value">{Math.round(life)}%</span>
        </span>
        <span className="topbar-stat" aria-label={`CPU ${Math.round(cpu)} percent`}>
          <span className="topbar-stat-label">CPU</span>
          <span className="topbar-meter" aria-hidden="true">
            <span className="topbar-meter-fill" style={{ width: `${Math.min(100, cpu)}%` }} />
          </span>
        </span>
      </div>

      <div className="topbar-group" role="group" aria-label="Session actions">
        <button type="button" className={iconButtonClass} onClick={onSave}>
          Save
        </button>
        <button type="button" className={iconButtonClass} onClick={onLoad}>
          Load
        </button>
        <button
          type="button"
          className={`${iconButtonClass} ${recording ? 'is-recording' : ''}`}
          onClick={onToggleRecord}
          aria-pressed={recording}
        >
          {recording ? '● Rec' : 'Record'}
        </button>
        <button
          type="button"
          className={`${iconButtonClass} ${advanced ? 'is-active' : ''}`}
          onClick={onToggleAdvanced}
          aria-pressed={advanced}
          title="Toggle advanced synthesis terminology"
        >
          Settings
        </button>
        <button type="button" className={iconButtonClass} onClick={onFullscreen} title="Toggle fullscreen">
          ⤢
        </button>
      </div>
    </header>
  );
}
