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

// Send email function using Resend API
//
// REQUIREMENTS:
// 1. Resend API key configured as environment variable
// 2. Domain verification in Resend dashboard (completed)
// 3. Proper error handling and logging
//
async function sendEmail(to, subject, html, text, hostname = 'aswinlocal.in', env) {
  console.log('🚀 Starting email send process:', {
    to,
    subject,
    hostname,
    timestamp: new Date().toISOString(),
  });

  // Validate email format
  if (!isValidEmail(to)) {
    console.error('❌ Invalid email address:', to);
    throw new Error('Invalid email address');
  }

  console.log('✅ Email validation passed');

  // Check if we're in a preview environment
  if (hostname.includes('workers.dev')) {
    console.log('📧 Preview deployment - email would be sent:', {
      to,
      subject,
      from: 'contact@aswinlocal.in',
      hostname,
      timestamp: new Date().toISOString(),
    });
    return true;
  }

  console.log('🌐 Production environment detected, proceeding with Resend');

  try {
    console.log('📤 Preparing Resend API request...');

    // Prepare the email payload
    const emailPayload = {
      personalizations: [
        {
          to: [{ email: to }],
        },
      ],
      from: {
        email: 'contact@aswinlocal.in',
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
    };

    console.log('📋 Resend email payload prepared:', {
      to: emailPayload.personalizations[0].to[0].email,
      from: emailPayload.from.email,
      subject: emailPayload.subject,
      htmlLength: emailPayload.content[0].value.length,
      textLength: emailPayload.content[1].value.length,
    });

    // Send email via MailChannels API
    console.log('🌐 Making request to MailChannels API...');

    // Send email via Resend API
    console.log('🌐 Making request to Resend API...');

    // Resend API payload
    const resendPayload = {
      from: 'contact@aswinlocal.in', // Now using your verified domain
      to: [to],
      subject: subject,
      html: html,
      text: text,
    };

    console.log('📧 Resend payload:', JSON.stringify(resendPayload, null, 2));

    // You'll need to add your Resend API key as a secret
    const RESEND_API_KEY = env.RESEND_API_KEY || 're_placeholder_key';

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify(resendPayload),
    });

    console.log('📡 Resend API response received:', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Resend API error details:', {
        status: response.status,
        statusText: response.statusText,
        errorText: errorText,
        headers: Object.fromEntries(response.headers.entries()),
        url: 'https://api.resend.com/emails',
        method: 'POST',
      });

      // Log the full error text separately for better visibility
      console.error('📄 Full error response:', errorText);

      throw new Error(`Resend error: ${response.status} - ${errorText}`);
    }

    const responseData = await response.json();
    console.log('📨 Resend API response body:', responseData);

    console.log('✅ Email sent successfully via Resend:', {
      to,
      subject,
      id: responseData.id,
      timestamp: new Date().toISOString(),
    });

    return true;
  } catch (error) {
    console.error('❌ Failed to send email via Resend:', {
      error: error.message,
      stack: error.stack,
      to,
      subject,
      timestamp: new Date().toISOString(),
    });

    // Log the full error message separately
    console.error('📄 Full error message:', error.message);
    if (error.stack) {
      console.error('📄 Full error stack:', error.stack);
    }

    throw error;
  }
}

