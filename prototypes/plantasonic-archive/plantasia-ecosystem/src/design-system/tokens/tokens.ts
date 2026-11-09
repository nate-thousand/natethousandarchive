/**
 * Plantasia — Typed token access layer.
 *
 * CSS variables (see the `*.css` files in this folder) are the single source of
 * truth for design values. This module exposes those variables to TypeScript in
 * two safe ways:
 *
 *   - `token(name)` returns a `var(--name)` string for inline/style usage.
 *   - `resolveToken(name)` reads the *computed* value from the DOM, which the
 *     Canvas renderer needs because it cannot consume CSS variables directly.
 *
 * This keeps the rule "no hardcoded colors / magic numbers" intact even in the
 * imperative visualization layer.
 */

/** Color tokens available to the application (semantic, never raw palette). */
export const colorTokens = {
  bgBase: '--color-bg-base',
  bgSunken: '--color-bg-sunken',
  surface1: '--color-surface-1',
  surface2: '--color-surface-2',
  surface3: '--color-surface-3',
  surfaceRaised: '--color-surface-raised',
  surfaceOverlay: '--color-surface-overlay',
  textPrimary: '--color-text-primary',
  textSecondary: '--color-text-secondary',
  textMuted: '--color-text-muted',
  textAccent: '--color-text-accent',
  borderSubtle: '--color-border-subtle',
  borderDefault: '--color-border-default',
  borderStrong: '--color-border-strong',
  borderAccent: '--color-border-accent',
  accent: '--color-accent',
  accentHover: '--color-accent-hover',
  accentActive: '--color-accent-active',
  accentSoft: '--color-accent-soft',
  secondary: '--color-secondary',
  positive: '--color-positive',
  caution: '--color-caution',
  critical: '--color-critical',
  info: '--color-info',
  focusRing: '--color-focus-ring',
  organismRoot: '--color-organism-root',
  organismBranch: '--color-organism-branch',
  organismLeaf: '--color-organism-leaf',
  organismBloom: '--color-organism-bloom',
  organismSpore: '--color-organism-spore',
  organismSignal: '--color-organism-signal',
  organismNode: '--color-organism-node',
} as const;

export type ColorTokenKey = keyof typeof colorTokens;
export type CssVariableName = `--${string}`;

/**
 * Return a CSS `var(...)` reference for use in inline styles or CSS-in-JS.
 * @example token('--color-accent') // => 'var(--color-accent)'
 */
export function token(name: CssVariableName): string {
  return `var(${name})`;
}

/** Convenience: a `var(...)` reference for a semantic color key. */
export function colorVar(key: ColorTokenKey): string {
  return token(colorTokens[key]);
}

/**
 * Read the *computed* value of a CSS variable from a DOM element (defaults to
 * the document root). Used by the Canvas renderer to obtain concrete color
 * strings. Returns an empty string during SSR / tests without a document.
 */
export function resolveToken(name: CssVariableName, scope?: Element): string {
  if (typeof window === 'undefined' || typeof document === 'undefined') return '';
  const el = scope ?? document.documentElement;
  return getComputedStyle(el).getPropertyValue(name).trim();
}

/** Resolve a semantic color key to its concrete computed value. */
export function resolveColor(key: ColorTokenKey, scope?: Element): string {
  return resolveToken(colorTokens[key], scope);
}
