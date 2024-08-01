package com.facebook.repository;

import com.facebook.entity.conversation.ChatMessage;
import com.facebook.entity.conversation.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChatRoomRepository  extends JpaRepository<ChatRoom,Long> {
//    Optional<ChatRoom> findBySenderIdAndRecipientId(Long senderId, Long recipientId);

    Optional<ChatRoom> findByChatId(String chatId);

//    List<ChatMessage> findAllByRoomIdentifier(String roomIdentifier);

    Optional<ChatRoom> findByRoomIdentifier(String roomIdentifier);

    List<ChatRoom> findByParticipants_IdOrderByLastMessageAtDesc(Long userId);



}
