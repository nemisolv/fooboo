package com.facebook.entity.user;

import com.facebook.entity.BaseEntity;
import com.facebook.entity.type.RelationshipStatus;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "relationships")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Relationship extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user1_id", nullable = false)
    private User user1;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user2_id", nullable = false)
    private User user2;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RelationshipStatus status;

}