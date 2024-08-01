package com.facebook.service.impl;

import com.facebook.entity.Comment;
import com.facebook.entity.Post;
import com.facebook.entity.user.User;
import com.facebook.exception.ResourceIsDeletedException;
import com.facebook.exception.ResourceNotFoundException;
import com.facebook.payload.PagedResponse;
import com.facebook.payload.comment.CommentRequest;
import com.facebook.payload.comment.CommentResponse;
import com.facebook.payload.comment.PreviewComment;
import com.facebook.repository.CommentRepository;
import com.facebook.repository.PostRepository;
import com.facebook.repository.UserRepository;
import com.facebook.security.UserPrincipal;
import com.facebook.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepo;
    private final UserRepository userRepo;
    private final PostRepository postRepo;
    private final ModelMapper modelMapper;

    @Transactional
    @Override
    public CommentResponse addComment(CommentRequest commentRequest) throws ResourceNotFoundException {
        Post post = postRepo.findById(commentRequest.getPostId()).orElseThrow(() -> new ResourceNotFoundException("Post not found"));
        post.incrementCommentsCount();
        UserPrincipal principal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepo.findByAccountName(principal.getAccountName()).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Comment comment = Comment.builder()
                .text(commentRequest.getText())
                .post(post)
                .user(user)
                .build();
        if (commentRequest.getParentId() == null) {
            // in case, this comment is top-level comment
            comment.setParent(null);
            comment.setReplied(false);
            // add comment
        } else {
            // add reply
            Comment parent = commentRepo.findById(commentRequest.getParentId()).orElseThrow(() -> new ResourceNotFoundException("Comment not found"));
            comment.setParent(parent);
            // note that, only the parent comment should increment the replies count, children comments should not
            parent.incrementRepliesCount();
            parent.setReplied(true);

            comment.setParent(parent);
        }
        Comment savedComment = commentRepo.save(comment);
        return modelMapper.map(savedComment, CommentResponse.class);
    }

    @Override
    public CommentResponse updateComment(Long id, CommentRequest commentRequest) throws ResourceNotFoundException, ResourceIsDeletedException {

        Optional<Post> postOptional = postRepo.findById(commentRequest.getPostId());
        if(postOptional.isPresent()) {
            Comment comment = commentRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Comment not found"));
            if(comment.isDeleted()) {
                throw new ResourceIsDeletedException("Comment is deleted");
            }
            comment.setText(commentRequest.getText());
            Comment updatedComment = commentRepo.save(comment);
            return modelMapper.map(updatedComment, CommentResponse.class);
        }else {
            throw new ResourceNotFoundException("Post not found");
        }

    }

    @Override
    public void deleteComment(Long id) throws ResourceNotFoundException, ResourceIsDeletedException {
        Optional<Comment> commentOptional = commentRepo.findById(id);
        if(commentOptional.isPresent()) {
            Comment comment = commentOptional.get();
            Comment parent = comment.getParent();
            if(parent != null) {

                // check valid parent comment
                if(parent.isDeleted()) {
                    throw new ResourceIsDeletedException("Parent comment is deleted");
                }
                // decrement the replies count of the parent comment
                parent.decrementRepliesCount();
                // if the parent comment has only one child, then it is no longer a replied comment
                if(parent.getChildren() !=null && parent.getChildren().size() == 1){
                    parent.setReplied(false);
//                    parent.setReactionsCount(0);
                }
                comment.setParent(parent);
            }

            comment.setDeleted(true);
            comment.getPost().decrementCommentsCount();
            comment.getChildren().forEach(child -> {
                child.setDeleted(true);
                child.getPost().decrementCommentsCount();
            });

            commentRepo.save(comment);
        }else {
            throw new ResourceNotFoundException("Comment not found");
        }

    }

    @Override
    public PagedResponse<CommentResponse> listReplies(Long parentCmt, int pageNo, int pageSize, String sortDir, String sortField) {
        Sort sort = Sort.by(sortField);
        sort = sortDir.equals("asc") ? sort.ascending() : sort.descending();

        Pageable pageable = PageRequest.of(pageNo - 1, pageSize, sort);
        Page<Comment> page = commentRepo.findByParentId(parentCmt, pageable);
        return getCommentResponse(pageNo, pageSize, page);
    }

    @Override
    public List<PreviewComment> previewCommentsByPostId(Long postId) {
//        Optional<Post> optionalPost = postRepo.findPostByIdAndDeletedFalseAndEnabledTrue(postId);
//        if(optionalPost.isPresent()){
//            Post post = optionalPost.get();
            List<Comment> comments = commentRepo.findByPostIdAndDeletedIsFalse(postId);
            return comments.stream().map(comment -> modelMapper.map(comment, PreviewComment.class)).toList();
    }

    private PagedResponse<CommentResponse> getCommentResponse(int pageNo, int pageSize, Page<Comment> page) {
        List<CommentResponse> content = page.getContent().stream()
                .map(comment -> modelMapper.map(comment, CommentResponse.class)).toList();
        long totalElements = page.getTotalElements();
        int totalPages = page.getTotalPages();
        boolean isLast = page.isLast();

        PagedResponse commentResponse = PagedResponse.<CommentResponse>builder().metadata(content)
                .totalElements(totalElements)
                .totalPages(totalPages)
                .last(isLast)
                .pageNo(pageNo)
                .pageSize(pageSize)
                .build();
        return commentResponse;
    }


}
