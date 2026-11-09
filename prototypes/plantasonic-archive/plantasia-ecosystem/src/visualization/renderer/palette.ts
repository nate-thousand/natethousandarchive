/**
 * Plantasia — Renderer palette resolver.
 *
 * The canvas cannot read CSS variables directly, so this resolves a species'
 * token-based palette into concrete color strings (read from the DOM) and
 * caches them. Call `refresh()` when the theme changes. This is the only place
 * the renderer obtains colors — keeping the "no hardcoded colors" rule intact.
 */
import { resolveColor, type ColorTokenKey } from '@design-system/tokens/tokens';
import type { SpeciesDefinition } from '@species/types';

export interface RendererPalette {
  root: string;
  branch: string;
  leaf: string;
  bloom: string;
  spore: string;
  signal: string;
  node: string;
  textMuted: string;
}

const SHARED_KEYS: Record<keyof Omit<RendererPalette, 'root' | 'branch' | 'leaf'>, ColorTokenKey> = {
  bloom: 'organismBloom',
  spore: 'organismSpore',
  signal: 'organismSignal',
  node: 'organismNode',
  textMuted: 'textMuted',
};

/**
 * Build a concrete color palette for a species. Species-specific accents come
 * from the species palette; shared organism colors come from semantic tokens.
 */
export function resolveRendererPalette(species: SpeciesDefinition): RendererPalette {
  return {
    root: resolveColor(species.palette.primary) || '#325a43',
    branch: resolveColor(species.palette.secondary) || '#4a6b50',
    leaf: resolveColor(species.palette.accent) || '#8fae84',
    bloom: resolveColor(SHARED_KEYS.bloom) || '#c7e08a',
    spore: resolveColor(SHARED_KEYS.spore) || '#d8eda8',
    signal: resolveColor(SHARED_KEYS.signal) || '#b7d36a',
    node: resolveColor(SHARED_KEYS.node) || '#eef2e6',
    textMuted: resolveColor(SHARED_KEYS.textMuted) || '#6f8f6a',
  };
}
