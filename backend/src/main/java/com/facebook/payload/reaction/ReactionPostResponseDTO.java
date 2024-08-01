package com.facebook.payload.reaction;

import com.facebook.payload.DateAuditPayload;
import com.facebook.payload.user.UserSummary;
import com.facebook.payload.user.VeryShortUserInfo;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class ReactionPostResponseDTO  {
    private Long postId;
    private Long id;
    private String type;
    private VeryShortUserInfo user;



}
