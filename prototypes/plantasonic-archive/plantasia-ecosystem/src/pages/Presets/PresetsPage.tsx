import { Page } from '@components/common/Page/Page';
import { Panel } from '@design-system/components/Panel';
import { Button } from '@design-system/components/Button';
import { Badge } from '@design-system/components/Badge';
import { FACTORY_PRESETS } from '@audio/presets/presets';
import { getSpecies } from '@species/registry';
import { useEcosystem } from '@context/ecosystem/ecosystem';
import { useAudio } from '@context/audio/audio';
import './PresetsPage.css';

/**
 * PresetsPage — factory presets (and, in future, user-saved organisms). Loading
 * a preset cultivates a fresh organism of its species with the preset's genes.
 */
export function PresetsPage() {
  const { applyPreset } = useEcosystem();
  const { start } = useAudio();

  return (
    <Page
      eyebrow="Collection"
      title="Presets"
      lede="Curated organisms ready to grow. Load one to make it the living centerpiece of your ecosystem."
      width="full"
    >
      <div className="card-grid card-grid--wide">
        {FACTORY_PRESETS.map((preset) => {
          const species = getSpecies(preset.speciesId);
          return (
            <Panel key={preset.id} variant="glass" className="preset-card" data-animate>
              <div className="preset-card__head">
                <h2 className="preset-card__name">{preset.name}</h2>
                {species && <Badge tone="accent">{species.name}</Badge>}
              </div>
              <p className="preset-card__desc">{preset.description}</p>
              <code className="preset-card__dna">{preset.dna}</code>
              <Button
                variant="outline"
                size="sm"
                iconStart="seed"
                onClick={() => {
                  applyPreset(preset.speciesId, preset.genes, preset.name);
                  void start();
                }}
                block
              >
                Cultivate
              </Button>
            </Panel>
          );
        })}
      </div>
    </Page>
  );
}
