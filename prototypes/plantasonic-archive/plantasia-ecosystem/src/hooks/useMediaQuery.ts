/**
 * Plantasia — useMediaQuery.
 * Subscribe to a CSS media query and re-render on changes. SSR-safe.
 */
import { useEffect, useState } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mql = window.matchMedia(query);
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
    setMatches(mql.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

/** Convenience breakpoints mirroring the layout's mobile-first approach. */
export const useIsDesktop = () => useMediaQuery('(min-width: 992px)');
export const useIsTablet = () => useMediaQuery('(min-width: 768px)');
