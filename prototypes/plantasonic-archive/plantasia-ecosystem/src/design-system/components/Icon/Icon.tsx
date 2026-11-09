import type { CSSProperties } from 'react';
import { icons, type IconName } from '@design-system/tokens/icons/icons';
import { cn } from '@utils/cn';

/** Size presets map to token-driven font sizes via CSS classes. */
export type IconSize = 'sm' | 'md' | 'lg' | 'xl';

export interface IconProps {
  /** Semantic icon key from the icon registry. */
  name: IconName;
  /** Visual size preset. @default 'md' */
  size?: IconSize;
  /** Accessible label. When omitted, the icon is hidden from assistive tech. */
  label?: string;
  className?: string;
  /** Allow color override via currentColor by setting `style.color` upstream. */
  style?: CSSProperties;
}

const sizeClass: Record<IconSize, string> = {
  sm: 'icon--sm',
  md: 'icon--md',
  lg: 'icon--lg',
  xl: 'icon--xl',
};

/**
 * Icon — thin wrapper over Bootstrap Icons that consumes the semantic icon
 * registry. Decorative by default; pass `label` to expose it to screen readers.
 */
export function Icon({ name, size = 'md', label, className, style }: IconProps) {
  const decorative = !label;
  return (
    <i
      className={cn('icon', icons[name], sizeClass[size], className)}
      style={style}
      aria-hidden={decorative || undefined}
      aria-label={label}
      role={decorative ? undefined : 'img'}
    />
  );
}
