package com.facebook.controller;


import com.facebook.exception.ResourceNotFoundException;
import com.facebook.payload.ResponseObject;
import com.facebook.payload.conversation.UserConversation;
import com.facebook.payload.user.*;
import com.facebook.security.CurrentUser;
import com.facebook.security.UserPrincipal;
import com.facebook.service.AuthService;
import com.facebook.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${app.api_prefix}/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final AuthService authService;

    @GetMapping("/{userId}")
    public ResponseEntity<UserOwnerProfile> getUserProfileById(@PathVariable Long userId) throws ResourceNotFoundException {
        return ResponseEntity.ok(userService.getUserProfile(userId));
    }






    @GetMapping("/me")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<UserSummary> getCurrentUser(@CurrentUser UserPrincipal user) {
        return ResponseEntity.ok(userService.getCurrentUser(user));
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(HttpServletRequest request, HttpServletResponse response) {
        return ResponseEntity.ok(authService.refreshToken(request, response));
    }

    // conversation


    @PatchMapping("/update_info")
    public ResponseEntity<?> updateUserInfo(@RequestBody UpdateInfo updateInfo, @CurrentUser  UserPrincipal userPrincipal) throws ResourceNotFoundException {
        userService.updateUserInfo(updateInfo, userPrincipal);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) throws ResourceNotFoundException {
        authService.logout(request, response);
        return ResponseEntity.noContent().build();
    }



}
