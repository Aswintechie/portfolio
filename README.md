# Aswin's Portfolio

A modern, responsive portfolio website built with React, Vite, and Tailwind CSS. Deployed on Cloudflare Workers with automated email functionality.

## 🚀 Features

- **Modern React Architecture**: Built with React 18, Vite, and Tailwind CSS
- **Responsive Design**: Optimized for all devices and screen sizes
- **Smooth Animations**: Powered by Framer Motion
- **Contact Form**: Working contact form with email notifications
- **Professional Email**: Auto-replies and notification system
- **SEO Optimized**: Sitemap, robots.txt, and structured data
- **Security Headers**: Content Security Policy and security headers
- **Privacy Policy**: Comprehensive privacy policy page
- **Fast Loading**: Deployed on Cloudflare Workers edge network
- **Custom Domain**: Live at [www.aswinlocal.in](https://www.aswinlocal.in)

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion
- **Backend**: Cloudflare Workers, MailChannels
- **Deployment**: Cloudflare Workers with Workers Assets
- **Version Control**: Git + GitHub
- **CI/CD**: GitHub Actions for automated deployment

## 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Aswintechie/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## 🚀 Automated Deployment Setup

The portfolio uses GitHub Actions for automated deployment to Cloudflare Workers. Here's how to set it up:

### Step 1: Get Cloudflare API Token

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens)
2. Click "Create Token"
3. Use the "Edit Cloudflare Workers" template
4. Configure:
   - **Permissions**: Zone:Zone Settings:Read, Zone:Zone:Read, User:User Details:Read
   - **Account resources**: Include - All accounts
   - **Zone resources**: Include - All zones
5. Click "Continue to summary" → "Create Token"
6. **Copy the token** (you won't see it again!)

### Step 2: Add GitHub Secret

1. Go to your GitHub repository: `https://github.com/Aswintechie/portfolio`
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `CLOUDFLARE_API_TOKEN`
5. Value: Paste your API token from Step 1
6. Click **Add secret**

### Step 3: Enable Actions (if needed)

1. Go to **Actions** tab in your repository
2. If prompted, click **"I understand my workflows, go ahead and enable them"**

### Step 4: Test Deployment

Push any change to the main branch and watch the magic happen! 🎉

```bash
git add .
git commit -m "Enable automated deployment"
git push origin main
```

## 🔧 Manual Deployment

If you prefer manual deployment:

```bash
# Build the project
npm run build

# Remove problematic _redirects file
rm -f dist/_redirects

# Deploy to Cloudflare Workers
wrangler deploy --compatibility-date=2024-01-01
```

## 📧 Email Configuration

The contact form uses MailChannels for sending emails:

- **Notifications**: Sent to `contact@aswinlocal.in`
- **Auto-replies**: Sent to form submitters
- **No SMTP setup required**: Uses Resend API

## 🌐 Live Website

Visit the live portfolio: **[www.aswinlocal.in](https://www.aswinlocal.in)**

## 📱 Contact

- **Email**: contact@aswinlocal.in
- **GitHub**: [github.com/Aswin-coder](https://github.com/Aswin-coder)
- **LinkedIn**: [linkedin.com/in/aswin4122001](https://www.linkedin.com/in/aswin4122001/)

## 🎯 Project Highlights

- **PR Reviewer**: ML-trained app for PR approval predictions - [pr-reviewer.aswinlocal.in](https://pr-reviewer.aswinlocal.in)
- **Portfolio**: Modern React-based portfolio with Cloudflare Workers backend
- **Cloud Infrastructure**: Expertise in deployment strategies and network management

---

Built with ❤️ by [Aswin](https://github.com/Aswin-coder) | Software Engineer at MulticoreWare 