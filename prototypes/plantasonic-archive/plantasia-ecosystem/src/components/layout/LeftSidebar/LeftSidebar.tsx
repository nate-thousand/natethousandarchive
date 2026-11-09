import { NavLink } from 'react-router-dom';
import { Icon } from '@design-system/components/Icon';
import { Button } from '@design-system/components/Button';
import { Divider } from '@design-system/components/Divider';
import { cn } from '@utils/cn';
import { NAV_ITEMS, NAV_GROUP_LABELS, type NavItem } from '@app/navigation';
import { listSpecies } from '@species/registry';
import { useEcosystem } from '@context/ecosystem/ecosystem';
import './LeftSidebar.css';

const GROUP_ORDER: NavItem['group'][] = ['create', 'library', 'system'];

export interface LeftSidebarProps {
  /** Called after a navigation/selection to close the mobile drawer. */
  onNavigate?: () => void;
}

/**
 * LeftSidebar — the Cultivation rail. Houses primary navigation, the species
 * (seed) selector, and quick evolution actions. Choosing a species plants a
 * fresh organism.
 */
export function LeftSidebar({ onNavigate }: LeftSidebarProps) {
  const { species, selectSpecies, mutate, randomize, regrow } = useEcosystem();
  const allSpecies = listSpecies();

  return (
    <nav className="left-sidebar surface-panel" aria-label="Cultivation">
      <div className="left-sidebar__scroll">
        {GROUP_ORDER.map((group) => (
          <section key={group} className="left-sidebar__group">
            <p className="eyebrow left-sidebar__group-label">{NAV_GROUP_LABELS[group]}</p>
            <ul role="list" className="left-sidebar__nav">
              {NAV_ITEMS.filter((item) => item.group === group).map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.path === '/'}
                    className={({ isActive }) => cn('left-sidebar__link', isActive && 'left-sidebar__link--active')}
                    onClick={onNavigate}
                  >
                    <Icon name={item.icon} size="sm" />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <Divider spacing="sm" label="Plant a seed" />

        <section className="left-sidebar__group">
          <ul role="list" className="left-sidebar__species">
            {allSpecies.map((option) => (
              <li key={option.id}>
                <button
                  type="button"
                  className={cn(
                    'left-sidebar__species-btn',
                    option.id === species.id && 'left-sidebar__species-btn--active',
                  )}
                  onClick={() => {
                    selectSpecies(option.id);
                    onNavigate?.();
                  }}
                  aria-pressed={option.id === species.id}
                  title={option.description}
                >
                  <Icon name={option.icon} size="sm" />
                  <span>{option.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="left-sidebar__actions">
        <Button variant="ghost" size="sm" iconStart="mutation" onClick={() => mutate(0.18)} block>
          Mutate
        </Button>
        <Button variant="ghost" size="sm" iconStart="random" onClick={randomize} block>
          Randomize
        </Button>
        <Button variant="outline" size="sm" iconStart="growth" onClick={regrow} block>
          Regrow
        </Button>
      </div>
    </nav>
  );
}
