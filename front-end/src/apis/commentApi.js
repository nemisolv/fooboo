import { privateRequest, publicRequest } from '@/apis/axiosConfig.js';

class CommentApi {

  static async getComments(data) {
    const { postId, options } = data;

    return await publicRequest.get(`/posts/${postId}/comments`, {
      params: {
        ...options,
      },

    });
  }

  static async getReplies(commentId,options) {
    return await publicRequest.get(`/comments/${commentId}/replies`, {
      params: {
        ...options,
      },
    });
  }

  static async addComment(data) {
    return await privateRequest.post('/comments', data);
  }

  static async deleteComment(commentId) {
    return await privateRequest.delete(`/comments/${commentId}`);
  }

  static async updateComment(data) {
    return await privateRequest.patch(`/comments/${data.id}`,data);
  }

  static async fetchPreviewComments(postId) {
    return await publicRequest.get(`/comments/preview/${postId}/post`);
  }


}

export default CommentApi;