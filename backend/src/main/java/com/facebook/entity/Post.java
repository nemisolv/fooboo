package com.facebook.entity;

import com.facebook.entity.type.PostScope;
import com.facebook.entity.type.PostStatus;
import com.facebook.entity.type.PostType;
import com.facebook.entity.user.User;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;


import java.util.List;
import java.util.Set;

@Entity
@Table(name = "posts")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Post extends DateAuditEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.STRING)
    private PostType type;
    private String background;
    @Column(columnDefinition = "TEXT")
    private String text;


    @ElementCollection
    private List<String> images;
    @Column(name = "reactions_count")
    private int reactionsCount = 0;
    @Column(name = "comments_count")
    private int commentsCount = 0;
    @Column(name = "shares_count")
    private int sharesCount = 0;




    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id",nullable = false)
    private User author;

    @Enumerated(EnumType.STRING)
    private PostScope scope;

    @Enumerated(EnumType.STRING)
    private PostStatus status;
    private boolean enabled = true;
    private boolean deleted = false;

    @ManyToOne
    @JoinColumn(name = "parent_post_id")
    private Post parentPost;


    @OneToMany(mappedBy = "post",cascade = CascadeType.ALL)

    private List<Comment> comments;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<Reaction> reactions;


    public void incrementReactionsCount() {
        this.reactionsCount++;
    }

    public void decrementReactionsCount() {
        this.reactionsCount--;
    }

    public void incrementCommentsCount() {
        this.commentsCount++;
    }

    public void decrementCommentsCount() {
        this.commentsCount--;
    }









}
