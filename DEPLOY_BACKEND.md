# Deploy Your Portfolio Backend with Telegram Integration

This guide will help you deploy your existing backend (from `server/` folder) to make live chat work in preview deployments.

## Quick Deployment Options

### Option 1: Railway (Recommended - Free)

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Deploy Your Backend**
   - Create new project
   - Connect your GitHub repository
   - Set the root directory to `server/`
   - Railway will auto-detect it's a Node.js app

3. **Add Environment Variables**
   - Go to your Railway project settings
   - Add these environment variables:
     ```
     TELEGRAM_BOT_TOKEN=8117357702:AAGJkJEPhgsM0rBdT9UDuZZ5ugiA02g_dyE
     TELEGRAM_ADMIN_CHAT_ID=1385954194
     NODE_ENV=production
     FRONTEND_URL=https://aswin-portfolio-pr-15.aswin8681879422.workers.dev
     ```

4. **Get Your URL**
   - Railway will provide a URL like: `https://your-app-name.railway.app`
   - Copy this URL

5. **Update Frontend**
   - Replace `https://aswin-portfolio-backend.railway.app` in `src/components/LiveChatWidget.jsx` with your actual Railway URL

### Option 2: Render (Free Tier)

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Deploy Backend**
   - Create new Web Service
   - Connect your GitHub repository
   - Set root directory to `server/`
   - Set build command: `npm install`
   - Set start command: `npm start`

3. **Add Environment Variables**
   - Same as Railway above

4. **Get Your URL**
   - Render will provide a URL like: `https://your-app-name.onrender.com`

## File Structure

Your backend is already complete in the `server/` folder:
```
server/
├── package.json (with all dependencies)
├── server.js (main backend with Telegram integration)
├── .env (your Telegram credentials)
├── telegram-*.js (Telegram integration files)
└── ... (other backend files)
```

## Environment Variables Needed

```env
TELEGRAM_BOT_TOKEN=8117357702:AAGJkJEPhgsM0rBdT9UDuZZ5ugiA02g_dyE
TELEGRAM_ADMIN_CHAT_ID=1385954194
NODE_ENV=production
FRONTEND_URL=https://aswin-portfolio-pr-15.aswin8681879422.workers.dev
```

## Testing

1. Deploy the backend to Railway/Render
2. Update the URL in `LiveChatWidget.jsx`
3. Deploy your frontend
4. Test the live chat in your preview deployment
5. Check your Telegram for messages!

## Features You'll Get

- ✅ Real-time messaging
- ✅ Telegram integration (same as local)
- ✅ User info collection
- ✅ Admin chat interface
- ✅ Connection status indicators
- ✅ All the features that work locally

## Troubleshooting

- **Connection errors**: Check the backend URL in `LiveChatWidget.jsx`
- **Telegram not working**: Verify environment variables in Railway/Render
- **CORS errors**: The backend is already configured for preview domains

## Next Steps

1. Deploy to Railway (5 minutes)
2. Update the URL in the frontend
3. Test in your preview deployment
4. Enjoy working live chat with Telegram! 🎉 