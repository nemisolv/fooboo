package com.facebook.controller;


import com.facebook.exception.ResourceNotFoundException;
import com.facebook.payload.ResponseObject;
import com.facebook.payload.user.AcceptFriendRequest;
import com.facebook.payload.user.AddFriendRequest;
import com.facebook.payload.user.RelatedInfoUserFriend;
import com.facebook.payload.user.UserSummary;
import com.facebook.security.CurrentUser;
import com.facebook.security.UserPrincipal;
import com.facebook.service.AuthService;
import com.facebook.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${app.api_prefix}/friends")
@RequiredArgsConstructor
public class FriendController {

    private final UserService userService;
    private final AuthService authService;

    // add new friend
    @PostMapping("/add-friend")
    public ResponseEntity<?> addFriendRequest(@CurrentUser UserPrincipal userPrincipal, @RequestBody AddFriendRequest friendRequest) throws ResourceNotFoundException {
        userService.addFriendRequest(userPrincipal, friendRequest);
        return ResponseEntity.noContent().build();
    }

    // accept friend request
    @PostMapping("/accept-friend")
    public ResponseEntity<?> acceptFriendRequest(@CurrentUser UserPrincipal userPrincipal, @RequestBody AcceptFriendRequest acceptFriend) throws ResourceNotFoundException {
        UserSummary user = userService.acceptFriendRequest(userPrincipal, acceptFriend);
        return ResponseEntity.ok(user);
    }

    // decline friend request received
    @DeleteMapping("/decline-friend/{senderId}")
    public ResponseEntity<?> declineFriendRequest(@CurrentUser UserPrincipal userPrincipal, @PathVariable Long senderId) throws ResourceNotFoundException {
        userService.declineFriendRequest(userPrincipal, senderId);
        return ResponseEntity.noContent().build();
    }


    // get all friends
    @GetMapping("/all")
    public ResponseEntity<List<RelatedInfoUserFriend>> getAllFriends(@CurrentUser UserPrincipal userPrincipal) throws ResourceNotFoundException {
        return ResponseEntity.ok(userService.getAllFriends(userPrincipal));
    }
    // get friend requests
    @GetMapping("/requests")
    public ResponseEntity<?> getFriendRequests(@CurrentUser UserPrincipal userPrincipal) throws ResourceNotFoundException {
        return ResponseEntity.ok(userService.getFriendRequests(userPrincipal));
    }

    // get sent friend requests
    @GetMapping("/sent-requests")
    public ResponseEntity<?> getSentFriendRequests(@CurrentUser UserPrincipal userPrincipal) throws ResourceNotFoundException {
        return ResponseEntity.ok(userService.getSentFriendRequests(userPrincipal));
    }

    // remove sent friend requests
    @DeleteMapping("/sent-requests/{id}")
    public ResponseEntity<?> removeSentFriendRequests(@CurrentUser UserPrincipal userPrincipal, @PathVariable Long id) throws ResourceNotFoundException {
        userService.removeSentFriendRequests(userPrincipal, id);
        return ResponseEntity.noContent().build();
    }


}
