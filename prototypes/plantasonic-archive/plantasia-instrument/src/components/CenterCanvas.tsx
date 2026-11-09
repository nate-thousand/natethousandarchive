import { useRef } from 'react';
import { gsap, prefersReducedMotion, useGSAP } from '../engine/animationSystem';
import { OrganismRenderer } from './OrganismRenderer';
import { VisualizationLayer } from './VisualizationLayer';
import type { BotanicalControls, SpeciesProfile } from '../data/ecosystem';

type CenterCanvasProps = {
  species: SpeciesProfile;
  controls: BotanicalControls;
  seed: string;
  level: number;
  audioActive: boolean;
  stateLabel: string;
};

export function CenterCanvas({
  species,
  controls,
  seed,
  level,
  audioActive,
  stateLabel,
}: CenterCanvasProps) {
  const scope = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      const stage = stageRef.current;
      if (!stage || prefersReducedMotion() || !contextSafe) {
        return;
      }

      const onMove = contextSafe((event: PointerEvent) => {
        const bounds = stage.getBoundingClientRect();
        const relX = (event.clientX - bounds.left) / bounds.width - 0.5;
        const relY = (event.clientY - bounds.top) / bounds.height - 0.5;
        gsap.to(stage, {
          rotationY: relX * 10,
          rotationX: -relY * 10,
          x: relX * 18,
          y: relY * 18,
          transformPerspective: 1200,
          transformOrigin: 'center center',
          duration: 1.1,
          ease: 'power2.out',
        });
      });

      const onLeave = contextSafe(() => {
        gsap.to(stage, { rotationY: 0, rotationX: 0, x: 0, y: 0, duration: 1.6, ease: 'power2.out' });
      });

      stage.addEventListener('pointermove', onMove);
      stage.addEventListener('pointerleave', onLeave);

      return () => {
        stage.removeEventListener('pointermove', onMove);
        stage.removeEventListener('pointerleave', onLeave);
      };
    },
    { scope },
  );

  return (
    <div ref={scope} className="center-canvas">
      <div className="center-canvas-grain" aria-hidden="true" />
      <div className="center-canvas-meta">
        <span className="text-uppercase small letter-spaced">{species.name}</span>
        <span className="text-secondary small">{stateLabel}</span>
      </div>
      <div ref={stageRef} className="center-canvas-stage">
        <VisualizationLayer active={audioActive} />
        <OrganismRenderer species={species} controls={controls} seed={seed} level={level} />
      </div>
      <p className="center-canvas-caption small text-secondary">{species.description}</p>
    </div>
  );
}
