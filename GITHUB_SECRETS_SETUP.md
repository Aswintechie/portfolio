# GitHub Secrets Setup Guide

This guide explains how to set up GitHub repository secrets for automated deployment to Cloudflare Workers.

## Required Secrets

You need to add the following secrets to your GitHub repository:

### 1. Go to Repository Settings
- Navigate to your repository on GitHub
- Click on **Settings** tab
- In the left sidebar, click **Secrets and variables** → **Actions**

### 2. Add the Following Secrets

#### `CLOUDFLARE_API_TOKEN`
- **Description**: Your Cloudflare API token for deployment
- **How to get it**:
  1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens)
  2. Click **Create Token**
  3. Use **Custom token** template
  4. Set permissions:
     - **Zone**: Include → All zones
     - **Account**: Workers Scripts → Edit
     - **Account**: Workers Routes → Edit
  5. Set **Zone Resources** to **Include → All zones**
  6. Click **Continue to summary** and **Create Token**
  7. Copy the token and add it to GitHub secrets

#### `TELEGRAM_BOT_TOKEN`
- **Description**: Your Telegram bot token
- **How to get it**:
  1. Message [@BotFather](https://t.me/botfather) on Telegram
  2. Create a new bot or get token for existing bot
  3. Copy the token (format: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)
  4. Add it to GitHub secrets

#### `TELEGRAM_ADMIN_CHAT_ID`
- **Description**: Your Telegram chat ID for receiving messages
- **How to get it**:
  1. Message your bot on Telegram
  2. Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
  3. Look for `"chat":{"id":123456789}` in the response
  4. Copy the ID number and add it to GitHub secrets

#### `RESEND_API_KEY`
- **Description**: Your Resend API key for sending emails
- **How to get it**:
  1. Go to [Resend Dashboard](https://resend.com/api-keys)
  2. Create a new API key
  3. Copy the key and add it to GitHub secrets

#### `CONTACT_EMAIL`
- **Description**: Your email address for receiving contact form messages
- **Format**: `your-email@domain.com`

#### `FROM_EMAIL`
- **Description**: Email address to send from (optional, defaults to noreply@aswinlocal.in)
- **Format**: `noreply@yourdomain.com`

## How It Works

### Preview Deployments (PRs)
- When a PR is opened, the workflow creates a preview worker
- Secrets are automatically set for the preview environment
- Preview URL: `https://aswin-portfolio-pr-{PR_NUMBER}.aswin8681879422.workers.dev`
- Preview is automatically deleted when PR is closed

### Production Deployments (Main Branch)
- When code is pushed to main branch, the workflow deploys to production
- Secrets are automatically set for the production environment
- Production URL: `https://www.aswinlocal.in/`

## Security Notes

- ✅ Secrets are encrypted and never exposed in logs
- ✅ Each environment gets its own set of secrets
- ✅ Secrets are automatically cleaned up with preview deployments
- ✅ No secrets are stored in your code repository

## Troubleshooting

### Secret Not Found Error
If you see "⚠️ [SECRET_NAME] not found in GitHub secrets":
1. Check that the secret is added to your repository
2. Verify the secret name matches exactly (case-sensitive)
3. Ensure the secret has a value (not empty)

### Deployment Fails
If deployment fails after secrets are set:
1. Check Cloudflare API token permissions
2. Verify Telegram bot token is valid
3. Verify Resend API key is valid
4. Check Cloudflare Workers logs for errors

## Testing Secrets

You can test if your secrets are working by:
1. Creating a test PR
2. Checking the deployment logs for secret setup messages
3. Testing the live chat functionality on the preview URL
4. Sending a test message to verify Telegram integration

## Updating Secrets

To update a secret:
1. Go to repository Settings → Secrets and variables → Actions
2. Click the **Update** button next to the secret
3. Enter the new value
4. Save the changes
5. The next deployment will use the updated secret 