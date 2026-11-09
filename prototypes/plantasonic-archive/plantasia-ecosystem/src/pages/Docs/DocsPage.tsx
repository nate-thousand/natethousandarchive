import { Page } from '@components/common/Page/Page';
import { Panel } from '@design-system/components/Panel';
import { Icon } from '@design-system/components/Icon';
import type { IconName } from '@design-system/tokens/icons/icons';
import './DocsPage.css';

interface Mapping {
  icon: IconName;
  garden: string;
  synth: string;
  meaning: string;
}

/** The Rosetta stone: garden vocabulary -> real synthesis concepts. */
const MAPPINGS: Mapping[] = [
  { icon: 'seed', garden: 'Seed', synth: 'Oscillator / source', meaning: 'Where every sound begins.' },
  { icon: 'growth', garden: 'Growth', synth: 'Envelope (ADSR)', meaning: 'How a sound emerges and fades.' },
  { icon: 'roots', garden: 'Roots', synth: 'Filter', meaning: 'Shapes the low, grounding frequencies.' },
  { icon: 'leaves', garden: 'Leaves', synth: 'High harmonics', meaning: 'The bright detail up top.' },
  { icon: 'bloom', garden: 'Bloom', synth: 'Reverb', meaning: 'Space and spatial expansion.' },
  { icon: 'spores', garden: 'Spores', synth: 'Noise / granular', meaning: 'Texture and grit.' },
  { icon: 'sunlight', garden: 'Sunlight', synth: 'Filter cutoff', meaning: 'Brightness and openness.' },
  { icon: 'water', garden: 'Water', synth: 'Resonance', meaning: 'Body and moisture of the tone.' },
  { icon: 'wind', garden: 'Wind', synth: 'LFO / modulation', meaning: 'Movement over time.' },
  { icon: 'soil', garden: 'Soil', synth: 'Sub / low-end', meaning: 'Weight and grounding.' },
  { icon: 'life', garden: 'Life', synth: 'Release / sustain', meaning: 'How long a sound lingers.' },
  { icon: 'energy', garden: 'Energy', synth: 'Amplitude / voices', meaning: 'Vitality and presence.' },
  { icon: 'harmony', garden: 'Harmony', synth: 'Overtones / chords', meaning: 'Harmonic richness.' },
  { icon: 'mutation', garden: 'Mutation', synth: 'Randomization', meaning: 'Controlled chance.' },
  { icon: 'evolution', garden: 'Evolution', synth: 'Generative variation', meaning: 'Music that grows itself.' },
];

/**
 * DocsPage — teaches synthesis through nature by mapping Plantasia's living
 * vocabulary onto the underlying synthesis concepts.
 */
export function DocsPage() {
  return (
    <Page
      eyebrow="Learn"
      title="Synthesis through nature"
      lede="Plantasia hides nothing — it simply renames it. Every natural term you tend maps to a real concept of sound synthesis."
      width="wide"
    >
      <Panel variant="glass" flush data-animate>
        <table className="docs-table">
          <thead>
            <tr>
              <th scope="col">In the garden</th>
              <th scope="col">In synthesis</th>
              <th scope="col">What it does</th>
            </tr>
          </thead>
          <tbody>
            {MAPPINGS.map((row) => (
              <tr key={row.garden}>
                <th scope="row" className="docs-table__garden">
                  <Icon name={row.icon} size="sm" />
                  {row.garden}
                </th>
                <td className="docs-table__synth">{row.synth}</td>
                <td className="docs-table__meaning">{row.meaning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </Page>
  );
}
