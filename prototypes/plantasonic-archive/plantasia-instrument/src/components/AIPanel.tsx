import { aiActions } from '../data/ecosystem';

type AIPanelProps = {
  message: string;
  onAction: (action: string) => void;
};

export function AIPanel({ message, onAction }: AIPanelProps) {
  return (
    <section className="info-panel ai-panel" aria-label="AI assistant">
      <h2 className="info-panel-title">AI</h2>
      <p className="ai-panel-message small">{message}</p>
      <div className="ai-panel-actions">
        {aiActions.map((action) => (
          <button key={action} type="button" className="ai-action-btn" onClick={() => onAction(action)}>
            {action}
          </button>
        ))}
      </div>
    </section>
  );
}
