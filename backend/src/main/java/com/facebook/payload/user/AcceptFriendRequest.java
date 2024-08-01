package com.facebook.payload.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AcceptFriendRequest {
    // the id of the user who sends the friend request
    private Long senderId;
}
