import { useCallback, useRef } from 'react';

type CircularControlProps = {
  label: string;
  hint?: string;
  value: number;
  onChange: (value: number) => void;
};

const SIZE = 72;
const STROKE = 6;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const MIN_ANGLE = -135;
const MAX_ANGLE = 135;

function clamp(value: number): number {
  return Math.min(100, Math.max(0, value));
}

/**
 * SVG circular control (no native slider). Supports pointer-drag, wheel, and
 * keyboard for accessibility. Value is 0-100 in botanical terms.
 */
export function CircularControl({ label, hint, value, onChange }: CircularControlProps) {
  const ref = useRef<SVGSVGElement>(null);
  const dragging = useRef(false);

  const setFromPointer = useCallback(
    (clientX: number, clientY: number) => {
      const svg = ref.current;
      if (!svg) {
        return;
      }
      const bounds = svg.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;
      const angleRad = Math.atan2(clientY - centerY, clientX - centerX);
      let angleDeg = (angleRad * 180) / Math.PI + 90;
      if (angleDeg > 180) {
        angleDeg -= 360;
      }
      const clampedAngle = Math.min(MAX_ANGLE, Math.max(MIN_ANGLE, angleDeg));
      const next = ((clampedAngle - MIN_ANGLE) / (MAX_ANGLE - MIN_ANGLE)) * 100;
      onChange(clamp(Math.round(next)));
    },
    [onChange],
  );

  const handlePointerDown = (event: React.PointerEvent<SVGSVGElement>) => {
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    setFromPointer(event.clientX, event.clientY);
  };

  const handlePointerMove = (event: React.PointerEvent<SVGSVGElement>) => {
    if (!dragging.current) {
      return;
    }
    setFromPointer(event.clientX, event.clientY);
  };

  const handlePointerUp = (event: React.PointerEvent<SVGSVGElement>) => {
    dragging.current = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const handleKeyDown = (event: React.KeyboardEvent<SVGSVGElement>) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowRight') {
      event.preventDefault();
      onChange(clamp(value + 2));
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowLeft') {
      event.preventDefault();
      onChange(clamp(value - 2));
    } else if (event.key === 'Home') {
      event.preventDefault();
      onChange(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      onChange(100);
    }
  };

  const handleWheel = (event: React.WheelEvent<SVGSVGElement>) => {
    onChange(clamp(value + (event.deltaY < 0 ? 2 : -2)));
  };

  const dash = (value / 100) * (CIRCUMFERENCE * 0.75);
  const angle = MIN_ANGLE + (value / 100) * (MAX_ANGLE - MIN_ANGLE);

  return (
    <div className="circular-control">
      <svg
        ref={ref}
        className="circular-control-svg"
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        role="slider"
        tabIndex={0}
        aria-label={`${label}${hint ? ` (${hint})` : ''}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onKeyDown={handleKeyDown}
        onWheel={handleWheel}
      >
        <circle
          className="circular-track"
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          strokeWidth={STROKE}
          strokeDasharray={`${CIRCUMFERENCE * 0.75} ${CIRCUMFERENCE}`}
          strokeLinecap="round"
          transform={`rotate(135 ${SIZE / 2} ${SIZE / 2})`}
        />
        <circle
          className="circular-progress"
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          strokeWidth={STROKE}
          strokeDasharray={`${dash} ${CIRCUMFERENCE}`}
          strokeLinecap="round"
          transform={`rotate(135 ${SIZE / 2} ${SIZE / 2})`}
        />
        <line
          className="circular-indicator"
          x1={SIZE / 2}
          y1={SIZE / 2}
          x2={SIZE / 2}
          y2={STROKE + 4}
          transform={`rotate(${angle} ${SIZE / 2} ${SIZE / 2})`}
          strokeLinecap="round"
        />
        <circle className="circular-hub" cx={SIZE / 2} cy={SIZE / 2} r={6} />
      </svg>
      <span className="circular-value">{value}</span>
      <span className="circular-label">{label}</span>
    </div>
  );
}
