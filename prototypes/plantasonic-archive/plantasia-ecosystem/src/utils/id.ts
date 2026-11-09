/**
 * Generate a reasonably unique id. Prefers the platform `crypto.randomUUID`
 * and falls back to a timestamp+random string for older environments/tests.
 */
export function createId(prefix = 'id'): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `${prefix}_${crypto.randomUUID()}`;
  }
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}
