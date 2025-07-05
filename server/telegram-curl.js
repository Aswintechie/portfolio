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

// Send Telegram message using curl
async function sendTelegramMessage(text) {
  try {
    const data = JSON.stringify({
      chat_id: chatId,
      text: text,
      parse_mode: 'HTML',
    });

    const command = `curl -s "https://api.telegram.org/bot${token}/sendMessage" -d '${data}' -H "Content-Type: application/json"`;

    const { stdout, stderr } = await execAsync(command);

    if (stderr) {
      throw new Error(stderr);
    }

    const result = JSON.parse(stdout);

    if (result.ok) {
      return result.result;
    } else {
      throw new Error(result.description || 'Telegram API error');
    }
  } catch (error) {
    throw new Error(`Failed to send Telegram message: ${error.message}`);
  }
}

// Test the connection
async function testConnection() {
  try {
    console.log('🤖 Testing Telegram connection with curl...');

    const result = await sendTelegramMessage('🤖 Curl-based Telegram sender is working!');
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
