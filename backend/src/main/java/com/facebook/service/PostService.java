package com.facebook.service;

import com.facebook.payload.PagedResponse;
import com.facebook.payload.comment.CommentResponse;
import com.facebook.payload.post.PostDTO;

public interface PostService {
    PagedResponse<PostDTO> listByPage(int page, int size,String sortField,String sortDir, String keyword);

//    PagedResponse<PostDTO> listAllApprovedPost(int pageNo, int pageSize, String sortDir, String sortField);
    PagedResponse<PostDTO> listAllApprovedPost(int pageNo, int pageSize, String sortDir, String sortField);

    PostDTO createPost(PostDTO postDTO);

    PagedResponse<CommentResponse> listCommentsByPostId(Long postId,int pageNo, int pageSize, String sortDir, String sortField);

    PagedResponse<PostDTO> getPostsByUserId(Long userId, int pageNo, int pageSize);


//    Post createPost(Post post);
//    Post getPost(String id);
//    List<Post> getPostsByUser(String userId);
//    List<Post> getPostsByUserAndFriends(String userId);
//    List<Post> getPostsByUserAndScope(String userId, Post.PostScope scope);
//    List<Post> getPostsByUserAndType(String userId, String type);
//    List<Post> getPostsByUserAndTypeAndScope(String userId, String type, Post.PostScope scope);
//    List<Post> getPostsByUserAndBackground(String userId, String background);
//    List<Post> getPostsByUserAndBackgroundAndScope(String userId, String background, Post.PostScope scope);
//    List<Post> getPostsByUserAndBackgroundAndType(String userId, String background, String type);
//    List<Post> getPostsByUserAndBackgroundAndTypeAndScope(String userId, String background, String type, Post.PostScope scope);
//    List<Post> getPostsByUserAndContent(String userId, String content);
//    List<Post> getPostsByUserAndContentAndScope(String userId, String content, Post.PostScope scope);
//    List<Post> getPostsByUserAndContentAndType(String userId, String content, String type);
//    List<Post> getPostsByUserAndContentAndTypeAndScope(String userId, String content, String type, Post.PostScope scope);
//    List<Post> getPostsByUserAndImages(String userId, List<String> images);
//    List<Post> getPostsByUserAndImagesAndScope(String userId, List<String> images, Post.PostScope scope);
//    List<Post> getPostsByUserAndImagesAndType(String userId, List<String> images, String type);
//    List<Post> getPostsByUserAndImagesAndTypeAndScope(String userId, List<String> images, String type, Post.PostScope scope);
//    List<Post> getPostsByUserAndLikes(String userId, List<User> likes);
//    List<Post> getPostsByUserAndLikesAndScope(String userId, List<User> likes, Post.PostScope scope);
//    List<Post> getPostsByUserAndComments(String userId, List<Comment> comments);
//    List<Post> getPostsByUserAndCommentsAndScope(String userId, List<Comment> comments, Post.PostScope scope);
//    List<Post> getPostsByUserAndCreatedAt(String userId, Date createdAt);
//    List<Post> getPostsByUserAndCreatedAtAndScope(String userId, Date createdAt, Post.PostScope scope);
//    List<Post> getPostsBy
}
