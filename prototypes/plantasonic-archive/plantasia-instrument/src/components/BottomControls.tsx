import { CircularControl } from './CircularControl';
import {
  botanicalControlHints,
  botanicalControlLabels,
  type BotanicalControlKey,
  type BotanicalControls,
} from '../data/ecosystem';

type BottomControlsProps = {
  controls: BotanicalControls;
  advanced: boolean;
  onChange: (key: BotanicalControlKey, value: number) => void;
};

const order: BotanicalControlKey[] = [
  'energy',
  'growth',
  'density',
  'evolution',
  'random',
  'life',
  'space',
  'texture',
  'harmony',
  'resonance',
];

export function BottomControls({ controls, advanced, onChange }: BottomControlsProps) {
  return (
    <section className="bottom-controls" aria-label="Botanical controls">
      <div className="bottom-controls-rail">
        {order.map((key) => (
          <CircularControl
            key={key}
            label={botanicalControlLabels[key]}
            hint={advanced ? botanicalControlHints[key] : undefined}
            value={controls[key]}
            onChange={(value) => onChange(key, value)}
          />
        ))}
      </div>
    </section>
  );
}
