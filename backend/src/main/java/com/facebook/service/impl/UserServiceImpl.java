package com.facebook.service.impl;

import com.facebook.entity.type.Gender;
import com.facebook.entity.type.NotificationType;
import com.facebook.entity.type.UserMessagingStatus;
import com.facebook.entity.user.Details;
import com.facebook.entity.user.User;
import com.facebook.exception.ResourceNotFoundException;
import com.facebook.helper.NotificationHelper;
import com.facebook.payload.UserProfile;
import com.facebook.payload.conversation.UserConversation;
import com.facebook.payload.user.*;
import com.facebook.repository.UserRepository;
import com.facebook.security.UserPrincipal;
import com.facebook.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepo;

    private final ModelMapper modelMapper;
    private final NotificationHelper notifyHelper;

    @Override
    public UserProfile createUser(User user) {
        return null;
    }

    @Override
    public UserProfile getUser(String id) {
        return null;
    }

    @Override
    public UserSummary getUserSummary(String email) throws ResourceNotFoundException {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        UserSummary userSummary = modelMapper.map(user, UserSummary.class);
        return userSummary;
    }

    @Override
    public List<UserProfile> getAllUsers() {
        return null;
    }

    @Override
    public UserProfile updateUser(User user) {
        return null;
    }

    @Override
    public void deleteUser(String id) {

    }

    @Override
    public UserSummary getCurrentUser(UserPrincipal user) {
        UserSummary userSummary = modelMapper.map(user, UserSummary.class);
        return userSummary;
    }

    @Override
    public void addFriendRequest(UserPrincipal userPrincipal, AddFriendRequest friendRequest) throws ResourceNotFoundException {
        Long receiverId = friendRequest.getReceiverId();
        User receiver = userRepo.findById(receiverId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        User sender = userRepo.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        // before adding friend, check if they are already friends
        if (receiver.getFriends().contains(sender)) {
            throw new ResourceNotFoundException("You are already friends");
        }
        if (receiver.getFriendRequests().contains(sender)) {
            throw new ResourceNotFoundException("You have already sent a friend request");
        }

        if (sender.equals(receiver)) {
            throw new ResourceNotFoundException("You cannot send a friend request to yourself");
        }

        receiver.addFriendRequest(sender);
        userRepo.save(receiver);
        notifyHelper.buildFriendNotification(NotificationType.ADD_FRIEND, sender, receiver, sender.getId().toString());
    }

    @Override
    public UserSummary acceptFriendRequest(UserPrincipal userPrincipal, AcceptFriendRequest acceptFriend) throws ResourceNotFoundException {
        Long senderId = acceptFriend.getSenderId();
        User sender = userRepo.findById(senderId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        User receiver = userRepo.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!receiver.getFriendRequests().contains(sender)) {
            throw new ResourceNotFoundException("You have not received a friend request from this user");
        }
        receiver.acceptFriendRequest(sender);
        receiver.removeFriendRequest(sender);
        userRepo.save(receiver);
        userRepo.save(sender);
        notifyHelper.buildFriendNotification(NotificationType.ACCEPT_FRIEND, receiver, sender, receiver.getId().toString());
        return modelMapper.map(sender, UserSummary.class);
    }

    @Override
    public List<RelatedInfoUserFriend> getAllFriends(UserPrincipal userPrincipal) throws ResourceNotFoundException {
        User user = userRepo.findById(userPrincipal.getId()).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        if (user.getFriends() != null) {
            return user.getFriends().stream()
                    .map(friend -> modelMapper.map(friend, RelatedInfoUserFriend.class))
                    .toList();
        }


        return null;
    }

    @Override
    public List<UserSummary> getFriendRequests(UserPrincipal userPrincipal) throws ResourceNotFoundException {
        User user = userRepo.findById(userPrincipal.getId()).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        if (user.getFriendRequests() != null) {
            return user.getFriendRequests().stream()
                    .map(friend -> modelMapper.map(friend, UserSummary.class))
                    .toList();
        }
        return null;
    }

    @Override
    public void toggleUserMessagingStatus(Long userId, UserMessagingStatus status) throws ResourceNotFoundException {
        User user = userRepo.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setStatus(status);
        if (status.equals(UserMessagingStatus.ONLINE)) {
            user.setLastLogin(LocalDateTime.now());
        }
        userRepo.save(user);
    }

    @Override
    public List<UserConversation> findAllConnectedUser() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Set<User> friends = user.getFriends();
        if (friends != null && friends.size() > 0) {
            return friends.stream().map(friend -> modelMapper.map(friend, UserConversation.class)).toList();
        }


        return null;
    }

