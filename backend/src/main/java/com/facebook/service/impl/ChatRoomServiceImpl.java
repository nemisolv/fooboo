package com.facebook.service.impl;

import com.facebook.entity.conversation.ChatMessage;
import com.facebook.entity.conversation.ChatRoom;
import com.facebook.entity.user.User;
import com.facebook.payload.conversation.*;
import com.facebook.repository.ChatRoomRepository;
import com.facebook.repository.UserRepository;
import com.facebook.service.ChatRoomService;
import com.facebook.util.Utility;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChatRoomServiceImpl implements ChatRoomService {

    private final ChatRoomRepository chatRoomRepo;
    private final UserRepository userRepo;
    private final ModelMapper modelMapper;


    @Override
    @Transactional
    public ChatRoomDTO createOrGetChatRoom(RequiredSenderIdRecipientId requiredSenderIdRecipientId) {
        Long senderId = requiredSenderIdRecipientId.getSenderId();
        Long recipientId = requiredSenderIdRecipientId.getRecipientId();
        User sender = userRepo.findById(senderId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid sender ID"));
        User recipient = userRepo.findById(recipientId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid recipient ID"));

        String roomIdentifier = generateRoomIdentifier(senderId, recipientId);
        ChatRoom chatRoom = chatRoomRepo.findByRoomIdentifier(roomIdentifier)
                .orElseGet(() -> {
                    ChatRoom newChatRoom = ChatRoom.builder()
                            .roomIdentifier(roomIdentifier)
                            .participants(List.of(sender, recipient))
                            .build();
                    return chatRoomRepo.save(newChatRoom);
                });

        return modelMapper.map(chatRoom, ChatRoomDTO.class);
    }

    @Override
    public List<ChatRoomDTO> getChatRooms(Long userId) {
        List<ChatRoom> chatRooms = chatRoomRepo.findByParticipants_IdOrderByLastMessageAtDesc(userId);
        return chatRooms.stream()
                .map(chatRoom -> modelMapper.map(chatRoom, ChatRoomDTO.class))
                .toList();
    }

    private String generateRoomIdentifier(Long senderId, Long recipientId) {
        return senderId < recipientId ? senderId + "-" + recipientId : recipientId + "-" + senderId;
    }
}
