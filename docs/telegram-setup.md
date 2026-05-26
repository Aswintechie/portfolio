# Telegram Bot Integration Setup

This guide will help you set up the two-way Telegram integration for your portfolio's live chat feature.

## Features

- **Real-time messaging**: Visitors can chat with you directly from your portfolio
- **Telegram notifications**: You receive all visitor messages in Telegram
- **Two-way communication**: You can reply from Telegram and messages appear in the visitor's chat
- **Session management**: Each visitor gets a unique ID for targeted replies

## Setup Steps

### 1. Create a Telegram Bot

1. Open Telegram and search for `@BotFather`
2. Send `/newbot` command
3. Follow the prompts:
   - Choose a name for your bot (e.g., "Portfolio Chat Bot")
   - Choose a username (must end with 'bot', e.g., "myportfolio_chat_bot")
4. BotFather will give you a **bot token** (keep this secret!)

### 2. Get Your Chat ID

1. Start a chat with your bot (search for your bot's username)
2. Send any message to your bot
3. Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
4. Look for your `chat_id` in the response (it's a number like `123456789`)

### 3. Configure Environment Variables

1. Copy `server/env.template` to `server/.env`
2. Add your bot credentials:
   ```env
   TELEGRAM_BOT_TOKEN=your_bot_token_here
   TELEGRAM_ADMIN_CHAT_ID=your_chat_id_here
   ```

### 4. Start the Server

```bash
cd server
npm start
```

You should see:
```
🤖 Telegram bot initialized
🤖 Telegram Bot: Connected
```

## How to Use

### For Visitors
- Click the chat bubble (💬) on your portfolio
- Type messages and send them
- Messages are delivered to your Telegram

### For You (Admin)
- **Reply to specific visitor**: `/reply visitor_id your message`
- **Send to all visitors**: Just type your message normally
- **Example**: `/reply visitor_1234567890_abc123 Hello! Thanks for visiting my portfolio.`

## Testing

1. **Start the backend**: `cd server && npm start`
2. **Start the frontend**: `npm run dev`
3. **Open admin chat**: Open `admin-chat.html` in your browser
4. **Test the flow**:
   - Send a message from your portfolio (visitor)
   - See it appear in both admin chat and Telegram
   - Reply from either admin chat or Telegram
   - See the reply in the visitor's chat

## Troubleshooting

### Bot not connecting
- Check your bot token is correct
- Make sure you've started a chat with your bot
- Verify your chat ID is correct

### Messages not appearing
- Check the server console for errors
- Ensure both frontend and backend are running
- Verify Socket.IO connection in browser console

### Telegram replies not working
- Make sure you're using the correct format: `/reply visitor_id message`
- Check that the visitor is still connected
- Verify the bot has permission to send messages

## Security Notes

- Keep your bot token secret
- Don't commit `.env` files to version control
- Consider rate limiting for production use
- Monitor for spam/abuse

## Production Deployment

For production, consider:
- Using environment variables in your hosting platform
- Setting up SSL/TLS for secure WebSocket connections
- Adding rate limiting and spam protection
- Implementing user authentication if needed
- Adding message persistence/database storage

## Support

If you encounter issues:
1. Check the server console for error messages
2. Verify all environment variables are set correctly
3. Test with the admin chat interface first
4. Check Telegram bot permissions and settings 