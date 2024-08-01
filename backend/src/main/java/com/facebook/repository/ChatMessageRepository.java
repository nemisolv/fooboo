package com.facebook.repository;

import com.facebook.entity.conversation.ChatMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatMessageRepository extends JpaRepository<ChatMessage,Long> {
    Page<ChatMessage> findAllByChatRoomIdOrderByCreatedAtAsc(Long chatRoomId, Pageable pageable);

}
