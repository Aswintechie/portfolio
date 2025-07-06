import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';
import { Server as IOServer } from 'socket.io';
import http from 'http';
import { sendTelegramMessage } from './telegram-curl.js';
import { setSocketIO, startPolling } from './telegram-polling.js';
import { setupWebhook } from './setup-telegram-webhook.js';

// Load environment variables from current directory
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

// Initialize Telegram Bot (if configured) - Using curl-based approach
let telegramEnabled = false;
let telegramStatus = 'Not configured';

// Initialize Telegram immediately
async function initializeTelegram() {
  if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_ADMIN_CHAT_ID) {
    telegramStatus = 'Initializing...';

    try {
      // Test the Telegram connection
      await sendTelegramMessage('🤖 Portfolio Chat Bot is starting up...');
      console.log('🤖 Telegram bot initialized successfully');
      telegramStatus = 'Connected (two-way mode)';
      telegramEnabled = true;

      // Send welcome message
      await sendTelegramMessage(
        '🤖 Portfolio Chat Bot is online!\n\n' +
          '📱 You will receive notifications when visitors send messages.\n' +
          '💬 You can reply directly in this chat to respond to visitors!\n' +
          '🔄 Two-way communication is now active.'
      );
      console.log('✅ Telegram welcome message sent');
    } catch (error) {
      console.error('❌ Telegram connection failed:', error.message);
      console.log('💡 Chat will work without Telegram integration');
      telegramEnabled = false;
      telegramStatus = 'Connection failed - disabled';
    }
  } else {
    console.log(
      '⚠️  Telegram bot not configured - add TELEGRAM_BOT_TOKEN and TELEGRAM_ADMIN_CHAT_ID to .env'
    );
  }
}

// Start Telegram initialization
initializeTelegram().then(async () => {
  const isProduction = process.env.NODE_ENV === 'production';
  const webhookUrl = process.env.WEBHOOK_URL;

  if (isProduction && webhookUrl) {
    // Production: Use webhook
    await setupWebhook();
    console.log('✅ Using Telegram webhook for production');
  } else {
    // Development: Use polling
    setSocketIO(io);
    startPolling();
    console.log('✅ Using Telegram polling for development');
  }
});

// Security middleware
app.use(helmet());

// Rate limiting - limit each IP to 5 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    error: 'Too many contact form submissions, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  })
);

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Validation rules for contact form
const contactValidation = [
  body('name')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s\-'.]+$/)
    .withMessage('Name must contain only letters, spaces, hyphens, apostrophes, and periods')
    .trim(),

  body('email').isEmail().withMessage('Please provide a valid email address').normalizeEmail(),

  body('message')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters')
    .trim(),
];

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Portfolio backend is running',
    timestamp: new Date().toISOString(),
    telegram: {
      enabled: telegramEnabled,
      status: telegramStatus,
    },
  });
});

// Test endpoint to simulate visitor message
app.post('/api/test-message', (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  if (telegramEnabled) {
    const testMsg = `🧪 Test message: ${message}`;
    sendTelegramMessage(testMsg)
      .then(() => {
        res.json({ success: true, message: 'Test message sent to Telegram' });
      })
      .catch(err => {
        res.status(500).json({ error: 'Failed to send test message', details: err.message });
      });
  } else {
    res.status(400).json({ error: 'Telegram not enabled' });
  }
});

