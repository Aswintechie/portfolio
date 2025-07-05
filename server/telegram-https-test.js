import https from 'https';
import dotenv from 'dotenv';

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID;

if (!token || !chatId) {
  console.log('❌ Missing Telegram configuration');
  process.exit(1);
}

console.log('🤖 Testing with Node.js https module...');

function makeRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.telegram.org',
      port: 443,
      path: `/bot${token}${path}`,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    };

    const req = https.request(options, res => {
      let body = '';

      res.on('data', chunk => {
        body += chunk;
      });

      res.on('end', () => {
        try {
          const result = JSON.parse(body);
          resolve(result);
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

async function testTelegram() {
  try {
    // Test getMe
    console.log('📡 Testing getMe...');
    const botInfo = await makeRequest('/getMe');
    console.log(`✅ Bot info: @${botInfo.result.username}`);

    // Test sendMessage
    console.log('📡 Testing sendMessage...');
    const sendResult = await makeRequest('/sendMessage', 'POST', {
      chat_id: chatId,
      text: '🤖 Node.js https test bot is online!',
    });
    console.log('✅ Message sent successfully!');

    // Test getUpdates
    console.log('📡 Testing getUpdates...');
    const updates = await makeRequest('/getUpdates?timeout=10&limit=10');
    console.log(`✅ Got ${updates.result.length} updates`);

    console.log('🎉 All tests passed! Node.js https module works fine.');
  } catch (error) {
    console.log('❌ Test failed:', error.message);
    console.log('🔍 This suggests a fundamental network connectivity issue from Node.js.');
  }
}

testTelegram();
