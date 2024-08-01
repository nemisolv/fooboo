package com.facebook.entity.user;

import com.facebook.entity.BaseEntity;
import com.facebook.entity.Role;
import com.facebook.entity.Comment;
import com.facebook.entity.Post;
import com.facebook.entity.Reaction;
import com.facebook.entity.type.UserMessagingStatus;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Entity
@Table(name = "users")
@EntityListeners(AuditingEntityListener.class)
@EqualsAndHashCode(onlyExplicitlyIncluded = true, callSuper = true)
public class User extends BaseEntity {

    @Column(nullable = false, unique = true, length = 50)
    private String accountName;
    @Column(nullable = false, unique = true)

    @EqualsAndHashCode.Include
    private String email;
    @Column(nullable = false)

    private String password;
    @Column(nullable = false, length = 50)
    private String firstName;
    private String lastName;
    private String picture;

    @Column(name = "cover_picture")
    private String coverPicture;

    private int friendsCount;

    @Enumerated(EnumType.STRING)
    private UserMessagingStatus status;

    private LocalDateTime lastLogin;


    private boolean verified;
        // control by admin
    @Builder.Default
    private boolean active= true;
    @Enumerated(EnumType.STRING)
    private Role role;





    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Post> posts = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Comment> comments = new ArrayList<>();


    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Reaction> reactions = new ArrayList<>();

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "details_id")
    private Details details = new Details();



    @ManyToMany
    @JoinTable(
            name = "user_friends",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "friend_id"))
    private Set<User> friends;


    @ManyToMany
    @JoinTable(
            name = "user_friend_requests",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "friend_request_id"))
    private Set<User> friendRequests;

    @ManyToMany
    @JoinTable(
            name = "user_sent_friend_requests",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "sent_friend_request_id"))

    private Set<User> sentFriendRequests;




@PrePersist
    private void setImagesDefault() {
    picture = "https://res.cloudinary.com/dasoc53qg/image/upload/v1711525462/facebook/users/frog-image-reddit.png";
    coverPicture = "https://res.cloudinary.com/dasoc53qg/image/upload/v1710692615/facebook/users/cover-img.jpg";
}

    public void acceptFriendRequest(User friend) {
        friends.add(friend);
        friend.getFriends().add(this);
        friendRequests.remove(friend);
        friend.getSentFriendRequests().remove(this);

    }

    public void removeFriend(User friend) {
        friends.remove(friend);
        friend.getFriends().remove(this);

    }

    public void addFriendRequest(User friend) {
        friendRequests.add(friend);
        friend.getSentFriendRequests().add(this);


    }

    public void removeFriendRequest(User friend) {
        friendRequests.remove(friend);
        friend.getSentFriendRequests().remove(this);
    }

    public void removeSentFriendRequest(User friend) {
        sentFriendRequests.remove(friend);
        friend.getFriendRequests().remove(this);

    }

    public void increaseFriendsCount() {
        friendsCount++;
    }

    public void decreaseFriendsCount() {
        friendsCount--;
    }



}
