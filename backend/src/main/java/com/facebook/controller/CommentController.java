package com.facebook.controller;

import com.facebook.exception.ResourceIsDeletedException;
import com.facebook.exception.ResourceNotFoundException;
import com.facebook.payload.ResponseMessage;
import com.facebook.payload.comment.CommentRequest;
import com.facebook.payload.comment.CommentResponse;
import com.facebook.payload.comment.PreviewComment;
import com.facebook.service.CommentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("${app.api_prefix}/comments")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    // Add comment
    @PostMapping
    public ResponseEntity<CommentResponse> addComment(@RequestBody @Valid CommentRequest commentRequest) throws ResourceNotFoundException {
        // Add comment
        CommentResponse commentResponse = commentService.addComment(commentRequest);
        URI location = UriComponentsBuilder.fromPath("/comments/{id}")
                .buildAndExpand(commentResponse.getId())
                .toUri();
        return ResponseEntity.created(location).body(commentResponse);
    }

    // update comment
    @PatchMapping("/{id}")
    public ResponseEntity<CommentResponse> updateComment(@PathVariable Long id, @RequestBody @Valid CommentRequest commentRequest)
            throws ResourceNotFoundException {
        // Update comment
        CommentResponse commentResponse = commentService.updateComment(id, commentRequest);
        return ResponseEntity.ok(commentResponse);
    }

    // delete comment
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteComment(@PathVariable Long id) throws ResourceNotFoundException {
        // Delete comment
        commentService.deleteComment(id);
        return new ResponseEntity<>(new ResponseMessage(204, "Comment deleted successfully"), HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{parentCmt}/replies")
    public ResponseEntity<?> listReplies(@RequestParam(value = "page_no", required = false, defaultValue = "1") int pageNo,
                                         @RequestParam(value = "page_size", required = false, defaultValue = "10") int pageSize,
                                         @RequestParam(value = "sort_dir", required = false, defaultValue = "asc") String sortDir,
                                         @RequestParam(value = "sortField", required = false, defaultValue = "createdAt") String sortField,
                                         @PathVariable Long parentCmt) throws ResourceNotFoundException {
        return ResponseEntity.ok(commentService.listReplies(parentCmt,pageNo, pageSize, sortDir, sortField));
    }

    @GetMapping("/preview/{postId}/post")
    public ResponseEntity<?> previewCommentsByPost(@PathVariable("postId") Long postId) {
        List<PreviewComment> previewComments = commentService.previewCommentsByPostId(postId);
return ResponseEntity.ok(previewComments);
    }
}
