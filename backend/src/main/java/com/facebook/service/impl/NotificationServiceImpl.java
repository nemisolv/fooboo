package com.facebook.service.impl;

import com.facebook.entity.Notification;
import com.facebook.entity.type.NotificationType;
import com.facebook.entity.user.User;
import com.facebook.payload.notification.CreateNotificationRequest;
import com.facebook.payload.notification.NotificationResponseDTO;
import com.facebook.repository.NotificationRepository;
import com.facebook.repository.UserRepository;
import com.facebook.service.NotificationService;
import com.facebook.util.Utility;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {
    private final NotificationRepository notifyRepo;
    private final ModelMapper modelMapper;
    private final UserRepository userRepo;
    @Override
    public List<NotificationResponseDTO> getNotifications(Long recipientId) {
        List<Notification> notifications = notifyRepo.findAllByRecipientIdOrderByCreatedAtDesc(recipientId);
        return notifications.stream().map(notification -> modelMapper.map(notification, NotificationResponseDTO.class)).toList();
    }

    @Override
    public NotificationResponseDTO createNotification(CreateNotificationRequest createRequest) {
        User actor = userRepo.findById(createRequest.getActorId()).orElseThrow();
        User recipient = userRepo.findById(createRequest.getRecipientId()).orElseThrow();
        Notification notification = Notification.builder()
                .actor(actor)
                .recipient(recipient)
                .content(createRequest.getContent())
                .link(Utility.createLink(NotificationType.valueOf(createRequest.getType()), createRequest.getIdentifier()))
                .seen(false)
                .type(NotificationType.valueOf(createRequest.getType()))
                .build();
        Notification saved = notifyRepo.save(notification);
        return modelMapper.map(saved, NotificationResponseDTO.class);
    }

    @Override
    public NotificationResponseDTO createNotification(Notification notification) {
        Notification saved = notifyRepo.save(notification);
        return modelMapper.map(saved, NotificationResponseDTO.class);
    }

    @Override
    public void markAsSeen(Long notificationId) {
        Notification notification = notifyRepo.findById(notificationId).orElseThrow();
        notification.setSeen(true);
        notifyRepo.save(notification);
    }

    @Override
    public void markAllAsSeen(Long recipientId) {
        List<Notification> notifications = notifyRepo.findAllByRecipientIdOrderByCreatedAtDesc(recipientId);
        notifications.forEach(notification -> notification.setSeen(true));
        notifyRepo.saveAll(notifications);
    }

    @Override
    public void deleteNotification(Long notificationId) {
        notifyRepo.deleteById(notificationId);
    }
}