// Handle contact form submission
async function handleContactForm(request, env) {
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

    // Send both emails via Resend
    console.log('📨 Processing contact form submission:', {
      name,
      email,
      messageLength: message.length,
      hostname: request.headers.get('host') || 'aswinlocal.in',
      userAgent: request.headers.get('user-agent'),
      timestamp: new Date().toISOString(),
    });

    console.log('📧 Preparing to send notification email to:', 'contact@aswinlocal.in');
    console.log('📧 Preparing to send auto-reply email to:', email);

    try {
      console.log('🚀 Starting email sending process...');

      const [notificationResult, autoReplyResult] = await Promise.all([
        sendEmail(
          'contact@aswinlocal.in',
          `New Portfolio Contact from ${name}`,
          notificationHTML,
          notificationText,
          request.headers.get('host') || 'aswinlocal.in',
          env
        ),
        sendEmail(
          email,
          'Thank you for contacting me!',
          autoReplyHTML,
          autoReplyText,
          request.headers.get('host') || 'aswinlocal.in',
          env
        ),
      ]);

      console.log('✅ Both emails sent successfully:', {
        notificationResult,
        autoReplyResult,
        timestamp: new Date().toISOString(),
      });
    } catch (emailError) {
      console.error('❌ Email processing failed:', {
        error: emailError.message,
        stack: emailError.stack,
        name,
        email,
        timestamp: new Date().toISOString(),
      });
      // Continue with success response even if email fails
    }

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

// In-memory chat storage (for demo purposes - in production you'd use Durable Objects)
let chatSessions = new Map();
let adminSocket = null;

// Cloudflare Workers globals
/* global WebSocketPair */

// WebSocket message handler
function handleWebSocketMessage(socket, message, env) {
  try {
    const data = JSON.parse(message);

    switch (data.type) {
      case 'register':
        if (data.role === 'admin') {
          adminSocket = socket;
          socket.send(JSON.stringify({ type: 'system', message: 'Admin connected' }));
        } else {
          const visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          chatSessions.set(socket.id, { id: visitorId, role: 'visitor' });
          socket.send(
            JSON.stringify({ type: 'system', message: 'You are connected as a visitor' })
          );
          socket.send(JSON.stringify({ type: 'visitor_id', id: visitorId }));
        }
        break;

      case 'user_info': {
        const session = chatSessions.get(socket.id);
        if (session && session.role === 'visitor') {
          session.userInfo = data.userInfo;
          if (adminSocket) {
            adminSocket.send(
              JSON.stringify({
                type: 'user_info',
                visitorId: session.id,
                userInfo: data.userInfo,
              })
            );
          }
        }
        break;
      }

      case 'chat_message': {
        const visitorSession = chatSessions.get(socket.id);
        if (visitorSession && visitorSession.role === 'visitor') {
          // Send to admin if connected
          if (adminSocket) {
            adminSocket.send(
              JSON.stringify({
                type: 'chat_message',
                message: data.message,
                visitorId: visitorSession.id,
              })
            );
          }

          // Send to Telegram if configured
          if (env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_ADMIN_CHAT_ID) {
            sendTelegramMessage(data.message, visitorSession, env);
          }
        } else {
          // Admin message - broadcast to all visitors
          chatSessions.forEach((session, socketId) => {
            if (session.role === 'visitor') {
              // In a real implementation, you'd send to the visitor socket
              // For now, we'll just log it
              console.log('Admin message to visitor:', data.message);
            }
          });
        }
        break;
      }
    }
  } catch (error) {
    console.error('WebSocket message error:', error);
  }
}

// Send Telegram message
async function sendTelegramMessage(message, session, env) {
  try {
    const telegramMsg = `💬 New message from visitor (${session.id}):\n\n${message}`;

    const response = await fetch(
      `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: env.TELEGRAM_ADMIN_CHAT_ID,
          text: telegramMsg,
          parse_mode: 'HTML',
        }),
      }
    );

    if (!response.ok) {
      console.error('Telegram API error:', await response.text());
    }
  } catch (error) {
    console.error('Telegram send error:', error);
  }
}

// Main worker event handler
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Handle WebSocket upgrade for live chat
    const upgradeHeader = request.headers.get('Upgrade');
    const secWebSocketKey = request.headers.get('Sec-WebSocket-Key');

    // Handle WebSocket upgrade for live chat
    if (upgradeHeader && upgradeHeader.toLowerCase() === 'websocket' && url.pathname === '/ws') {
      if (!secWebSocketKey) {
        console.log('❌ WebSocket request missing Sec-WebSocket-Key');
        return new Response('Expected websocket', { status: 400 });
      }

      try {
        const webSocketPair = new WebSocketPair();
        const [client, server] = Object.values(webSocketPair);

        server.accept();

        // Send immediate welcome message
        server.send(JSON.stringify({ type: 'system', message: 'Connected to chat server' }));

        server.addEventListener('message', event => {
          handleWebSocketMessage(server, event.data, env);
        });

        server.addEventListener('close', () => {
          // Clean up session
          if (server === adminSocket) {
            adminSocket = null;
          }
          chatSessions.delete(server.id);
        });

        server.addEventListener('error', error => {
          console.error('WebSocket error:', error);
        });

        return new Response(null, {
          status: 101,
          webSocket: client,
        });
      } catch (error) {
        console.error('❌ Error creating WebSocket:', error);
        return new Response('WebSocket creation failed', { status: 500 });
      }
    }

    // Handle API routes
    if (url.pathname === '/api/contact' && request.method === 'POST') {
      const response = await handleContactForm(request, env);
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

    // Admin chat interface
    if (url.pathname === '/admin-chat' && request.method === 'GET') {
      const adminHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Live Chat Admin</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f5f5; }
        .container { max-width: 800px; margin: 20px auto; background: white; border-radius: 12px; box-shadow: 0 4px 24px rgba(0,0,0,0.1); overflow: hidden; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; }
        .header h1 { font-size: 24px; margin-bottom: 8px; }
        .status { font-size: 14px; opacity: 0.9; }
        .chat-area { height: 400px; overflow-y: auto; padding: 20px; background: #f8f9fa; }
        .message { margin-bottom: 12px; padding: 12px; border-radius: 8px; max-width: 80%; }
        .visitor { background: #e3f2fd; margin-right: auto; }
        .admin { background: #f3e5f5; margin-left: auto; }
        .system { background: #fff3e0; font-style: italic; text-align: center; }
        .input-area { padding: 20px; border-top: 1px solid #eee; display: flex; gap: 12px; }
        .input-area input { flex: 1; padding: 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; }
        .input-area button { padding: 12px 24px; background: #667eea; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; }
        .input-area button:hover { background: #5a6fd8; }
        .visitor-info { background: #f0f8ff; padding: 12px; margin-bottom: 12px; border-radius: 6px; font-size: 12px; }
        .disconnected { opacity: 0.5; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Live Chat Admin Panel</h1>
            <div class="status" id="status">Connecting...</div>
        </div>
        <div class="chat-area" id="chatArea">
            <div class="message system">Welcome to the admin panel. Waiting for visitors...</div>
        </div>
        <div class="input-area">
            <input type="text" id="messageInput" placeholder="Type your message..." disabled>
            <button id="sendButton" disabled>Send</button>
        </div>
    </div>

    <script>
        let ws = null;
        let currentVisitor = null;
        let isConnected = false;

        function updateStatus(text, isConnected = false) {
            document.getElementById('status').textContent = text;
            document.getElementById('status').className = 'status ' + (isConnected ? '' : 'disconnected');
        }

        function addMessage(text, type = 'system') {
            const chatArea = document.getElementById('chatArea');
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message ' + type;
            messageDiv.textContent = text;
            chatArea.appendChild(messageDiv);
            chatArea.scrollTop = chatArea.scrollHeight;
        }

        function connect() {
            const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
            const wsUrl = protocol + '//' + window.location.host;
            
            ws = new WebSocket(wsUrl);
            
            ws.onopen = () => {
                isConnected = true;
                updateStatus('🟢 Connected as Admin', true);
                ws.send(JSON.stringify({ type: 'register', role: 'admin' }));
                addMessage('Connected to chat server');
                document.getElementById('messageInput').disabled = false;
                document.getElementById('sendButton').disabled = false;
            };
            
            ws.onclose = () => {
                isConnected = false;
                updateStatus('🔴 Disconnected');
                addMessage('Disconnected from chat server');
                document.getElementById('messageInput').disabled = true;
                document.getElementById('sendButton').disabled = true;
                
                // Reconnect after 3 seconds
                setTimeout(connect, 3000);
            };
            
            ws.onerror = (error) => {
                updateStatus('🔴 Connection Error');
                addMessage('Failed to connect to chat server');
            };
            
            ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    
                    switch (data.type) {
                        case 'system':
                            addMessage(data.message, 'system');
                            break;
                        case 'user_info':
                            currentVisitor = data.visitorId;
                            const userInfo = data.userInfo;
                            const infoText = \`Visitor \${data.visitorId} connected: \${userInfo.name || 'Anonymous'} (\${userInfo.email || 'No email'})\`;
                            addMessage(infoText, 'system');
                            break;
                        case 'chat_message':
                            currentVisitor = data.visitorId;
                            addMessage(\`Visitor \${data.visitorId}: \${data.message}\`, 'visitor');
                            break;
                    }
                } catch (error) {
                    console.error('Error parsing message:', error);
                }
            };
        }

        document.getElementById('sendButton').addEventListener('click', sendMessage);
        document.getElementById('messageInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });

        function sendMessage() {
            const input = document.getElementById('messageInput');
            const message = input.value.trim();
            
            if (!message || !isConnected) return;
            
            if (currentVisitor) {
                ws.send(JSON.stringify({ 
                    type: 'chat_message', 
                    message: message,
                    visitorId: currentVisitor 
                }));
                addMessage('You: ' + message, 'admin');
                input.value = '';
            } else {
                addMessage('No active visitor to send message to', 'system');
            }
        }

        // Connect on page load
        connect();
    </script>
</body>
</html>`;

      return new Response(adminHTML, {
        status: 200,
        headers: { 'Content-Type': 'text/html' },
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
