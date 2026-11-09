import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { Icon } from '@design-system/components/Icon';
import type { IconName } from '@design-system/tokens/icons/icons';
import { cn } from '@utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Optional leading icon (semantic key). */
  iconStart?: IconName;
  /** Optional trailing icon (semantic key). */
  iconEnd?: IconName;
  /** Stretch to fill the container width. */
  block?: boolean;
}

/**
 * Button — the primary action primitive. Fully token-styled (no Bootstrap look)
 * with organic hover/active transitions and an accent glow on primary actions.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'secondary',
    size = 'md',
    iconStart,
    iconEnd,
    block = false,
    className,
    children,
    type = 'button',
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        'pl-btn',
        `pl-btn--${variant}`,
        `pl-btn--${size}`,
        block && 'pl-btn--block',
        className,
      )}
      {...rest}
    >
      {iconStart && <Icon name={iconStart} size="sm" />}
      {children && <span className="pl-btn__label">{children}</span>}
      {iconEnd && <Icon name={iconEnd} size="sm" />}
    </button>
  );
});
