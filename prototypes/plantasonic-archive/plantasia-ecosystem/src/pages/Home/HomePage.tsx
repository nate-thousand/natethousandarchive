import { useNavigate } from 'react-router-dom';
import { Page } from '@components/common/Page/Page';
import { Button } from '@design-system/components/Button';
import { Panel } from '@design-system/components/Panel';
import { Icon } from '@design-system/components/Icon';
import { ROUTES } from '@app/navigation';
import { useAudio } from '@context/audio/audio';
import type { IconName } from '@design-system/tokens/icons/icons';
import './HomePage.css';

interface Highlight {
  icon: IconName;
  title: string;
  body: string;
}

const HIGHLIGHTS: Highlight[] = [
  { icon: 'seed', title: 'Cultivate, don\u2019t program', body: 'Plant a seed and grow sound through nature, not menus.' },
  { icon: 'evolution', title: 'Living & generative', body: 'Organisms breathe, evolve, and perform on their own.' },
  { icon: 'harmony', title: 'Synthesis through nature', body: 'Learn real synthesis hidden inside an intuitive garden.' },
];

/** HomePage — the atmospheric landing that invites the user into the ecosystem. */
export function HomePage() {
  const navigate = useNavigate();
  const { togglePlay, isPlaying } = useAudio();

  return (
    <Page
      eyebrow="A living sound ecosystem"
      title="Grow music."
      lede="Plantasia is not a synthesizer. It is a garden of organisms that generate sound through growth, mutation, and life. Tend it, and it sings."
      immersive
      width="wide"
    >
      <div className="home__cta" data-animate>
        <Button variant="primary" size="lg" iconStart={isPlaying ? 'pause' : 'play'} onClick={togglePlay}>
          {isPlaying ? 'Pause the garden' : 'Bring it to life'}
        </Button>
        <Button variant="outline" size="lg" iconStart="studio" onClick={() => navigate(ROUTES.studio)}>
          Enter the Studio
        </Button>
      </div>

      <div className="card-grid home__highlights">
        {HIGHLIGHTS.map((item) => (
          <Panel key={item.title} variant="glass" className="home__highlight" data-animate>
            <span className="home__highlight-icon">
              <Icon name={item.icon} size="lg" />
            </span>
            <h2 className="home__highlight-title">{item.title}</h2>
            <p className="home__highlight-body">{item.body}</p>
          </Panel>
        ))}
      </div>
    </Page>
  );
}
