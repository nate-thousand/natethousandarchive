/**
 * Plantasia — useEntranceAnimation (GSAP).
 *
 * Orchestrates a soft, staggered entrance for a region's children using GSAP,
 * scoped via gsap.context for automatic cleanup. Honors reduced-motion by
 * skipping animation entirely (elements remain visible). Uses motion tokens so
 * timing/easing match the CSS layer.
 */
import { useLayoutEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { durations, stagger } from '@design-system/tokens/motion/motion';
import { usePreferences } from '@context/preferences/preferences';

/** Built-in GSAP ease closest to our organic `bloom` token curve. */
const ENTRANCE_EASE = 'power3.out';

export interface EntranceOptions {
  /** Selector for children to animate within the scope. */
  selector?: string;
  /** Vertical offset to rise from, in pixels. */
  fromY?: number;
  /** Re-run key — change to replay the entrance. */
  replayKey?: unknown;
  disabled?: boolean;
}

export function useEntranceAnimation(
  scopeRef: RefObject<HTMLElement>,
  { selector = '[data-animate]', fromY = 14, replayKey, disabled = false }: EntranceOptions = {},
): void {
  const { reducedMotion } = usePreferences();

  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope || disabled) return;

    if (reducedMotion) {
      gsap.set(scope.querySelectorAll(selector), { opacity: 1, y: 0, clearProps: 'all' });
      return;
    }

    const targets = scope.querySelectorAll(selector);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        selector,
        { opacity: 0, y: fromY },
        {
          opacity: 1,
          y: 0,
          duration: durations.slow,
          ease: ENTRANCE_EASE,
          stagger: stagger.sm,
          clearProps: 'transform,opacity',
        },
      );
    }, scope);

    return () => {
      ctx.revert();
      // StrictMode remounts can leave GSAP revert at opacity:0 — force visible.
      gsap.set(targets, { opacity: 1, y: 0, clearProps: 'all' });
    };
  }, [scopeRef, selector, fromY, replayKey, disabled, reducedMotion]);
}
