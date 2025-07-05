import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
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
    console.log('💡 Telegram bot not configured - chat will work in local mode only');
    telegramEnabled = false;
    telegramStatus = 'Local mode only';
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

// Create reusable transporter object using SMTP configuration from .env
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // SMTP username
      pass: process.env.SMTP_PASS, // SMTP password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

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

    // Check if SMTP is configured
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log('SMTP not configured, returning success without sending email');
      return res.status(200).json({
        success: true,
        message: 'Message received! Thank you for contacting me. (Email service not configured)',
      });
    }

    // Create transporter
    const transporter = createTransporter();

    // Verify SMTP connection
    await transporter.verify();

    // Email to you (notification)
    const mailOptions = {
      from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.FEEDBACK_EMAIL, // Your email address
      subject: `New Portfolio Contact from ${name}`,
      html: `
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
      `,
      text: `
        New Portfolio Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        Date: ${new Date().toLocaleString()}
        
        Message:
        ${message}
        
        Reply to: ${email}
      `,
    };

    // Auto-reply email to the sender
    const autoReplyOptions = {
      from: `"Aswin - Portfolio" <${process.env.CONTACT_EMAIL}>`,
      to: email,
      subject: 'Thank you for contacting me!',
      html: `
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
      `,
      text: `
        Hi ${name},
        
        Thank you for contacting me through my portfolio website. I have received your message and will get back to you as soon as possible, usually within 24-48 hours.
        
        Your message was submitted on: ${new Date().toLocaleString()}
        
        In the meantime, feel free to check out my work on GitHub (https://github.com/Aswin-coder) or connect with me on LinkedIn (https://www.linkedin.com/in/aswin4122001/).
        
        Best regards,
        Aswin
        Software Engineer
        
        ---
        This is an automated response. Please do not reply to this email directly.
      `,
    };

    // Send both emails
    await Promise.all([transporter.sendMail(mailOptions), transporter.sendMail(autoReplyOptions)]);

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
  console.log(`🚀 Portfolio backend server (with live chat) running on port ${PORT}`);
  console.log(`📧 SMTP configured for: ${process.env.SMTP_USER || 'Not configured'}`);
  console.log(`📧 SMTP Host: ${process.env.SMTP_HOST || 'Not configured'}`);
  console.log(`📧 SMTP Port: ${process.env.SMTP_PORT || 'Not configured'}`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
  console.log(`🤖 Telegram Bot: ${telegramStatus}`);
  console.log(`⚡ Environment: ${process.env.NODE_ENV || 'development'}`);
});
