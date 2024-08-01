package com.facebook.helper;

import com.facebook.entity.Notification;
import com.facebook.entity.Post;
import com.facebook.entity.type.NotificationType;
import com.facebook.entity.type.PostScope;
import com.facebook.entity.user.User;
import com.facebook.payload.notification.CreateNotificationRequest;
import com.facebook.payload.notification.NotificationResponseDTO;
import com.facebook.service.NotificationService;
import com.facebook.util.Utility;
import jdk.jshell.execution.Util;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class NotificationHelper {
    private final SimpMessagingTemplate messagingTemplate;
    private final NotificationService notificationService;





    public void buildPostNotification(NotificationType type, Post post, User actor, String identifier) {
        switch (type){
            case NEW_POST -> {
                switch (post.getScope()) {
                    case FRIENDS -> {
                        post.getAuthor().getFriends().forEach(friend -> {
                            Notification newNotification = Notification.builder()
                                    .actor(actor)
                                    .recipient(friend)
                                    .content(Utility.generateContentLink(type,actor.getFirstName() + " " + actor.getLastName()))
                                    .type(type)
                                    .link(Utility.createLink(type, identifier))
                                    .seen(false)
                                    .build();
                            NotificationResponseDTO savedNotification = notificationService.createNotification(newNotification);
                            messagingTemplate.convertAndSendToUser(friend.getId().toString(), "/queue/notifications", savedNotification);
                        });

                    }
                }

            }
        }
    }

    public void buildFriendNotification(NotificationType type, User sender, User recipient, String identifier) {
        Notification newNotification = Notification.builder()
                .actor(sender)
                .recipient(recipient)
                .content(Utility.generateContentLink(type,sender.getFirstName() + " " + sender.getLastName()))
                .type(type)
                .link(Utility.createLink(type, identifier))
                .seen(false)
                .build();
        NotificationResponseDTO savedNotification = notificationService.createNotification(newNotification);
        messagingTemplate.convertAndSendToUser(recipient.getId().toString(), "/queue/notifications", savedNotification);
    }
}
