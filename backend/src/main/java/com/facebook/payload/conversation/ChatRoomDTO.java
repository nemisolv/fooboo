package com.facebook.payload.conversation;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class ChatRoomDTO {
    private Long id;
    private String roomIdentifier;
    private List<UserConversation> participants;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime lastMessageAt;
    private ChatMessageResponse lastMessage;
    private Object type;

}
