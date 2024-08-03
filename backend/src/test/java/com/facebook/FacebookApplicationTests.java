package com.facebook;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Date;
import java.util.Set;

@SpringBootTest
class FacebookApplicationTests {

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Test
    public void testGenerateUsername() {
        String username = "namevu";
        boolean isTaken = false;
        String existingUsernames[] = {"johnsmith", "johndoe", "janedoe", "namvu1", "namvu2"};
        do {
            username += String.valueOf(new Date().getTime() * Math.random()).substring(0, 1);
            System.out.println("username: " + username);
            for (String existingUsername : existingUsernames) {
                if (username.equals(existingUsername)) {
                    isTaken = true;
                    break;
                }
            }
        } while (isTaken);
    }

//   public void testGetAllPostsAndUserOfEachPost() {
//       Query query = new Query(Criteria.where("user").is)
//   }

    @Test
    public void testGeneratePassword() {
        String password = "password";
        String encodedPassword = passwordEncoder.encode(password);
        System.out.println("encodedPassword: " + encodedPassword);
    }

}
