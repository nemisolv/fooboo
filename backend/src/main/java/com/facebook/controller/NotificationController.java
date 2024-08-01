package com.facebook.controller;


import com.facebook.payload.notification.CreateNotificationRequest;
import com.facebook.payload.notification.NotificationResponseDTO;
import com.facebook.security.CurrentUser;
import com.facebook.security.UserPrincipal;
import com.facebook.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${app.api_prefix}/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping
    public ResponseEntity<List<NotificationResponseDTO>> getNotifications(@CurrentUser UserPrincipal userPrincipal) {
        return ResponseEntity.ok(notificationService.getNotifications(userPrincipal.getId()));
    }

    @PostMapping
    public ResponseEntity<NotificationResponseDTO> createNotification(@RequestBody CreateNotificationRequest createRequest) {
        return ResponseEntity.ok(notificationService.createNotification(createRequest));
    }

    @PatchMapping("/{notificationId}/mark_as_seen")
    public ResponseEntity<?> markAsSeen(@PathVariable Long notificationId) {
        notificationService.markAsSeen(notificationId);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/mark_all_as_seen")
    public ResponseEntity<?> markAllAsSeen(@CurrentUser UserPrincipal userPrincipal) {
        notificationService.markAllAsSeen(userPrincipal.getId());
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{notificationId}")
    public ResponseEntity<?> deleteNotification(@PathVariable Long notificationId) {
        notificationService.deleteNotification(notificationId);
        return ResponseEntity.noContent().build();
    }
}
