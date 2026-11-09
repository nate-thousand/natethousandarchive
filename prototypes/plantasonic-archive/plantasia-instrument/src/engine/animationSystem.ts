import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export { gsap, useGSAP };

/**
 * Shared easing + duration vocabulary so every region animates with the same
 * "living" feel. Nothing in the UI should use abrupt transitions.
 */
export const motion = {
  ease: 'sine.inOut',
  enter: 'power3.out',
  breathDuration: 4.5,
  swayDuration: 6,
  flutterDuration: 2.6,
  driftDuration: 9,
  pulseDuration: 1.8,
} as const;

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
