package com.facebook.payload.notification;

import com.facebook.payload.user.VeryShortUserInfo;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotificationResponseDTO {
    private Long id;
    private String content;
    private String link;
    private boolean seen;
    private String type;
    private VeryShortUserInfo actor;
    private VeryShortUserInfo recipient;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;
}
