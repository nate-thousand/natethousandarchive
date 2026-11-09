import { cn } from '@utils/cn';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  /** Optional inset spacing applied around the divider. */
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  /** Optional centered label rendered within a horizontal divider. */
  label?: string;
}

/** Divider — a hairline separator that honors the thin-border aesthetic. */
export function Divider({
  orientation = 'horizontal',
  spacing = 'md',
  label,
  className,
}: DividerProps) {
  if (label && orientation === 'horizontal') {
    return (
      <div className={cn('pl-divider-label', `pl-divider--space-${spacing}`, className)} role="separator">
        <span className="pl-divider-label__line" />
        <span className="pl-divider-label__text eyebrow">{label}</span>
        <span className="pl-divider-label__line" />
      </div>
    );
  }
  return (
    <hr
      className={cn('pl-divider', `pl-divider--${orientation}`, `pl-divider--space-${spacing}`, className)}
      aria-orientation={orientation}
    />
  );
}
