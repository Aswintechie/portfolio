import React, { useState, useEffect, useRef } from 'react';

const LiveChatWidgetWebSocket = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [showUserInfo, setShowUserInfo] = useState(true);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const wsRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    if (!wsRef.current) {
      setConnectionStatus('connecting');

      // Get the WebSocket URL from the current domain
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/ws`;

      // For debugging - log the WebSocket URL
      console.log('WebSocket URL:', wsUrl);

      const ws = new WebSocket(wsUrl);

      wsRef.current = ws;

      ws.onopen = () => {
        setConnectionStatus('connected');
        // Register as visitor
        ws.send(JSON.stringify({ type: 'register', role: 'visitor' }));
        setMessages(prev => [...prev, { type: 'system', text: 'Connected to chat server' }]);
      };

      ws.onclose = event => {
        setConnectionStatus('disconnected');
        setMessages(prev => [...prev, { type: 'system', text: 'Disconnected from chat server' }]);
      };

      ws.onerror = error => {
        console.error('WebSocket connection error:', error);
        setConnectionStatus('error');
        setMessages(prev => [
          ...prev,
          { type: 'system', text: 'Failed to connect to chat server' },
        ]);
      };

      ws.onmessage = event => {
        try {
          const data = JSON.parse(event.data);

          switch (data.type) {
            case 'system':
              setMessages(prev => [...prev, { type: 'system', text: data.message }]);
              break;
            case 'visitor_id':
              // Store visitor ID if needed
              break;
            case 'chat_message':
              setMessages(prev => [...prev, { type: 'admin', text: data.message }]);
              break;
            case 'user_info':
              // Handle user info confirmation
              break;
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [open]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleUserInfoSubmit = e => {
    e.preventDefault();
    setShowUserInfo(false);
    // Send user info to server
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'user_info', userInfo }));
    }
  };

  const sendMessage = e => {
    e.preventDefault();
    if (!input.trim() || !wsRef.current) return;

    if (wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          type: 'chat_message',
          message: input,
        })
      );
      setMessages(prev => [...prev, { type: 'user', text: input }]);
      setInput('');
    } else {
      setMessages(prev => [
        ...prev,
        { type: 'system', text: 'Cannot send message - not connected to server' },
      ]);
    }
  };

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return '#10b981';
      case 'connecting':
        return '#f59e0b';
      case 'error':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connected':
        return '🟢 Online';
      case 'connecting':
        return '🟡 Connecting...';
      case 'error':
        return '🔴 Error';
      default:
        return '⚫ Offline';
    }
  };

  return (
    <>
      {/* Chat Bubble */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
          background: '#ec4899',
          color: 'white',
          borderRadius: '50%',
          width: 56,
          height: 56,
          border: 'none',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          fontSize: 28,
          cursor: 'pointer',
        }}
        aria-label='Open live chat'
      >
        💬
      </button>

      {/* Chat Window */}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: 90,
            right: 24,
            width: 320,
            maxHeight: 400,
            background: 'white',
            borderRadius: 12,
            boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1001,
          }}
        >
          <div
            style={{
              padding: 12,
              borderBottom: '1px solid #eee',
              fontWeight: 600,
              color: '#ec4899',
            }}
          >
            Live Chat
            <div style={{ fontSize: 12, color: getStatusColor(), marginTop: 4 }}>
              {getStatusText()}
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                float: 'right',
                background: 'none',
                border: 'none',
                fontSize: 18,
                cursor: 'pointer',
                color: '#888',
              }}
              aria-label='Close chat'
            >
              ×
            </button>
          </div>

          {/* User Info Form */}
          {showUserInfo && (
            <div style={{ padding: 12, borderBottom: '1px solid #eee', background: '#f8fafc' }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#374151' }}>
                Tell us about yourself (optional)
              </div>
              <form onSubmit={handleUserInfoSubmit}>
                <input
                  type='text'
                  placeholder='Your name'
                  value={userInfo.name}
                  onChange={e => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: 8,
                    marginBottom: 8,
                    border: '1px solid #d1d5db',
                    borderRadius: 6,
                    fontSize: 14,
                  }}
                />
                <input
                  type='email'
                  placeholder='Your email'
                  value={userInfo.email}
                  onChange={e => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: 8,
                    marginBottom: 8,
                    border: '1px solid #d1d5db',
                    borderRadius: 6,
                    fontSize: 14,
                  }}
                />
                <input
                  type='tel'
                  placeholder='Your phone number'
                  value={userInfo.phone}
                  onChange={e => setUserInfo(prev => ({ ...prev, phone: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: 8,
                    marginBottom: 8,
                    border: '1px solid #d1d5db',
                    borderRadius: 6,
                    fontSize: 14,
                  }}
                />
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    type='submit'
                    style={{
                      flex: 1,
                      background: '#ec4899',
                      color: 'white',
                      border: 'none',
                      borderRadius: 6,
                      padding: 8,
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Start Chat
                  </button>
                  <button
                    type='button'
                    onClick={() => {
                      setShowUserInfo(false);
                    }}
                    style={{
                      flex: 1,
                      background: '#6b7280',
                      color: 'white',
                      border: 'none',
                      borderRadius: 6,
                      padding: 8,
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Skip
                  </button>
                </div>
              </form>
            </div>
          )}

          <div style={{ flex: 1, overflowY: 'auto', padding: 12, background: '#f9fafb' }}>
            {messages.length === 0 && !showUserInfo && (
              <div style={{ textAlign: 'center', color: '#6b7280', fontSize: 14, marginTop: 20 }}>
                {connectionStatus === 'connecting'
                  ? 'Connecting to chat...'
                  : 'Start a conversation!'}
              </div>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  marginBottom: 8,
                  textAlign: msg.type === 'user' ? 'right' : 'left',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    background:
                      msg.type === 'user'
                        ? 'linear-gradient(90deg,#ec4899,#06b6d4)'
                        : msg.type === 'admin'
                          ? '#e0e7ef'
                          : msg.type === 'system'
                            ? '#fef3c7'
                            : 'transparent',
                    color:
                      msg.type === 'user' ? 'white' : msg.type === 'system' ? '#92400e' : '#374151',
                    borderRadius: 8,
                    padding: '6px 12px',
                    fontSize: 14,
                    maxWidth: 220,
                    wordBreak: 'break-word',
                    fontStyle: msg.type === 'system' ? 'italic' : 'normal',
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={sendMessage}
            style={{ display: 'flex', borderTop: '1px solid #eee', padding: 8 }}
          >
            <input
              type='text'
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={connectionStatus === 'connected' ? 'Type a message...' : 'Connecting...'}
              disabled={connectionStatus !== 'connected' || showUserInfo}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: 15,
                padding: 8,
                borderRadius: 6,
                opacity: connectionStatus === 'connected' && !showUserInfo ? 1 : 0.5,
              }}
            />
            <button
              type='submit'
              disabled={connectionStatus !== 'connected' || showUserInfo}
              style={{
                marginLeft: 8,
                background:
                  connectionStatus === 'connected' && !showUserInfo ? '#ec4899' : '#9ca3af',
                color: 'white',
                border: 'none',
                borderRadius: 6,
                padding: '0 16px',
                fontWeight: 600,
                cursor:
                  connectionStatus === 'connected' && !showUserInfo ? 'pointer' : 'not-allowed',
              }}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default LiveChatWidgetWebSocket;
