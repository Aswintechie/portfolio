# 📧 Gmail SMTP Setup Guide

Follow these steps to enable Gmail SMTP for your portfolio contact form.

## 🔐 Step 1: Enable 2-Factor Authentication

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Click on **Security** in the left sidebar
3. Under "Signing in to Google", click **2-Step Verification**
4. Follow the setup process if not already enabled

## 🔑 Step 2: Generate App Password

1. In **Security** settings, scroll to **2-Step Verification**
2. Click on **App passwords** (you may need to sign in again)
3. Select app: **Mail**
4. Select device: **Other (custom name)**
5. Enter name: **Portfolio Contact Form**
6. Click **Generate**
7. **Copy the 16-character password** (save this securely!)

## ⚙️ Step 3: Configure Environment

1. Navigate to the `server` folder:
   ```bash
   cd server
   ```

2. Copy the environment template:
   ```bash
   cp env.template .env
   ```

3. Edit the `.env` file:
   ```bash
   nano .env
   ```

4. Fill in your details:
   ```env
   # Replace with your actual Gmail address
   GMAIL_USER=youremail@gmail.com
   
   # Replace with the 16-character App Password from Step 2
   GMAIL_APP_PASSWORD=abcd efgh ijkl mnop
   
   # Server settings (you can keep these as default)
   PORT=3001
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

## ✅ Step 4: Test the Setup

1. Start the backend server:
   ```bash
   npm run dev
   ```

2. Check the health endpoint:
   ```bash
   curl http://localhost:3001/api/health
   ```

3. Test the contact form on your portfolio website

## 🔧 Troubleshooting

### "Invalid login" Error
- ✅ Ensure 2FA is enabled on your Google Account
- ✅ Use the 16-character App Password, not your regular Gmail password
- ✅ Double-check the GMAIL_USER email address is correct

### "Access to fetch blocked by CORS"
- ✅ Make sure FRONTEND_URL in .env matches your React app URL
- ✅ Restart the backend server after changing .env

### No emails received
- ✅ Check your Gmail Sent folder
- ✅ Check spam/junk folders
- ✅ Verify the GMAIL_USER email address

## 🎯 Quick Test

Send a test email using this curl command:
```bash
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message from the setup guide."
  }'
```

You should receive:
1. ✅ A notification email in your Gmail inbox
2. ✅ A success response from the API
3. ✅ Server logs showing the email was sent

## 🚀 Production Notes

For production deployment:
- Update `FRONTEND_URL` to your live domain
- Set `NODE_ENV=production`
- Keep your App Password secure and never commit it to version control

---

**Need help?** Check the [server/README.md](server/README.md) for more detailed information. 