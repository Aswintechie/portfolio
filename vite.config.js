import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Use base path for GitHub Pages deployment
  // For GitHub Pages: set GITHUB_PAGES=true and optionally REPO_NAME (defaults to 'portfolio')
  // For other deployments: base path will be '/'
  base: process.env.GITHUB_PAGES === 'true' ? `/${process.env.REPO_NAME || 'portfolio'}/` : '/',
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
