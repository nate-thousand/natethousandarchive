import { useRef, type ReactNode } from 'react';
import { cn } from '@utils/cn';
import { useEntranceAnimation } from '@hooks/useEntranceAnimation';
import './Page.css';

export interface PageProps {
  /** Small uppercase kicker above the title. */
  eyebrow?: string;
  title: string;
  /** Optional supporting lede paragraph. */
  lede?: string;
  /** Header-aligned actions (buttons). */
  actions?: ReactNode;
  /** Constrain content width for readability. @default 'wide' */
  width?: 'narrow' | 'wide' | 'full';
  /** When true, the page background stays transparent (ecosystem shows through). */
  immersive?: boolean;
  children: ReactNode;
}

/**
 * Page — consistent scaffold for routed pages: a titled header, width
 * constraint, scroll padding, and a soft staggered entrance. Children marked
 * with `data-animate` participate in the entrance.
 */
export function Page({ eyebrow, title, lede, actions, width = 'wide', immersive = false, children }: PageProps) {
  const scopeRef = useRef<HTMLDivElement>(null);
  useEntranceAnimation(scopeRef, { replayKey: title });

  return (
    <div
      ref={scopeRef}
      className={cn('page', `page--${width}`, immersive && 'page--immersive')}
    >
      <header className="page__header" data-animate>
        <div className="page__heading">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className="page__title">{title}</h1>
          {lede && <p className="page__lede">{lede}</p>}
        </div>
        {actions && <div className="page__actions">{actions}</div>}
      </header>
      {children}
    </div>
  );
}
