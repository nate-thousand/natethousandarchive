import type { ReactNode } from 'react';
import { PreferencesProvider } from './preferences/PreferencesProvider';
import { EcosystemProvider } from './ecosystem/EcosystemProvider';
import { AudioProvider } from './audio/AudioProvider';
import { PerformanceProvider } from './performance/PerformanceProvider';

/**
 * AppProviders — composes the global context providers in dependency order:
 *   Preferences (theme/motion/volume)
 *     -> Ecosystem (active organism & genes)
 *       -> Audio (engine bridge; consumes both above)
 *         -> Performance (input layer; routes through engine to audio)
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <PreferencesProvider>
      <EcosystemProvider>
        <AudioProvider>
          <PerformanceProvider>{children}</PerformanceProvider>
        </AudioProvider>
      </EcosystemProvider>
    </PreferencesProvider>
  );
}
