package com.facebook.payload.reaction;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReactionPostRequestDTO {
    private Long postId;
    // in case user want to remove his reaction
    private Long reactionId;
    private String reactionType;
}
