import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';

// Load environment variables from current directory
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

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
  });
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

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Portfolio backend server running on port ${PORT}`);
  console.log(`📧 SMTP configured for: ${process.env.SMTP_USER || 'Not configured'}`);
  console.log(`📧 SMTP Host: ${process.env.SMTP_HOST || 'Not configured'}`);
  console.log(`📧 SMTP Port: ${process.env.SMTP_PORT || 'Not configured'}`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
  console.log(`⚡ Environment: ${process.env.NODE_ENV || 'development'}`);
});
