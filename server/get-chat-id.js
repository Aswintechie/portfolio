import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  console.log('❌ TELEGRAM_BOT_TOKEN is not set in .env file');
  process.exit(1);
}

console.log('🔍 Starting bot to get chat ID...');
console.log('📱 Please send a message to @downloadforashbot in Telegram');

const bot = new TelegramBot(token, { polling: true });

bot.on('message', msg => {
  console.log('\n✅ Message received!');
  console.log(`📝 From: ${msg.from.first_name} ${msg.from.last_name || ''}`);
  console.log(`🆔 Chat ID: ${msg.chat.id}`);
  console.log(`💬 Message: ${msg.text}`);
  console.log('\n📋 Add this to your .env file:');
  console.log(`TELEGRAM_ADMIN_CHAT_ID=${msg.chat.id}`);

  bot.stopPolling();
  process.exit(0);
});

bot.on('polling_error', error => {
  console.log('❌ Polling error:', error.message);
});

console.log('⏳ Waiting for messages... (Press Ctrl+C to stop)');
