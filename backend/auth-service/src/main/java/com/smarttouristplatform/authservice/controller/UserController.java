package com.smarttouristplatform.authservice.controller;

import com.smarttouristplatform.authservice.dto.*;
import com.smarttouristplatform.authservice.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Get logged-in user email from JWT
    private String getCurrentUserEmail(Authentication authentication) {
        return authentication.getName();
    }

    // ===================== GET PROFILE =====================
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> getCurrentUserProfile(
            Authentication authentication) {

        try {
            String email = getCurrentUserEmail(authentication);

            UserResponse userResponse = userService.getUserProfile(email)
                    .orElseThrow(() -> new RuntimeException("User profile not found"));

            return ResponseEntity.ok(
                    new ApiResponse<>(
                            true,
                            "User profile fetched successfully",
                            userResponse
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

    // ===================== UPDATE PROFILE =====================
    @PutMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> updateCurrentUserProfile(
            Authentication authentication,
            @Valid @RequestBody UserUpdateRequest request) {

        try {
            String email = getCurrentUserEmail(authentication);

            UserResponse updatedUser =
                    userService.updateUserProfile(email, request);

            return ResponseEntity.ok(
                    new ApiResponse<>(
                            true,
                            "User profile updated successfully",
                            updatedUser
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

    // ===================== CHANGE PASSWORD =====================
    @PostMapping("/change-password")
    public ResponseEntity<ApiResponse<AuthResponse>> changePassword(
            Authentication authentication,
            @Valid @RequestBody ChangePasswordRequest request) {

        try {
            String email = getCurrentUserEmail(authentication);

            AuthResponse response =
                    userService.changePassword(email, request);

            return ResponseEntity.ok(
                    new ApiResponse<>(
                            true,
                            "Password changed successfully",
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

    // ===================== DELETE ACCOUNT =====================
    @DeleteMapping("/me")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<Object>> deleteAccount(
            Authentication authentication) {

        try {
            String email = getCurrentUserEmail(authentication);

            userService.deleteAccount(email);

            return ResponseEntity.ok(
                    new ApiResponse<>(
                            true,
                            "Account deleted successfully",
                            null
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