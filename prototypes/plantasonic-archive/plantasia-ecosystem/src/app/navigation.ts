/**
 * Plantasia — Navigation manifest.
 *
 * Single source of truth for routes + their presentation (label, icon, group).
 * The router, the sidebar nav, and any breadcrumbs all derive from this list so
 * adding a page is a one-line change.
 */
import type { IconName } from '@design-system/tokens/icons/icons';

export interface NavItem {
  path: string;
  label: string;
  icon: IconName;
  /** Short description for tooltips / landing cards. */
  description: string;
  group: 'create' | 'library' | 'system';
}

export const ROUTES = {
  home: '/',
  studio: '/studio',
  performance: '/performance',
  species: '/species',
  presets: '/presets',
  ai: '/ai',
  settings: '/settings',
  docs: '/docs',
  about: '/about',
} as const;

export const NAV_ITEMS: readonly NavItem[] = [
  {
    path: ROUTES.home,
    label: 'Home',
    icon: 'home',
    description: 'Enter the living sound ecosystem.',
    group: 'create',
  },
  {
    path: ROUTES.studio,
    label: 'Studio',
    icon: 'studio',
    description: 'Cultivate and shape your organism.',
    group: 'create',
  },
  {
    path: ROUTES.performance,
    label: 'Performance',
    icon: 'performance',
    description: 'Full-bleed ambient performance mode.',
    group: 'create',
  },
  {
    path: ROUTES.species,
    label: 'Species',
    icon: 'speciesLibrary',
    description: 'Browse the catalog of living species.',
    group: 'library',
  },
  {
    path: ROUTES.presets,
    label: 'Presets',
    icon: 'presetLibrary',
    description: 'Saved organisms and factory presets.',
    group: 'library',
  },
  {
    path: ROUTES.ai,
    label: 'AI Lab',
    icon: 'ai',
    description: 'Generate species, mutations, and ecosystems.',
    group: 'library',
  },
  {
    path: ROUTES.settings,
    label: 'Settings',
    icon: 'settings',
    description: 'Audio, appearance, and accessibility.',
    group: 'system',
  },
  {
    path: ROUTES.docs,
    label: 'Docs',
    icon: 'docs',
    description: 'Learn synthesis through nature.',
    group: 'system',
  },
  {
    path: ROUTES.about,
    label: 'About',
    icon: 'about',
    description: 'The vision behind Plantasia.',
    group: 'system',
  },
];

export const NAV_GROUP_LABELS: Record<NavItem['group'], string> = {
  create: 'Cultivate',
  library: 'Collections',
  system: 'System',
};
