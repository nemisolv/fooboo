package com.facebook.service.impl;


import com.facebook.entity.Comment;
import com.facebook.entity.Post;
import com.facebook.entity.type.NotificationType;
import com.facebook.entity.type.PostScope;
import com.facebook.entity.type.PostStatus;
import com.facebook.entity.type.PostType;
import com.facebook.entity.Reaction;
import com.facebook.entity.user.User;
import com.facebook.exception.BadRequestException;
import com.facebook.helper.NotificationHelper;
import com.facebook.payload.PagedResponse;
import com.facebook.payload.comment.CommentResponse;
import com.facebook.payload.post.PostDTO;
import com.facebook.payload.post.SharePostRequest;
import com.facebook.payload.post.VeryShortInfoPost;
import com.facebook.payload.reaction.ReactionPostResponseDTO;
import com.facebook.payload.user.VeryShortUserInfo;
import com.facebook.repository.CommentRepository;
import com.facebook.repository.PostRepository;
import com.facebook.repository.UserRepository;
import com.facebook.security.UserPrincipal;
import com.facebook.service.PostService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepo;
    private final ModelMapper modelMapper;
    private final UserRepository userRepo;
    private final CommentRepository commentRepo;
    private final NotificationHelper notifyHelper;
    @Override
    public PagedResponse<PostDTO> listByPage(int page, int size, String sortField, String sortDir, String keyword) {
        return null;
    }

    @Override
    public PagedResponse<PostDTO> listAllApprovedPost(int pageNo, int pageSize, String sortDir, String sortField) {
        Sort sort = Sort.by(sortField);
        sort = sortDir.equals("asc") ? sort.ascending() : sort.descending();

        Pageable pageable = PageRequest.of(pageNo - 1, pageSize, sort);

        Page<Post> page = postRepo.findAllApprovedPosts(pageable);

        return getPostResponse(pageNo, pageSize, page);
    }

    @Override
    public PostDTO createPost(PostDTO postDTO) {
        Post post = modelMapper.map(postDTO, Post.class);
        post = setPostEnum(post, postDTO);
        UserPrincipal principal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        userRepo.findByEmail(principal.getEmail()).ifPresent(post::setAuthor);

        Post savedPost = postRepo.save(post);
        PostDTO postResponse = modelMapper.map(savedPost, PostDTO.class);
        notifyHelper.buildPostNotification(NotificationType.NEW_POST, savedPost, savedPost.getAuthor(), savedPost.getId().toString());
        return postResponse;
    }

    @Override
    public PagedResponse<CommentResponse> listCommentsByPostId(Long postId, int pageNo, int pageSize, String sortDir, String sortField) {
        Sort sort = Sort.by(sortField);
        sort = sortDir.equals("asc") ? sort.ascending() : sort.descending();

        Pageable pageable = PageRequest.of(pageNo - 1, pageSize, sort);
        Page<Comment> page = commentRepo.findByPostIdAndDeletedIsFalse(postId, pageable);
        return getCommentResponse(pageNo, pageSize, page);

    }

    @Override
    public PagedResponse<PostDTO> getPostsByUserId(Long userId, int pageNo, int pageSize) {
        User user = userRepo.findById(userId).orElseThrow();
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize);
        Page<Post> page = postRepo.findByAuthorIdAndDeletedIsFalse(user.getId(), pageable);
        return getPostResponse(pageNo, pageSize, page);
    }

    @Override
    public PostDTO getPostById(Long postId) {
        Post post = postRepo.findById(postId).orElseThrow();
        return modelMapper.map(post, PostDTO.class);
    }




    public  PagedResponse<PostDTO>  getPostResponse(int pageNo, int pageSize, Page<Post> page) {
        List<PostDTO> content = page.getContent().stream()
                .map(post ->  {
                   PostDTO postRes =  modelMapper.map(post, PostDTO.class);


                    List<ReactionPostResponseDTO> reactionsDTO =new ArrayList<>();

                   List<Reaction> reactions = post.getReactions();

                   reactions.stream().map(reaction -> {
                       ReactionPostResponseDTO reactionPostResponseDTO = ReactionPostResponseDTO.builder()
                               .id(reaction.getId())
                                        .type(reaction.getType().getValue())
                                        .postId(reaction.getPost().getId())
                                        .user(modelMapper.map(reaction.getUser(), VeryShortUserInfo.class))
                                        .build();


                       reactionsDTO.add(reactionPostResponseDTO);
                       postRes.setReactions(reactionsDTO);

                       return reactionPostResponseDTO;}
                   ).toList();


                     return postRes;
                }).toList();
        long totalElements = page.getTotalElements();
        int totalPages = page.getTotalPages();
        boolean isLast = page.isLast();

// keep in mind that: specify a PageResponse type:)))
        PagedResponse postResponse = PagedResponse.<PostDTO>builder().metadata(content)
                .totalElements(totalElements)
                .totalPages(totalPages)
                .last(isLast)
                .pageNo(pageNo)
                .pageSize(pageSize)
                .build();
        return postResponse;
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



    private Post setPostEnum(Post post, PostDTO postDTO) {
        PostStatus postStatus = PostStatus.fromValue(postDTO.getStatus());
        post.setStatus(postStatus);
        PostScope postScope  = PostScope.fromValue(postDTO.getScope());
        post.setScope(postScope);
        PostType postType = PostType.fromValue(postDTO.getType());
        post.setType(postType);
        return post;
    }


}
