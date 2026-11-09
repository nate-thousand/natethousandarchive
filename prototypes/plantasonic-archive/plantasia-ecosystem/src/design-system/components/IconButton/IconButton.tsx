import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { Icon, type IconSize } from '@design-system/components/Icon';
import type { IconName } from '@design-system/tokens/icons/icons';
import { cn } from '@utils/cn';

export type IconButtonVariant = 'ghost' | 'solid' | 'outline';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'> {
  name: IconName;
  /** Required for accessibility — describes the action. */
  label: string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  /** Renders in an active/pressed state. */
  active?: boolean;
}

const iconSizeFor: Record<IconButtonSize, IconSize> = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

/**
 * IconButton — a square, icon-only action with an always-required accessible
 * label. Used heavily in the toolbars and transport controls.
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { name, label, variant = 'ghost', size = 'md', active = false, className, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        'pl-iconbtn',
        `pl-iconbtn--${variant}`,
        `pl-iconbtn--${size}`,
        active && 'pl-iconbtn--active',
        className,
      )}
      aria-label={label}
      aria-pressed={active || undefined}
      title={label}
      {...rest}
    >
      <Icon name={name} size={iconSizeFor[size]} />
    </button>
  );
});
