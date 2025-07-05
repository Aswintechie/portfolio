import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = 'ws://localhost:3001';

const LiveChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('disconnected'); // 'connecting', 'connected', 'disconnected', 'error'
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    if (!socketRef.current) {
      setConnectionStatus('connecting');
      const socket = io(SOCKET_URL, {
        timeout: 5000,
        reconnection: true,
        reconnectionAttempts: 3,
        reconnectionDelay: 1000,
      });

      socketRef.current = socket;

      socket.on('connect', () => {
        setConnectionStatus('connected');
        socket.emit('register', 'visitor');
        setMessages(prev => [...prev, { type: 'system', text: 'Connected to chat server' }]);
      });

      socket.on('disconnect', reason => {
        setConnectionStatus('disconnected');
        let disconnectMsg = 'Disconnected from chat server';
        if (reason === 'io server disconnect') {
          disconnectMsg = 'Server disconnected you';
        } else if (reason === 'ping timeout') {
          disconnectMsg = 'Connection timeout - server not responding';
        } else if (reason === 'transport close') {
          disconnectMsg = 'Connection lost';
        }
        setMessages(prev => [...prev, { type: 'system', text: disconnectMsg }]);
      });

      socket.on('connect_error', error => {
        setConnectionStatus('error');
        let errorMsg = 'Failed to connect to chat server';
        if (error.message.includes('xhr poll error')) {
          errorMsg = 'Cannot reach server - please try again later';
        } else if (error.message.includes('timeout')) {
          errorMsg = 'Connection timeout - server may be down';
        }
        setMessages(prev => [...prev, { type: 'system', text: errorMsg }]);
      });

      socket.on('reconnect', () => {
        setConnectionStatus('connected');
        setMessages(prev => [...prev, { type: 'system', text: 'Reconnected to chat server' }]);
      });

      socket.on('system', msg => {
        setMessages(prev => [...prev, { type: 'system', text: msg }]);
      });

      socket.on('chat message', msg => {
        setMessages(prev => [...prev, { type: 'admin', text: msg }]);
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [open]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = e => {
    e.preventDefault();
    if (!input.trim() || !socketRef.current) return;

    if (socketRef.current.connected) {
      socketRef.current.emit('chat message', input);
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
          <div style={{ flex: 1, overflowY: 'auto', padding: 12, background: '#f9fafb' }}>
            {messages.length === 0 && (
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
              disabled={connectionStatus !== 'connected'}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: 15,
                padding: 8,
                borderRadius: 6,
                opacity: connectionStatus === 'connected' ? 1 : 0.5,
              }}
            />
            <button
              type='submit'
              disabled={connectionStatus !== 'connected'}
              style={{
                marginLeft: 8,
                background: connectionStatus === 'connected' ? '#ec4899' : '#9ca3af',
                color: 'white',
                border: 'none',
                borderRadius: 6,
                padding: '0 16px',
                fontWeight: 600,
                cursor: connectionStatus === 'connected' ? 'pointer' : 'not-allowed',
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

export default LiveChatWidget;
