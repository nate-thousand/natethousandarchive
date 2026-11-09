import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

/** Catches render/runtime errors and shows a recovery panel instead of a blank screen. */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('[Plantasia] render error', error, info.componentStack);
  }

  render() {
    const { error } = this.state;
    if (error) {
      return (
        <div
          style={{
            minHeight: '100vh',
            padding: '2rem',
            background: '#070a08',
            color: '#eef2e6',
            fontFamily: 'system-ui, sans-serif',
            lineHeight: 1.6,
          }}
        >
          <h1 style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '0.75rem' }}>
            Plantasia could not start
          </h1>
          <p style={{ color: '#d6dccb', marginBottom: '1rem' }}>
            A runtime error prevented the app from loading. Try a hard refresh. If this persists,
            open DevTools → Console and share the error.
          </p>
          <pre
            style={{
              padding: '1rem',
              borderRadius: '8px',
              background: '#141a16',
              border: '1px solid rgba(143, 174, 132, 0.2)',
              overflow: 'auto',
              fontSize: '0.85rem',
            }}
          >
            {error.message}
          </pre>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              border: '1px solid rgba(143, 174, 132, 0.35)',
              background: '#1a221c',
              color: '#eef2e6',
              cursor: 'pointer',
            }}
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
