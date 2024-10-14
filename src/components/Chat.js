// src/components/Chat.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sendMessage, receiveMessage } from '../features/chat/chatSlice';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';

const Chat = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      // Dispatch the user's message
      dispatch(sendMessage({ text: inputMessage }));

      // Generate a reply based on the user's message
      let replyText = 'Hello from OtherUser!';
      if (inputMessage.toLowerCase().includes('how are you')) {
        replyText = 'I am fine, thank you!';
      } else if (inputMessage.toLowerCase().includes('hello')) {
        replyText = 'Hello! How can I help you today?';
      } else if (inputMessage.toLowerCase().includes('what is your name')) {
        replyText = 'I am ChatBot, nice to meet you!';
      } else if (inputMessage.toLowerCase().includes('bye')) {
        replyText = 'Goodbye! Have a great day!';
      }

      // Dispatch a reply message after a delay
      setTimeout(() => {
        dispatch(receiveMessage({ text: replyText }));
      }, 1000); // 1-second delay

      setInputMessage(''); // Clear the input field
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        p: 2,
        maxWidth: '500px',
        margin: '0 auto',
        backgroundColor: '#f0f4f8',
        borderRadius: '10px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
      }}
    >
      <Paper
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          p: 2,
          mb: 2,
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          boxShadow: 'inset 0px 0px 5px rgba(0, 0, 0, 0.1)',
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: msg.sender === 'User1' ? 'flex-end' : 'flex-start',
              mb: 2,
            }}
          >
            <Box
              sx={{
                backgroundColor: msg.sender === 'User1' ? '#d1e7ff' : '#a0e7a0',
                color: '#333',
                borderRadius: '10px',
                p: 1,
                maxWidth: '75%',
                textAlign: 'left',
              }}
            >
              <Typography variant="body1">
                {msg.text}
              </Typography>
              <Typography variant="caption" color="#666" display="block">
                {msg.timestamp}
              </Typography>
            </Box>
          </Box>
        ))}
      </Paper>

      <Box display="flex" alignItems="center" sx={{ backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.1)' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '10px 0 0 10px',
            },
          }}
        />
        <Button onClick={handleSendMessage} variant="contained" sx={{ borderRadius: '0 10px 10px 0', ml: 1, backgroundColor: '#1976d2' }}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Chat;
