import ConversationApi from '@/apis/conversationApi';
import { call, put } from 'redux-saga/effects';
import {
  getConversationsFailure,
  getConversationsSuccess,
  getCurrentConversationFailure,
  getCurrentConversationSuccess,
  getMessagesByConversationIdFailure,
  getMessagesByConversationIdSuccess,
} from '../slices/conversationSlice';
import { bidirectionalEstablish } from '@/socket/chatMessage';

export function* handleEstablishConversation({ payload }) {
  try {
    const data = yield call(ConversationApi.getCurrentConversation, payload);
    console.log('🚀 ~ function*handleEstablishConversation ~ data:', data);
    yield put(getCurrentConversationSuccess(data));
    bidirectionalEstablish({
      senderId: payload.senderId,
      recipientId: payload.recipientId,
    });
  } catch (error) {
    console.log('🚀 ~ function*handleEstablishConversation ~ error:', error);
    yield put(getCurrentConversationFailure());
  }
}

export function* handleGetConversations() {
  try {
    const data = yield call(ConversationApi.getConversations);
    console.log('🚀 ~ function*handleGetConversations ~ data:', data);
    yield put(getConversationsSuccess(data));
  } catch (error) {
    console.log('🚀 ~ function*handleGetConversations ~ error:', error);
    yield put(getConversationsFailure());
  }
}

export function* handleGetMessagesByConversationId({ payload }) {
  try {
    const data = yield call(ConversationApi.getMessagesByConversationId, payload);
    console.log('🚀 ~ function*handleGetMessagesByConversationId ~ data:', data);
    yield put(getMessagesByConversationIdSuccess(data));
  } catch (error) {
    console.log('🚀 ~ function*handleGetMessagesByConversationId ~ error:', error);
    yield put(getMessagesByConversationIdFailure());
  }
}
