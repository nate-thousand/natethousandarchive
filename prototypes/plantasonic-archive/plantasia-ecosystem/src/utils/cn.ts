/**
 * Join class names conditionally, ignoring falsy values.
 * A tiny dependency-free alternative to `clsx`.
 *
 * @example cn('btn', isActive && 'btn--active', undefined) // 'btn btn--active'
 */
export type ClassValue = string | number | false | null | undefined;

export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ');
}
