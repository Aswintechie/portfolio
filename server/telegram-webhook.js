import express from 'express';
import https from 'https';
import dotenv from 'dotenv';

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID;

if (!token || !chatId) {
  console.log('❌ Missing Telegram configuration');
  process.exit(1);
}

const app = express();
app.use(express.json());

// Simple Telegram API client using https module
function telegramRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.telegram.org',
      port: 443,
      path: `/bot${token}${path}`,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    };

    const req = https.request(options, res => {
      let body = '';

      res.on('data', chunk => {
        body += chunk;
      });

      res.on('end', () => {
        try {
          const result = JSON.parse(body);
          if (result.ok) {
            resolve(result.result);
          } else {
            reject(new Error(result.description || 'Telegram API error'));
          }
        } catch (error) {
          reject(new Error(`Failed to parse response: ${error.message}`));
        }
      });
    });

    req.on('error', error => {
      reject(error);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

// Send message to Telegram
async function sendTelegramMessage(text) {
  try {
    await telegramRequest('/sendMessage', 'POST', {
      chat_id: chatId,
      text: text,
      parse_mode: 'HTML',
    });
    return true;
  } catch (error) {
    console.error('❌ Failed to send Telegram message:', error.message);
    return false;
  }
}

// Test connection
async function testConnection() {
  try {
    console.log('🤖 Testing Telegram connection...');
    const botInfo = await telegramRequest('/getMe');
    console.log(`✅ Connected to bot: @${botInfo.username}`);

    // Send test message
    const success = await sendTelegramMessage('🤖 Webhook-based bot is online!');
    if (success) {
      console.log('✅ Test message sent successfully');
    }

    return true;
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    return false;
  }
}

// Webhook endpoint for receiving messages
app.post('/telegram-webhook', async (req, res) => {
  try {
    const update = req.body;

    if (update.message && update.message.chat.id.toString() === chatId) {
      const message = update.message;
      console.log(`📱 Message from ${message.from.first_name}: ${message.text}`);

      // Handle the message
      if (message.text.startsWith('/reply')) {
        // Handle reply command
        await sendTelegramMessage('Reply command received!');
      } else {
        // Handle regular message
        await sendTelegramMessage(`Received: ${message.text}`);
      }
    }

    res.json({ ok: true });
  } catch (error) {
    console.error('❌ Webhook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Manual message sending endpoint
app.post('/send-message', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Message text is required' });
    }

    const success = await sendTelegramMessage(text);
    if (success) {
      res.json({ success: true, message: 'Message sent' });
    } else {
      res.status(500).json({ error: 'Failed to send message' });
    }
  } catch (error) {
    console.error('❌ Send message error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Status endpoint
app.get('/telegram-status', (req, res) => {
  res.json({
    status: 'webhook-mode',
    bot_token: token ? 'configured' : 'missing',
    chat_id: chatId ? 'configured' : 'missing',
  });
});

const PORT = 3002;

app.listen(PORT, async () => {
  console.log(`🚀 Telegram webhook server running on port ${PORT}`);
  console.log(`📡 Webhook URL: http://localhost:${PORT}/telegram-webhook`);
  console.log(`📤 Send messages: POST http://localhost:${PORT}/send-message`);

  // Test connection on startup
  await testConnection();
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down webhook server...');
  process.exit(0);
});
