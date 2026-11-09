/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

const resolvePath = (path: string) => fileURLToPath(new URL(path, import.meta.url));

/**
 * Vite configuration for Plantasia.
 *
 * Path aliases mirror the domain-driven folder structure so that audio,
 * visualization, design-system, and UI layers can be imported without
 * brittle relative paths. Vitest config is colocated here for a single
 * source of truth.
 */
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'plantasia-dev-banner',
      configureServer(server) {
        server.httpServer?.once('listening', () => {
          const addr = server.httpServer?.address();
          const port = typeof addr === 'object' && addr ? addr.port : 5180;
          console.log('\n  Plantasia v2.1 — open http://localhost:' + port + '/');
          console.log('  (Not port 5173 — that is the older plantasia-instrument project.)\n');
        });
      },
    },
  ],
  // Plantasia must be served by Vite — never open index.html directly (file://).
  // Port 5180 avoids colliding with other Vite apps in this monorepo (e.g. plantasia-instrument on 5173).
  server: {
    port: 5180,
    // Fail loudly if 5180 is taken — run `npm start` to free stale servers first.
    strictPort: true,
    open: true,
  },
  preview: {
    port: 4173,
    strictPort: false,
    open: true,
  },
  resolve: {
    alias: {
      '@': resolvePath('./src'),
      '@app': resolvePath('./src/app'),
      '@components': resolvePath('./src/components'),
      '@design-system': resolvePath('./src/design-system'),
      '@audio': resolvePath('./src/audio'),
      '@species': resolvePath('./src/species'),
      '@visualization': resolvePath('./src/visualization'),
      '@hooks': resolvePath('./src/hooks'),
      '@context': resolvePath('./src/context'),
      '@services': resolvePath('./src/services'),
      '@utils': resolvePath('./src/utils'),
      '@pages': resolvePath('./src/pages'),
      '@styles': resolvePath('./src/styles'),
      '@performance': resolvePath('./src/performance'),
    },
  },
  build: {
    // Split heavy, rarely-changing vendors into their own chunks for caching
    // and to keep the main bundle lean.
    rollupOptions: {
      output: {
        manualChunks: {
          tone: ['tone'],
          gsap: ['gsap'],
          router: ['react-router-dom'],
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: false,
  },
});
