import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  currentUser: 'User1', // Mock user
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    sendMessage: (state, action) => {
      state.messages.push({
        ...action.payload,
        timestamp: new Date().toLocaleTimeString(),
        sender: state.currentUser,
      });
    },
    receiveMessage: (state, action) => {
      state.messages.push({
        ...action.payload,
        timestamp: new Date().toLocaleTimeString(),
        sender: 'OtherUser', // Simulating another user
      });
    },
  },
});

export const { sendMessage, receiveMessage } = chatSlice.actions;
export default chatSlice.reducer;
