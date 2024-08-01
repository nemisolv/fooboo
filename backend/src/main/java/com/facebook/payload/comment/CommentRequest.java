package com.facebook.payload.comment;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentRequest {
    private Long id;
    private Long parentId; // ID of the parent comment (if any)
    @NotBlank(message = "Comment text is required")
    private String text;
    private Long postId; // ID of the post to which the comment belongs
//    private Long commentator; // ID of the comment author


    // Constructors, getters, setters
}
