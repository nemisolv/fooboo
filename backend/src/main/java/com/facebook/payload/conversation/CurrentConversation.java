package com.facebook.payload.conversation;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CurrentConversation {
    private String chatId;
    private UserConversation sender;
    private UserConversation recipient;
    private List<ChatMessageResponse> messages;

    public  enum Type {
        BIDIRECTIONAL_ESTABLISH
    }
}
