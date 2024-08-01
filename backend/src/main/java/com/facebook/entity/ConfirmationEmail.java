package com.facebook.entity;

import com.facebook.entity.type.MailType;
import com.facebook.entity.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "confirmation_emails")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ConfirmationEmail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private String code;

    @Enumerated(EnumType.STRING)
    private MailType type;

    private boolean revoked;



    @Column(name = "confirmed_at")
    private LocalDateTime confirmedAt;
    @Column(name = "expired_at")

    private LocalDateTime expiredAt;


}