# Portfolio Backend - Gmail SMTP Contact Form

A secure Express.js backend API for handling contact form submissions through Gmail SMTP with professional email templates and automatic replies.

## 🚀 Features

- **Gmail SMTP Integration** - Secure email sending using Gmail
- **Auto-Reply System** - Professional automated responses to visitors
- **Security Features** - Rate limiting, input validation, CORS protection
- **Beautiful Email Templates** - HTML and plain text email formats
- **Error Handling** - Comprehensive error handling and logging
- **Production Ready** - Environment-based configuration

## 📦 Installation

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Gmail Setup (IMPORTANT)

You need to set up Gmail App Passwords for SMTP authentication:

#### Step 1: Enable 2-Factor Authentication
1. Go to your [Google Account settings](https://myaccount.google.com/)
2. Navigate to **Security** → **2-Step Verification**
3. Enable 2-factor authentication if not already enabled

#### Step 2: Create App Password
1. Go to **Security** → **2-Step Verification** → **App passwords**
2. Select **Mail** and your device
3. Generate a 16-character app password
4. **Save this password** - you'll need it for the configuration

### 3. Environment Configuration
```bash
# Copy the template file
cp env.template .env

# Edit the .env file with your details
nano .env
```

Fill in your Gmail credentials in the `.env` file:
```env
# Gmail SMTP Configuration
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-char-app-password

# Server Configuration
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## 🔧 Usage

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

The server will start on `http://localhost:3001`

## 📡 API Endpoints

### Health Check
```
GET /api/health
```
Returns server status and configuration info.

### Contact Form
```
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com", 
  "message": "Hello, I'd like to discuss a project..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully! Thank you for contacting me."
}
```

## 🔒 Security Features

### Rate Limiting
- **5 requests per 15 minutes** per IP address
- Prevents spam and abuse

### Input Validation
- **Name**: 2-100 characters, letters and spaces only
- **Email**: Valid email format, normalized
- **Message**: 10-1000 characters, trimmed

### CORS Protection
- Restricted to frontend URL only
- Configurable for different environments

### Security Headers
- Helmet.js for security headers
- Protection against common vulnerabilities

## 📧 Email Features

### Notification Email (to you)
- **Subject**: "New Portfolio Contact from [Name]"
- **Beautiful HTML template** with contact details
- **Direct reply button** for easy response
- **Professional formatting** with your branding

### Auto-Reply Email (to visitor)
- **Professional thank you message**
- **Response time expectation** (24-48 hours)
- **Social media links** (GitHub, LinkedIn)
- **Branded template** with your information

## 🛠️ Customization

### Email Templates
Edit the HTML templates in `server.js`:
- **Notification email** - Lines ~90-130
- **Auto-reply email** - Lines ~140-200

### Rate Limiting
Adjust in `server.js`:
```javascript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // requests per window
});
```

### Validation Rules
Modify validation in `server.js`:
```javascript
const contactValidation = [
  body('name').isLength({ min: 2, max: 100 }),
  // Add custom validation rules
];
```

## 🚀 Deployment

### Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Deploy: `vercel --prod`
3. Set environment variables in Vercel dashboard

### Railway
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

### Traditional Hosting
1. Upload files to your server
2. Install Node.js and dependencies
3. Configure environment variables
4. Start with PM2: `pm2 start server.js`

## 🐛 Troubleshooting

### Common Issues

**1. Gmail Authentication Failed**
```
Error: Invalid login
```
**Solution**: 
- Ensure 2FA is enabled on Gmail
- Use App Password, not regular password
- Check GMAIL_USER and GMAIL_APP_PASSWORD in .env

**2. CORS Error**
```
Access to fetch blocked by CORS policy
```
**Solution**: 
- Update FRONTEND_URL in .env to match your frontend URL
- For production, set the correct domain

**3. Rate Limiting Issues**
```
Too many contact form submissions
```
**Solution**: 
- Adjust rate limiting settings
- Consider IP whitelisting for testing

### Debug Mode
Set `NODE_ENV=development` to see detailed error messages.

## 📝 Frontend Integration

Update your React contact form to use the API:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const response = await fetch('http://localhost:3001/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Show success message
    }
  } catch (error) {
    // Handle error
  }
};
```

## 📊 Monitoring

### Logs
- All contact submissions are logged with timestamps
- Errors are logged with details
- Check server console for activity

### Email Delivery
- Gmail provides delivery reports
- Check your Gmail Sent folder
- Monitor bounce rates

## 🔧 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `GMAIL_USER` | Your Gmail address | ✅ | - |
| `GMAIL_APP_PASSWORD` | Gmail App Password | ✅ | - |
| `PORT` | Server port | ❌ | 3001 |
| `NODE_ENV` | Environment | ❌ | development |
| `FRONTEND_URL` | Frontend URL for CORS | ❌ | http://localhost:3000 |

## 📄 License

MIT License - feel free to use this for your own projects!

---

**Need help?** Contact [contact@aswinlocal.in](mailto:contact@aswinlocal.in) 