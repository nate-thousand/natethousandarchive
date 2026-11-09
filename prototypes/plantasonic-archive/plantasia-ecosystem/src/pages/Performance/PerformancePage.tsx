import { Button } from '@design-system/components/Button';
import { SignalBars } from '@components/ecosystem/SignalBars/SignalBars';
import { KeyboardVisualizer } from '@components/performance/KeyboardVisualizer/KeyboardVisualizer';
import { useAudio } from '@context/audio/audio';
import { useEcosystem } from '@context/ecosystem/ecosystem';
import { usePerformance } from '@context/performance/performance';
import './PerformancePage.css';

/**
 * PerformancePage — an immersive, low-chrome stage that hands the screen over to
 * the ecosystem for ambient performance. Only the essentials float above it.
 */
export function PerformancePage() {
  const { isPlaying, togglePlay } = useAudio();
  const { organism, species } = useEcosystem();
  const { panic, keyboardEnabled } = usePerformance();

  return (
    <div className="performance">
      <div className="performance__overlay">
        <p className="eyebrow">Performance</p>
        <h1 className="performance__name text-glow">{organism.name}</h1>
        <p className="performance__species">{species.binomial}</p>

        <Button
          variant="primary"
          size="lg"
          iconStart={isPlaying ? 'pause' : 'play'}
          onClick={togglePlay}
          className="performance__play"
        >
          {isPlaying ? 'Pause' : 'Perform'}
        </Button>

        <div className="performance__signal">
          <SignalBars />
        </div>

        {keyboardEnabled && (
          <div className="performance__keyboard">
            <KeyboardVisualizer />
          </div>
        )}

        <Button variant="ghost" size="sm" onClick={panic} className="performance__panic">
          Panic
        </Button>
      </div>
    </div>
  );
}
