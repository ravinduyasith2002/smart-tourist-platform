package com.smarttouristplatform.authservice.controller;

import com.smarttouristplatform.authservice.dto.AuthResponse;
import com.smarttouristplatform.authservice.dto.ChangePasswordRequest;
import com.smarttouristplatform.authservice.dto.UserResponse;
import com.smarttouristplatform.authservice.dto.UserUpdateRequest;
import com.smarttouristplatform.authservice.service.UserService;
import jakarta.validation.Valid;
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

    //  Get logged-in user email/username from JWT context
    private String getCurrentUserEmail(Authentication authentication) {
        System.out.println("-------come to here 9-------------"+authentication.getName());
        return authentication.getName(); // comes from JWT (username/email)
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUserProfile(Authentication authentication) {

        String email = getCurrentUserEmail(authentication);
        System.out.println("-------come to here 10 authontica-------------"+authentication);
        System.out.println("-------come to here 11 mail-------------"+email);

        UserResponse userResponse = userService.getUserProfile(email)
                .orElseThrow(() -> new RuntimeException("User profile not found"));
        System.out.println("-------come to here 12 response-------------"+userResponse);
        return ResponseEntity.ok(userResponse);
    }

    @PutMapping("/me")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UserResponse> updateCurrentUserProfile(
            Authentication authentication,
            @Valid @RequestBody UserUpdateRequest request) {

        String email = getCurrentUserEmail(authentication);

        UserResponse updatedUser = userService.updateUserProfile(email, request);

        return ResponseEntity.ok(updatedUser);
    }

    @PostMapping("/change-password")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<AuthResponse> changePassword(
            Authentication authentication,
            @Valid @RequestBody ChangePasswordRequest request) {

        String email = getCurrentUserEmail(authentication);

        AuthResponse response = userService.changePassword(email, request);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/me")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> deleteAccount(Authentication authentication) {

        String email = getCurrentUserEmail(authentication);

        userService.deleteAccount(email);

        return ResponseEntity.noContent().build();
    }
}