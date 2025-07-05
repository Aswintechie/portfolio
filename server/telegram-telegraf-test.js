import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID;

if (!token || !chatId) {
  console.log('❌ Missing Telegram configuration');
  process.exit(1);
}

console.log('🤖 Testing Telegraf...');

const bot = new Telegraf(token);

// Test connection
bot.telegram
  .getMe()
  .then(botInfo => {
    console.log(`✅ Connected to bot: @${botInfo.username}`);

    // Send test message
    return bot.telegram.sendMessage(chatId, '🤖 Telegraf test bot is online!');
  })
  .then(() => {
    console.log('✅ Test message sent successfully');

    // Start the bot
    console.log('🔄 Starting Telegraf bot...');
    return bot.launch();
  })
  .then(() => {
    console.log('✅ Telegraf bot started successfully!');

    // Handle messages
    bot.on('message', ctx => {
      console.log(`📱 Message from ${ctx.from.first_name}: ${ctx.message.text}`);

      if (ctx.message.chat.id.toString() === chatId) {
        console.log('✅ Admin message received!');
        ctx.reply('Message received by Telegraf bot!');
      }
    });
  })
  .catch(error => {
    console.log('❌ Telegraf connection failed:', error.message);
    process.exit(1);
  });

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down Telegraf...');
  bot.stop('SIGINT');
  process.exit(0);
});
