import { exec } from 'child_process';
import { promisify } from 'util';
import dotenv from 'dotenv';

dotenv.config();

const execAsync = promisify(exec);
const token = process.env.TELEGRAM_BOT_TOKEN;
const webhookUrl = process.env.WEBHOOK_URL || 'http://localhost:3001/api/telegram-webhook';

if (!token) {
  console.log('❌ Missing TELEGRAM_BOT_TOKEN in .env file');
  process.exit(1);
}

async function setupWebhook() {
  try {
    console.log('🔧 Setting up Telegram webhook...');
    console.log(`📡 Webhook URL: ${webhookUrl}`);

    const data = JSON.stringify({
      url: webhookUrl,
      allowed_updates: ['message'],
    });

    const command = `curl -s "https://api.telegram.org/bot${token}/setWebhook" -d '${data}' -H "Content-Type: application/json"`;

    const { stdout, stderr } = await execAsync(command);

    if (stderr) {
      throw new Error(stderr);
    }

    const result = JSON.parse(stdout);

    if (result.ok) {
      console.log('✅ Webhook set successfully!');
      console.log('📱 Telegram will now send messages to:', webhookUrl);

      // Get webhook info
      const infoCommand = `curl -s "https://api.telegram.org/bot${token}/getWebhookInfo"`;
      const { stdout: infoStdout } = await execAsync(infoCommand);
      const info = JSON.parse(infoStdout);

      if (info.ok) {
        console.log('📊 Webhook Info:');
        console.log('  - URL:', info.result.url);
        console.log('  - Has custom certificate:', info.result.has_custom_certificate);
        console.log('  - Pending update count:', info.result.pending_update_count);
        console.log(
          '  - Last error date:',
          info.result.last_error_date ? new Date(info.result.last_error_date * 1000) : 'None'
        );
        console.log('  - Last error message:', info.result.last_error_message || 'None');
      }

      return true;
    } else {
      throw new Error(result.description || 'Telegram API error');
    }
  } catch (error) {
    console.error('❌ Failed to set webhook:', error.message);
    return false;
  }
}

async function removeWebhook() {
  try {
    console.log('🗑️  Removing Telegram webhook...');

    const command = `curl -s "https://api.telegram.org/bot${token}/deleteWebhook"`;

    const { stdout, stderr } = await execAsync(command);

    if (stderr) {
      throw new Error(stderr);
    }

    const result = JSON.parse(stdout);

    if (result.ok) {
      console.log('✅ Webhook removed successfully!');
      return true;
    } else {
      throw new Error(result.description || 'Telegram API error');
    }
  } catch (error) {
    console.error('❌ Failed to remove webhook:', error.message);
    return false;
  }
}

// Export for programmatic use
export { setupWebhook, removeWebhook };

// CLI support
if (import.meta.url === `file://${process.argv[1]}`) {
  const command = process.argv[2];
  if (command === 'remove') {
    removeWebhook().then(success => {
      process.exit(success ? 0 : 1);
    });
  } else {
    setupWebhook().then(success => {
      if (success) {
        console.log('\n🎉 Telegram webhook setup complete!');
        console.log('💡 Now when you reply in Telegram, messages will appear in the live chat.');
        console.log('💡 Make sure your server is running on port 3001');
        console.log('💡 For production, set WEBHOOK_URL in .env to your public URL');
      } else {
        console.log('\n❌ Webhook setup failed');
      }
      process.exit(success ? 0 : 1);
    });
  }
}
