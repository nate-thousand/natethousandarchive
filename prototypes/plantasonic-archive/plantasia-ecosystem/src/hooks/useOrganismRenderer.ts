/**
 * Plantasia — useOrganismRenderer.
 *
 * Wires a <canvas> element to the OrganismRenderer and keeps it in sync with the
 * ecosystem (species/genes/seed), preferences (reduced motion / theme), and the
 * live audio bands. Geometry is regenerated only when the species or seed
 * changes (gene tweaks are reflected through audio + motion, not a full regrow),
 * keeping continuous interaction smooth.
 */
import { useEffect, useRef, type RefObject } from 'react';
import { generateOrganism, OrganismRenderer, resolveRendererPalette } from '@visualization/index';
import { useEcosystem } from '@context/ecosystem/ecosystem';
import { usePreferences } from '@context/preferences/preferences';
import { useAudio } from '@context/audio/audio';
import { useOptionalPerformance } from '@context/performance/performance';
import type { PerformanceState } from '@performance/types';

const FALLBACK_PERF: PerformanceState = {
  velocity: 0,
  pressure: 0,
  polyPressure: {},
  sustain: false,
  activeNotes: [],
  macroValues: {},
  visualIntensity: 0,
  bloom: 0,
  motion: 0,
  particleDensity: 0,
  octave: 4,
  scaleLock: false,
  activeKeyboardKeys: [],
};

export function useOrganismRenderer(canvasRef: RefObject<HTMLCanvasElement>): void {
  const { species, organism } = useEcosystem();
  const { reducedMotion, theme } = usePreferences();
  const { getBands } = useAudio();
  const performance = useOptionalPerformance();
  const perfRef = useRef<PerformanceState>(FALLBACK_PERF);
  perfRef.current = performance?.state ?? FALLBACK_PERF;
  const rendererRef = useRef<OrganismRenderer | null>(null);

  // Create the renderer once the canvas is mounted.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const renderer = new OrganismRenderer(canvas, {
        bandsProvider: getBands,
        performanceProvider: () => perfRef.current,
        reducedMotion,
      });
      rendererRef.current = renderer;
      renderer.start();

      const resizeObserver = new ResizeObserver(() => renderer.resize());
      resizeObserver.observe(canvas);

      return () => {
        resizeObserver.disconnect();
        renderer.dispose();
        rendererRef.current = null;
      };
    } catch (error) {
      console.error('[useOrganismRenderer] failed to start canvas renderer', error);
      return undefined;
    }
    // Recreate only on mount/unmount; live updates handled by effects below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef]);

  // Keep the bands provider fresh (its identity may change with the engine).
  useEffect(() => {
    rendererRef.current?.setBandsProvider(getBands);
  }, [getBands]);

  // Reflect reduced-motion preference.
  useEffect(() => {
    rendererRef.current?.setReducedMotion(reducedMotion);
  }, [reducedMotion]);

  // Regenerate geometry + palette on species, seed, or theme change.
  useEffect(() => {
    const renderer = rendererRef.current;
    if (!renderer) return;
    const structure = generateOrganism(species, organism.genes, organism.seed);
    // Defer palette resolution one frame so theme attributes are applied to the DOM.
    const frame = requestAnimationFrame(() => {
      const palette = resolveRendererPalette(species);
      renderer.setOrganism(structure, palette, species.motion);
    });
    return () => cancelAnimationFrame(frame);
    // organism.genes intentionally excluded — gene tweaks don't trigger a regrow.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [species, organism.seed, theme]);
}
