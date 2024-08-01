package com.facebook.payload.notification;

import lombok.*;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class CreateNotificationRequest {
    private Long actorId;
    // identifier is the id of the entity that the notification is about
    private String identifier;
    private Long recipientId;
    private String content;
    private String type;
}
