import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { cn } from '@utils/cn';
import { TopBar } from '@components/layout/TopBar/TopBar';
import { LeftSidebar } from '@components/layout/LeftSidebar/LeftSidebar';
import { RightSidebar } from '@components/layout/RightSidebar/RightSidebar';
import { BottomControls } from '@components/layout/BottomControls/BottomControls';
import { CenterCanvas } from '@components/layout/CenterCanvas/CenterCanvas';
import './AppLayout.css';

/**
 * AppLayout — composes the five persistent regions and hosts routed pages in
 * the center, layered above the living ecosystem canvas. Manages the mobile
 * off-canvas drawer state for the side rails.
 */
export function AppLayout() {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  const closeDrawers = () => {
    setLeftOpen(false);
    setRightOpen(false);
  };

  return (
    <div className="app-layout">
      <a className="skip-link" href="#ecosystem-main">
        Skip to ecosystem
      </a>

      <div className="app-layout__topbar">
        <TopBar
          onToggleLeft={() => setLeftOpen((open) => !open)}
          onToggleRight={() => setRightOpen((open) => !open)}
        />
      </div>

      <aside className={cn('app-layout__left', leftOpen && 'app-layout__left--open')}>
        <LeftSidebar onNavigate={closeDrawers} />
      </aside>

      <main id="ecosystem-main" className="app-layout__center">
        <CenterCanvas />
        <div className="page-layer">
          <Outlet />
        </div>
      </main>

      <aside className={cn('app-layout__right', rightOpen && 'app-layout__right--open')}>
        <RightSidebar />
      </aside>

      {(leftOpen || rightOpen) && (
        <button
          type="button"
          className="app-layout__backdrop"
          aria-label="Close panels"
          onClick={closeDrawers}
        />
      )}

      <div className="app-layout__bottom">
        <BottomControls />
      </div>
    </div>
  );
}
