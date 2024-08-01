package com.facebook.repository;

import com.facebook.entity.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByAccountName(String username);

    @Query("SELECT u FROM User u WHERE (u.firstName LIKE %?1%  OR u.lastName LIKE %?1% OR u.accountName LIKE %?1%) AND u.verified = true AND u.active = true")
    Page<User> searchUserByUser(String keyword, Pageable pageable);
}
