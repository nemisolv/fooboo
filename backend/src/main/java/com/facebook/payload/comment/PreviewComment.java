package com.facebook.payload.comment;

import com.facebook.payload.user.VeryShortUserInfo;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PreviewComment {
    private int commentsCount;
    private VeryShortUserInfo user;
}
