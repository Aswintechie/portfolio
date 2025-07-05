import https from 'https';
import dotenv from 'dotenv';

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID;

if (!token || !chatId) {
  console.log('❌ Missing Telegram configuration');
  process.exit(1);
}

// Simple Telegram sender using Node.js https module
function sendTelegramMessage(text) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      chat_id: chatId,
      text: text,
      parse_mode: 'HTML',
    });

    const options = {
      hostname: 'api.telegram.org',
      port: 443,
      path: `/bot${token}/sendMessage`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
      },
      timeout: 30000,
    };

    const req = https.request(options, res => {
      let responseData = '';

      res.on('data', chunk => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          const result = JSON.parse(responseData);
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

    req.write(data);
    req.end();
  });
}

// Test the connection
async function testConnection() {
  try {
    console.log('🤖 Testing Telegram connection...');

    // Test with a simple message
    const result = await sendTelegramMessage('🤖 Simple Telegram sender is working!');
    console.log('✅ Message sent successfully!');
    console.log('📱 Message ID:', result.message_id);

    return true;
  } catch (error) {
    console.error('❌ Failed to send message:', error.message);
    return false;
  }
}

// Export for use in other modules
export { sendTelegramMessage };

// If run directly, test the connection
if (import.meta.url === `file://${process.argv[1]}`) {
  testConnection().then(success => {
    if (success) {
      console.log('🎉 Telegram integration is working!');
    } else {
      console.log('❌ Telegram integration failed');
    }
    process.exit(success ? 0 : 1);
  });
}
