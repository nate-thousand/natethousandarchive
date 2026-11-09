/**
 * Plantasia — Effect chain builder.
 *
 * Translates a species' poetic effect list into a Tone.js signal chain:
 *   bloom -> Reverb   (expands flowers / space)
 *   echo  -> Delay    (stretches vines / repeats)
 *   haze  -> Chorus   (atmospheric thickening)
 *   drift -> Tremolo  (slow amplitude movement)
 *
 * The chain exposes a single `input` and `output` node so the instrument can
 * splice it between the synth and the master bus.
 */
import * as Tone from 'tone';
import { clamp, mapRange } from '@utils/math';
import type { EffectConfig } from '@species/types';

type ToneEffect = Tone.Reverb | Tone.FeedbackDelay | Tone.Chorus | Tone.Tremolo;

function createEffect(config: EffectConfig): ToneEffect {
  const wet = clamp(config.amount, 0, 1);
  switch (config.type) {
    case 'bloom':
      return new Tone.Reverb({ decay: mapRange(config.shape, 0, 1, 0.6, 8), wet });
    case 'echo':
      return new Tone.FeedbackDelay({
        delayTime: mapRange(config.shape, 0, 1, 0.08, 0.6),
        feedback: mapRange(config.amount, 0, 1, 0.1, 0.6),
        wet,
      });
    case 'haze':
      return new Tone.Chorus({
        frequency: mapRange(config.shape, 0, 1, 0.2, 3),
        depth: mapRange(config.amount, 0, 1, 0.2, 0.9),
        wet,
      }).start();
    case 'drift':
      return new Tone.Tremolo({
        frequency: mapRange(config.shape, 0, 1, 0.1, 4),
        depth: mapRange(config.amount, 0, 1, 0.1, 0.8),
        wet,
      }).start();
    default:
      return new Tone.Reverb({ decay: 2, wet });
  }
}

/**
 * A disposable, serially-connected set of effects with a stable input/output.
 * If the list is empty, input === output (a transparent pass-through gain).
 */
export class EffectChain {
  readonly input: Tone.Gain;
  readonly output: Tone.Gain;
  private readonly effects: ToneEffect[];

  constructor(configs: EffectConfig[]) {
    this.input = new Tone.Gain(1);
    this.output = new Tone.Gain(1);
    this.effects = configs.map(createEffect);

    if (this.effects.length === 0) {
      this.input.connect(this.output);
      return;
    }

    let previous: Tone.ToneAudioNode = this.input;
    for (const effect of this.effects) {
      previous.connect(effect);
      previous = effect;
    }
    previous.connect(this.output);
  }

  dispose(): void {
    this.input.dispose();
    this.output.dispose();
    this.effects.forEach((effect) => effect.dispose());
  }
}
