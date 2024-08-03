package com.facebook.service.impl;

import com.facebook.Constants;
import com.facebook.entity.Role;
import com.facebook.entity.type.MailType;
import com.facebook.entity.type.UserMessagingStatus;
import com.facebook.entity.user.Details;
import com.facebook.entity.type.Gender;
import com.facebook.entity.user.User;
import com.facebook.exception.BadRequestException;
import com.facebook.exception.ResourceInUseException;
import com.facebook.exception.ResourceNotFoundException;
import com.facebook.helper.MailHelper;
import com.facebook.payload.auth.AuthenticationRequest;
import com.facebook.payload.auth.AuthenticationResponse;
import com.facebook.payload.auth.RegisterRequest;
import com.facebook.payload.user.UserOwnerProfile;
import com.facebook.repository.ConfirmationEmailRepository;
import com.facebook.repository.UserDetailRepository;
import com.facebook.repository.UserRepository;
import com.facebook.security.CustomUserDetailsService;
import com.facebook.security.UserPrincipal;
import com.facebook.service.AuthService;
import com.facebook.service.UserService;
import com.facebook.util.Utility;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpHeaders;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.facebook.entity.ConfirmationEmail;

import java.io.UnsupportedEncodingException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final CustomUserDetailsService customUserDetailsService;
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authManager;
    private final ModelMapper modelMapper;
    private final ConfirmationEmailRepository confirmationEmailRepo;
    private final MailHelper mailHelper;
    private final UserService userService;
    private final UserDetailRepository userDetailRepo;
    private final SimpMessagingTemplate messagingTemplate;



    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        try {
            Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(
                    request.getEmail(), request.getPassword()
            ));
            UserPrincipal user = (UserPrincipal) authentication.getPrincipal();
            if (!user.isVerified()) {
                throw new BadCredentialsException("This account is not verified");
            }
            return getAuthenticationResponse(user);
        } catch (DisabledException e) {
            throw new DisabledException("This account is not active");
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Invalid email or password");
        }


    }


    @Override
    @Transactional
    public void register(RegisterRequest request) throws ResourceInUseException, BadRequestException {
        // before that,let's checking email must be unique
        String email = request.getEmail();
        Optional<User> existingUser = userRepo.findByEmail(email);
        if (existingUser.isPresent()) {
            if (existingUser.get().isVerified()) {
                throw new ResourceInUseException("This email: " + email + " address already exists, try with a different one");
            } else {
                // if email is not verified yet, update user info and send a new verification email
                // update user info
                var userToUpdate = existingUser.get();
                userToUpdate.setFirstName(request.getFirstName());
                userToUpdate.setLastName(request.getLastName());
                userToUpdate.setPassword(passwordEncoder.encode(request.getPassword()));
                userToUpdate.setAccountName(usernameGenerator(request.getFirstName(), request.getLastName())   );
                Details details = userToUpdate.getDetails();
                if(details!=null) {
                    details.setBirthYear(request.getBirthYear());
                    details.setBirthMonth(request.getBirthMonth());
                    details.setBirthDay(request.getBirthDay());
                    details.setGender(Gender.fromValue(request.getGender()));

                }
                userRepo.save(userToUpdate);
                // revoke all old tokens before sending new verification email

                confirmationEmailRepo.findByTypeAndUserId(MailType.REGISTRATION_CONFIRMATION, userToUpdate.getId())
                        .forEach(confirmationEmail -> {
                            confirmationEmail.setRevoked(true);
                            confirmationEmailRepo.save(confirmationEmail);
                        });
                // send a new verification email

                sendVerificationEmail(userToUpdate);
            }
        } else {

            Role roleDefault;
            //the first one
            if (userRepo.count() == 0) {
                roleDefault = Role.ADMIN;
            } else {
                // assign role: user by default
                roleDefault = Role.USER;
            }

            // create new user
            String username = usernameGenerator(request.getFirstName(), request.getLastName());
            User newUser = User.builder()
                    .email(request.getEmail())
                    .accountName(username)
                    .password(passwordEncoder.encode(request.getPassword()))
                    .firstName(request.getFirstName())
                    .lastName(request.getLastName())
                    .verified(false)
                    .role(roleDefault)
                    .active(true)
                    .build();
            Details details = Details.builder()
                    .birthYear(request.getBirthYear())
                    .birthMonth(request.getBirthMonth())
                    .birthDay(request.getBirthDay())
                    .gender(Gender.fromValue(request.getGender()))
                    .build();
            newUser.setDetails(details);

            User savedUser = userRepo.save(newUser);
            // send verification email
            sendVerificationEmail(savedUser);
        }
    }


    @Override
    public AuthenticationResponse refreshToken(HttpServletRequest request, HttpServletResponse response) {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String username;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return null;
        }
        refreshToken = authHeader.substring(7);
        username = jwtService.extractUsername(refreshToken);
        if (username != null) {
            UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);
            if (jwtService.isTokenValid(refreshToken, userDetails)) {
                return AuthenticationResponse.builder()
                        .token(jwtService.generateToken(userDetails))
                        .refreshToken(refreshToken)
                        .build();
            }
        }
        return null;
    }

    @Override
    public AuthenticationResponse verifyEmail(String email, String code) throws BadRequestException, ResourceNotFoundException {

        User user = userRepo.findByEmail(email).orElseThrow(() -> new BadRequestException("Invalid code"));
        Optional<ConfirmationEmail> tokenOptional = confirmationEmailRepo.findByCodeAndUserIdAndType( code,user.getId(), MailType.REGISTRATION_CONFIRMATION);
        if (tokenOptional.isEmpty()) {
            throw new BadRequestException("Invalid code");
        }
        ConfirmationEmail confirmationEmail = tokenOptional.get();
        if (confirmationEmail.isRevoked()) {
            throw new BadRequestException("Invalid code");
        }
        if (confirmationEmail.getExpiredAt().isBefore(LocalDateTime.now())) {
            throw new BadRequestException("code expired");
        }
        // check if email already verified after checking token expired
        if (confirmationEmail.getConfirmedAt() != null) {
            throw new BadRequestException("Email already verified");
        }
        confirmationEmail.setConfirmedAt(LocalDateTime.now());
        user.setVerified(true);
        userRepo.save(user);
        confirmationEmailRepo.save(confirmationEmail);
        UserPrincipal userPrincipal = UserPrincipal.create(user);
        return getAuthenticationResponse(userPrincipal);
    }

    @Override
    public void sendResetPasswordEmail(String email) {
        Optional<User> foundUser = userRepo.findByEmail(email);
        if (foundUser.isPresent()) {
            var user = foundUser.get();
            // Revoke all old reset password tokens
            confirmationEmailRepo.findByTypeAndUserId(MailType.RESET_PASSWORD, user.getId())
                    .forEach(confirmationEmail -> {
                        confirmationEmail.setRevoked(true);
                        confirmationEmailRepo.save(confirmationEmail);
                    });

            String code = Utility.generateRandomCode();
            var confirmationEmail = ConfirmationEmail.builder()
                    .user(user)
                    .code(code)
                    .type(MailType.RESET_PASSWORD)
                    .expiredAt(Constants.EXP_TIME_RESET_PASSWORD_EMAIL)
                    .revoked(false)
                    .build();

            confirmationEmailRepo.save(confirmationEmail);

            String subject = "Reset your password";
            String body = String.format(
                    "<html>" +
                            "<head>" +
                            "    <style>" +
                            "        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #f1f1f1; }" +
                            "        .email-container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #dcdcdc; border-radius: 6px; overflow: hidden; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }" +
                            "        .email-header { background-color: #4267B2; color: #ffffff; padding: 20px; text-align: center; }" +
                            "        .email-header img { max-width: 100px; }" +
                            "        .email-content { padding: 20px; color: #333333; }" +
                            "        .email-content h1 { font-size: 24px; margin-bottom: 20px; }" +
                            "        .email-content p { font-size: 16px; line-height: 1.5; margin-bottom: 20px; }" +
                            "        .email-footer { background-color: #f7f7f7; padding: 20px; text-align: center; font-size: 12px; color: #999999; }" +
                            "        .reset-code { display: inline-block; background-color: #4267B2; color: #ffffff; padding: 10px 20px; border-radius: 4px; font-size: 16px; }" +
                            "    </style>" +
                            "</head>" +
                            "<body>" +
                            "    <div class='email-container'>" +
                            "        <div class='email-header'>" +
                            "            <img src='https://www.facebook.com/images/fb_icon_325x325.png' alt='Facebook Logo'>" +
                            "        </div>" +
                            "        <div class='email-content'>" +
                            "            <h1>Reset Your Password</h1>" +
                            "            <p>Dear %s,</p>" +
                            "            <p>Your reset password code is:</p>" +
                            "            <p class='reset-code'>%s</p>" +
                            "        </div>" +
                            "        <div class='email-footer'>" +
                            "            <p>If you did not request this, please ignore this email.</p>" +
                            "        </div>" +
                            "    </div>" +
                            "</body>" +
                            "</html>",
                    user.getFirstName(), code
            );

            mailHelper.sendMail(user.getEmail(), subject, body);
        }
    }

    @Override
    public void resendRegistrationEmail(String email) throws ResourceNotFoundException, MessagingException, UnsupportedEncodingException {
        User user = userRepo.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        if (user.isVerified()) {
            throw new BadRequestException("Email already verified");
        }
        // revoke all old registration confirmation tokens
        confirmationEmailRepo.findByTypeAndUserId(MailType.REGISTRATION_CONFIRMATION, user.getId())
                .forEach(confirmationEmail -> {
                    confirmationEmail.setRevoked(true);
                    confirmationEmailRepo.save(confirmationEmail);
                });
        sendVerificationEmail(user);
    }


    @Override
    public void recoverPassword(String email, String code, String password) throws BadRequestException, ResourceNotFoundException {
            User user = userRepo.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Optional<ConfirmationEmail> resetPasswordCodeAndEmail = confirmationEmailRepo.findByCodeAndUserIdAndType(code, user.getId(), MailType.RESET_PASSWORD);
        if (resetPasswordCodeAndEmail.isPresent()) {
            if (resetPasswordCodeAndEmail.get().getExpiredAt() == null
                    || resetPasswordCodeAndEmail.get().getExpiredAt().isBefore(LocalDateTime.now())
                    || resetPasswordCodeAndEmail.get().isRevoked()
                    || resetPasswordCodeAndEmail.get().getCode() == null
                    || resetPasswordCodeAndEmail.get().getConfirmedAt() != null
            ) {
                throw new BadRequestException("Reset password is expired or revoked");
            }


            user.setPassword(passwordEncoder.encode(password));
            userRepo.save(user);
            resetPasswordCodeAndEmail.get().setCode(null);
            resetPasswordCodeAndEmail.get().setExpiredAt(null);
            resetPasswordCodeAndEmail.get().setConfirmedAt(LocalDateTime.now());
            confirmationEmailRepo.save(resetPasswordCodeAndEmail.get());

        } else {
            throw new BadRequestException("Invalid code or email");
        }
    }


    // change password
    @Override
    public void changePassword(String username, String oldPassword, String newPassword) throws ResourceNotFoundException, BadRequestException {
        User user = userRepo.findByEmail(username).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new BadRequestException("Old password is incorrect");
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepo.save(user);
    }

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response) throws ResourceNotFoundException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            final String token = authHeader.substring(7);
            String email = jwtService.extractUsername(token);
            User user = userRepo.findByEmail(email).orElseThrow();

