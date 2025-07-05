import { io } from 'socket.io-client';
import { sendTelegramMessage } from './telegram-curl.js';

// Test Telegram directly first
console.log('🤖 Testing Telegram directly...');
try {
  await sendTelegramMessage('🧪 Test message from test script');
  console.log('✅ Direct Telegram test successful');
} catch (error) {
  console.error('❌ Direct Telegram test failed:', error.message);
  process.exit(1);
}

// Test Socket.IO connection
console.log('🔌 Testing Socket.IO connection...');
const socket = io('http://localhost:3001');

socket.on('connect', () => {
  console.log('✅ Connected to Socket.IO server');

  // Register as a visitor
  socket.emit('register', 'visitor');
});

socket.on('visitor_id', visitorId => {
  console.log('📱 Got visitor ID:', visitorId);

  // Send a test message
  console.log('💬 Sending test message...');
  socket.emit('chat message', 'Hello! This is a test message from the test script.');
});

socket.on('system', message => {
  console.log('📢 System message:', message);
});

socket.on('chat message', message => {
  console.log('💬 Received message:', message);
});

// Wait for 5 seconds then disconnect
setTimeout(() => {
  console.log('🛑 Disconnecting...');
  socket.disconnect();
  process.exit(0);
}, 5000);

// Handle errors
socket.on('connect_error', error => {
  console.error('❌ Connection error:', error.message);
  process.exit(1);
});
