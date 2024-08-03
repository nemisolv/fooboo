package com.facebook;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
public class FacebookApplication {

    public static void main(String[] args) {
       var context =  SpringApplication.run(FacebookApplication.class, args);
        // print active profiles
        String [] activeProfiles = context.getEnvironment().getActiveProfiles();
        System.out.println("Application is running in {} " + String.join(",", activeProfiles) + " mode");
    }

}
