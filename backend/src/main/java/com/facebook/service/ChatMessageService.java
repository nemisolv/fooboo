package com.facebook.service;

import com.facebook.payload.PagedResponse;
import com.facebook.payload.conversation.ChatMessageResponse;
import com.facebook.payload.conversation.CreateChatMessage;

public interface ChatMessageService {

    ChatMessageResponse save(CreateChatMessage message);

    PagedResponse<ChatMessageResponse> getChatMessages(Long roomId, int pageNo, int pageSize);
}
