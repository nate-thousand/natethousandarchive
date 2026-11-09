import type { HTMLAttributes } from 'react';
import { Icon } from '@design-system/components/Icon';
import type { IconName } from '@design-system/tokens/icons/icons';
import { cn } from '@utils/cn';

export type BadgeTone = 'neutral' | 'accent' | 'positive' | 'caution' | 'critical' | 'info';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  icon?: IconName;
  /** Renders a small leading status dot. */
  dot?: boolean;
}

/** Badge — compact status / metadata label. */
export function Badge({ tone = 'neutral', icon, dot = false, className, children, ...rest }: BadgeProps) {
  return (
    <span className={cn('pl-badge', `pl-badge--${tone}`, className)} {...rest}>
      {dot && <span className="pl-badge__dot" aria-hidden="true" />}
      {icon && <Icon name={icon} size="sm" />}
      {children}
    </span>
  );
}
