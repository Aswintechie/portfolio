import { exec } from 'child_process';
import { promisify } from 'util';
import dotenv from 'dotenv';

dotenv.config();

const execAsync = promisify(exec);
const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID;

if (!token || !chatId) {
  console.log('❌ Missing Telegram configuration');
  process.exit(1);
}

let lastUpdateId = 0;
let io = null;

// Set up Socket.IO reference
export function setSocketIO(socketIO) {
  io = socketIO;
}

// Get updates from Telegram
async function getUpdates() {
  try {
    const command = `curl -s "https://api.telegram.org/bot${token}/getUpdates?offset=${lastUpdateId + 1}&timeout=30"`;
    console.log(`🔍 Executing: ${command}`);

    const { stdout, stderr } = await execAsync(command);

    if (stderr) {
      throw new Error(stderr);
    }

    const result = JSON.parse(stdout);
    console.log(`📊 Received ${result.result ? result.result.length : 0} updates`);

    if (result.ok && result.result.length > 0) {
      for (const update of result.result) {
        await processUpdate(update);
        lastUpdateId = update.update_id;
      }
    }

    return true;
  } catch (error) {
    console.error('❌ Error getting updates:', error.message);
    return false;
  }
}

// Process a single update
async function processUpdate(update) {
  try {
    console.log('📱 Processing Telegram update:', update.update_id);

    // Check if this is a message update
    if (update.message && update.message.text) {
      const { message } = update;
      const text = message.text;
      const from = message.from;

      console.log(`📱 Telegram message from ${from.first_name || from.username}: ${text}`);

      // Only process messages from the admin chat
      if (message.chat.id.toString() === chatId) {
        // Forward message to all connected visitors
        const adminMessage = `👨‍💼 Admin: ${text}`;

        if (io) {
          // Broadcast to all connected visitors
          io.emit('chat message', adminMessage);
          console.log(`📤 Forwarded admin message to live chat: ${adminMessage}`);
        } else {
          console.log('⚠️  Socket.IO not available, cannot forward message');
        }
      } else {
        console.log('⚠️  Ignoring message from non-admin chat');
      }
    } else {
      console.log('⚠️  Ignoring non-message update');
    }
  } catch (error) {
    console.error('❌ Error processing update:', error);
  }
}

// Start polling
export function startPolling() {
  console.log('🔄 Starting Telegram polling...');

  const poll = async () => {
    try {
      console.log('📡 Polling for Telegram updates...');
      await getUpdates();
      console.log('✅ Polling cycle completed');
    } catch (error) {
      console.error('❌ Error in polling cycle:', error.message);
    }
    // Poll every 5 seconds
    setTimeout(poll, 5000);
  };

  poll();
}

// Test the connection
async function testConnection() {
  try {
    console.log('🤖 Testing Telegram connection...');

    const command = `curl -s "https://api.telegram.org/bot${token}/getMe"`;
    const { stdout, stderr } = await execAsync(command);

    if (stderr) {
      throw new Error(stderr);
    }

    const result = JSON.parse(stdout);

    if (result.ok) {
      console.log('✅ Telegram bot connection successful!');
      console.log('🤖 Bot name:', result.result.first_name);
      console.log('🤖 Bot username:', result.result.username);
      return true;
    } else {
      throw new Error(result.description || 'Telegram API error');
    }
  } catch (error) {
    console.error('❌ Failed to connect to Telegram:', error.message);
    return false;
  }
}

// If run directly, test the connection
if (import.meta.url === `file://${process.argv[1]}`) {
  testConnection().then(success => {
    if (success) {
      console.log('🎉 Telegram polling setup is ready!');
    } else {
      console.log('❌ Telegram polling setup failed');
    }
    process.exit(success ? 0 : 1);
  });
}
