import { useCallback, useId, useRef, type PointerEvent as ReactPointerEvent } from 'react';
import { clamp, mapRange, roundTo, TAU } from '@utils/math';
import { cn } from '@utils/cn';

export interface KnobProps {
  /** Current value in [min, max]. */
  value: number;
  min?: number;
  max?: number;
  step?: number;
  /** Human label rendered beneath the knob (uses living vocabulary). */
  label: string;
  /** Optional unit suffix for the readout (e.g. "Hz", "%"). */
  unit?: string;
  /** Diameter in pixels. @default 64 */
  size?: number;
  disabled?: boolean;
  onChange: (value: number) => void;
  className?: string;
}

/** Sweep arc spans 270deg, leaving a 90deg gap at the bottom. */
const ARC_DEGREES = 270;
const ARC_START_DEG = 135; // bottom-left
const DRAG_RANGE_PX = 200; // pixels of vertical drag for full sweep

/**
 * Knob — an organic rotary control for continuous parameters (Energy, Water,
 * Sunlight, etc.). Drag vertically or use arrow keys. Renders as an SVG arc
 * with an accent "fill" indicating the current value. Fully accessible via the
 * `slider` ARIA role.
 */
export function Knob({
  value,
  min = 0,
  max = 1,
  step = 0.01,
  label,
  unit,
  size = 64,
  disabled = false,
  onChange,
  className,
}: KnobProps) {
  const labelId = useId();
  const dragState = useRef<{ startY: number; startValue: number } | null>(null);

  const ratio = clamp(mapRange(value, min, max, 0, 1), 0, 1);
  const center = size / 2;
  const radius = center - 6;
  const sweep = (ratio * ARC_DEGREES * Math.PI) / 180;
  const startRad = (ARC_START_DEG * Math.PI) / 180;

  const arcPoint = (angleRad: number) => ({
    x: center + radius * Math.cos(angleRad),
    y: center + radius * Math.sin(angleRad),
  });

  const trackEnd = arcPoint(startRad + (ARC_DEGREES * Math.PI) / 180);
  const trackStart = arcPoint(startRad);
  const valueEnd = arcPoint(startRad + sweep);
  const largeArc = ARC_DEGREES > 180 ? 1 : 0;
  const valueLargeArc = (ratio * ARC_DEGREES) > 180 ? 1 : 0;

  const commit = useCallback(
    (next: number) => {
      const snapped = roundTo(Math.round(next / step) * step, 4);
      onChange(clamp(snapped, min, max));
    },
    [max, min, onChange, step],
  );

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragState.current = { startY: event.clientY, startValue: value };
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragState.current) return;
    const deltaY = dragState.current.startY - event.clientY;
    const deltaValue = (deltaY / DRAG_RANGE_PX) * (max - min);
    commit(dragState.current.startValue + deltaValue);
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragState.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    const big = step * 10;
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowRight':
        event.preventDefault();
        commit(value + step);
        break;
      case 'ArrowDown':
      case 'ArrowLeft':
        event.preventDefault();
        commit(value - step);
        break;
      case 'PageUp':
        event.preventDefault();
        commit(value + big);
        break;
      case 'PageDown':
        event.preventDefault();
        commit(value - big);
        break;
      case 'Home':
        event.preventDefault();
        commit(min);
        break;
      case 'End':
        event.preventDefault();
        commit(max);
        break;
      default:
        break;
    }
  };

  const readout = unit ? `${roundTo(value, 2)}${unit}` : `${Math.round(ratio * 100)}%`;

  return (
    <div className={cn('pl-knob', disabled && 'pl-knob--disabled', className)}>
      <div
        className="pl-knob__dial"
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-labelledby={labelId}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={roundTo(value, 3)}
        aria-valuetext={readout}
        aria-disabled={disabled || undefined}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onKeyDown={handleKeyDown}
        style={{ width: size, height: size }}
      >
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
          <path
            className="pl-knob__track"
            d={`M ${trackStart.x} ${trackStart.y} A ${radius} ${radius} 0 ${largeArc} 1 ${trackEnd.x} ${trackEnd.y}`}
            fill="none"
          />
          <path
            className="pl-knob__value"
            d={`M ${trackStart.x} ${trackStart.y} A ${radius} ${radius} 0 ${valueLargeArc} 1 ${valueEnd.x} ${valueEnd.y}`}
            fill="none"
          />
          <circle
            className="pl-knob__indicator"
            cx={valueEnd.x}
            cy={valueEnd.y}
            r={Math.max(2, size * 0.04)}
          />
          <circle className="pl-knob__hub" cx={center} cy={center} r={radius * 0.55} />
        </svg>
        <span className="pl-knob__readout font-mono">{readout}</span>
      </div>
      <span id={labelId} className="pl-knob__label">
        {label}
      </span>
    </div>
  );
}

/** Exposed for tests/visualization sanity checks. */
export const KNOB_FULL_TURN = TAU;
