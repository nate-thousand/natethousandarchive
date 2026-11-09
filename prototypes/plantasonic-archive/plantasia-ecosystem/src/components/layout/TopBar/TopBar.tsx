import { Link } from 'react-router-dom';
import { Badge } from '@design-system/components/Badge';
import { IconButton } from '@design-system/components/IconButton';
import { Switch } from '@design-system/components/Switch';
import { ROUTES } from '@app/navigation';
import { useAudio } from '@context/audio/audio';
import { usePreferences } from '@context/preferences/preferences';
import { useEcosystem } from '@context/ecosystem/ecosystem';
import type { BadgeTone } from '@design-system/components/Badge';
import type { AudioEngineState } from '@audio/types';
import './TopBar.css';

const STATUS_TONE: Record<AudioEngineState, BadgeTone> = {
  idle: 'neutral',
  starting: 'caution',
  running: 'positive',
  error: 'critical',
};

const STATUS_LABEL: Record<AudioEngineState, string> = {
  idle: 'Dormant',
  starting: 'Waking',
  running: 'Alive',
  error: 'Error',
};

export interface TopBarProps {
  onToggleLeft: () => void;
  onToggleRight: () => void;
}

/** TopBar — brand, organism identity, engine status, and global toggles. */
export function TopBar({ onToggleLeft, onToggleRight }: TopBarProps) {
  const { state } = useAudio();
  const { expertMode, toggleExpertMode, theme, toggleHighContrast } = usePreferences();
  const { organism, species } = useEcosystem();

  return (
    <header className="topbar surface-glass">
      <div className="topbar__section topbar__section--start">
        <IconButton
          name="menu"
          label="Toggle cultivation panel"
          className="topbar__drawer-toggle"
          onClick={onToggleLeft}
        />
        <Link to={ROUTES.home} className="topbar__brand" aria-label="Plantasia home">
          <span className="topbar__mark anim-breathe" aria-hidden="true" />
          <span className="topbar__title text-gradient">Plantasia</span>
          <Badge tone="neutral" className="topbar__version">
            v2.1
          </Badge>
        </Link>
      </div>

      <div className="topbar__section topbar__section--center">
        <span className="topbar__organism" title={`${species.name} — ${species.binomial}`}>
          <span className="topbar__organism-name">{organism.name}</span>
          <span className="topbar__organism-species">{species.name}</span>
        </span>
      </div>

      <div className="topbar__section topbar__section--end">
        <Badge tone={STATUS_TONE[state]} dot>
          {STATUS_LABEL[state]}
        </Badge>
        <Switch
          checked={expertMode}
          label="Expert"
          onChange={toggleExpertMode}
          className="topbar__expert"
        />
        <IconButton
          name="accessibility"
          label="Toggle high contrast"
          active={theme === 'high-contrast'}
          onClick={toggleHighContrast}
        />
        <IconButton
          name="dna"
          label="Toggle information panel"
          className="topbar__drawer-toggle"
          onClick={onToggleRight}
        />
      </div>
    </header>
  );
}
