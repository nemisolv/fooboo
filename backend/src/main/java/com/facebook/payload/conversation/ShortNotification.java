package com.facebook.payload.conversation;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ShortNotification {
    private String content;
    private NotificationType type;
    private Long senderId;
//    private Long recipientId;

}
