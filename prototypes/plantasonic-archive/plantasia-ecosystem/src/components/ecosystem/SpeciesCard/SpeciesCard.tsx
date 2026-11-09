import { Icon } from '@design-system/components/Icon';
import { Badge } from '@design-system/components/Badge';
import { cn } from '@utils/cn';
import type { SpeciesDefinition } from '@species/types';
import './SpeciesCard.css';

const TIER_TONE = {
  beginner: 'positive',
  intermediate: 'info',
  expert: 'caution',
} as const;

export interface SpeciesCardProps {
  species: SpeciesDefinition;
  active?: boolean;
  onSelect: (speciesId: string) => void;
}

/** SpeciesCard — a selectable card presenting a species archetype. */
export function SpeciesCard({ species, active = false, onSelect }: SpeciesCardProps) {
  return (
    <button
      type="button"
      className={cn('species-card', active && 'species-card--active')}
      onClick={() => onSelect(species.id)}
      aria-pressed={active}
      data-animate
    >
      <span className="species-card__icon anim-breathe" aria-hidden="true">
        <Icon name={species.icon} size="lg" />
      </span>
      <span className="species-card__body">
        <span className="species-card__name">{species.name}</span>
        <span className="species-card__binomial">{species.binomial}</span>
        <span className="species-card__desc">{species.description}</span>
      </span>
      <span className="species-card__footer">
        <Badge tone={TIER_TONE[species.tier]} dot>
          {species.tier}
        </Badge>
        <Badge>{species.sound.engine}</Badge>
      </span>
    </button>
  );
}
