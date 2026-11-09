import { useId } from 'react';
import { cn } from '@utils/cn';

export interface SwitchProps {
  checked: boolean;
  label: string;
  /** Hide the visible label (kept for screen readers). */
  hideLabel?: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

/**
 * Switch — an accessible on/off toggle built on a native checkbox. Used for
 * binary cultivation states (Sunlight on/off, Expert Mode, etc.).
 */
export function Switch({
  checked,
  label,
  hideLabel = false,
  disabled = false,
  onChange,
  className,
}: SwitchProps) {
  const id = useId();
  return (
    <label htmlFor={id} className={cn('pl-switch', disabled && 'pl-switch--disabled', className)}>
      <input
        id={id}
        type="checkbox"
        className="pl-switch__input sr-only"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span className="pl-switch__track" aria-hidden="true">
        <span className="pl-switch__thumb" />
      </span>
      <span className={cn('pl-switch__label', hideLabel && 'sr-only')}>{label}</span>
    </label>
  );
}
