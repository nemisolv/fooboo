import { privateRequest, publicRequest } from './axiosConfig';

class PostApi {
  static async fetchPosts() {
    const limit = 10;
    const page = 1;
    const sort_dir = 'desc';

    return await publicRequest.get('/posts', {
      params: {
        limit,
        page,
        sort_dir,
      },
    });
  }
  static async fetchPostById(postId) {
    return await publicRequest.get(`/posts/${postId}`);
  }
  static async createPost(data) {
    return await privateRequest.post('/posts', data);
  }
  static async reactOnPost(data) {
    return await privateRequest.post(`/posts/reaction`, data);
  }

  static async unReactOnPost(data) {
    console.log("🚀 ~ PostApi ~ unReactOnPost ~ data:", data);
    return await privateRequest.delete(`/posts/reaction`, { data });
  }

  static async fetchPostsByUserId(userId) {
    return await publicRequest.get(`/posts/user/${userId}`);
  }

}

export default PostApi;