//    @Override
//    public UserConversation getUserConversationById(Long userId) throws ResourceNotFoundException {
//        User user = userRepo.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
//        return modelMapper.map(user, UserConversation.class);
//    }

    @Override
    public UserOwnerProfile getUserProfile(Long userId) throws ResourceNotFoundException {
        User user = userRepo.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return modelMapper.map(user, UserOwnerProfile.class);
    }

    @Override
    public void updateUserInfo(UpdateInfo updateInfo, UserPrincipal userPrincipal) throws ResourceNotFoundException {
        User user = userRepo.findById(userPrincipal.getId()).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setFirstName(updateInfo.getFirstName());
        user.setLastName(updateInfo.getLastName());
        Details details = user.getDetails();
        if(details == null) {
            details = new Details();
        }
        if(updateInfo.getBio() != null && !updateInfo.getBio().isBlank()) {
            details.setBio(updateInfo.getBio());
        }
        details.setBirthDay(updateInfo.getBirthDay());
        details.setBirthMonth(updateInfo.getBirthMonth());
        details.setBirthYear(updateInfo.getBirthYear());
        details.setEducation(updateInfo.getEducation());
        details.setWork(updateInfo.getWork());
        details.setGender(Gender.fromValue(updateInfo.getGender()));


        userRepo.save(user);

    }

    @Override
    public List<UserSummary> getSentFriendRequests(UserPrincipal userPrincipal) throws ResourceNotFoundException {
        User user = userRepo.findById(userPrincipal.getId()).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        if (user.getSentFriendRequests() != null) {
            return user.getSentFriendRequests().stream()
                    .map(friend -> modelMapper.map(friend, UserSummary.class))
                    .toList();
        }
        return null;
    }

    @Override
    public void removeSentFriendRequests(UserPrincipal userPrincipal, Long id) throws ResourceNotFoundException {
        User user = userRepo.findById(userPrincipal.getId()).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        User friend = userRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.removeSentFriendRequest(friend);
        userRepo.save(user);
    }

    @Override
    public void declineFriendRequest(UserPrincipal userPrincipal, Long senderId) throws ResourceNotFoundException {
        User sender = userRepo.findById(senderId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        User receiver = userRepo.findById(userPrincipal.getId()).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        receiver.removeFriendRequest(sender);
        userRepo.save(receiver);
    }

    @Override
    public List<UserSummary> getSuggestionFriends(UserPrincipal userPrincipal) {
        User user = userRepo.findById(userPrincipal.getId()).orElseThrow();
        List<User> allValidUser = userRepo.findAllValidUser();
        List<User> friends = user.getFriends().stream().toList();
        List<UserSummary> suggestedFriends = allValidUser.stream()
                .filter(u -> !friends.contains(u) && !u.equals(user))
                .filter(u -> !u.getFriendRequests().contains(user))
                .filter(u -> !u.getSentFriendRequests().contains(user))
                .filter(u -> !u.equals(user))
                .filter(u -> !u.getFriends().contains(user))
                // include users with mutual friends
                .filter(u -> u.getFriends().stream().anyMatch(friend -> user.getFriends().contains(friend)))

                .map(u -> modelMapper.map(u, UserSummary.class))
                .toList();

        return suggestedFriends;
    }
}
