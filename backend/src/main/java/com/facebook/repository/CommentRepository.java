package com.facebook.repository;

import com.facebook.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    Page<Comment> findByPostIdAndDeletedIsFalse(Long postId, Pageable pageable);
    List<Comment> findByPostIdAndDeletedIsFalse(Long postId);
    Page<Comment> findByParentId(Long parentId, Pageable pageable);


}
