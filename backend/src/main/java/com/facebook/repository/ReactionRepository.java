package com.facebook.repository;

import com.facebook.entity.Reaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReactionRepository extends JpaRepository<Reaction,Long> {
    Reaction findByUserIdAndPostId(Long userId, Long postId);
//    List<Reaction> findByPostId(Long postId);
}
