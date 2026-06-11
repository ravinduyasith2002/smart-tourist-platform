package com.smarttouristplatform.authservice.service;
import com.smarttouristplatform.authservice.dto.AuthResponse;
import com.smarttouristplatform.authservice.dto.ChangePasswordRequest;
import com.smarttouristplatform.authservice.dto.UserResponse;
import com.smarttouristplatform.authservice.dto.UserUpdateRequest;
import com.smarttouristplatform.authservice.exception.InvalidCredentialsException;
import com.smarttouristplatform.authservice.exception.ResourceNotFoundException;
import com.smarttouristplatform.authservice.model.User;
import com.smarttouristplatform.authservice.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Optional<UserResponse> getUserProfile(String userId) {
        return userRepository.findById(userId)
                .map(this::mapUserToUserResponse);
    }

    @Transactional
    public UserResponse updateUserProfile(String userId, UserUpdateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Optional.ofNullable(request.getName()).ifPresent(user::setName);
        Optional.ofNullable(request.getAvatarUrl()).ifPresent(user::setAvatarUrl);
        Optional.ofNullable(request.getPhone()).ifPresent(user::setPhone);
        Optional.ofNullable(request.getBio()).ifPresent(user::setBio);
        user.setUpdatedAt(Instant.now());

        User updatedUser = userRepository.save(user);
        return mapUserToUserResponse(updatedUser);
    }

    @Transactional
    public AuthResponse changePassword(String userId, ChangePasswordRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPasswordHash())) {
            throw new InvalidCredentialsException("Current password incorrect");
        }

        if (!request.getNewPassword().equals(request.getConfirmNewPassword())) {
            return AuthResponse.builder()
                    .success(false)
                    .error("New passwords do not match")
                    .code("PASSWORD_MISMATCH")
                    .build();
        }

        user.setPasswordHash(passwordEncoder.encode(request.getNewPassword()));
        user.setUpdatedAt(Instant.now());
        userRepository.save(user);

        return AuthResponse.builder()
                .success(true)
                .message("Password changed successfully")
                .data(AuthResponse.AuthData.builder()
                        .userId(user.getId())
                        .passwordChangedAt(Instant.now())
                        .build())
                .build();
    }

    @Transactional
    public void deleteAccount(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        user.setDeleted(true);
        user.setActive(false);
        user.setDeletedAt(Instant.now());
        userRepository.save(user);

        // TODO: Invalidate all sessions for this user
        // TODO: Potentially delete associated role-specific profiles or mark them as deleted
    }

    private UserResponse mapUserToUserResponse(User user) {
        return UserResponse.builder()
                .userId(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .role(user.getRole().name().toLowerCase())
                .avatarUrl(user.getAvatarUrl())
                .phone(user.getPhone())
                .bio(user.getBio())
                .isVerified(user.isVerified())
                .isActive(user.isActive())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }
}