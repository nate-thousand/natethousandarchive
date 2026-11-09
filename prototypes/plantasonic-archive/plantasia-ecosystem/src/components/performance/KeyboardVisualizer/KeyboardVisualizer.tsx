/**
 * Plantasia — KeyboardVisualizer.
 *
 * Visual feedback for the QWERTY piano layout. Highlights active keys from
 * PerformanceEngine state.
 */
import { KEYBOARD_NOTE_MAP } from '@performance/input/keyboardLayout';
import { usePerformance } from '@context/performance/performance';
import './KeyboardVisualizer.css';

const KEY_ORDER = ['a', 'w', 's', 'e', 'd', 'f', 't', 'g', 'y', 'h', 'u', 'j', 'k'] as const;

const KEY_LABELS: Record<string, string> = {
  a: 'C',
  w: 'C#',
  s: 'D',
  e: 'D#',
  d: 'E',
  f: 'F',
  t: 'F#',
  g: 'G',
  y: 'G#',
  h: 'A',
  u: 'A#',
  j: 'B',
  k: 'C+',
};

/** On-screen piano keyboard showing QWERTY mapping and active keys. */
export function KeyboardVisualizer() {
  const { state, keyboardEnabled, scale } = usePerformance();
  const active = new Set(state.activeKeyboardKeys);

  return (
    <div className="keyboard-viz" aria-label="Computer keyboard piano layout">
      <div className="keyboard-viz__keys">
        {KEY_ORDER.map((key) => {
          const isSharp = KEYBOARD_NOTE_MAP[key]! % 2 === 1;
          const isActive = active.has(key);
          return (
            <div
              key={key}
              className={[
                'keyboard-viz__key',
                isSharp ? 'keyboard-viz__key--sharp' : 'keyboard-viz__key--natural',
                isActive ? 'keyboard-viz__key--active' : '',
                !keyboardEnabled ? 'keyboard-viz__key--disabled' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <span className="keyboard-viz__note">{KEY_LABELS[key]}</span>
              <span className="keyboard-viz__letter">{key.toUpperCase()}</span>
            </div>
          );
        })}
      </div>
      <p className="keyboard-viz__hint">
        Z/X octave · C sustain · Esc panic · Octave {state.octave}
        {state.scaleLock ? ` · ${scale} scale lock` : ''}
      </p>
    </div>
  );
}
