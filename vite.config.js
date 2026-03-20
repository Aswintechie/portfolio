import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Use base path for GitHub Pages deployment
  base: process.env.GITHUB_PAGES === 'true' ? '/portfolio/' : '/',
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
  },
  define: {
    // Define process.env for compatibility with some libraries
    'process.env': {},
  },
});
