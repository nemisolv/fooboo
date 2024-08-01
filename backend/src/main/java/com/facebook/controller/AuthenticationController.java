package com.facebook.controller;

import com.facebook.exception.BadRequestException;
import com.facebook.exception.ResourceInUseException;
import com.facebook.exception.ResourceNotFoundException;
import com.facebook.payload.ResponseMessage;
import com.facebook.payload.ResponseObject;
import com.facebook.payload.auth.AuthenticationRequest;
import com.facebook.payload.auth.AuthenticationResponse;
import com.facebook.payload.auth.RegisterRequest;
import com.facebook.payload.user.UserSummary;
import com.facebook.service.AuthService;
import com.facebook.service.UserService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.util.Map;

@RestController
@RequestMapping("${app.api_prefix}/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthService authService;
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid RegisterRequest req) throws MessagingException,
            UnsupportedEncodingException, ResourceInUseException, ResourceNotFoundException {
        authService.register(req);
        return ResponseEntity.ok(new ResponseMessage(200,
                "Registration successful! Please check your confirmation code in email."));
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody @Valid AuthenticationRequest req) throws BadRequestException {
        return ResponseEntity.ok(authService.authenticate(req));
    }


    @PostMapping("/verify_email")
    public ResponseEntity<?> verifyEmail(@RequestBody Map<String,String> req) throws BadRequestException, ResourceNotFoundException {
        String email = req.get("email");
        String code = req.get("code");
        AuthenticationResponse authenticationResponse = authService.verifyEmail(email, code);

        return ResponseEntity.ok(new ResponseObject(200, "Email verified successfully!",authenticationResponse ));
    }

    @PostMapping("/recover/resend_verification_register_email")
    public ResponseEntity<?> sendAgainEmail(@RequestBody Map<String,String> req) throws BadRequestException, ResourceNotFoundException, MessagingException, UnsupportedEncodingException {
        String email = req.get("email");
        authService.resendRegistrationEmail(email);

        return ResponseEntity.ok(new ResponseMessage(200, "We have sent you an email with a code to verify your email."));
    }






    @PostMapping("/refresh_token")
    public ResponseEntity<AuthenticationResponse> refreshToken(HttpServletRequest request, HttpServletResponse response) {
        AuthenticationResponse authenticationResponse = authService.refreshToken(request, response);

        if (authenticationResponse != null) {
            return ResponseEntity.ok(authenticationResponse);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

    }

    // forgot password
    @PostMapping("/recover/initiate")
    public ResponseEntity<UserSummary> getUser(@RequestBody Map<String,String> body) throws ResourceNotFoundException {
        return ResponseEntity.ok(userService.getUserSummary(body.get("email")));
    }

    @PostMapping("/recover/code")
    public ResponseEntity<?> verifyCode(@RequestBody Map<String,String> body) throws ResourceNotFoundException, MessagingException, UnsupportedEncodingException {
        authService.sendResetPasswordEmail(body.get("email"));

        return ResponseEntity.ok(new ResponseMessage(200, "We have sent you an email with a code to reset your password."));
    }

    @PostMapping("/recover/password")
    public ResponseEntity<?> recoverPassword(@RequestBody Map<String,String> req) throws BadRequestException, ResourceNotFoundException {
        String email = req.get("email");
        String code = req.get("code");
        String password = req.get("password");

        authService.recoverPassword(email, code, password);

        return ResponseEntity.ok(new ResponseMessage(200, "Password recovered successfully!"));
    }

    // change password
    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody Map<String,String> req) throws BadRequestException, ResourceNotFoundException {
        String username = req.get("username");
        String oldPassword = req.get("old_password");
        String newPassword = req.get("new_password");

        authService.changePassword(username, oldPassword, newPassword);

        return ResponseEntity.ok(new ResponseMessage(200, "Password changed successfully!"));
    }

    // refresh token



















}
