import type { PlantasiaPreset } from '../data/presets';

type SpeciesSelectorProps = {
  presets: PlantasiaPreset[];
  selectedId: string;
  onSelect: (presetId: string) => void;
};

export function SpeciesSelector({ presets, selectedId, onSelect }: SpeciesSelectorProps) {
  return (
    <div className="species-selector" role="listbox" aria-label="Species presets">
      {presets.map((preset) => (
        <button
          key={preset.id}
          type="button"
          role="option"
          aria-selected={selectedId === preset.id}
          className={`species-chip ${selectedId === preset.id ? 'is-active' : ''}`}
          onClick={() => onSelect(preset.id)}
          title={preset.description}
        >
          {preset.species}
        </button>
      ))}
    </div>
  );
}
