import { useCallback, useEffect, useMemo, useState } from 'react';
import { TopBar } from './components/TopBar';
import { LeftSidebar } from './components/LeftSidebar';
import { CenterCanvas } from './components/CenterCanvas';
import { RightSidebar } from './components/RightSidebar';
import { BottomControls } from './components/BottomControls';
import { AdvancedPanel } from './components/AdvancedPanel';
import { SpeciesSelector } from './components/SpeciesSelector';
import {
  applyBotanicalControls,
  getLevel,
  initAudio,
  playPreset,
  setTempo,
  stopAudio,
  triggerChord,
  updateParameter,
} from './audio/audioEngine';
import { presets, type PlantasiaPreset, type SynthSettings } from './data/presets';
import {
  cultivationActions,
  initialBotanicalControls,
  speciesProfiles,
  type BotanicalControlKey,
  type BotanicalControls,
} from './data/ecosystem';
import { currentChord } from './data/harmony';
import type { AsciiState } from './ascii/organism';

const stateLabels: Record<AsciiState, string> = {
  seed: 'dormant seed',
  growth: 'active growth',
  bloom: 'full bloom',
  mutation: 'mutating',
  mycelium: 'networking',
  ecosystem: 'ecosystem',
};

function App() {
  const [selectedPresetId, setSelectedPresetId] = useState(presets[0].id);
  const [controls, setControls] = useState<BotanicalControls>(initialBotanicalControls);
  const [advanced, setAdvanced] = useState(false);
  const [organismState, setOrganismState] = useState<AsciiState>(presets[0].asciiState);
  const [activeAction, setActiveAction] = useState('seed');
  const [activeSection, setActiveSection] = useState('Ecosystem');
  const [bpm, setBpm] = useState(96);
  const [recording, setRecording] = useState(false);
  const [age, setAge] = useState(0);
  const [level, setLevel] = useState(0);
  const [audioActive, setAudioActive] = useState(false);
  const [aiMessage, setAiMessage] = useState(
    'Cultivate a species, then ask me to mutate it or describe its sound.',
  );

  const selectedPreset = useMemo<PlantasiaPreset>(
    () => presets.find((preset) => preset.id === selectedPresetId) ?? presets[0],
    [selectedPresetId],
  );

  const [synth, setSynth] = useState<SynthSettings>(selectedPreset.synth);
  const species = speciesProfiles[selectedPreset.species];

  const harmony = useMemo(
    () => ({ key: 'C' as const, scale: 'Dorian' as const, chord: currentChord('C', 'Dorian') }),
    [],
  );

  const seed = `${selectedPreset.id}:${organismState}:${Math.round(controls.evolution)}`;

  useEffect(() => {
    const interval = window.setInterval(() => setAge((value) => value + 1), 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      setLevel(getLevel());
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    applyBotanicalControls(controls);
  }, [controls]);

  const startAudio = useCallback(async () => {
    await initAudio();
    applyBotanicalControls(controls);
    setAudioActive(true);
  }, [controls]);

  const handleSelectPreset = useCallback((presetId: string) => {
    const preset = presets.find((item) => item.id === presetId) ?? presets[0];
    setSelectedPresetId(preset.id);
    setOrganismState(preset.asciiState);
    setSynth(preset.synth);
    playPreset(preset);
    setAge(0);
  }, []);

  const handleAction = useCallback(
    (actionId: string) => {
      const action = cultivationActions.find((item) => item.id === actionId);
      if (!action) {
        return;
      }
      setActiveAction(actionId);

      if (actionId === 'reset') {
        setControls(initialBotanicalControls);
      } else if (actionId === 'chaos') {
        setControls((current) => {
          const next = { ...current };
          (Object.keys(next) as BotanicalControlKey[]).forEach((key) => {
            next[key] = Math.round(Math.random() * 100);
          });
          return next;
        });
      } else if (actionId === 'mutate') {
        setControls((current) => ({
          ...current,
          evolution: Math.min(100, current.evolution + 12),
          random: Math.min(100, current.random + 8),
        }));
      } else if (actionId === 'nourish') {
        setControls((current) => ({ ...current, life: Math.min(100, current.life + 10) }));
      } else if (actionId === 'prune') {
        setControls((current) => ({ ...current, density: Math.max(0, current.density - 10) }));
      } else if (actionId === 'spores') {
        setControls((current) => ({ ...current, texture: Math.min(100, current.texture + 10) }));
      } else if (actionId === 'connect') {
        setControls((current) => ({ ...current, harmony: Math.min(100, current.harmony + 8) }));
      }

      setOrganismState(action.state);
      void startAudio().then(() => triggerChord());
    },
    [startAudio],
  );

  const handleControlChange = useCallback(
    (key: BotanicalControlKey, value: number) => {
      setControls((current) => ({ ...current, [key]: value }));
    },
    [],
  );

  const handleAdvancedChange = useCallback(
    <K extends keyof SynthSettings>(key: K, value: SynthSettings[K]) => {
      setSynth((current) => ({ ...current, [key]: value }));
      if (key === 'oscillator' || key === 'filterHz') {
        updateParameter(key, value as string | number);
      } else if (key === 'envelope') {
        const envelope = value as SynthSettings['envelope'];
        updateParameter('attack', envelope.attack);
        updateParameter('release', envelope.release);
      } else if (key === 'effects') {
        const effects = value as SynthSettings['effects'];
        updateParameter('delay', effects.delay);
        updateParameter('reverb', effects.reverb);
      }
    },
    [],
  );

  const handleBpmChange = useCallback((value: number) => {
    setBpm(value);
    setTempo(value);
  }, []);

  const handleAiAction = useCallback(
    (action: string) => {
      switch (action) {
        case 'Generate Species':
        case 'Mutate Species':
          handleAction('mutate');
          setAiMessage(`Mutated ${species.name}: branch bias and leaf density reshuffled.`);
          break;
        case 'Describe Current Sound':
          setAiMessage(
            `${species.name} sounds ${species.audioMapping.roots} in the roots, ${species.audioMapping.leaves} in the leaves, with ${species.audioMapping.bloom}.`,
          );
          break;
        case 'Suggest Improvements':
          setAiMessage('Try raising Harmony and lowering Random for a calmer, more consonant bloom.');
          break;
        case 'Generate Preset Names':
          setAiMessage(`Names: "Quiet ${species.name}", "${harmony.key} ${species.name} Drift", "Spore Choir".`);
          break;
        case 'Explain Sound Design':
          setAiMessage('Energy drives oscillator level, Growth shapes the envelope, Space opens the reverb bloom.');
          break;
        case 'Create Ambient Variations':
          setControls((current) => ({ ...current, space: Math.min(100, current.space + 14), life: Math.min(100, current.life + 10) }));
          setAiMessage('Created an ambient variation with wider space and deeper modulation.');
          break;
        case 'Save Organism DNA':
          setAiMessage(`Saved DNA: ${seed} · controls snapshot stored locally.`);
          break;
        default:
          setAiMessage('Working on it...');
      }
    },
    [handleAction, harmony.key, seed, species],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement) {
        return;
      }
      const action = cultivationActions.find(
        (item) => item.shortcut.toLowerCase() === event.key.toLowerCase(),
      );
      if (action) {
        event.preventDefault();
        handleAction(action.id);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleAction]);

  const handleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      void document.documentElement.requestFullscreen?.();
    } else {
      void document.exitFullscreen?.();
    }
  }, []);

  const handleSave = useCallback(() => {
    const snapshot = { selectedPresetId, controls, bpm, organismState };
    window.localStorage.setItem('plantasia-snapshot', JSON.stringify(snapshot));
    setAiMessage('Ecosystem saved.');
  }, [bpm, controls, organismState, selectedPresetId]);

  const handleLoad = useCallback(() => {
    const raw = window.localStorage.getItem('plantasia-snapshot');
    if (!raw) {
      setAiMessage('No saved ecosystem found yet.');
      return;
    }
    try {
      const snapshot = JSON.parse(raw) as {
        selectedPresetId: string;
        controls: BotanicalControls;
        bpm: number;
        organismState: AsciiState;
      };
      setSelectedPresetId(snapshot.selectedPresetId);
      setControls(snapshot.controls);
      setBpm(snapshot.bpm);
      setOrganismState(snapshot.organismState);
      setAiMessage('Ecosystem loaded.');
    } catch {
      setAiMessage('Saved ecosystem was corrupted.');
    }
  }, []);

  const lifePercent = controls.life * 0.6 + level * 40;
  const cpu = 18 + controls.density * 0.4 + controls.evolution * 0.2;
  const particleCount = Math.round(30 + controls.density * 0.9 + controls.energy * 0.4);

  return (
    <div className="plantasia-shell">
      <TopBar
        ecosystemName={`${species.name} biome`}
        bpm={bpm}
        harmony={harmony}
        life={lifePercent}
        cpu={cpu}
        recording={recording}
        advanced={advanced}
        onToggleAdvanced={() => setAdvanced((value) => !value)}
        onBpmChange={handleBpmChange}
        onSave={handleSave}
        onLoad={handleLoad}
        onToggleRecord={() => setRecording((value) => !value)}
        onFullscreen={handleFullscreen}
      />

      <div className="plantasia-body">
        <LeftSidebar
          activeAction={activeAction}
          activeSection={activeSection}
          onAction={handleAction}
          onSection={setActiveSection}
        />

        <main className="plantasia-main">
          <CenterCanvas
            species={species}
            controls={controls}
            seed={seed}
            level={level}
            audioActive={audioActive}
            stateLabel={stateLabels[organismState]}
          />
          <SpeciesSelector presets={presets} selectedId={selectedPresetId} onSelect={handleSelectPreset} />
          {advanced ? <AdvancedPanel settings={synth} onChange={handleAdvancedChange} /> : null}
          <BottomControls controls={controls} advanced={advanced} onChange={handleControlChange} />
        </main>

        <RightSidebar
          species={species}
          controls={controls}
          harmony={harmony}
          age={age}
          level={level}
          connectedOrganisms={Math.max(2, Math.round(controls.harmony / 18))}
          particleCount={particleCount}
          aiMessage={aiMessage}
          onAiAction={handleAiAction}
        />
      </div>

      <button type="button" className="visually-hidden-stop" onClick={stopAudio}>
        Stop all sound
      </button>
    </div>
  );
}

export default App;
