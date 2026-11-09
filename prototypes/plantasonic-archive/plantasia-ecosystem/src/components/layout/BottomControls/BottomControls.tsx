import { useCallback, useState } from 'react';
import { IconButton } from '@design-system/components/IconButton';
import { Slider } from '@design-system/components/Slider';
import { Button } from '@design-system/components/Button';
import { useAudio } from '@context/audio/audio';
import { usePreferences } from '@context/preferences/preferences';
import { useEcosystem } from '@context/ecosystem/ecosystem';
import { useKeyboardShortcuts } from '@hooks/useKeyboardShortcuts';
import './BottomControls.css';

const MIN_TEMPO = 40;
const MAX_TEMPO = 160;
/** A gentle, consonant chord used by the "pulse" preview button. */
const PREVIEW_CHORD = ['C4', 'E4', 'G4', 'B4'];

/**
 * BottomControls — the Performance bar. Transport (play/pause), a one-shot
 * harmony pulse, master volume, and tempo. Bound to Space (play) and M (pulse)
 * for keyboard performers.
 */
export function BottomControls() {
  const { isPlaying, togglePlay, playChord, setTempo } = useAudio();
  const { masterVolume, setMasterVolume } = usePreferences();
  const { mutate } = useEcosystem();
  const [tempo, setLocalTempo] = useState(72);

  const handleTempo = useCallback(
    (value: number) => {
      setLocalTempo(value);
      setTempo(value);
    },
    [setTempo],
  );

  useKeyboardShortcuts({
    ' ': (event) => {
      event.preventDefault();
      togglePlay();
    },
    m: () => playChord(PREVIEW_CHORD),
  });

  return (
    <div className="bottom-controls surface-glass">
      <div className="bottom-controls__transport">
        <IconButton
          name={isPlaying ? 'pause' : 'play'}
          label={isPlaying ? 'Pause performance' : 'Begin performance'}
          variant="solid"
          size="lg"
          active={isPlaying}
          onClick={togglePlay}
        />
        <IconButton name="harmony" label="Pulse a harmony" size="md" onClick={() => playChord(PREVIEW_CHORD)} />
        <Button variant="ghost" size="sm" iconStart="mutation" onClick={() => mutate(0.12)} className="bottom-controls__mutate">
          Evolve
        </Button>
      </div>

      <div className="bottom-controls__sliders">
        <Slider
          label="Water (Volume)"
          value={masterVolume}
          min={0}
          max={1}
          step={0.01}
          unit="%"
          onChange={setMasterVolume}
          className="bottom-controls__slider"
        />
        <Slider
          label="Wind (Tempo)"
          value={tempo}
          min={MIN_TEMPO}
          max={MAX_TEMPO}
          step={1}
          unit=" bpm"
          onChange={(value) => handleTempo(Math.round(value))}
          className="bottom-controls__slider"
        />
      </div>
    </div>
  );
}
