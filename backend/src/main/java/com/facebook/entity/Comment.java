package com.facebook.entity;

import com.facebook.entity.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.List;

@Entity
@Table(name = "comments")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Comment extends  BaseEntity {

    @Column(columnDefinition = "TEXT")
    private String text;

    private boolean replied = false;

    @JsonIgnore
    @Column(columnDefinition = "BOOLEAN DEFAULT FALSE")
    private boolean deleted;

    @Column(name = "reactions_count")
    private int reactionsCount = 0;

    @Column(name = "replies_count")
    private int repliesCount = 0;


    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Comment parent;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    private List<Comment> children;

    @OneToMany(mappedBy = "comment", cascade = CascadeType.ALL)
    private List<Reaction> reactions;



    public void incrementRepliesCount() {
        this.repliesCount++;
    }

    public void decrementRepliesCount() {
        if (this.repliesCount > 0) {
            this.repliesCount--;
        }
    }


    // Methods to handle reactions
//    public void addReaction(ReactionType reaction) {
//        reactions.add(reaction);
//        reactionsCount++;
//    }
//
//    public void removeReaction(ReactionType reaction) {
//        reactions.remove(reaction);
//        reactionsCount--;
//    }


}