import { useEffect, useRef } from 'react';
import { useAudio } from '@context/audio/audio';
import type { AudioBands } from '@audio/types';
import './SignalBars.css';

interface BandDescriptor {
  key: keyof AudioBands;
  label: string;
  /** What part of the organism this band animates. */
  affects: string;
}

const BANDS: BandDescriptor[] = [
  { key: 'bass', label: 'Bass', affects: 'Roots' },
  { key: 'mid', label: 'Mid', affects: 'Branches' },
  { key: 'treble', label: 'Treble', affects: 'Leaves' },
  { key: 'noise', label: 'Noise', affects: 'Spores' },
  { key: 'level', label: 'Life', affects: 'Bloom' },
];

/**
 * SignalBars — live audio analysis visualized as labeled meters. Updates via
 * requestAnimationFrame by reading the engine's bands directly (no React state
 * churn) and writing the bar heights imperatively for smoothness.
 */
export function SignalBars() {
  const { getBands } = useAudio();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const fills = containerRef.current?.querySelectorAll<HTMLElement>('[data-band-fill]');
    const tick = () => {
      const bands = getBands();
      fills?.forEach((el) => {
        const key = el.dataset.bandFill as keyof AudioBands;
        el.style.transform = `scaleY(${Math.max(0.02, bands[key])})`;
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [getBands]);

  return (
    <div className="signal-bars" ref={containerRef}>
      {BANDS.map((band) => (
        <div key={band.key} className="signal-bars__col" title={`${band.label} → ${band.affects}`}>
          <div className="signal-bars__track">
            <span className="signal-bars__fill" data-band-fill={band.key} />
          </div>
          <span className="signal-bars__label">{band.affects}</span>
        </div>
      ))}
    </div>
  );
}
