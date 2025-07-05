import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID;

console.log('🔍 Testing Telegram Bot Configuration...');
console.log(`Token: ${token ? '✅ Set' : '❌ Missing'}`);
console.log(`Chat ID: ${chatId ? '✅ Set' : '❌ Missing'}`);

if (!token) {
  console.log('❌ TELEGRAM_BOT_TOKEN is not set in .env file');
  process.exit(1);
}

if (!chatId) {
  console.log('❌ TELEGRAM_ADMIN_CHAT_ID is not set in .env file');
  process.exit(1);
}

console.log('\n🤖 Testing bot token...');

try {
  const bot = new TelegramBot(token, { polling: false });

  bot
    .getMe()
    .then(botInfo => {
      console.log(`✅ Bot token is valid!`);
      console.log(`   Bot name: ${botInfo.first_name}`);
      console.log(`   Username: @${botInfo.username}`);
      console.log(`   Bot ID: ${botInfo.id}`);

      console.log('\n📱 Testing message sending...');
      return bot.sendMessage(chatId, '🤖 Test message from portfolio bot!');
    })
    .then(() => {
      console.log('✅ Message sent successfully!');
      console.log('🎉 Telegram bot is working correctly!');
      process.exit(0);
    })
    .catch(error => {
      console.log('❌ Error:', error.message);
      if (error.message.includes('chat not found')) {
        console.log('💡 Make sure you have started a chat with your bot first!');
        console.log('   Send /start to your bot in Telegram');
      }
      process.exit(1);
    });
} catch (error) {
  console.log('❌ Failed to create bot instance:', error.message);
  process.exit(1);
}
