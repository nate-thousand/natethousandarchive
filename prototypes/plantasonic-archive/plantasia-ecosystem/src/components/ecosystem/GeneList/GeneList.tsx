import { Slider } from '@design-system/components/Slider';
import { GENE_KEYS, GENE_META } from '@species/genes';
import type { OrganismGenes } from '@species/types';
import { cn } from '@utils/cn';
import './GeneList.css';

export interface GeneListProps {
  genes: OrganismGenes;
  /** When true, renders interactive sliders; otherwise read-only bars. */
  editable?: boolean;
  /** Called when an editable gene changes. */
  onChange?: (key: keyof OrganismGenes, value: number) => void;
  className?: string;
}

/**
 * GeneList — renders an organism's genes using the living vocabulary. In
 * editable mode each gene becomes an accessible slider; otherwise it shows a
 * compact read-only level bar. Reused in the Studio, info panel, and AI lab.
 */
export function GeneList({ genes, editable = false, onChange, className }: GeneListProps) {
  if (editable) {
    return (
      <div className={cn('gene-list', className)}>
        {GENE_KEYS.map((key) => (
          <Slider
            key={key}
            label={GENE_META[key].label}
            value={genes[key]}
            min={0}
            max={1}
            step={0.01}
            onChange={(value) => onChange?.(key, value)}
          />
        ))}
      </div>
    );
  }

  return (
    <dl className={cn('gene-list gene-list--readonly', className)}>
      {GENE_KEYS.map((key) => (
        <div key={key} className="gene-list__row">
          <dt className="gene-list__label">{GENE_META[key].label}</dt>
          <dd className="gene-list__bar" aria-hidden="true">
            <span className="gene-list__fill" style={{ width: `${Math.round(genes[key] * 100)}%` }} />
          </dd>
          <span className="sr-only">{Math.round(genes[key] * 100)} percent</span>
        </div>
      ))}
    </dl>
  );
}
