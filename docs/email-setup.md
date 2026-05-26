# 📧 Email Setup Guide for Cloudflare Workers

Currently, your contact form is working but emails are not being sent. Here are the options to enable email functionality:

## Option 1: MailChannels (Recommended for Cloudflare Workers)

### Step 1: Set up MailChannels DNS
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Select your domain (`aswincloud.com`)
3. Go to **DNS** settings
4. Add these DNS records:

```
Type: TXT
Name: _mailchannels
Content: v=mc1

Type: CNAME  
Name: mailchannels
Content: mailchannels.net
```

### Step 2: Update Worker Code
Replace the `sendEmail` function in `worker.js` with:

```javascript
async function sendEmail(to, subject, html, text) {
  const response = await fetch('https://api.mailchannels.net/tx/v1/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [{ email: to }],
        },
      ],
      from: {
        email: 'noreply@aswincloud.com',
        name: 'Aswin Portfolio',
      },
      subject,
      content: [
        {
          type: 'text/html',
          value: html,
        },
        {
          type: 'text/plain',
          value: text,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to send email: ${response.status} - ${errorText}`);
  }
}
```

## Option 2: Use a Third-Party Email Service

### Resend.com (Simple Setup)
1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Update the `sendEmail` function:

```javascript
async function sendEmail(to, subject, html, text) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Portfolio <noreply@aswincloud.com>',
      to: [to],
      subject: subject,
      html: html,
      text: text,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to send email: ${response.status}`);
  }
}
```

4. Add `RESEND_API_KEY` to your Cloudflare Worker secrets:
   ```bash
   wrangler secret put RESEND_API_KEY
   ```

### SendGrid (Alternative)
1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Get your API key
3. Update the `sendEmail` function:

```javascript
async function sendEmail(to, subject, html, text) {
  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.SENDGRID_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [{ email: to }],
        },
      ],
      from: {
        email: 'noreply@aswincloud.com',
        name: 'Aswin Portfolio',
      },
      subject: subject,
      content: [
        {
          type: 'text/html',
          value: html,
        },
        {
          type: 'text/plain',
          value: text,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to send email: ${response.status}`);
  }
}
```

4. Add `SENDGRID_API_KEY` to your Cloudflare Worker secrets:
   ```bash
   wrangler secret put SENDGRID_API_KEY
   ```

## Option 3: Use GitHub Actions for Email (Current Setup)

Since you already have GitHub Actions set up with secrets, you can:

1. **Keep the current setup** where the form shows success
2. **Set up email forwarding** from your GitHub repository to your email
3. **Use the GitHub API** to create issues for contact form submissions

## Current Status

✅ **Contact form works** - Shows success message  
✅ **Form validation** - Validates input properly  
✅ **API endpoint** - Handles form submissions  
⚠️ **Email sending** - Currently disabled (logs instead of sends)

## Testing

To test if emails are working:

1. Submit the contact form
2. Check Cloudflare Worker logs in the dashboard
3. Look for the "Email would be sent" log message
4. Verify the email details are correct

## Next Steps

1. Choose an email service (MailChannels, Resend, or SendGrid)
2. Follow the setup instructions above
3. Update the `sendEmail` function
4. Test the contact form
5. Monitor email delivery

## Troubleshooting

### Common Issues:
- **DNS not propagated** - Wait 24-48 hours for DNS changes
- **API key issues** - Double-check API keys and permissions
- **CORS errors** - Ensure proper CORS headers in worker
- **Rate limiting** - Check email service limits

### Debug Mode:
Add console.log statements to see what's happening:

```javascript
console.log('Attempting to send email to:', to);
console.log('Email subject:', subject);
```

The contact form will continue to work and show success messages while you set up the email functionality. 