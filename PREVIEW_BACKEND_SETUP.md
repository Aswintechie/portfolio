# Preview Backend Setup for Live Chat

This guide will help you deploy a backend server for live chat functionality in preview deployments.

## Quick Setup Options

### Option 1: Railway (Recommended - Free)

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Deploy Backend**
   - Create new project
   - Connect your GitHub repository
   - Add the following files to your repo:
     - `preview-backend.js`
     - `preview-backend-package.json` (rename to `package.json` in a subfolder)

3. **Get Your URL**
   - Railway will provide a URL like: `https://your-app-name.railway.app`
   - Copy this URL

4. **Update Frontend**
   - Replace `https://your-preview-backend-url.railway.app` in `src/components/LiveChatWidget.jsx` with your actual Railway URL

### Option 2: Render (Free Tier)

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Deploy Backend**
   - Create new Web Service
   - Connect your GitHub repository
   - Set build command: `npm install`
   - Set start command: `npm start`
   - Add the backend files as above

3. **Get Your URL**
   - Render will provide a URL like: `https://your-app-name.onrender.com`

### Option 3: Vercel (Free Tier)

1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Deploy Backend**
   - Import your GitHub repository
   - Vercel will auto-detect and deploy

## File Structure

```
your-repo/
├── preview-backend/
│   ├── package.json (rename from preview-backend-package.json)
│   └── preview-backend.js
├── src/
│   └── components/
│       └── LiveChatWidget.jsx (updated with backend URL)
└── ... (other files)
```

## Environment Variables

No environment variables needed for basic functionality. The preview backend is simplified and doesn't include Telegram integration.

## Testing

1. Deploy the backend to your chosen platform
2. Update the URL in `LiveChatWidget.jsx`
3. Deploy your frontend
4. Test the live chat in your preview deployment

## Features

- ✅ Real-time messaging
- ✅ User info collection
- ✅ Connection status indicators
- ✅ Admin/visitor role management
- ❌ No Telegram integration (preview only)
- ❌ No persistent storage (in-memory only)

## Production vs Preview

- **Production**: Uses full backend with Telegram integration
- **Preview**: Uses simplified backend without Telegram 