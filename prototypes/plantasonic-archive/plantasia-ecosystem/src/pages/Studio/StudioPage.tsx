import { Page } from '@components/common/Page/Page';
import { Panel } from '@design-system/components/Panel';
import { Button } from '@design-system/components/Button';
import { Badge } from '@design-system/components/Badge';
import { GeneList } from '@components/ecosystem/GeneList/GeneList';
import { useEcosystem } from '@context/ecosystem/ecosystem';
import { usePreferences } from '@context/preferences/preferences';
import { useAudio } from '@context/audio/audio';
import './StudioPage.css';

/**
 * StudioPage — the primary cultivation workspace. Here the user shapes the
 * organism's genes (which drive synthesis) in plain, natural language. Advanced
 * synthesis details are revealed only in Expert Mode (progressive disclosure).
 */
export function StudioPage() {
  const { species, organism, setGene, mutate, randomize, regrow } = useEcosystem();
  const { expertMode } = usePreferences();
  const { playChord } = useAudio();

  return (
    <Page
      eyebrow="Cultivation"
      title="Studio"
      lede={`Shaping ${organism.name}, a ${species.name.toLowerCase()}.`}
      actions={
        <>
          <Button variant="ghost" size="sm" iconStart="mutation" onClick={() => mutate(0.18)}>
            Mutate
          </Button>
          <Button variant="ghost" size="sm" iconStart="random" onClick={randomize}>
            Randomize
          </Button>
          <Button variant="outline" size="sm" iconStart="growth" onClick={regrow}>
            Regrow
          </Button>
        </>
      }
    >
      <div className="studio__grid">
        <Panel title="Living Genes" eyebrow="Shape the organism" icon="life" variant="glass" data-animate>
          <GeneList genes={organism.genes} editable onChange={setGene} />
        </Panel>

        <div className="stack">
          <Panel title="Growth" eyebrow="Envelope" icon="growth" variant="glass" data-animate>
            <dl className="studio__stats">
              <div>
                <dt>Germinate</dt>
                <dd>{species.sound.envelope.germinate.toFixed(2)}s</dd>
              </div>
              <div>
                <dt>Sprout</dt>
                <dd>{species.sound.envelope.sprout.toFixed(2)}s</dd>
              </div>
              <div>
                <dt>Sustain</dt>
                <dd>{Math.round(species.sound.envelope.sustain * 100)}%</dd>
              </div>
              <div>
                <dt>Wither</dt>
                <dd>{species.sound.envelope.wither.toFixed(2)}s</dd>
              </div>
            </dl>
            <Button variant="primary" size="sm" iconStart="harmony" onClick={() => playChord(['C4', 'E4', 'G4'])} block>
              Pulse a harmony
            </Button>
          </Panel>

          {expertMode && (
            <Panel title="Signal Chain" eyebrow="Expert" icon="expert" variant="glass" data-animate>
              <p className="studio__expert-note">
                Engine: <strong>{species.sound.engine}</strong> · waveform {species.sound.waveform} · octave{' '}
                {species.sound.octave}
              </p>
              <div className="studio__effects">
                {species.sound.effects.map((effect) => (
                  <Badge key={effect.type} tone="accent">
                    {effect.type} {Math.round(effect.amount * 100)}%
                  </Badge>
                ))}
              </div>
            </Panel>
          )}
        </div>
      </div>
    </Page>
  );
}
