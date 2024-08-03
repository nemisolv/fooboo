package com.facebook.util;

import com.facebook.Constants;
import com.facebook.entity.type.NotificationType;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Map;
import java.util.Properties;
import java.util.concurrent.ThreadLocalRandom;

@Slf4j
public class Utility {

    public static String getSiteURL(HttpServletRequest servletRequest) {
        String url = servletRequest.getRequestURL().toString();
        log.info("url: " + url);
        return url.replace(servletRequest.getServletPath(), "");
    }

    public static JavaMailSenderImpl prepareMailSender(EmailSettingBag settingBag) {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(settingBag.getHost());
        mailSender.setPort(settingBag.getPort());
        mailSender.setUsername(settingBag.getUsername());
        mailSender.setPassword(settingBag.getPassword());

        Properties properties = new Properties();
        properties.setProperty("mail.smtp.auth", settingBag.getSmtpAuth());
        properties.setProperty("mail.smtp.starttls.enable", settingBag.getSmtpSecured());
        mailSender.setJavaMailProperties(properties);
        return mailSender;
    }


    public static String generateRandomCode() {
        int random = ThreadLocalRandom.current().nextInt(100000, 999999);
        return String.valueOf(random);
    }

    public static String generateRoomIdentifier(Long senderId, Long recipientId) {
        return senderId < recipientId ? senderId + "-" + recipientId : recipientId + "-" + senderId;
    }

    public static String createLink(NotificationType type, String identifier) {
        String baseUrl = Constants.CLIENT_BASE_URL;
        Map<NotificationType, String> urlPatterns = Map.of(
                NotificationType.ADD_FRIEND, "/profile/%s",
                NotificationType.ACCEPT_FRIEND, "/profile/%s",
                NotificationType.COMMENT_POST, "/posts/%s",
                NotificationType.LIKE_POST, "/posts/%s",
                NotificationType.LIKE_COMMENT, "/posts/%s",
                NotificationType.REPLY_COMMENT, "/posts/%s",
                NotificationType.REACT_COMMENT, "/posts/%s",
                NotificationType.NEW_POST, "/posts/%s",
                NotificationType.SHARED_POST, "/posts/%s"
        );

        String pattern = urlPatterns.get(type);
        if (pattern != null) {
            return baseUrl + String.format(pattern, identifier);
        } else {
            // Xử lý trường hợp không có loại thông báo phù hợp (nếu cần)
            return baseUrl;
        }
    }

    public static String generateContentLink(NotificationType type, String ownerName) {
        ownerName = "<strong>" + ownerName + "</strong>";
        switch (type) {
            case NEW_POST -> {
                return "Your friend " + ownerName + " has just posted something new! Let's check it out!";
            }
            case ADD_FRIEND -> {
                return ownerName + " has sent you a friend request!";
            }
            case ACCEPT_FRIEND -> {
                return ownerName + " has accepted your friend request!";
            }
            case COMMENT_POST -> {
                return ownerName + " has commented on your post!";
            }
            case LIKE_POST -> {
                return ownerName + " has liked your post!";
            }
            case LIKE_COMMENT -> {
                return ownerName + " has liked your comment!";
            }
            case REPLY_COMMENT -> {
                return ownerName + " has replied to your comment!";
            }
            case REACT_COMMENT -> {
                return ownerName + " has reacted to your comment!";
            }
            case SHARED_POST -> {
                return ownerName + " has shared new post!";
            }
            default -> {
                return "You have a new notification!";
            }
        }
    }

}
