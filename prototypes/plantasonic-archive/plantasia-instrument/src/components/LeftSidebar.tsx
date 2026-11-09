import { cultivationActions, systemNavigation } from '../data/ecosystem';

type LeftSidebarProps = {
  activeAction: string;
  activeSection: string;
  onAction: (actionId: string) => void;
  onSection: (section: string) => void;
};

export function LeftSidebar({ activeAction, activeSection, onAction, onSection }: LeftSidebarProps) {
  return (
    <nav className="left-sidebar" aria-label="Cultivation and navigation">
      <div className="sidebar-section">
        <h2 className="sidebar-heading">Cultivate</h2>
        <ul className="sidebar-list">
          {cultivationActions.map((action) => (
            <li key={action.id}>
              <button
                type="button"
                className={`cultivation-btn ${activeAction === action.id ? 'is-active' : ''}`}
                onClick={() => onAction(action.id)}
                title={`${action.label} (${action.shortcut})`}
                aria-pressed={activeAction === action.id}
              >
                <span className="cultivation-icon" aria-hidden="true">
                  {action.icon}
                </span>
                <span className="cultivation-label">{action.label}</span>
                <kbd className="cultivation-shortcut">{action.shortcut}</kbd>
                <span className="cultivation-highlight" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-section">
        <h2 className="sidebar-heading">System</h2>
        <ul className="sidebar-list sidebar-nav">
          {systemNavigation.map((section) => (
            <li key={section}>
              <button
                type="button"
                className={`nav-btn ${activeSection === section ? 'is-active' : ''}`}
                onClick={() => onSection(section)}
                aria-pressed={activeSection === section}
              >
                {section}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
