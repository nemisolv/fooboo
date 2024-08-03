package com.facebook.payload.post;

import com.facebook.payload.DateAuditPayload;
import com.facebook.payload.reaction.ReactionPostResponseDTO;
import com.facebook.payload.user.UserSummary;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PostDTO extends DateAuditPayload {
    private Long id;
    private String type;
    private String background;
    @NotBlank(message = "Post text is required")

    private String text;
    private List<String> images;
    private UserSummary author;
    private String scope;

    private String status;
    private List<UserSummary> likes;
    private List<ReactionPostResponseDTO> reactions;
    private int reactionsCount;
    private int commentsCount;
    private int sharesCount;






}
