package com.facebook.service;


import com.facebook.exception.BadRequestException;
import com.facebook.exception.ResourceInUseException;
import com.facebook.exception.ResourceNotFoundException;
import com.facebook.payload.auth.AuthenticationRequest;
import com.facebook.payload.auth.AuthenticationResponse;
import com.facebook.payload.auth.RegisterRequest;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.UnsupportedEncodingException;

public interface AuthService {
    AuthenticationResponse authenticate(AuthenticationRequest request) throws BadRequestException;
    void register( RegisterRequest request) throws MessagingException, UnsupportedEncodingException, ResourceInUseException, ResourceNotFoundException, BadRequestException;

    AuthenticationResponse refreshToken(HttpServletRequest request, HttpServletResponse response);

    AuthenticationResponse verifyEmail(String email, String code) throws BadRequestException, ResourceNotFoundException;

    void sendResetPasswordEmail(String email) throws ResourceNotFoundException, MessagingException, UnsupportedEncodingException;
    void resendRegistrationEmail(String email) throws ResourceNotFoundException, MessagingException, UnsupportedEncodingException;

    void recoverPassword(String email, String code, String password) throws BadRequestException, ResourceNotFoundException;

    void changePassword(String username, String oldPassword, String newPassword) throws ResourceNotFoundException, BadRequestException;

    void logout(HttpServletRequest request, HttpServletResponse response) throws ResourceNotFoundException;
}
