import { privateRequest } from './axiosConfig';

export default class ConversationApi {
     static async getConversations() {
          return await privateRequest.get('/chatroom/all');
      }

  static async getCurrentConversation(data) {
    return await privateRequest.post('/chatroom/establish', data);
  }

  static async getMessagesByConversationId(conversationId) {
    return await privateRequest.get(`/chatroom/${conversationId}/messages`);
  }

  // static async getCurre
}
