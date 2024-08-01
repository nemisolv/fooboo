import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  conversations: [],
  open: false,
  currentConversation: null,
  loading: false,
};

const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    getConversations: (state) => {
      state.loading = true;
    },
    getConversationsSuccess: (state, { payload }) => {
      state.conversations = payload;
      state.loading = false;
    },
    getConversationsFailure: (state) => {
      state.loading = false;
    },

    getCurrentConversation: (state) => {
      state.loading = true;
    },
    getCurrentConversationSuccess: (state, { payload }) => {
      state.currentConversation = payload;
      state.open = true;
      state.loading = false;
    },
    getBidiredtionalCurrentConversationSuccess: (state, { payload }) => {
     console.log("🚀 ~ payload:", payload)
     
        if(state.currentConversation?.id !== payload.id) {
          state.currentConversation = payload;
        }
    
      
      state.loading = false;
    },
    getCurrentConversationFailure: (state) => {
      state.loading = false;
    },
    closeCurrentConversation: (state) => {
      // state.currentConversation = null;
      state.open = false;
    },
    openCurrentConversation: (state) => {
      // state.currentConversation = null;
      state.open = true;
    },
    addMessageToCurrentConversation: (state, { payload }) => {
      if (state.currentConversation) {
        if (!state.currentConversation.messages.metadata) {
          state.currentConversation.messages['metadata'] = [];
        }
        state.currentConversation.messages?.metadata?.push(payload);
      }
      state.open = true;
    },

    getMessagesByConversationId: (state) => {
      state.loading = true;
    },
    getMessagesByConversationIdSuccess: (state, { payload }) => {
      state.currentConversation.messages = payload;
      state.loading = false;
    },
    getMessagesByConversationIdFailure: (state) => {
      state.loading = false;
    },
  },
});

export const {
  getConversations,
  getConversationsSuccess,
  getConversationsFailure,
  getCurrentConversation,
  getCurrentConversationSuccess,
  getCurrentConversationFailure,
  closeCurrentConversation,
  openCurrentConversation,
  addMessageToCurrentConversation,
  getBidiredtionalCurrentConversationSuccess,
  getMessagesByConversationId,
  getMessagesByConversationIdSuccess,
  getMessagesByConversationIdFailure,
} = conversationSlice.actions;

export default conversationSlice.reducer;
