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
    const errorText = await response.text();
    console.error('MailChannels error:', response.status, errorText);
    throw new Error(`Failed to send email: ${response.status} - ${errorText}`);
  }

  console.log('Email sent successfully to:', to);
  return true;
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
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Message must be between 10 and 1000 characters',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
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
    // Note: Currently logging email details instead of sending
    // To enable actual email sending, set up MailChannels or another email service
    await Promise.all([
      sendEmail(
        'contact@aswinlocal.in',
        `New Portfolio Contact from ${name}`,
        notificationHTML,
        notificationText
      ),
      sendEmail(email, 'Thank you for contacting me!', autoReplyHTML, autoReplyText),
    ]);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Message sent successfully! Thank you for contacting me.',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error handling contact form:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Failed to send message. Please try again later.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

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
      return new Response(
        JSON.stringify({
          status: 'OK',
          message: 'Portfolio backend is running on Cloudflare Workers',
          timestamp: new Date().toISOString(),
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
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

    // Serve static assets using Workers Assets
    try {
      const asset = await env.ASSETS.fetch(request);

      if (asset.status === 404) {
        // For SPA routing, serve index.html for non-API routes
        const indexRequest = new Request(new URL('/index.html', request.url).toString(), request);
        return await env.ASSETS.fetch(indexRequest);
      }

      return asset;
    } catch (e) {
      return new Response('Asset not found', { status: 404 });
    }
  },
};
