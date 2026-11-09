import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppProviders } from '@context/AppProviders';
import { AppLayout } from '@components/layout/AppLayout/AppLayout';
import {
  AboutPage,
  AILabPage,
  DocsPage,
  HomePage,
  PerformancePage,
  PresetsPage,
  SettingsPage,
  SpeciesLibraryPage,
  StudioPage,
} from '@pages/index';
import { ROUTES } from './navigation';

/**
 * App — root component. Wires global providers, the router, and the persistent
 * shell. All routed pages render inside <AppLayout> above the living ecosystem.
 */
export function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path={ROUTES.home} element={<HomePage />} />
            <Route path={ROUTES.studio} element={<StudioPage />} />
            <Route path={ROUTES.performance} element={<PerformancePage />} />
            <Route path={ROUTES.species} element={<SpeciesLibraryPage />} />
            <Route path={ROUTES.presets} element={<PresetsPage />} />
            <Route path={ROUTES.ai} element={<AILabPage />} />
            <Route path={ROUTES.settings} element={<SettingsPage />} />
            <Route path={ROUTES.docs} element={<DocsPage />} />
            <Route path={ROUTES.about} element={<AboutPage />} />
            <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProviders>
  );
}
