import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Determine base path for deployment
const isGitHubPages = process.env.GITHUB_PAGES === 'true';
let base = '/';

if (isGitHubPages) {
  const repoNameFromEnv = process.env.REPO_NAME;
  let repoNameFromGitHub;

  if (process.env.GITHUB_REPOSITORY) {
    const parts = process.env.GITHUB_REPOSITORY.split('/');
    if (parts.length === 2) {
      repoNameFromGitHub = parts[1];
    }
  }

  const repoName = repoNameFromEnv || repoNameFromGitHub;

  if (!repoName) {
    throw new Error(
      'GITHUB_PAGES is set to true, but neither REPO_NAME nor a valid GITHUB_REPOSITORY are set. ' +
        'Please set REPO_NAME or ensure GITHUB_REPOSITORY is available to configure the Vite base path.'
    );
  }

  base = `/${repoName}/`;
}

export default defineConfig({
  plugins: [react()],
  // Use base path for GitHub Pages deployment
  // For GitHub Pages: set GITHUB_PAGES=true and optionally REPO_NAME
  // For other deployments: base path will be '/'
  base,
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
