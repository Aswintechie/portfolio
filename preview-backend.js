import express from 'express';
import cors from 'cors';
import { Server as IOServer } from 'socket.io';
import http from 'http';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration for preview deployments
app.use(
  cors({
    origin: [
      'https://aswin-portfolio-pr-15.aswin8681879422.workers.dev',
      'https://*.aswin8681879422.workers.dev',
      'http://localhost:3000',
      'http://localhost:5173',
    ],
    methods: ['GET', 'POST'],
    credentials: true,
  })
);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Preview backend is running',
    timestamp: new Date().toISOString(),
    environment: 'preview',
  });
});

// Create HTTP server and wrap Express app
const httpServer = http.createServer(app);

// Set up Socket.IO
const io = new IOServer(httpServer, {
  cors: {
    origin: [
      'https://aswin-portfolio-pr-15.aswin8681879422.workers.dev',
      'https://*.aswin8681879422.workers.dev',
      'http://localhost:3000',
      'http://localhost:5173',
    ],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// In-memory chat relay (simple, not persistent)
let adminSocket = null;
const visitorSessions = new Map(); // Map socket.id to visitor info

io.on('connection', socket => {
  console.log(`[SOCKET.IO] New connection: ${socket.id}`);

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
    }
  });

  // Relay messages
  socket.on('chat message', msg => {
    const session = visitorSessions.get(socket.id);
    console.log('--- [SOCKET.IO] chat message event received ---');
    console.log('  - socket.id:', socket.id);
    console.log('  - session:', session);
    console.log('  - adminSocket:', adminSocket ? adminSocket.id : null);
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

      // For preview, we'll just log the message
      console.log('  - Preview mode: Message logged:', messageText);
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

// Start server
httpServer.listen(PORT, () => {
  console.log(`🚀 Preview backend server running on port ${PORT}`);
  console.log(`🌐 CORS enabled for preview deployments`);
  console.log(`⚡ Environment: preview`);
});
