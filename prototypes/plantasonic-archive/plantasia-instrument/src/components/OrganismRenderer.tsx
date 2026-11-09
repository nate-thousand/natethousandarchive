import { useMemo, useRef } from 'react';
import { gsap, motion, prefersReducedMotion, useGSAP } from '../engine/animationSystem';
import { generateOrganism } from '../engine/speciesEngine';
import type { BotanicalControls, SpeciesProfile } from '../data/ecosystem';

type OrganismRendererProps = {
  species: SpeciesProfile;
  controls: BotanicalControls;
  seed: string;
  level: number;
};

export function OrganismRenderer({ species, controls, seed, level }: OrganismRendererProps) {
  const scope = useRef<SVGSVGElement>(null);

  const geometry = useMemo(
    () => generateOrganism({ species, controls, seed }),
    [species, controls, seed],
  );

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        return;
      }

      gsap.to('[data-branch]', {
        rotation: () => gsap.utils.random(-1.4, 1.4),
        transformOrigin: 'center bottom',
        duration: motion.swayDuration,
        ease: motion.ease,
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.04, from: 'center' },
      });

      gsap.to('[data-leaf]', {
        scale: () => gsap.utils.random(0.85, 1.15),
        rotation: () => gsap.utils.random(-12, 12),
        transformOrigin: 'center center',
        duration: motion.flutterDuration,
        ease: motion.ease,
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.02, from: 'random' },
      });

      gsap.to('[data-flower]', {
        scale: () => gsap.utils.random(0.92, 1.2),
        transformOrigin: 'center center',
        duration: motion.breathDuration,
        ease: motion.ease,
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
      });

      gsap.to('[data-root]', {
        rotation: () => gsap.utils.random(-0.8, 0.8),
        transformOrigin: 'center top',
        duration: motion.swayDuration * 1.3,
        ease: motion.ease,
        repeat: -1,
        yoyo: true,
        stagger: 0.1,
      });

      gsap.to('[data-particle]', {
        y: '-=24',
        x: () => gsap.utils.random(-14, 14),
        opacity: () => gsap.utils.random(0.2, 0.9),
        duration: motion.driftDuration,
        ease: motion.ease,
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.05, from: 'random' },
      });

      gsap.to('[data-spore]', {
        scale: () => gsap.utils.random(0.6, 1.4),
        opacity: () => gsap.utils.random(0.3, 1),
        transformOrigin: 'center center',
        duration: motion.pulseDuration,
        ease: motion.ease,
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.08, from: 'random' },
      });

      gsap.to('[data-node]', {
        opacity: () => gsap.utils.random(0.4, 1),
        scale: () => gsap.utils.random(0.8, 1.3),
        transformOrigin: 'center center',
        duration: motion.pulseDuration,
        ease: motion.ease,
        repeat: -1,
        yoyo: true,
        stagger: 0.05,
      });

      gsap.to('[data-connection]', {
        opacity: () => gsap.utils.random(0.1, 0.6),
        duration: motion.pulseDuration * 1.4,
        ease: motion.ease,
        repeat: -1,
        yoyo: true,
        stagger: 0.06,
      });

      gsap.fromTo(
        '[data-core]',
        { scale: 0.96 },
        {
          scale: 1.08,
          transformOrigin: 'center center',
          duration: motion.breathDuration * 0.6,
          ease: motion.ease,
          repeat: -1,
          yoyo: true,
        },
      );
    },
    { scope, dependencies: [geometry] },
  );

  const coreGlow = 0.4 + level * 0.6;

  return (
    <svg
      ref={scope}
      className="organism-svg"
      viewBox={`0 0 ${geometry.width} ${geometry.height}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={`${species.name} organism`}
    >
      <defs>
        <radialGradient id="coreGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--plantasia-color-organism)" stopOpacity="0.95" />
          <stop offset="100%" stopColor="var(--plantasia-color-organism)" stopOpacity="0" />
        </radialGradient>
        <filter id="bloom" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g className="organism-roots" stroke="var(--plantasia-color-root, #5fa873)" fill="none" opacity="0.7">
        {geometry.roots.map((root) => (
          <path key={root.id} data-root d={root.path} strokeWidth={root.width} strokeLinecap="round" />
        ))}
      </g>

      <g className="organism-connections" stroke="var(--plantasia-color-signal)" opacity="0.35">
        {geometry.connections.map((connection) => (
          <line
            key={connection.id}
            data-connection
            x1={connection.from.x}
            y1={connection.from.y}
            x2={connection.to.x}
            y2={connection.to.y}
            strokeWidth={1}
          />
        ))}
      </g>

      <g className="organism-branches" stroke="var(--plantasia-color-organism)" fill="none">
        {geometry.branches.map((branch) => (
          <path
            key={branch.id}
            data-branch
            d={branch.path}
            strokeWidth={branch.width}
            strokeLinecap="round"
            opacity={0.55 + branch.depth * 0.05}
          />
        ))}
      </g>

      <g className="organism-leaves" fill="var(--plantasia-color-organism)" opacity="0.7">
        {geometry.leaves.map((leaf) => (
          <ellipse
            key={leaf.id}
            data-leaf
            cx={leaf.x}
            cy={leaf.y}
            rx={leaf.radius}
            ry={leaf.radius * 0.5}
            transform={`rotate(${leaf.angle} ${leaf.x} ${leaf.y})`}
          />
        ))}
      </g>

      <g className="organism-flowers" filter="url(#bloom)">
        {geometry.flowers.map((flower) => (
          <g key={flower.id} data-flower transform={`translate(${flower.x} ${flower.y})`}>
            {Array.from({ length: flower.petals }).map((_, petal) => (
              <ellipse
                key={petal}
                cx={0}
                cy={-flower.radius * 0.5}
                rx={flower.radius * 0.28}
                ry={flower.radius * 0.6}
                fill="var(--plantasia-color-signal)"
                opacity="0.85"
                transform={`rotate(${(360 / flower.petals) * petal})`}
              />
            ))}
            <circle r={flower.radius * 0.28} fill="var(--plantasia-color-energy)" />
          </g>
        ))}
      </g>

      <g className="organism-nodes" fill="var(--plantasia-color-signal)">
        {geometry.nodes.map((node) => (
          <circle key={node.id} data-node cx={node.x} cy={node.y} r={node.radius} />
        ))}
      </g>

      <g className="organism-spores" fill="var(--plantasia-color-energy)">
        {geometry.spores.map((spore) => (
          <circle key={spore.id} data-spore cx={spore.x} cy={spore.y} r={spore.radius} opacity="0.6" />
        ))}
      </g>

      <g className="organism-particles" fill="var(--plantasia-color-organism)">
        {geometry.particles.map((particle) => (
          <circle
            key={particle.id}
            data-particle
            cx={particle.x}
            cy={particle.y}
            r={particle.radius}
            opacity="0.5"
          />
        ))}
      </g>

      <circle
        cx={geometry.core.x}
        cy={geometry.core.y}
        r={geometry.core.radius * 3}
        fill="url(#coreGradient)"
        opacity={coreGlow}
      />
      <circle
        data-core
        cx={geometry.core.x}
        cy={geometry.core.y}
        r={geometry.core.radius}
        fill="var(--plantasia-color-organism)"
        filter="url(#bloom)"
      />
    </svg>
  );
}
