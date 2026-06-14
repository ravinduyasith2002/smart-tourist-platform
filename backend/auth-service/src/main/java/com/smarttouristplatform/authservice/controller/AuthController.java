package com.smarttouristplatform.authservice.controller;

import com.smarttouristplatform.authservice.dto.*;
import com.smarttouristplatform.authservice.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // ===================== REGISTER =====================
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> registerUser(
            @Valid @RequestBody RegisterRequest request) {

        try {
            AuthResponse response = authService.register(request);

            return ResponseEntity.status(HttpStatus.CREATED).body(
                    new ApiResponse<>(
                            true,
                            "User registered successfully",
                            response
                    )
            );

        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ApiResponse<>(
                            false,
                            e.getMessage(),
                            null
                    )
            );
        }
    }

    // ===================== LOGIN =====================
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> loginUser(
            @Valid @RequestBody LoginRequest request) {

        try {
            AuthResponse response = authService.login(request);

            return ResponseEntity.ok(
                    new ApiResponse<>(
                            true,
                            "Login successful",
                            response
                    )
            );

        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new ApiResponse<>(
                            false,
                            e.getMessage(),
                            null
                    )
            );
        }
    }

    // ===================== REFRESH TOKEN =====================
    @PostMapping("/refresh-token")
    public ResponseEntity<ApiResponse<AuthResponse>> refreshAccessToken(
            @Valid @RequestBody RefreshTokenRequest request) {

        try {
            AuthResponse response = authService.refreshAccessToken(request);

            return ResponseEntity.ok(
                    new ApiResponse<>(
                            true,
                            "Token refreshed successfully",
                            response
                    )
            );

        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new ApiResponse<>(
                            false,
                            e.getMessage(),
                            null
                    )
            );
        }
    }

    // ===================== LOGOUT =====================
    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<AuthResponse>> logoutUser(
            @RequestBody(required = false) LogoutRequest request) {

        try {
            String userId = "current_user_id"; // TODO: extract from JWT

            AuthResponse response =
                    authService.logout(userId,
                            request != null ? request : new LogoutRequest());

            return ResponseEntity.ok(
                    new ApiResponse<>(
                            true,
                            "Logout successful",
                            response
                    )
            );

        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ApiResponse<>(
                            false,
                            e.getMessage(),
                            null
                    )
            );
        }
    }

    // ===================== FORGOT PASSWORD =====================
    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<AuthResponse>> forgotPassword(
            @Valid @RequestBody ForgotPasswordRequest request) {

        try {
            AuthResponse response = authService.forgotPassword(request);

            return ResponseEntity.ok(
                    new ApiResponse<>(
                            true,
                            "Password reset link sent",
                            response
                    )
            );

        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ApiResponse<>(
                            false,
                            e.getMessage(),
                            null
                    )
            );
        }
    }

    // ===================== VERIFY EMAIL =====================
    @PostMapping("/verify-email")
    public ResponseEntity<ApiResponse<AuthResponse>> verifyEmail(
            @Valid @RequestBody VerifyEmailRequest request) {

        try {
            AuthResponse response = authService.verifyEmail(request);

            return ResponseEntity.ok(
                    new ApiResponse<>(
                            true,
                            "Email verified successfully",
                            response
                    )
            );

        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ApiResponse<>(
                            false,
                            e.getMessage(),
                            null
                    )
            );
        }
    }
}