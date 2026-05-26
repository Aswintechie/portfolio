# Contact Form Setup

The contact form uses a simple Express server to send emails via Nodemailer.

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure email settings:**
   Create a `.env` file in the root directory with:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   PORT=3001
   ```

3. **For Gmail users:**
   - Enable 2-factor authentication
   - Generate an "App Password" (not your regular password)
   - Use the app password in EMAIL_PASS

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   This will start both the frontend (Vite) and backend (Express) servers.

## How it works

- Frontend sends form data to `http://localhost:3001/api/contact` (dev) or `/api/contact` (prod)
- Backend validates the data and sends an email to `contact@aswincloud.com`
- Form shows success/error messages based on the response

## Production Deployment

For production, you'll need to:
1. Deploy the Express server (server.js) to your hosting platform
2. Set up environment variables on your hosting platform
3. Update the frontend API URL to point to your deployed server 