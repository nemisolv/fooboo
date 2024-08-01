package com.facebook.service;

import com.facebook.entity.Notification;
import com.facebook.payload.notification.CreateNotificationRequest;
import com.facebook.payload.notification.NotificationResponseDTO;

import java.util.List;

public interface NotificationService {
    List<NotificationResponseDTO> getNotifications(Long recipientId);

    NotificationResponseDTO createNotification(CreateNotificationRequest createRequest);
    NotificationResponseDTO createNotification(Notification notification);

    void markAsSeen(Long notificationId);

    void markAllAsSeen(Long recipientId);

    void deleteNotification(Long notificationId);
}
