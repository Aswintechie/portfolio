import dotenv from 'dotenv';

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID;

if (!token || !chatId) {
  console.log('❌ Missing Telegram configuration');
  process.exit(1);
}

console.log('🤖 Testing with native fetch...');

async function testTelegram() {
  try {
    // Test getMe
    console.log('📡 Testing getMe...');
    const getMeResponse = await fetch(`https://api.telegram.org/bot${token}/getMe`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!getMeResponse.ok) {
      throw new Error(`HTTP ${getMeResponse.status}: ${getMeResponse.statusText}`);
    }

    const botInfo = await getMeResponse.json();
    console.log(`✅ Bot info: @${botInfo.result.username}`);

    // Test sendMessage
    console.log('📡 Testing sendMessage...');
    const sendMessageResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: '🤖 Native fetch test bot is online!',
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!sendMessageResponse.ok) {
      const errorText = await sendMessageResponse.text();
      throw new Error(`HTTP ${sendMessageResponse.status}: ${errorText}`);
    }

    const sendResult = await sendMessageResponse.json();
    console.log('✅ Message sent successfully!');

    // Test getUpdates
    console.log('📡 Testing getUpdates...');
    const getUpdatesResponse = await fetch(
      `https://api.telegram.org/bot${token}/getUpdates?timeout=10&limit=10`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(15000),
      }
    );

    if (!getUpdatesResponse.ok) {
      const errorText = await getUpdatesResponse.text();
      throw new Error(`HTTP ${getUpdatesResponse.status}: ${errorText}`);
    }

    const updates = await getUpdatesResponse.json();
    console.log(`✅ Got ${updates.result.length} updates`);

    console.log('🎉 All tests passed! Native fetch works fine.');
  } catch (error) {
    console.log('❌ Test failed:', error.message);
    console.log(
      '🔍 This suggests the issue is with the Node.js Telegram libraries, not network connectivity.'
    );
  }
}

testTelegram();
