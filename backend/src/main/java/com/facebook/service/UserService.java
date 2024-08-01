package com.facebook.service;

import com.facebook.entity.type.UserMessagingStatus;
import com.facebook.entity.user.User;
import com.facebook.exception.ResourceNotFoundException;
import com.facebook.payload.UserProfile;
import com.facebook.payload.conversation.UserConversation;
import com.facebook.payload.user.*;
import com.facebook.security.UserPrincipal;

import java.util.List;

public interface UserService {
    UserProfile createUser(User user);
    UserProfile getUser(String id);

    UserSummary getUserSummary(String email) throws ResourceNotFoundException;
    List<UserProfile> getAllUsers();
    UserProfile updateUser(User user);
    void deleteUser(String id);

    UserSummary getCurrentUser(UserPrincipal user);

    void addFriendRequest(UserPrincipal userPrincipal, AddFriendRequest friendRequest) throws ResourceNotFoundException;

    UserSummary acceptFriendRequest(UserPrincipal userPrincipal, AcceptFriendRequest acceptFriend) throws ResourceNotFoundException;

    List<RelatedInfoUserFriend> getAllFriends(UserPrincipal userPrincipal) throws ResourceNotFoundException;

    List<UserSummary> getFriendRequests(UserPrincipal userPrincipal) throws ResourceNotFoundException;

    void toggleUserMessagingStatus(Long userId, UserMessagingStatus status) throws ResourceNotFoundException;
    List<UserConversation>  findAllConnectedUser();

//    UserConversation getUserConversationById(Long userId) throws ResourceNotFoundException;

    UserOwnerProfile getUserProfile(Long userId) throws ResourceNotFoundException;

    void updateUserInfo(UpdateInfo updateInfo, UserPrincipal userPrincipal) throws ResourceNotFoundException;

    List<UserSummary> getSentFriendRequests(UserPrincipal userPrincipal) throws ResourceNotFoundException;

    void removeSentFriendRequests(UserPrincipal userPrincipal, Long id) throws ResourceNotFoundException;

    void declineFriendRequest(UserPrincipal userPrincipal, Long senderId) throws ResourceNotFoundException;
}
