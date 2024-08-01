import { takeLatest } from 'redux-saga/effects';
import { getMessagesByConversationId, getConversations, getCurrentConversation } from '../slices/conversationSlice';
import { handleEstablishConversation, handleGetConversations, handleGetMessagesByConversationId } from './handle';

export default function* conversationSaga() {
  yield takeLatest(getCurrentConversation.type, handleEstablishConversation);
  yield takeLatest(getConversations.type, handleGetConversations);
  yield takeLatest(getMessagesByConversationId.type, handleGetMessagesByConversationId);
}
