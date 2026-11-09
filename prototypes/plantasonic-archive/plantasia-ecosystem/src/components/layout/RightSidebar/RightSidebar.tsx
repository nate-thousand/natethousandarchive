import { Panel } from '@design-system/components/Panel';
import { Badge } from '@design-system/components/Badge';
import { GeneList } from '@components/ecosystem/GeneList/GeneList';
import { SignalBars } from '@components/ecosystem/SignalBars/SignalBars';
import { encodeDna } from '@species/genes';
import { useEcosystem } from '@context/ecosystem/ecosystem';
import './RightSidebar.css';

const TIER_LABEL = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  expert: 'Expert',
} as const;

/**
 * RightSidebar — the Information rail. Surfaces everything the (decorative)
 * canvas cannot convey textually: species identity, the organism's DNA and
 * genes, and live audio analysis. This is also what keeps the app accessible.
 */
export function RightSidebar() {
  const { species, organism } = useEcosystem();
  const dna = encodeDna(organism.genes);

  return (
    <div className="right-sidebar surface-panel" aria-label="Information">
      <div className="right-sidebar__scroll">
        <Panel title="Species" eyebrow={species.binomial} icon="speciesLibrary" variant="glass">
          <p className="right-sidebar__desc">{species.description}</p>
          <div className="right-sidebar__meta">
            <Badge tone="accent">{TIER_LABEL[species.tier]}</Badge>
            <Badge>{species.sound.engine}</Badge>
            <Badge>{species.sound.voices} voices</Badge>
          </div>
        </Panel>

        <Panel title="Living DNA" eyebrow="Genome" icon="dna" variant="glass">
          <code className="right-sidebar__dna" title="Encoded organism DNA">
            {dna}
          </code>
          <GeneList genes={organism.genes} />
        </Panel>

        <Panel title="Signal" eyebrow="Real-time analysis" icon="energy" variant="glass">
          <SignalBars />
        </Panel>
      </div>
    </div>
  );
}
