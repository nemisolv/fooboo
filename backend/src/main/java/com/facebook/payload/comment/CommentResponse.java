package com.facebook.payload.comment;

import com.facebook.payload.DateAuditPayload;
import com.facebook.payload.user.VeryShortUserInfo;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentResponse extends DateAuditPayload {
    private Long id;
    private Long parentId;
    private String text;
    private Long postId; // ID of the post to which the comment belongs
    private VeryShortUserInfo user; // ID of the comment author
    private int repliesCount;
    private int reactionsCount;
    private boolean replied;
    private boolean deleted;



    // Constructors, getters, setters
}
