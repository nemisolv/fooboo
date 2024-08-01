package com.facebook.repository;

import com.facebook.entity.ConfirmationEmail;
import com.facebook.entity.type.MailType;
import com.facebook.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ConfirmationEmailRepository extends JpaRepository<ConfirmationEmail,String> {

    Optional<ConfirmationEmail> findByUserId(Long userId);

    Optional<ConfirmationEmail> findByCodeAndUserIdAndType(String code, Long userId, MailType type);

    Optional<ConfirmationEmail> findByUserAndCode(User user, String code);

    List<ConfirmationEmail> findByTypeAndUserId(MailType type, Long userId);
}
