import { useRef } from 'react';
import { gsap, prefersReducedMotion, useGSAP } from '../engine/animationSystem';
import { AIPanel } from './AIPanel';
import { currentChord, type Harmony } from '../data/harmony';
import {
  deriveEcosystemMetrics,
  type BotanicalControls,
  type SpeciesProfile,
} from '../data/ecosystem';

type RightSidebarProps = {
  species: SpeciesProfile;
  controls: BotanicalControls;
  harmony: Harmony;
  age: number;
  level: number;
  connectedOrganisms: number;
  particleCount: number;
  aiMessage: string;
  onAiAction: (action: string) => void;
};

const chordWheelTones = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'];

export function RightSidebar({
  species,
  controls,
  harmony,
  age,
  level,
  connectedOrganisms,
  particleCount,
  aiMessage,
  onAiAction,
}: RightSidebarProps) {
  const scope = useRef<HTMLDivElement>(null);
  const metrics = deriveEcosystemMetrics(controls, species);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        return;
      }
      gsap.to('[data-flow-bar]', {
        scaleY: () => gsap.utils.random(0.3, 1),
        transformOrigin: 'center bottom',
        duration: 0.9,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.06, from: 'start' },
      });
      gsap.to('[data-mod-dot]', {
        y: () => gsap.utils.random(-6, 6),
        duration: 1.4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 0.1,
      });
    },
    { scope },
  );

  return (
    <aside ref={scope} className="right-sidebar" aria-label="Ecosystem information">
      <section className="info-panel" aria-label="Organism">
        <h2 className="info-panel-title">Organism</h2>
        <dl className="info-grid">
          <div>
            <dt>Species</dt>
            <dd>{species.name}</dd>
          </div>
          <div>
            <dt>Age</dt>
            <dd>{age}s</dd>
          </div>
          {metrics.map((metric) => (
            <div key={metric.label}>
              <dt>{metric.label}</dt>
              <dd>{metric.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="info-panel" aria-label="Harmony">
        <h2 className="info-panel-title">Harmony</h2>
        <dl className="info-grid">
          <div>
            <dt>Key</dt>
            <dd>{harmony.key}</dd>
          </div>
          <div>
            <dt>Scale</dt>
            <dd>{harmony.scale}</dd>
          </div>
          <div>
            <dt>Chord</dt>
            <dd>{currentChord(harmony.key, harmony.scale)}</dd>
          </div>
        </dl>
        <div className="chord-wheel" aria-hidden="true">
          {chordWheelTones.map((tone, index) => (
            <span
              key={tone}
              className={`chord-wheel-tone ${index === 0 ? 'is-active' : ''}`}
              style={{ transform: `rotate(${(360 / chordWheelTones.length) * index}deg) translateY(-2.4rem)` }}
            >
              {tone}
            </span>
          ))}
        </div>
      </section>

      <section className="info-panel" aria-label="Flow">
        <h2 className="info-panel-title">Flow</h2>
        <div className="flow-wave" aria-hidden="true">
          {Array.from({ length: 24 }).map((_, index) => (
            <span key={index} data-flow-bar className="flow-bar" />
          ))}
        </div>
        <div className="flow-mod" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, index) => (
            <span key={index} data-mod-dot className="flow-dot" />
          ))}
        </div>
        <p className="small text-secondary mb-0">Envelope + modulation activity · level {Math.round(level * 100)}%</p>
      </section>

      <section className="info-panel" aria-label="Biosphere">
        <h2 className="info-panel-title">Biosphere</h2>
        <div className="biosphere-map" aria-hidden="true">
          {Array.from({ length: connectedOrganisms }).map((_, index) => (
            <span
              key={index}
              className="biosphere-node"
              style={{
                left: `${15 + (index * 70) / Math.max(1, connectedOrganisms)}%`,
                top: `${20 + ((index * 37) % 60)}%`,
              }}
            />
          ))}
        </div>
        <dl className="info-grid">
          <div>
            <dt>Connected</dt>
            <dd>{connectedOrganisms}</dd>
          </div>
          <div>
            <dt>Routing</dt>
            <dd>{species.particleBehavior}</dd>
          </div>
          <div>
            <dt>Particles</dt>
            <dd>{particleCount}</dd>
          </div>
        </dl>
      </section>

      <AIPanel message={aiMessage} onAction={onAiAction} />
    </aside>
  );
}
