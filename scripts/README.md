# Stale Deployment Cleanup

This directory contains the cleanup script for removing stale Cloudflare Workers preview deployments.

## Overview

When pull requests are opened, preview deployments are automatically created on Cloudflare Workers (e.g., `aswin-portfolio-pr-46.aswincloud.workers.dev`). This script ensures that deployments for closed or merged PRs are automatically cleaned up, preventing resource waste and clutter.

## How It Works

The cleanup script:
1. Lists all workers in the Cloudflare account
2. Identifies workers matching the PR preview pattern (`aswin-portfolio-pr-[number]`)
3. Checks if each PR is still open using the GitHub API
4. Deletes workers for closed/merged PRs
5. Keeps workers for open PRs

## Usage

### Automatic (Recommended)

The script runs automatically via GitHub Actions workflows:

- **Daily Scheduled Cleanup**: Runs at 00:00 UTC daily via `.github/workflows/cleanup-stale-deployments.yml`
- **Real-time Cleanup**: Runs during preview deployments via `.github/workflows/preview-deploy.yml`

### Manual Execution

You can manually trigger the cleanup:

1. **Via GitHub Actions UI**:
   - Go to Actions tab → Cleanup Stale Deployments → Run workflow

2. **Locally** (for testing):
   ```bash
   export CLOUDFLARE_API_TOKEN="your-token"
   export CLOUDFLARE_ACCOUNT_ID="your-account-id"
   export GITHUB_TOKEN="your-github-token"
   export GITHUB_REPOSITORY="owner/repo"
   node scripts/cleanup-stale-deployments.cjs
   ```

## Configuration

### Required Environment Variables

- `CLOUDFLARE_API_TOKEN`: Cloudflare API token with Workers Scripts Edit permission
- `GITHUB_TOKEN`: GitHub token with `pull-requests: read` permission
- `GITHUB_REPOSITORY`: Repository in format `owner/repo`

### Optional Environment Variables

- `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID (auto-detected from API token if not provided)

### Worker Naming Pattern

The script only processes workers matching this pattern:
- Pattern: `aswin-portfolio-pr-[number]`
- Regex: `/^aswin-portfolio-pr-(\d+)$/`
- Example: `aswin-portfolio-pr-123`

To customize for a different project, modify these constants in the script:
```javascript
const PR_WORKER_PREFIX = 'aswin-portfolio-pr-';
const PR_WORKER_PATTERN = /^aswin-portfolio-pr-(\d+)$/;
```

## Security

- ✅ All secrets are stored in GitHub Secrets
- ✅ No secrets are logged or exposed
- ✅ Strict pattern matching prevents accidental deletions
- ✅ Production worker is protected by pattern
- ✅ Uses HTTPS for all API calls
- ✅ Proper input validation and error handling

## Testing

A test script is available to verify the cleanup logic:

```bash
node /tmp/test-cleanup-logic.js
```

This simulates the cleanup process with mock data to verify correctness.

## Troubleshooting

### "Failed to list workers" error

**Possible causes**:
- Invalid or expired Cloudflare API token
- Insufficient API token permissions
- Failed to auto-detect Account ID

**Solution**: 
1. Verify your `CLOUDFLARE_API_TOKEN` in GitHub secrets
2. Ensure the token has Workers Scripts Edit permission
3. If auto-detection fails, manually add `CLOUDFLARE_ACCOUNT_ID` to GitHub secrets

### "Failed to delete worker" error

**Possible causes**:
- Worker was already deleted manually
- Insufficient API permissions
- Network/API issues

**Solution**: These errors are logged but don't stop the cleanup process. The worker may have already been deleted or may require manual cleanup.

### No deployments are being cleaned up

**Possible causes**:
- All PRs are still open (expected behavior)
- CLOUDFLARE_ACCOUNT_ID not configured
- Pattern mismatch

**Solution**:
1. Check workflow logs for details
2. The script will auto-detect CLOUDFLARE_ACCOUNT_ID from your API token
3. Confirm worker names match the expected pattern

## Maintenance

### Updating the Worker Pattern

If you rename your workers or use a different pattern:

1. Update `PR_WORKER_PREFIX` and `PR_WORKER_PATTERN` in `cleanup-stale-deployments.cjs`
2. Test locally to verify the pattern matches correctly
3. Commit and deploy the changes

### Changing Schedule

To change when the cleanup runs:

1. Edit `.github/workflows/cleanup-stale-deployments.yml`
2. Modify the cron schedule (currently `'0 0 * * *'` for daily at midnight UTC)
3. See [crontab.guru](https://crontab.guru/) for help with cron syntax

## Contributing

When making changes to the cleanup script:

1. Test locally with the test script
2. Verify YAML syntax: `python3 -c "import yaml; yaml.safe_load(open('.github/workflows/cleanup-stale-deployments.yml'))"`
3. Run the script with various inputs to verify error handling
4. Update this README if behavior changes

## License

This script is part of the portfolio project and follows the same license.
