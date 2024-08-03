package com.facebook.repository;

import com.facebook.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface PostRepository extends JpaRepository<Post,Long> {

    @Query("SELECT p FROM Post p WHERE p.status = 'ACTIVE' AND p.enabled = true AND p.deleted = false  ORDER BY p.createdAt DESC")
    Page<Post> findAllApprovedPosts(Pageable pageable);


    @Query("SELECT p FROM Post p WHERE p.status = 'ACTIVE' AND p.enabled = true AND p.deleted = false AND p.text LIKE %:keyword%  ORDER BY p.createdAt DESC")
    Page<Post> searchPostByUser(Pageable pageable, String keyword);

    Optional<Post> findPostByIdAndDeletedFalseAndEnabledTrue(Long postId);

    Page<Post> findByAuthorIdAndDeletedIsFalse(Long userId, Pageable pageable);

    @Query("SELECT p FROM Post p WHERE p.status ='ACTIVE' AND p.id = :postId AND p.deleted = false AND p.enabled = true")
    Optional<Post> findById(Long postId);
}
