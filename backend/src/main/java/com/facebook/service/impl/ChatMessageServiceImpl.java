package com.facebook.service.impl;

import com.facebook.entity.conversation.ChatMessage;
import com.facebook.entity.conversation.ChatRoom;
import com.facebook.entity.user.User;
import com.facebook.payload.PagedResponse;
import com.facebook.payload.conversation.ChatMessageResponse;
import com.facebook.payload.conversation.CreateChatMessage;
import com.facebook.repository.ChatMessageRepository;
import com.facebook.repository.ChatRoomRepository;
import com.facebook.repository.UserRepository;
import com.facebook.service.ChatMessageService;
import com.facebook.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatMessageServiceImpl implements ChatMessageService {

    private final ChatMessageRepository chatMessageRepo;
    private final UserRepository userRepo;
    private final ChatRoomRepository chatRoomRepo;
    private final ChatRoomService chatRoomService;
    private final ModelMapper modelMapper;

    @Override
    public ChatMessageResponse save(CreateChatMessage message) {
        Long chatRoomId = message.getChatRoomId();
        ChatRoom chatRoom = chatRoomRepo.findById(chatRoomId).orElseThrow(() -> new RuntimeException("Chat room not found"));
        User sender  = userRepo.findById(message.getSenderId()).orElseThrow(() -> new RuntimeException("User not found"));


        ChatMessage chatMessage = ChatMessage.builder()
                .chatRoom(chatRoom)
                .sender(sender)
                .content(message.getContent())
                .build();
        ChatMessage savedChatMessage = chatMessageRepo.save(chatMessage);
        chatRoom.setLastMessageAt(LocalDateTime.now());
        chatRoom.setLastMessage(savedChatMessage);

        chatRoomRepo.save(chatRoom);
        return  modelMapper.map(savedChatMessage, ChatMessageResponse.class);
    }

    @Override
    public PagedResponse<ChatMessageResponse> getChatMessages(Long roomId, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize);
        Page<ChatMessage> chatMessages = chatMessageRepo.findAllByChatRoomIdOrderByCreatedAtAsc(roomId, pageable);
        List<ChatMessageResponse> content = chatMessages.getContent().stream().map(msg -> modelMapper.map(msg, ChatMessageResponse.class)).toList();
        PagedResponse<ChatMessageResponse>  response = PagedResponse.<ChatMessageResponse>builder()
                .metadata(content)
                .pageNo(pageNo)
                .pageSize(pageSize)
                .totalElements(chatMessages.getTotalElements())
                .totalPages(chatMessages.getTotalPages())
                .last(chatMessages.isLast())
                .build();

        return response;
    }
}
