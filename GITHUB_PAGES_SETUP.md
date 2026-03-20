# GitHub Pages Deployment Guide

This guide explains how to deploy your portfolio to GitHub Pages.

## Overview

The portfolio is configured to support both GitHub Pages deployment and other deployment methods (like Cloudflare Workers). The deployment uses GitHub Actions to automatically build and deploy the site whenever changes are pushed to the `main` branch.

## Configuration

### 1. Vite Configuration

The `vite.config.js` is configured to use a different base path depending on the deployment target:
- **GitHub Pages**: `/<repo-name>/` (when `GITHUB_PAGES=true`, defaults to `/portfolio/`)
- **Other deployments**: `/` (default)

You can customize the repository name by setting the `REPO_NAME` environment variable.

### 2. React Router Configuration

The `App.jsx` uses `import.meta.env.BASE_URL` to automatically use the correct base path for routing, ensuring navigation works correctly on GitHub Pages.

## GitHub Pages Setup

### Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**

That's it! The workflow will automatically deploy your site when you push to the `main` branch.

### Workflow File

The deployment workflow is located at `.github/workflows/gh-pages.yml` and includes:
- Installing dependencies
- Building the project with the GitHub Pages environment variable
- Uploading the built files
- Deploying to GitHub Pages

## Manual Deployment

You can also trigger a deployment manually:

1. Go to the **Actions** tab in your repository
2. Select the **Deploy to GitHub Pages** workflow
3. Click **Run workflow**

## Testing Locally

To test the GitHub Pages build locally:

```bash
# Build with GitHub Pages configuration (using default 'portfolio' repo name)
GITHUB_PAGES=true npm run build

# Or specify a custom repository name
GITHUB_PAGES=true REPO_NAME=my-repo npm run build

# Preview the build
npm run preview
```

## Access Your Site

After deployment, your portfolio will be available at:
```
https://<username>.github.io/portfolio/
```

For example: `https://aswintechie.github.io/portfolio/`

## Troubleshooting

### Assets Not Loading

If assets (CSS, JS, images) aren't loading:
1. Check that the workflow completed successfully
2. Verify that GitHub Pages is enabled in repository settings
3. Ensure the `.nojekyll` file is present in the `public` directory

### Routing Issues

If direct navigation to routes (like `/privacy`) doesn't work:
1. This is expected behavior with GitHub Pages and client-side routing
2. Users should navigate through the app's internal links
3. The home page will always work correctly

### Build Failures

If the workflow fails:
1. Check the workflow logs in the Actions tab
2. Verify that all dependencies are properly listed in `package.json`
3. Test the build locally with `GITHUB_PAGES=true npm run build`

## Dual Deployment

This portfolio supports both GitHub Pages and Cloudflare Workers deployment:
- **GitHub Pages**: Uses the workflow in `.github/workflows/gh-pages.yml`
- **Cloudflare Workers**: Uses the existing `deploy.yml` workflow

Both deployments work independently and don't interfere with each other.

## Important Files

- `.github/workflows/gh-pages.yml` - GitHub Actions workflow for deployment
- `vite.config.js` - Vite configuration with base path support
- `src/App.jsx` - React Router configuration with basename support
- `public/.nojekyll` - Prevents GitHub Pages from ignoring certain files

## Notes

- The GitHub Pages deployment builds from the `main` branch only
- The site is deployed to the `gh-pages` branch automatically
- Build artifacts are stored in the `dist/` directory
- The workflow requires no secrets or manual configuration
