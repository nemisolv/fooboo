package com.facebook.entity.user;


import com.facebook.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Entity
@Table(name = "friend_requests")

public class FriendRequest extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "sender_id")
    private User sender; // User who sent the friend request

    @ManyToOne
    @JoinColumn(name = "receiver_id")
    private User receiver; // User who received the friend request

    @Column(name = "request_date")
    private LocalDateTime requestDate; // Date and time when the request was sent

    // Other fields, getters, setters...
}
