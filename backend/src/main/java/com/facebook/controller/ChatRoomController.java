package com.facebook.controller;

import com.facebook.payload.conversation.ChatRoomDTO;
import com.facebook.payload.conversation.CurrentConversation;
import com.facebook.payload.conversation.RequiredSenderIdRecipientId;
import com.facebook.security.CurrentUser;
import com.facebook.security.UserPrincipal;
import com.facebook.service.ChatMessageService;
import com.facebook.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${app.api_prefix}/chatroom")
@RequiredArgsConstructor

public class ChatRoomController {
    private final ChatRoomService chatRoomService;
    private final ChatMessageService chatMessageService;

    private final SimpMessagingTemplate messagingTemplate;

    @PostMapping("/establish")
    public ResponseEntity<ChatRoomDTO> establishChatRoom(
            @RequestBody RequiredSenderIdRecipientId requiredSenderIdRecipientId
    ) {
        ChatRoomDTO chatRoom = chatRoomService.createOrGetChatRoom(requiredSenderIdRecipientId);

        return ResponseEntity.ok(chatRoom);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllChatRooms(
            @CurrentUser UserPrincipal userPrincipal
            ) {
        return ResponseEntity.ok(chatRoomService.getChatRooms(userPrincipal.getId()));
    }

    @GetMapping("/{roomId}/messages")
    public ResponseEntity<?> getChatMessages(@PathVariable Long roomId,
    @RequestParam(value="pageNo", defaultValue = "1" ) int pageNo,
    @RequestParam(value="pageSize", defaultValue = "100") int pageSize

    ) {
        return ResponseEntity.ok(chatMessageService.getChatMessages(roomId, pageNo, pageSize));
    }

    @MessageMapping("/bidirectionalEstablish")
    public void bidirectionalEstablishChatRoom(
            @RequestBody RequiredSenderIdRecipientId requiredSenderIdRecipientId
    ) {
        ChatRoomDTO chatRoom = chatRoomService.createOrGetChatRoom(requiredSenderIdRecipientId);
        chatRoom.setType(CurrentConversation.Type.BIDIRECTIONAL_ESTABLISH);
        messagingTemplate.convertAndSendToUser(
                String.valueOf(requiredSenderIdRecipientId.getRecipientId()),
                "/queue/notifications",
                chatRoom
        );
    }



}
