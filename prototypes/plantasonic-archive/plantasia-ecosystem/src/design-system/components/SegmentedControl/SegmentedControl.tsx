import { cn } from '@utils/cn';

export interface SegmentedOption<T extends string> {
  value: T;
  label: string;
}

export interface SegmentedControlProps<T extends string> {
  options: ReadonlyArray<SegmentedOption<T>>;
  value: T;
  /** Accessible group label. */
  label: string;
  onChange: (value: T) => void;
  size?: 'sm' | 'md';
  className?: string;
}

/**
 * SegmentedControl — a compact mutually-exclusive choice (e.g. switching
 * between Beginner / Expert mode, or ecosystem view modes). Implemented as a
 * radiogroup for keyboard + screen-reader support.
 */
export function SegmentedControl<T extends string>({
  options,
  value,
  label,
  onChange,
  size = 'md',
  className,
}: SegmentedControlProps<T>) {
  return (
    <div
      className={cn('pl-segmented', `pl-segmented--${size}`, className)}
      role="radiogroup"
      aria-label={label}
    >
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            className={cn('pl-segmented__option', selected && 'pl-segmented__option--active')}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
