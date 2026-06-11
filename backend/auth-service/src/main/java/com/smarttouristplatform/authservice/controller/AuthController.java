package com.smarttouristplatform.authservice.controller;

import com.smarttouristplatform.authservice.dto.*;
import com.smarttouristplatform.authservice.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth" )
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> registerUser(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> loginUser(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<AuthResponse> refreshAccessToken(@Valid @RequestBody RefreshTokenRequest request) {
        AuthResponse response = authService.refreshAccessToken(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<AuthResponse> logoutUser(@RequestBody(required = false) LogoutRequest request) {
        // In a real application, you'd extract userId from the JWT in the Authorization header
        // For simplicity, let's assume a placeholder userId for now.
        String userId = "current_user_id"; // TODO: Extract from JWT
        AuthResponse response = authService.logout(userId, request != null ? request : new LogoutRequest());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<AuthResponse> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        AuthResponse response = authService.forgotPassword(request);
        return ResponseEntity.ok(response);
    }

//    @PostMapping("/reset-password")
//    public ResponseEntity<AuthResponse> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
//        AuthResponse response = authService.resetPassword(request);
//        return ResponseEntity.ok(response);
//    }

    @PostMapping("/verify-email")
    public ResponseEntity<AuthResponse> verifyEmail(@Valid @RequestBody VerifyEmailRequest request) {
        AuthResponse response = authService.verifyEmail(request);
        return ResponseEntity.ok(response);
    }

//    @PostMapping("/resend-verification")
//    public ResponseEntity<AuthResponse> resendVerification(@Valid @RequestBody ForgotPasswordRequest request) {
//        AuthResponse response = authService.resendVerificationEmail(request);
//        return ResponseEntity.ok(response);
//    }
}