# GitHub Pages Deployment Guide

This guide explains how to deploy your portfolio to GitHub Pages.

## Overview

The portfolio is configured to support both GitHub Pages deployment and other deployment methods (like Cloudflare Workers). The deployment uses GitHub Actions to automatically build and deploy the site whenever changes are pushed to the `main` branch.

## Quick Start

### 1. Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/<your-username>/<your-repo>`
   - For this repository: `https://github.com/Aswintechie/portfolio`
2. Navigate to **Settings** → **Pages** (in the left sidebar)
3. Under **Source**, select **GitHub Actions** from the dropdown

That's it! The workflow will automatically deploy your site when you push to the `main` branch.

### 2. Access Your Site

After the first deployment completes (check the Actions tab), your portfolio will be available at:
```
https://<your-username>.github.io/<repo-name>/
```

For this repository specifically:
```
https://aswintechie.github.io/portfolio/
```

## Configuration

### 1. Vite Configuration

The `vite.config.js` is configured to use a different base path depending on the deployment target:
- **GitHub Pages**: `/<repo-name>/` (when `GITHUB_PAGES=true`, defaults to `/portfolio/`)
- **Other deployments**: `/` (default)

You can customize the repository name by setting the `REPO_NAME` environment variable.

### 2. React Router Configuration

The `App.jsx` uses `import.meta.env.BASE_URL` to automatically use the correct base path for routing, ensuring navigation works correctly on GitHub Pages.

### 3. Workflow Configuration

The deployment workflow (`.github/workflows/gh-pages.yml`) includes:
- **Trigger**: Runs on push to `main` branch or manual workflow dispatch
- **Build**: Installs dependencies and builds with `GITHUB_PAGES=true`
- **Deploy**: Uses official GitHub Pages actions for deployment
- **Permissions**: Automatically configured for Pages deployment

## Manual Deployment

You can also trigger a deployment manually:

1. Go to the **Actions** tab in your repository
2. Select the **Deploy to GitHub Pages** workflow
3. Click **Run workflow** button
4. Select the branch and click **Run workflow**

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

## For Forks or Renamed Repositories

If you fork this repository or rename it, you have two options:

### Option 1: Update the REPO_NAME in GitHub Actions

Edit `.github/workflows/gh-pages.yml` and add the `REPO_NAME` environment variable:

```yaml
- name: Build with Vite for GitHub Pages
  run: npm run build
  env:
    GITHUB_PAGES: 'true'
    REPO_NAME: 'your-repo-name'  # Add this line
```

### Option 2: Use the Repository Name Dynamically

The workflow can be updated to automatically extract the repository name from GitHub context. Edit the build step in `.github/workflows/gh-pages.yml`:

```yaml
- name: Build with Vite for GitHub Pages
  run: npm run build
  env:
    GITHUB_PAGES: 'true'
    REPO_NAME: ${{ github.event.repository.name }}
```

## Troubleshooting

### Assets Not Loading

If assets (CSS, JS, images) aren't loading:
1. Check that the workflow completed successfully in the Actions tab
2. Verify that GitHub Pages is enabled and set to use "GitHub Actions" as source
3. Ensure the `.nojekyll` file is present in the `public` directory (it should be committed)
4. Wait a few minutes - GitHub Pages can take time to propagate

### Routing Issues

If direct navigation to routes (like `/privacy`) results in 404:
1. This is expected behavior with GitHub Pages and client-side routing
2. Users should navigate through the app's internal links (clicking links within the site works fine)
3. The home page (root URL) will always work correctly
4. GitHub Pages doesn't support HTML5 pushState routing for SPAs by default

### Build Failures

If the workflow fails:
1. Check the workflow logs in the Actions tab
2. Verify that all dependencies are properly listed in `package.json`
3. Test the build locally with `GITHUB_PAGES=true npm run build`
4. Check for any TypeScript or ESLint errors

### Page Shows 404

If you get a 404 error:
1. Make sure you've enabled GitHub Pages in Settings → Pages
2. Verify the source is set to "GitHub Actions"
3. Wait for the deployment to complete (check Actions tab)
4. Try accessing the site in an incognito/private window (cache issues)

## Dual Deployment Support

This portfolio supports both GitHub Pages and Cloudflare Workers deployment:
- **GitHub Pages**: Uses the workflow in `.github/workflows/gh-pages.yml`
- **Cloudflare Workers**: Uses the existing `deploy.yml` workflow

Both deployments work independently and don't interfere with each other. You can deploy to both simultaneously!

## Important Files

- `.github/workflows/gh-pages.yml` - GitHub Actions workflow for deployment
- `vite.config.js` - Vite configuration with base path support
- `src/App.jsx` - React Router configuration with basename support
- `public/.nojekyll` - Prevents GitHub Pages from ignoring certain files
- `GITHUB_PAGES_SETUP.md` - This documentation file

## Notes

- The GitHub Pages deployment builds from the `main` branch only (configurable in workflow)
- Build artifacts are automatically uploaded and deployed
- The workflow requires no secrets or manual configuration
- Deployment typically takes 1-2 minutes after pushing to main
- Old deployments are automatically replaced with new ones

## Next Steps

After enabling GitHub Pages:
1. Push a commit to the `main` branch
2. Go to the Actions tab and watch the deployment
3. Once complete, visit your site at `https://<your-username>.github.io/<repo-name>/`
   - For this repository: `https://aswintechie.github.io/portfolio/`
4. Share your portfolio URL!

## Need Help?

If you encounter issues:
1. Check the [GitHub Pages documentation](https://docs.github.com/en/pages)
2. Review workflow logs in the Actions tab
3. Test the build locally to isolate issues
4. Create an issue in the repository
