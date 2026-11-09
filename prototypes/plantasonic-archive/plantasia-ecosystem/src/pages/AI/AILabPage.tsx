import { useMemo, useState } from 'react';
import { Page } from '@components/common/Page/Page';
import { Panel } from '@design-system/components/Panel';
import { Button } from '@design-system/components/Button';
import { Badge } from '@design-system/components/Badge';
import { describeOrganism, suggestMutation, suggestName } from '@services/ai/insight';
import { encodeDna } from '@species/genes';
import { useEcosystem } from '@context/ecosystem/ecosystem';
import './AILabPage.css';

interface Capability {
  label: string;
  available: boolean;
}

const CAPABILITIES: Capability[] = [
  { label: 'Describe sounds', available: true },
  { label: 'Suggest mutations', available: true },
  { label: 'Name organisms', available: true },
  { label: 'Intelligent randomize', available: true },
  { label: 'Generate species', available: false },
  { label: 'Harmonic variations', available: false },
  { label: 'Cloud sharing', available: false },
];

/**
 * AILabPage — the creative AI workspace. Today it runs on local heuristics
 * (see services/ai); the surface is built so a real model can replace the
 * heuristics without UI changes.
 */
export function AILabPage() {
  const { species, organism, mutate, randomize, rename } = useEcosystem();
  const [insight, setInsight] = useState<string>('');

  const description = useMemo(
    () => describeOrganism(species, organism.genes),
    [species, organism.genes],
  );

  return (
    <Page
      eyebrow="Intelligence"
      title="AI Laboratory"
      lede="Describe, mutate, and evolve your organisms. Store their DNA and let the lab suggest where to grow next."
      width="wide"
    >
      <div className="ai-lab__grid">
        <Panel title="Describe this organism" eyebrow="Insight" icon="ai" variant="glass" data-animate>
          <p className="ai-lab__text">{description}</p>
          <code className="ai-lab__dna">{encodeDna(organism.genes)}</code>
        </Panel>

        <Panel title="Suggestions" eyebrow="Evolve" icon="mutation" variant="glass" data-animate>
          {insight && <p className="ai-lab__text ai-lab__text--accent">{insight}</p>}
          <div className="ai-lab__actions">
            <Button
              variant="outline"
              size="sm"
              iconStart="ai"
              onClick={() => setInsight(suggestMutation(organism.genes))}
            >
              Suggest a mutation
            </Button>
            <Button variant="ghost" size="sm" iconStart="mutation" onClick={() => mutate(0.2)}>
              Apply mutation
            </Button>
            <Button variant="ghost" size="sm" iconStart="random" onClick={randomize}>
              Intelligent randomize
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconStart="seed"
              onClick={() => rename(suggestName(species, organism.genes))}
            >
              Suggest a name
            </Button>
          </div>
        </Panel>

        <Panel title="Capabilities" eyebrow="Roadmap" icon="evolution" variant="glass" data-animate>
          <ul role="list" className="ai-lab__caps">
            {CAPABILITIES.map((cap) => (
              <li key={cap.label} className="ai-lab__cap">
                <span>{cap.label}</span>
                <Badge tone={cap.available ? 'positive' : 'neutral'} dot={cap.available}>
                  {cap.available ? 'Ready' : 'Soon'}
                </Badge>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </Page>
  );
}
