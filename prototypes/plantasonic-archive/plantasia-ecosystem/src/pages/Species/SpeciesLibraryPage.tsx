import { Page } from '@components/common/Page/Page';
import { SpeciesCard } from '@components/ecosystem/SpeciesCard/SpeciesCard';
import { listSpecies } from '@species/registry';
import { useEcosystem } from '@context/ecosystem/ecosystem';

/**
 * SpeciesLibraryPage — the catalog of living species. Selecting one plants a
 * fresh organism and updates the ecosystem everywhere.
 */
export function SpeciesLibraryPage() {
  const { species, selectSpecies } = useEcosystem();
  const all = listSpecies();

  return (
    <Page
      eyebrow="Collection"
      title="Species"
      lede="Each species is a living instrument — a unique blend of sound, form, and motion. Choose one to cultivate."
      width="full"
    >
      <div className="card-grid card-grid--wide">
        {all.map((option) => (
          <SpeciesCard
            key={option.id}
            species={option}
            active={option.id === species.id}
            onSelect={selectSpecies}
          />
        ))}
      </div>
    </Page>
  );
}
