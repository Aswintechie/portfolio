import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';


// Load environment variables from current directory
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

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
  });
});

// Contact form endpoint
app.post('/api/contact', limiter, contactValidation, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array(),
      });
    }

    const { name, email, message } = req.body;

    // Send notification email to admin
    const adminEmailResult = await resend.emails.send({
      from: 'Portfolio Contact <noreply@yourdomain.com>',
      to: process.env.ADMIN_EMAIL || 'admin@yourdomain.com',
      subject: `New Contact Form Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Message</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>From:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 5px; margin-top: 10px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p style="color: #666; font-size: 14px;">
            This message was sent from your portfolio contact form.
          </p>
        </div>
      `,
      text: `
New Contact Form Message

From: ${name}
Email: ${email}

Message:
${message}

This message was sent from your portfolio contact form.
      `,
    });

    // Send confirmation email to user
    const userEmailResult = await resend.emails.send({
      from: 'Aswin Zayasankaran <noreply@yourdomain.com>',
      to: email,
      subject: 'Thank you for your message - Aswin Zayasankaran',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Thank you for reaching out!</h2>
          <p>Hi ${name},</p>
          <p>Thank you for contacting me through my portfolio website. I've received your message and will get back to you as soon as possible.</p>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Your Message:</h3>
            <div style="background: white; padding: 15px; border-radius: 5px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <p>I typically respond within 24-48 hours during business days.</p>
          
          <p>Best regards,<br>
          <strong>Aswin Zayasankaran</strong></p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">
            This is an automated confirmation email. Please do not reply to this message.
          </p>
        </div>
      `,
      text: `
Thank you for reaching out!

Hi ${name},

Thank you for contacting me through my portfolio website. I've received your message and will get back to you as soon as possible.

Your Message:
${message}

I typically respond within 24-48 hours during business days.

Best regards,
Aswin Zayasankaran

---
This is an automated confirmation email. Please do not reply to this message.
      `,
    });

    console.log('✅ Contact form submitted successfully');
    console.log('📧 Admin notification sent:', adminEmailResult.data?.id);
    console.log('📧 User confirmation sent:', userEmailResult.data?.id);

    res.status(200).json({
      success: true,
      message: 'Message sent successfully! You will receive a confirmation email shortly.',
    });
  } catch (error) {
    console.error('❌ Error sending contact form:', error);
    res.status(500).json({
      error: 'Failed to send message. Please try again later.',
      details: error.message,
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Portfolio backend server running on port ${PORT}`);
  console.log(`📧 Email service: ${process.env.RESEND_API_KEY ? 'Configured' : 'Not configured'}`);
  console.log(`🌐 CORS origin: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
});
