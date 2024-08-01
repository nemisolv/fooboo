package com.facebook.controller;

import com.facebook.entity.type.UserMessagingStatus;
import com.facebook.exception.ResourceNotFoundException;
import com.facebook.payload.conversation.ChatMessageResponse;
import com.facebook.payload.conversation.CreateChatMessage;
import com.facebook.payload.conversation.NotificationType;
import com.facebook.payload.conversation.ShortNotification;
import com.facebook.service.ChatMessageService;
import com.facebook.service.ChatRoomService;
import com.facebook.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;


@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("${app.api_prefix}/conversations")
public class ChatMessageController {
    private final ChatMessageService chatMessageService;
    private final ChatRoomService chatRoomService;
    private final UserService userService;

    private final SimpMessagingTemplate messagingTemplate;

        @MessageMapping("/user/addUser")
        public void addUser(@Payload Long userId, SimpMessageHeaderAccessor headerAccessor) throws ResourceNotFoundException {

            String socketId = messagingTemplate.getUserDestinationPrefix() + userId;
            headerAccessor.getSessionAttributes().put("socketId", socketId);

            userService.toggleUserMessagingStatus(userId,UserMessagingStatus.ONLINE);
            ShortNotification userConnected = ShortNotification.builder()
                    .content(userId.toString())
                    .type(NotificationType.USER_CONNECTED)
                    .senderId(userId)
                    .build();

            messagingTemplate.convertAndSend("/topic/public", userConnected);
        }

    @MessageMapping("/sendMessage")
    public void sendMessage(@Payload CreateChatMessage createChatMessage) {
        System.out.println("Message: " + createChatMessage.getContent());
        Long receiverId = createChatMessage.getRecipientId();
//        String receiverSocketId = users.get(receiverId);
//        System.out.println("Receiver socket id: " + receiverSocketId);
//        if (receiverSocketId != null) {
        ChatMessageResponse chatMessageResponse = chatMessageService.save(createChatMessage);
        messagingTemplate.convertAndSendToUser(String.valueOf(createChatMessage.getRecipientId()), "/queue/messages", chatMessageResponse);
        messagingTemplate.convertAndSendToUser(String.valueOf(createChatMessage.getSenderId()), "/queue/messages", chatMessageResponse);
//        }else {
//            log.error("User not connected");
//        }
    }

    @MessageMapping("/disconnect")
    public void disconnect(@Payload String userId) {
//        users.remove(userId);
//        messagingTemplate.convertAndSend("/topic/getUsers", users);
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) throws ResourceNotFoundException {
        SimpMessageHeaderAccessor headerAccessor = SimpMessageHeaderAccessor.wrap(event.getMessage());
//        Long userId = (Long) headerAccessor.getSessionAttributes().get("userId");
//        if (userId != null) {
//            // Update user's status to offline
//            userService.toggleUserMessagingStatus(userId, UserMessagingStatus.OFFLINE);
//        }
        String socketId = (String) headerAccessor.getSessionAttributes().get("socketId");
        if (socketId != null) {
            // Remove user from users map
            Long userId =Long.valueOf( socketId.substring(socketId.lastIndexOf('/') + 1));
            userService.toggleUserMessagingStatus(userId, UserMessagingStatus.OFFLINE);
            // send userId to all clients
            ShortNotification userDisconnected = ShortNotification.builder()
                    .content(userId.toString())
                    .type(NotificationType.USER_DISCONNECTED)
                    .senderId(userId)
                    .build();

            messagingTemplate.convertAndSend("/topic/public", userDisconnected);

        }
    }




//    @GetMapping("/{roo")
//    public ResponseEntity<?> getChatMessages(@PathVariable Long senderId, @PathVariable Long recipientId) {
//        return ResponseEntity.ok(chatMessageService.getChatMessages(senderId, recipientId));
//    }
}
