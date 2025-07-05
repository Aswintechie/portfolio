import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID;

if (!token || !chatId) {
  console.log('❌ Missing Telegram configuration');
  process.exit(1);
}

console.log('🤖 Starting manual Telegram polling...');

const bot = new TelegramBot(token, { polling: false });

let offset = 0;

async function pollUpdates() {
  try {
    const updates = await bot.getUpdates({
      offset: offset,
      limit: 10,
      timeout: 30,
    });

    for (const update of updates) {
      if (update.message && update.message.chat.id.toString() === chatId) {
        console.log(`📱 Message from ${update.message.from.first_name}: ${update.message.text}`);

        // Handle the message here
        if (update.message.text.startsWith('/reply')) {
          // Handle reply command
          console.log('Reply command received');
        } else {
          // Handle regular message
          console.log('Regular message received');
        }
      }

      offset = update.update_id + 1;
    }
  } catch (error) {
    console.log('❌ Polling error:', error.message);
  }

  // Continue polling
  setTimeout(pollUpdates, 5000);
}

// Test connection first
bot
  .getMe()
  .then(botInfo => {
    console.log(`✅ Connected to bot: @${botInfo.username}`);

    // Send test message
    return bot.sendMessage(chatId, '🤖 Manual polling bot is online!');
  })
  .then(() => {
    console.log('✅ Test message sent successfully');
    console.log('🔄 Starting manual polling...');

    // Start manual polling
    pollUpdates();
  })
  .catch(error => {
    console.log('❌ Connection failed:', error.message);
    process.exit(1);
  });

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down...');
  process.exit(0);
});
