// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// HTML email template
function createEmailHTML(name, email, message) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      <h2 style="color: #2563eb; text-align: center; margin-bottom: 30px;">
        📧 New Portfolio Contact Form Submission
      </h2>
      
      <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h3 style="color: #374151; margin-top: 0;">Contact Details:</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #2563eb;">${email}</a></p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
      </div>
      
      <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h3 style="color: #374151; margin-top: 0;">Message:</h3>
        <p style="line-height: 1.6; color: #4b5563;">${message.replace(/\n/g, '<br>')}</p>
      </div>
      
      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 14px;">
          This email was sent from your portfolio contact form.
        </p>
        <a href="mailto:${email}?subject=Re: Your portfolio inquiry" 
           style="display: inline-block; background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 10px;">
          Reply to ${name}
        </a>
      </div>
    </div>
  `;
}

// Auto-reply email template
function createAutoReplyHTML(name, message) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      <h2 style="color: #2563eb; text-align: center; margin-bottom: 30px;">
        🙏 Thank You for Reaching Out!
      </h2>
      
      <p style="font-size: 16px; line-height: 1.6; color: #374151;">Hi ${name},</p>
      
      <p style="font-size: 16px; line-height: 1.6; color: #374151;">
        Thank you for contacting me through my portfolio website. I have received your message and will get back to you as soon as possible, usually within 24-48 hours.
      </p>
      
      <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #374151; margin-top: 0;">Your Message Summary:</h3>
        <p style="color: #6b7280; margin-bottom: 10px;"><strong>Submitted on:</strong> ${new Date().toLocaleString()}</p>
        <p style="color: #6b7280; font-style: italic;">"${message.length > 100 ? message.substring(0, 100) + '...' : message}"</p>
      </div>
      
      <p style="font-size: 16px; line-height: 1.6; color: #374151;">
        In the meantime, feel free to check out my work on:
      </p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://github.com/Aswin-coder" 
           style="display: inline-block; background-color: #374151; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 0 10px;">
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/aswin4122001/" 
           style="display: inline-block; background-color: #0077b5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 0 10px;">
          LinkedIn
        </a>
      </div>
      
      <p style="font-size: 16px; line-height: 1.6; color: #374151;">
        Best regards,<br>
        <strong>Aswin</strong><br>
        Software Engineer
      </p>
      
      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 12px;">
          This is an automated response. Please do not reply to this email directly.
        </p>
      </div>
    </div>
  `;
}

// Send email function using MailChannels
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
        email: 'noreply@aswinlocal.in',
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
    throw new Error(`Failed to send email: ${response.status}`);
  }
}

// Handle contact form submission
async function handleContactForm(request) {
  try {
    const { name, email, message } = await request.json();

    // Validate input
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ success: false, message: 'All fields are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!isValidEmail(email)) {
      return new Response(JSON.stringify({ success: false, message: 'Invalid email address' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (message.length < 10 || message.length > 1000) {
      return new Response(JSON.stringify({ success: false, message: 'Message must be between 10 and 1000 characters' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Send notification email to you
    const notificationHTML = createEmailHTML(name, email, message);
    const notificationText = `
      New Portfolio Contact Form Submission
      
      Name: ${name}
      Email: ${email}
      Date: ${new Date().toLocaleString()}
      
      Message:
      ${message}
      
      Reply to: ${email}
    `;

    // Send auto-reply to the user
    const autoReplyHTML = createAutoReplyHTML(name, message);
    const autoReplyText = `
      Hi ${name},
      
      Thank you for contacting me through my portfolio website. I have received your message and will get back to you as soon as possible, usually within 24-48 hours.
      
      Your message was submitted on: ${new Date().toLocaleString()}
      
      In the meantime, feel free to check out my work on GitHub (https://github.com/Aswin-coder) or connect with me on LinkedIn (https://www.linkedin.com/in/aswin4122001/).
      
      Best regards,
      Aswin
      Software Engineer
      
      ---
      This is an automated response. Please do not reply to this email directly.
    `;

    // Send both emails
    await Promise.all([
      sendEmail('contact@aswinlocal.in', `New Portfolio Contact from ${name}`, notificationHTML, notificationText),
      sendEmail(email, 'Thank you for contacting me!', autoReplyHTML, autoReplyText),
    ]);

    return new Response(JSON.stringify({ success: true, message: 'Message sent successfully! Thank you for contacting me.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error handling contact form:', error);
    return new Response(JSON.stringify({ success: false, message: 'Failed to send message. Please try again later.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// Simple HTML page for temporary use
const SIMPLE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aswin - Portfolio Loading</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .container {
            text-align: center;
            padding: 2rem;
        }
        h1 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
        }
        p {
            font-size: 1.2rem;
            margin-bottom: 2rem;
        }
        .links {
            display: flex;
            gap: 1rem;
            justify-content: center;
        }
        .link {
            background: rgba(255,255,255,0.2);
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            text-decoration: none;
            color: white;
            border: 1px solid rgba(255,255,255,0.3);
            transition: all 0.3s ease;
        }
        .link:hover {
            background: rgba(255,255,255,0.3);
            transform: translateY(-2px);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Aswin's Portfolio</h1>
        <p>Software Engineer | Cloud Infrastructure | Electronics Hardware</p>
        <p>Portfolio is loading... Please check back in a few minutes.</p>
        <div class="links">
            <a href="https://github.com/Aswin-coder" class="link">GitHub</a>
            <a href="https://www.linkedin.com/in/aswin4122001/" class="link">LinkedIn</a>
            <a href="https://pr-reviewer.aswinlocal.in" class="link">PR Reviewer</a>
        </div>
    </div>
</body>
</html>`;

// Main worker event handler
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Handle API routes
    if (url.pathname === '/api/contact' && request.method === 'POST') {
      const response = await handleContactForm(request);
      response.headers.set('Access-Control-Allow-Origin', '*');
      response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
      return response;
    }

    if (url.pathname === '/api/health' && request.method === 'GET') {
      return new Response(JSON.stringify({
        status: 'OK',
        message: 'Portfolio backend is running on Cloudflare Workers',
        timestamp: new Date().toISOString()
      }), {
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
      });
    }

    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    // Serve a simple HTML page for now
    return new Response(SIMPLE_HTML, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'public, max-age=60',
      },
    });
  },
}; 