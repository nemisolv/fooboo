package com.facebook.service;

import com.facebook.exception.ResourceNotFoundException;
import com.facebook.payload.PagedResponse;
import com.facebook.payload.comment.CommentRequest;
import com.facebook.payload.comment.CommentResponse;
import com.facebook.payload.comment.PreviewComment;

import java.util.List;

public interface CommentService {

    CommentResponse addComment(CommentRequest commentRequest) throws ResourceNotFoundException;

    CommentResponse updateComment(Long id, CommentRequest commentRequest) throws ResourceNotFoundException;

    void deleteComment(Long id) throws ResourceNotFoundException;

    PagedResponse<CommentResponse> listReplies(Long parentCmt, int pageNo, int pageSize, String sortDir, String sortField);

    List<PreviewComment> previewCommentsByPostId(Long postId);

//    void addReply(Long postId, Long commentatorId, Long parentId, String content);
//
//    void deleteComment(Long commentId);
//
//    void deleteReply(Long replyId);
//
//    void likeComment(Long commentId, Long userId);
//
//    void unlikeComment(Long commentId, Long userId);
//
//    void likeReply(Long replyId, Long userId);
//
//    void unlikeReply(Long replyId, Long userId);
//
//    void markAsAnswer(Long commentId);
//
//
//    void unmarkAsAnswer(Long replyId);
//
//    void reportComment(Long commentId, Long userId);
//
//    void reportReply(Long replyId, Long userId);
//
//    void deleteReportedComment(Long commentId);
//
//    void deleteReportedReply(Long replyId);
//
//    void deleteComment(Long commentId, Long userId);
//
//    void deleteReply(Long replyId, Long userId);
//
//    void deleteComment(Long commentId, Long postId, Long userId);
//
//    void deleteReply(Long replyId, Long postId, Long userId);
//
//    void deleteComment(Long commentId, Long postId, Long parentId, Long userId);
//
//    void deleteReply(Long replyId, Long postId, Long parentId, Long userId);
//
//    void deleteComment(Long commentId, Long postId, Long parentId, Long userId, boolean isAnswer);
//
//    void deleteReply(Long replyId, Long postId, Long parentId, Long userId, boolean isAnswer);
//
//    void deleteComment(Long commentId, Long postId, Long parentId, Long userId, boolean isAnswer, boolean isReported);
//
//    void deleteReply(Long replyId, Long postId, Long parentId, Long userId, boolean isAnswer, boolean isReported);
//
//    void deleteComment(Long commentId, Long postId, Long parentId, Long userId, boolean isAnswer, boolean isReported, boolean isDeleted);
//
//    void deleteReply(Long replyId, Long postId, Long parentId, Long userId, boolean isAnswer, boolean isReported, boolean isDeleted);
//
//    void deleteComment(Long commentId, Long postId, Long parentId, Long userId, boolean isAnswer, boolean isReported, boolean isDeleted, boolean isReply);
//
//    void deleteReply(Long replyId, Long postId, Long parentId, Long userId, boolean isAnswer, boolean isReported, boolean isDeleted, boolean isReply);
}
