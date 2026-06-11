package com.smarttouristplatform.authservice.util;
import org.springframework.stereotype.Component;

@Component
public class EmailUtil {

    public void sendVerificationEmail(String to, String token) {
        // TODO: Implement email sending logic
        System.out.println("Sending verification email to " + to + " with token: " + token);
    }

    public void sendPasswordResetEmail(String to, String token) {
        // TODO: Implement email sending logic
        System.out.println("Sending password reset email to " + to + " with token: " + token);
    }
}