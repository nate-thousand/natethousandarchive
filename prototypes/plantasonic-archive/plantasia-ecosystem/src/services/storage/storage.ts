/**
 * Plantasia — Typed local persistence.
 *
 * A thin, SSR-safe, namespaced wrapper over localStorage with JSON
 * (de)serialization and graceful failure (private mode / quota). All keys are
 * prefixed so multiple apps can share an origin without collisions.
 */
const NAMESPACE = 'plantasia';

function key(name: string): string {
  return `${NAMESPACE}:${name}`;
}

function available(): boolean {
  return typeof window !== 'undefined' && 'localStorage' in window;
}

/** Read and parse a value, returning `fallback` on miss or parse error. */
export function loadValue<T>(name: string, fallback: T): T {
  if (!available()) return fallback;
  try {
    const raw = window.localStorage.getItem(key(name));
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch (error) {
    console.warn(`[storage] failed to load "${name}"`, error);
    return fallback;
  }
}

/** Serialize and persist a value. Silently no-ops on failure. */
export function saveValue<T>(name: string, value: T): void {
  if (!available()) return;
  try {
    window.localStorage.setItem(key(name), JSON.stringify(value));
  } catch (error) {
    console.warn(`[storage] failed to save "${name}"`, error);
  }
}

/** Remove a persisted value. */
export function removeValue(name: string): void {
  if (!available()) return;
  try {
    window.localStorage.removeItem(key(name));
  } catch (error) {
    console.warn(`[storage] failed to remove "${name}"`, error);
  }
}

/** Storage keys used across the app (centralized to avoid typos). */
export const STORAGE_KEYS = {
  preferences: 'preferences',
  organisms: 'organisms',
  presets: 'user-presets',
  performance: 'performance-prefs',
} as const;
