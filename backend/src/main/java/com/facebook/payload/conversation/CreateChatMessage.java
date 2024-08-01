package com.facebook.payload.conversation;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateChatMessage {
    private Long senderId;
    private Long recipientId;
    private String content;
    private String status;
    private Long chatRoomId;

}
