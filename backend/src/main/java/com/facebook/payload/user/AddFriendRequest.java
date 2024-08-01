package com.facebook.payload.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AddFriendRequest {
    // the id of the user who receives the friend request
    private Long receiverId;
}
