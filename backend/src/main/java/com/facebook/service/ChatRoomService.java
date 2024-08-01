package com.facebook.service;

import com.facebook.payload.conversation.ChatMessageResponse;
import com.facebook.payload.conversation.ChatRoomDTO;
import com.facebook.payload.conversation.CurrentConversation;
import com.facebook.payload.conversation.RequiredSenderIdRecipientId;

import java.util.List;
import java.util.Optional;

public interface ChatRoomService {

ChatRoomDTO createOrGetChatRoom(RequiredSenderIdRecipientId requiredSenderIdRecipientId);
List<ChatRoomDTO> getChatRooms(Long userId);
}
