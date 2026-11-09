import { useId, type ChangeEvent } from 'react';
import { mapRange, roundTo } from '@utils/math';
import { cn } from '@utils/cn';

export interface SliderProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  label: string;
  unit?: string;
  disabled?: boolean;
  /** Hide the visible label (still available to screen readers). */
  hideLabel?: boolean;
  onChange: (value: number) => void;
  className?: string;
}

/**
 * Slider — a linear range control built on a native `<input type="range">` for
 * full accessibility, restyled with tokens. The accent fill tracks the value
 * via a CSS custom property.
 */
export function Slider({
  value,
  min = 0,
  max = 1,
  step = 0.01,
  label,
  unit,
  disabled = false,
  hideLabel = false,
  onChange,
  className,
}: SliderProps) {
  const id = useId();
  const fill = mapRange(value, min, max, 0, 100);
  const readout = unit ? `${roundTo(value, 2)}${unit}` : `${Math.round(fill)}%`;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value));
  };

  return (
    <div className={cn('pl-slider', disabled && 'pl-slider--disabled', className)}>
      <div className="pl-slider__head">
        <label htmlFor={id} className={cn('pl-slider__label', hideLabel && 'sr-only')}>
          {label}
        </label>
        <span className="pl-slider__readout font-mono" aria-hidden="true">
          {readout}
        </span>
      </div>
      <input
        id={id}
        type="range"
        className="pl-slider__input"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={handleChange}
        style={{ ['--slider-fill' as string]: `${fill}%` }}
        aria-valuetext={readout}
      />
    </div>
  );
}