// Telegram webhook endpoint to receive messages from Telegram
app.post('/api/telegram-webhook', express.raw({ type: 'application/json' }), (req, res) => {
  try {
    const update = JSON.parse(req.body);
    console.log('📱 Received Telegram webhook:', JSON.stringify(update, null, 2));

    // Check if this is a message update
    if (update.message && update.message.text) {
      const { message } = update;
      const text = message.text;
      const from = message.from;

      console.log(`📱 Telegram message from ${from.first_name || from.username}: ${text}`);

      // Only process messages from the admin chat
      if (message.chat.id.toString() === process.env.TELEGRAM_ADMIN_CHAT_ID) {
        // Forward message to all connected visitors
        const adminMessage = `👨‍💼 Admin: ${text}`;

        // Broadcast to all connected visitors
        io.emit('chat message', adminMessage);

        console.log(`📤 Forwarded admin message to live chat: ${adminMessage}`);

        // Send confirmation back to Telegram
        res.status(200).json({ ok: true });
      } else {
        console.log('⚠️  Ignoring message from non-admin chat');
        res.status(200).json({ ok: true });
      }
    } else {
      console.log('⚠️  Ignoring non-message update');
      res.status(200).json({ ok: true });
    }
  } catch (error) {
    console.error('❌ Error processing Telegram webhook:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Contact form endpoint
app.post('/api/contact', limiter, contactValidation, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const { name, email, message } = req.body;

    // Send email to you (admin)
    const { error: adminError } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'Aswin Portfolio <contact@aswinlocal.in>',
      to: [process.env.CONTACT_EMAIL],
      subject: `New Portfolio Contact from ${name}`,
      replyTo: email,
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        Importance: 'high',
        'X-Mailer': 'Aswin Portfolio Contact Form',
      },
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Portfolio Contact</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center; margin-bottom: 0;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">📧 New Portfolio Contact</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">You have a new message from your portfolio website</p>
          </div>
          
          <!-- Main Content -->
          <div style="background: white; padding: 40px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            
            <!-- Contact Details -->
            <div style="background: #f8fafc; padding: 25px; border-radius: 8px; margin-bottom: 30px; border-left: 4px solid #667eea;">
              <h2 style="color: #2d3748; margin: 0 0 20px 0; font-size: 20px;">👤 Contact Information</h2>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div>
                  <strong style="color: #4a5568;">Name:</strong><br>
                  <span style="color: #2d3748; font-size: 16px;">${name}</span>
                </div>
                <div>
                  <strong style="color: #4a5568;">Email:</strong><br>
                  <a href="mailto:${email}" style="color: #667eea; text-decoration: none; font-size: 16px;">${email}</a>
                </div>
              </div>
              <div style="margin-top: 15px;">
                <strong style="color: #4a5568;">Date:</strong><br>
                <span style="color: #2d3748;">${new Date().toLocaleString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}</span>
              </div>
            </div>
            
            <!-- Message -->
            <div style="background: #ffffff; padding: 25px; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 30px;">
              <h2 style="color: #2d3748; margin: 0 0 20px 0; font-size: 20px;">💬 Message</h2>
              <div style="background: #f7fafc; padding: 20px; border-radius: 6px; border-left: 3px solid #667eea;">
                <p style="margin: 0; line-height: 1.7; color: #4a5568; font-size: 16px;">${message.replace(/\n/g, '<br>')}</p>
              </div>
            </div>
            
            <!-- Action Buttons -->
            <div style="text-align: center; margin: 30px 0;">
              <a href="mailto:${email}?subject=Re: Your portfolio inquiry from ${name}" 
                 style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 0 10px; transition: transform 0.2s;">
                ✉️ Reply to ${name}
              </a>
              <a href="https://www.aswinlocal.in" 
                 style="display: inline-block; background: #4a5568; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 0 10px;">
                🌐 View Portfolio
              </a>
            </div>
            
            <!-- Footer -->
            <div style="text-align: center; padding-top: 30px; border-top: 1px solid #e2e8f0; margin-top: 30px;">
              <p style="color: #718096; font-size: 14px; margin: 0;">
                This email was sent from your portfolio contact form at 
                <a href="https://www.aswinlocal.in" style="color: #667eea;">aswinlocal.in</a>
              </p>
            </div>
            
          </div>
          
        </body>
        </html>
      `,
      text: `
New Portfolio Contact from ${name}

Contact Information:
- Name: ${name}
- Email: ${email}
- Date: ${new Date().toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })}

Message:
${message}

---
This email was sent from your portfolio contact form at aswinlocal.in
Reply directly to this email to respond to ${name}.
      `,
    });

    if (adminError) {
      console.error('Resend error (admin email):', adminError);
      throw new Error('Failed to send admin email');
    }

    // Send confirmation email to the user
    const { error: userError } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'Aswin <contact@aswinlocal.in>',
      to: [email],
      subject: 'Thank you for contacting me - Aswin Portfolio',
      replyTo: process.env.CONTACT_EMAIL,
      headers: {
        'X-Priority': '3',
        'X-MSMail-Priority': 'Normal',
        Importance: 'normal',
        'X-Mailer': 'Aswin Portfolio Contact Form',
      },
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank you for contacting Aswin</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; border-radius: 12px 12px 0 0; text-align: center; margin-bottom: 0;">
            <div style="background: rgba(255,255,255,0.2); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
              <span style="font-size: 40px;">🙏</span>
            </div>
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">Thank You!</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Your message has been received</p>
          </div>
          
          <!-- Main Content -->
          <div style="background: white; padding: 40px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            
            <!-- Greeting -->
            <div style="text-align: center; margin-bottom: 30px;">
              <h2 style="color: #2d3748; margin: 0 0 15px 0; font-size: 24px;">Hi ${name}! 👋</h2>
              <p style="color: #4a5568; font-size: 18px; margin: 0; line-height: 1.6;">
                Thank you for reaching out to me through my portfolio website. I'm excited to hear from you!
              </p>
            </div>
            
            <!-- Confirmation -->
            <div style="background: #f0fff4; padding: 25px; border-radius: 8px; margin-bottom: 30px; border-left: 4px solid #48bb78;">
              <h3 style="color: #2d3748; margin: 0 0 15px 0; font-size: 20px;">✅ Message Received</h3>
              <p style="color: #4a5568; margin: 0; font-size: 16px;">
                I have received your message and will get back to you within <strong>24-48 hours</strong>. 
                I typically respond much sooner during business hours!
              </p>
            </div>
            
            <!-- Message Summary -->
            <div style="background: #f8fafc; padding: 25px; border-radius: 8px; margin-bottom: 30px; border: 1px solid #e2e8f0;">
              <h3 style="color: #2d3748; margin: 0 0 20px 0; font-size: 20px;">💬 Your Message</h3>
              <div style="background: white; padding: 20px; border-radius: 6px; border-left: 3px solid #667eea;">
                <p style="margin: 0; line-height: 1.7; color: #4a5568; font-size: 16px;">${message.replace(/\n/g, '<br>')}</p>
              </div>
              <p style="color: #718096; font-size: 14px; margin: 15px 0 0 0; font-style: italic;">
                Sent on ${new Date().toLocaleString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
            
            <!-- What's Next -->
            <div style="background: #ebf8ff; padding: 25px; border-radius: 8px; margin-bottom: 30px; border-left: 4px solid #4299e1;">
              <h3 style="color: #2d3748; margin: 0 0 15px 0; font-size: 20px;">⏰ What's Next?</h3>
              <ul style="color: #4a5568; margin: 0; padding-left: 20px; font-size: 16px;">
                <li style="margin-bottom: 8px;">I'll review your message and respond with detailed information</li>
                <li style="margin-bottom: 8px;">If you have urgent questions, feel free to reach out directly</li>
                <li style="margin-bottom: 0;">I'll provide relevant examples of my work if applicable</li>
              </ul>
            </div>
            
            <!-- Contact Info -->
            <div style="background: #f7fafc; padding: 25px; border-radius: 8px; margin-bottom: 30px; text-align: center;">
              <h3 style="color: #2d3748; margin: 0 0 20px 0; font-size: 20px;">📞 Need to reach me urgently?</h3>
              <p style="color: #4a5568; margin: 0 0 20px 0; font-size: 16px;">
                You can also contact me directly at:
              </p>
              <a href="mailto:contact@aswinlocal.in" 
                 style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: 600;">
                ✉️ contact@aswinlocal.in
              </a>
            </div>
            
            <!-- Social Links -->
            <div style="text-align: center; margin: 30px 0;">
              <h3 style="color: #2d3748; margin: 0 0 20px 0; font-size: 20px;">🔗 Connect with me</h3>
              <div style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
                <a href="https://github.com/Aswin-coder" 
                   style="display: inline-block; background: #24292e; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: 500;">
                  🐙 GitHub
                </a>
                <a href="https://www.linkedin.com/in/aswin4122001/" 
                   style="display: inline-block; background: #0077b5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: 500;">
                  💼 LinkedIn
                </a>
                <a href="https://www.aswinlocal.in" 
                   style="display: inline-block; background: #4a5568; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: 500;">
                  🌐 Portfolio
                </a>
              </div>
            </div>
            
            <!-- Signature -->
            <div style="text-align: center; padding: 30px 0; border-top: 1px solid #e2e8f0; margin-top: 30px;">
              <p style="color: #4a5568; font-size: 18px; margin: 0 0 10px 0; font-weight: 600;">
                Best regards,<br>
                <span style="color: #667eea; font-size: 20px;">Aswin</span>
              </p>
              <p style="color: #718096; font-size: 14px; margin: 0;">
                Software Engineer & Full-Stack Developer
              </p>
            </div>
            
            <!-- Footer -->
            <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e2e8f0; margin-top: 20px;">
              <p style="color: #a0aec0; font-size: 12px; margin: 0;">
                This is an automated confirmation email from 
                <a href="https://www.aswinlocal.in" style="color: #667eea;">Aswin's portfolio website</a>
              </p>
            </div>
            
          </div>
          
        </body>
        </html>
      `,
      text: `
Hi ${name}!

Thank you for reaching out to me through my portfolio website. I'm excited to hear from you!

✅ Message Received
I have received your message and will get back to you within 24-48 hours. I typically respond much sooner during business hours!

💬 Your Message:
${message}

Sent on ${new Date().toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })}

⏰ What's Next?
- I'll review your message and respond with detailed information
- If you have urgent questions, feel free to reach out directly
- I'll provide relevant examples of my work if applicable

📞 Need to reach me urgently?
You can also contact me directly at: contact@aswinlocal.in

🔗 Connect with me:
- GitHub: https://github.com/Aswin-coder
- LinkedIn: https://www.linkedin.com/in/aswin4122001/
- Portfolio: https://www.aswinlocal.in

Best regards,
Aswin
Software Engineer & Full-Stack Developer

---
This is an automated confirmation email from Aswin's portfolio website
      `,
    });

    if (userError) {
      console.error('Resend error (user email):', userError);
      // Don't throw error for user email, just log it
      console.log(
        'Failed to send confirmation email to user, but admin email was sent successfully'
      );
    }

    console.log(
      `New contact form submission from ${name} (${email}) at ${new Date().toISOString()}`
    );

    res.status(200).json({
      success: true,
      message: 'Message sent successfully! Thank you for contacting me.',
    });
  } catch (error) {
    console.error('Error sending email:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Create HTTP server and wrap Express app
const httpServer = http.createServer(app);

// Set up Socket.IO
const io = new IOServer(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// In-memory chat relay (simple, not persistent)
let adminSocket = null;
const visitorSessions = new Map(); // Map socket.id to visitor info

io.on('connection', socket => {
  // Identify role
  socket.on('register', role => {
    if (role === 'admin') {
      adminSocket = socket;
      socket.emit('system', 'Admin connected');
      console.log(`[SOCKET.IO] Admin registered: ${socket.id}`);
    } else {
      // Generate visitor session
      const visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      visitorSessions.set(socket.id, { id: visitorId, role: 'visitor' });
      socket.emit('system', 'You are connected as a visitor');
      socket.emit('visitor_id', visitorId);
      console.log(`[SOCKET.IO] Visitor registered: ${socket.id} as ${visitorId}`);
    }
  });

  // Handle user info submission
  socket.on('user info', userInfo => {
    const session = visitorSessions.get(socket.id);
    if (session && session.role === 'visitor') {
      // Store user info in session
      session.userInfo = userInfo;
      console.log(`[SOCKET.IO] User info received for ${session.id}:`, userInfo);

      // Notify admin if connected
      if (adminSocket) {
        adminSocket.emit('user info', { visitorId: session.id, userInfo });
      }

      // Send to Telegram if enabled
      if (telegramEnabled) {
        const infoText = Object.entries(userInfo)
          .filter(([key, value]) => value && value.trim())
          .map(([key, value]) => `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`)
          .join('\n');

        if (infoText) {
          const telegramMsg = `👤 Visitor info received (${session.id}):\n\n${infoText}`;
          sendTelegramMessage(telegramMsg)
            .then(() => {
              console.log('✅ User info sent to Telegram');
            })
            .catch(err => {
              console.error('❌ Failed to send user info to Telegram:', err.message);
            });
        }
      }
    }
  });

  // Relay messages
  socket.on('chat message', msg => {
    const session = visitorSessions.get(socket.id);
    console.log('--- [SOCKET.IO] chat message event received ---');
    console.log('  - socket.id:', socket.id);
    console.log('  - session:', session);
    console.log('  - adminSocket:', adminSocket ? adminSocket.id : null);
    console.log('  - telegramEnabled:', telegramEnabled);
    console.log('  - message:', msg);

    // Check if this is a visitor message (not from admin)
    if (session && session.role === 'visitor') {
      console.log('  - This is a visitor message');

      // Extract message text and user info
      let messageText = msg;
      let userInfo = null;

      // Check if msg is an object with text and userInfo
      if (typeof msg === 'object' && msg.text) {
        messageText = msg.text;
        userInfo = msg.userInfo;
      }

      // Relay to admin if connected
      if (adminSocket) {
        console.log('  - Relaying to admin');
        adminSocket.emit('chat message', messageText);
      } else {
        console.log('  - No admin connected, skipping admin relay');
      }

      // Forward to Telegram if enabled
      if (telegramEnabled) {
        try {
          let telegramMsg = `💬 New message from visitor (${session.id}):\n\n${messageText}`;

          // Add user info if available
          if (userInfo && Object.values(userInfo).some(val => val && val.trim())) {
            const infoText = Object.entries(userInfo)
              .filter(([key, value]) => value && value.trim())
              .map(([key, value]) => `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`)
              .join('\n');

            if (infoText) {
              telegramMsg += `\n\n👤 Visitor Info:\n${infoText}`;
            }
          }

          console.log('  - Forwarding to Telegram:', telegramMsg);
          sendTelegramMessage(telegramMsg)
            .then(() => {
              console.log('  - ✅ Successfully sent to Telegram');
            })
            .catch(err => {
              console.error('  - ❌ Failed to forward message to Telegram:', err.message);
            });
        } catch (error) {
          console.error('  - ❌ Error in Telegram forwarding logic:', error.message);
        }
      } else {
        console.log('  - Not forwarding to Telegram (telegramEnabled is false)');
      }
    } else {
      console.log('  - This is an admin message, broadcasting to visitors');
      socket.broadcast.emit('chat message', msg);
    }
    console.log('--- [SOCKET.IO] chat message event end ---');
  });

  socket.on('disconnect', () => {
    if (socket === adminSocket) {
      adminSocket = null;
      console.log(`[SOCKET.IO] Admin disconnected: ${socket.id}`);
    } else {
      // Clean up visitor session
      visitorSessions.delete(socket.id);
      console.log(`[SOCKET.IO] Visitor disconnected: ${socket.id}`);
    }
  });
});

// Telegram integration is now send-only (no polling to avoid network issues)
// Admin can reply through the web interface at http://localhost:3000/admin-chat.html

// Graceful shutdown handlers
const gracefulShutdown = signal => {
  console.log(`\n🛑 Received ${signal}, shutting down server gracefully...`);

  // Close HTTP server
  httpServer.close(() => {
    console.log('✅ HTTP server closed');

    // Close Socket.IO connections
    if (io) {
      io.close(() => {
        console.log('✅ Socket.IO server closed');
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  });

  // Force exit after 10 seconds if graceful shutdown fails
  setTimeout(() => {
    console.log('⚠️  Forced shutdown after timeout');
    process.exit(1);
  }, 10000);
};

// Set up signal handlers
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

// Start server
httpServer.listen(PORT, () => {
  console.log(`🚀 Portfolio backend server running on port ${PORT}`);
  console.log(`📧 Email service: Resend API`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
  console.log(`🤖 Telegram Bot: ${telegramStatus}`);
  console.log(`⚡ Environment: ${process.env.NODE_ENV || 'development'}`);
});
