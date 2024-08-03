package com.facebook.controller;


import com.facebook.Constants;
import com.facebook.entity.Notification;
import com.facebook.payload.PagedResponse;
import com.facebook.payload.ResponseMessage;
import com.facebook.payload.post.PostDTO;
import com.facebook.payload.post.SharePostRequest;
import com.facebook.payload.reaction.ReactionPostRequestDTO;
import com.facebook.payload.reaction.ReactionPostResponseDTO;
import com.facebook.security.CurrentUser;
import com.facebook.security.UserPrincipal;
import com.facebook.service.PostService;
import com.facebook.service.ReactionService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("${app.api_prefix}/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;
    private final ModelMapper modelMapper;
    private final ReactionService reactionService;
    private final SimpMessagingTemplate messagingTemplate;

    @GetMapping
    public ResponseEntity<?> listAllApprovedPost(
            @RequestParam(value = "pageNo", required = false, defaultValue = "1") int pageNo,
            @RequestParam(value = "pageSize", required = false, defaultValue = "10") int pageSize,
            @RequestParam(value = "sortDir", required = false, defaultValue = "asc") String sortDir,
            @RequestParam(value = "sortField", required = false, defaultValue = "createdAt") String sortField,
            @RequestParam(value = "q", required = false) String keyword) {

        return ResponseEntity.ok(postService.listAllApprovedPost(pageNo, pageSize, sortDir, sortField));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPostById(@PathVariable("id") Long postId) {
        return ResponseEntity.ok(postService.getPostById(postId));
    }

    @PostMapping
    public ResponseEntity<?> createPost(@RequestBody PostDTO postDTO,
                                        @CurrentUser UserPrincipal userPrincipal) {
        PostDTO createdPost = postService.createPost(postDTO);

        // Create URI to the newly created post
        URI location = UriComponentsBuilder.fromPath("/posts/{id}")
                .buildAndExpand(createdPost.getId())
                .toUri();
        return ResponseEntity.created(location).body(createdPost);
    }

    @GetMapping("/{id}/comments")
    public ResponseEntity<?> listCommentsByPostId(@RequestParam(value = "page_no", required = false, defaultValue = "1") int pageNo,
                                                  @RequestParam(value = "page_size", required = false, defaultValue = "50") int pageSize,
                                                  @RequestParam(value = "sort_dir", required = false, defaultValue = "asc") String sortDir,
                                                  @RequestParam(value = "sortField", required = false, defaultValue = "createdAt") String sortField,
                                                  @PathVariable("id") Long postId) {
        return ResponseEntity.ok(postService.listCommentsByPostId(postId, pageNo, pageSize, sortDir, sortField));
    }

    @PostMapping("/reaction")
    public ResponseEntity<?> reactToPost(@RequestBody ReactionPostRequestDTO reactionReqDTO) {
        ReactionPostResponseDTO reactionPostResponseDTO = reactionService.reactToPost(reactionReqDTO);
        return ResponseEntity.ok(reactionPostResponseDTO);
    }

    @DeleteMapping("/reaction")
    public ResponseEntity<?> unReactToPost(@RequestBody ReactionPostRequestDTO reactionReqDTO) {
        reactionService.unReactToPost(reactionReqDTO);
        return ResponseEntity.ok(new ResponseMessage(200, "Un-reacted to post successfully"));
    }

    // get posts by user id
    @GetMapping("/user/{id}")
    public ResponseEntity<?> getPostsByUserId(@PathVariable("id") Long userId,
                                              @RequestParam(value = "pageNo", required = false, defaultValue = "1") int pageNo,
                                              @RequestParam(value = "pageSize", required = false, defaultValue = "10") int pageSize

    ) {
        return ResponseEntity.ok(postService.getPostsByUserId(userId, pageNo, pageSize));
    }



}
