import { resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';

/** In dev, compile TypeScript from src/; Live Server uses the built ./dist/assets/dpad.js. */
function devEntry(): Plugin {
  return {
    name: 'dpad-dev-entry',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        if (ctx.server) {
          return html.replace('./dist/assets/dpad.js', '/src/main.ts');
        }
        return html;
      },
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [devEntry()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      // Build from source — index.html is the Live Server shell only.
      input: resolve(__dirname, 'src/main.ts'),
      output: {
        entryFileNames: 'assets/dpad.js',
        chunkFileNames: 'assets/dpad-[name].js',
        assetFileNames: 'assets/dpad-[name][extname]',
      },
    },
  },
  server: {
    fs: { allow: ['..', '../..', '../../..'] },
  },
});
