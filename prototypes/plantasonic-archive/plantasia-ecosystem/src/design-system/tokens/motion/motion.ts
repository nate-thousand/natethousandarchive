/**
 * Plantasia — Motion tokens for TypeScript / GSAP.
 *
 * Mirrors `motion.css` so the imperative animation layer (GSAP) uses the same
 * durations and easings as the declarative CSS layer. Durations are expressed in
 * seconds (GSAP's unit). Easings are cubic-bezier control points usable with
 * `gsap.parseEase('...')` or `CustomEase`.
 */
export const durations = {
  instant: 0.08,
  fast: 0.18,
  base: 0.32,
  slow: 0.6,
  slower: 1.2,
  breath: 6,
  drift: 24,
} as const;

export type DurationKey = keyof typeof durations;

/** Cubic-bezier control points matching the CSS easing tokens. */
export const easings = {
  organic: [0.32, 0.04, 0.18, 1],
  breath: [0.45, 0, 0.55, 1],
  bloom: [0.16, 1, 0.3, 1],
  settle: [0.25, 1, 0.5, 1],
  emphasis: [0.22, 1, 0.36, 1],
  inSoft: [0.4, 0, 1, 1],
  outSoft: [0, 0, 0.2, 1],
} as const;

export type EasingKey = keyof typeof easings;

/** Format an easing as the GSAP cubic-bezier string `"x1,y1,x2,y2"`. */
export function gsapEase(key: EasingKey): string {
  return easings[key].join(',');
}

export const stagger = {
  xs: 0.04,
  sm: 0.08,
  md: 0.14,
} as const;