//
        }

    }


    private AuthenticationResponse getAuthenticationResponse(UserPrincipal user) {
        User fullInforUser = userRepo.findByEmail(user.getEmail()).get();
        // enable eager fetch type because user's detail is set up to lazy initialization
        UserOwnerProfile data = modelMapper.map(fullInforUser, UserOwnerProfile.class);
        String token = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);
        return AuthenticationResponse
                .builder()
                .token(token)
                .refreshToken(refreshToken)
                .userData(data)
                .build();
    }


    private void sendVerificationEmail(User user) throws BadRequestException {
        String code = Utility.generateRandomCode();
        var confirmationEmail = ConfirmationEmail.builder()
                .user(user)
                .code(code)
                .type(MailType.REGISTRATION_CONFIRMATION)
                .expiredAt(Constants.EXP_TIME_REGISTRATION_EMAIL)
                .revoked(false)
                .build();
        confirmationEmailRepo.save(confirmationEmail);

        String subject = String.format("Hi %s, please verify your email", user.getFirstName());

        String body = String.format(
                "<html>" +
                        "<head>" +
                        "    <style>" +
                        "        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #f1f1f1; }" +
                        "        .email-container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #dcdcdc; border-radius: 6px; overflow: hidden; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }" +
                        "        .email-header { background-color: #3b5998; color: #ffffff; padding: 20px; text-align: center; }" +
                        "        .email-header img { max-width: 100px; }" +
                        "        .email-content { padding: 20px; color: #333333; }" +
                        "        .email-content h1 { font-size: 24px; margin-bottom: 20px; }" +
                        "        .email-content p { font-size: 16px; line-height: 1.5; margin-bottom: 20px; }" +
                        "        .email-footer { background-color: #f7f7f7; padding: 20px; text-align: center; font-size: 12px; color: #999999; }" +
                        "        .verify-code { display: block; background-color: #3b5998; color: #ffffff; padding: 10px 20px; border-radius: 4px; text-decoration: none; font-size: 16px; text-align: center; margin: 20px 0; }" +
                        "    </style>" +
                        "</head>" +
                        "<body>" +
                        "    <div class='email-container'>" +
                        "        <div class='email-header'>" +
                        "            <img src='https://www.facebook.com/images/fb_icon_325x325.png' alt='Facebook Logo'>" +
                        "        </div>" +
                        "        <div class='email-content'>" +
                        "            <h1>Verify Your Email</h1>" +
                        "            <p>Hi %s,</p>" +
                        "            <p>We received a request to set up a Facebook account using this email address. If this was you, please use the verification code below to verify your email:</p>" +
                        "            <p class='verify-code'>%s</p>" +
                        "            <p>If you didn't request this, you can safely ignore this email.</p>" +
                        "            <p>Thank you,<br>The Facebook Team</p>" +
                        "        </div>" +
                        "        <div class='email-footer'>" +
                        "            <p>&copy; %d Facebook, Inc., All rights reserved.</p>" +
                        "        </div>" +
                        "    </div>" +
                        "</body>" +
                        "</html>",
                user.getFirstName(), code, LocalDate.now().getYear()
        );
        mailHelper.sendMail(user.getEmail(), subject, body);
    }



    private String usernameGenerator(String firstName, String lastName) {
        String username = firstName.toLowerCase() + lastName.toLowerCase();
        boolean isTaken = false;
        do {
            isTaken = userRepo.findByAccountName(username).isPresent();
            if (isTaken) {
                username += String.valueOf(System.currentTimeMillis() * Math.random()).substring(0, 1);
            }
        } while (isTaken);
        return username;
    }


}
