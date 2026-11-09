import type { HTMLAttributes, ReactNode } from 'react';
import { Icon } from '@design-system/components/Icon';
import type { IconName } from '@design-system/tokens/icons/icons';
import { cn } from '@utils/cn';

export type PanelVariant = 'solid' | 'glass';

export interface PanelProps extends HTMLAttributes<HTMLElement> {
  /** Optional panel title rendered in the header. */
  title?: string;
  /** Optional eyebrow/kicker above the title. */
  eyebrow?: string;
  /** Optional leading icon for the header. */
  icon?: IconName;
  /** Slot for header-aligned actions (buttons, toggles). */
  actions?: ReactNode;
  variant?: PanelVariant;
  /** Removes inner padding from the body (for canvases/lists). */
  flush?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Panel — the standard atmospheric container for grouped content. Supports a
 * solid or frosted-glass surface and an optional titled header with actions.
 */
export function Panel({
  title,
  eyebrow,
  icon,
  actions,
  variant = 'solid',
  flush = false,
  className,
  children,
  ...rest
}: PanelProps) {
  const hasHeader = Boolean(title || eyebrow || actions || icon);
  return (
    <section
      className={cn('pl-panel', variant === 'glass' ? 'surface-glass' : 'surface-panel', className)}
      {...rest}
    >
      {hasHeader && (
        <header className="pl-panel__header">
          <div className="pl-panel__heading">
            {icon && <Icon name={icon} size="sm" className="pl-panel__icon" />}
            <div>
              {eyebrow && <p className="eyebrow">{eyebrow}</p>}
              {title && <h2 className="pl-panel__title">{title}</h2>}
            </div>
          </div>
          {actions && <div className="pl-panel__actions">{actions}</div>}
        </header>
      )}
      <div className={cn('pl-panel__body', flush && 'pl-panel__body--flush')}>{children}</div>
    </section>
  );
}
