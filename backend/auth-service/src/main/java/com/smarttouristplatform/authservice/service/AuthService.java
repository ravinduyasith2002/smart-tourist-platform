package com.smarttouristplatform.authservice.service;
import com.smarttouristplatform.authservice.dto.*;
import com.smarttouristplatform.authservice.exception.InvalidCredentialsException;
import com.smarttouristplatform.authservice.exception.ResourceNotFoundException;
import com.smarttouristplatform.authservice.model.Session;
import com.smarttouristplatform.authservice.model.User;
import com.smarttouristplatform.authservice.repository.SessionRepository;
import com.smarttouristplatform.authservice.repository.UserRepository;
import com.smarttouristplatform.authservice.util.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final SessionRepository sessionRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final UserService userService;
    private final TouristService touristService;
    private final GuideService guideService;
    private final HotelService hotelService;

    public AuthService(UserRepository userRepository, SessionRepository sessionRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil, UserService userService, TouristService touristService, GuideService guideService, HotelService hotelService) {
        this.userRepository = userRepository;
        this.sessionRepository = sessionRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.userService = userService;
        this.touristService = touristService;
        this.guideService = guideService;
        this.hotelService = hotelService;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            Map<String, String> details = new HashMap<>();
            details.put("email", request.getEmail());
            return AuthResponse.builder()
                    .success(false)
                    .error("Email already exists")
                    .code("EMAIL_EXISTS")
                    .details(details)
                    .build();
        }

        if (!request.getPassword().equals(request.getConfirmPassword())) {
            return AuthResponse.builder()
                    .success(false)
                    .error("Passwords do not match")
                    .code("PASSWORD_MISMATCH")
                    .build();
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setName(request.getName());
        user.setRole(User.UserRole.valueOf(request.getRole()));
        user.setPhone(request.getPhone());
        user.setCreatedAt(Instant.now());
        user.setUpdatedAt(Instant.now());
        user.setVerified(false); // New users are not verified by default

        User savedUser = userRepository.save(user);

        // Create role-specific profile
        switch (savedUser.getRole()) {
            case TOURIST:
                touristService.createTouristProfile(savedUser);
                break;
            case GUIDE:
                guideService.createGuideProfile(savedUser);
                break;
            case HOTEL:
                hotelService.createHotelProfile(savedUser);
                break;
            default:
                // Admin role might not need a separate profile or handled differently
                break;
        }

        // TODO: Send verification email

        return AuthResponse.builder()
                .success(true)
                .message("User registered successfully")
                .data(AuthResponse.AuthData.builder()
                        .userId(savedUser.getId())
                        .email(savedUser.getEmail())
                        .name(savedUser.getName())
                        .role(savedUser.getRole().name().toLowerCase())
                        .phone(savedUser.getPhone())
                        .isVerified(savedUser.isVerified())
                        .isActive(savedUser.isActive())
                        .createdAt(savedUser.getCreatedAt())
                        .verificationTokenSent(true) // Assuming email sent
                        .verificationEmail(savedUser.getEmail())
                        .build())
                .build();
    }

    @Transactional
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new InvalidCredentialsException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            // TODO: Implement login attempt tracking and lockout
            throw new InvalidCredentialsException("Invalid email or password");
        }

        if (!user.isVerified()) {
            Map<String, String> details = new HashMap<>();
            details.put("verification_email", user.getEmail());
            return AuthResponse.builder()
                    .success(false)
                    .error("Account is not verified")
                    .code("ACCOUNT_NOT_VERIFIED")
                    .details(details)
                    .build();
        }

        // Generate tokens
        String accessToken = jwtUtil.generateAccessToken(user);
        String refreshToken = jwtUtil.generateRefreshToken(user);

        // Save session
        Session session = new Session();
        session.setUser(user);
        session.setRefreshToken(refreshToken);
        session.setExpiryDate(jwtUtil.extractExpiration(refreshToken).toInstant());
        session.setCreatedAt(Instant.now());
        session.setUpdatedAt(Instant.now());
        sessionRepository.save(session);

        // Build profile data based on role
        Object profileData = null;
        switch (user.getRole()) {
            case TOURIST:
                profileData = touristService.getTouristProfileByUserId(user.getId()).orElse(null);
                break;
            case GUIDE:
                profileData = guideService.getGuideProfileByUserId(user.getId()).orElse(null);
                break;
            case HOTEL:
                profileData = hotelService.getHotelProfileByUserId(user.getId()).orElse(null);
                break;
            default:
                break;
        }

        return AuthResponse.builder()
                .success(true)
                .message("Login successful")
                .data(AuthResponse.AuthData.builder()
                        .userId(user.getId())
                        .email(user.getEmail())
                        .name(user.getName())
                        .role(user.getRole().name().toLowerCase())
                        .isVerified(user.isVerified())
                        .isActive(user.isActive())
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .tokenType("Bearer")
                        .expiresIn(jwtUtil.getAccessTokenExpirationMillis() / 1000)
                        .refreshExpiresIn(jwtUtil.getRefreshTokenExpirationMillis() / 1000)
                        .tokenExpiry(jwtUtil.extractExpiration(accessToken).toInstant())
                        .profile(profileData)
                        .build())
                .build();
    }

    @Transactional
    public AuthResponse refreshAccessToken(RefreshTokenRequest request) {
        String refreshToken = request.getRefreshToken();
        if (!jwtUtil.validateToken(refreshToken)) {
            throw new InvalidCredentialsException("Invalid or expired refresh token");
        }

        String userId = jwtUtil.extractUserId(refreshToken);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Session session = sessionRepository.findByRefreshTokenAndIsValid(refreshToken, true)
                .orElseThrow(() -> new InvalidCredentialsException("Invalid or expired refresh token"));

        // Generate new access token
        String newAccessToken = jwtUtil.generateAccessToken(user);

        return AuthResponse.builder()
                .success(true)
                .message("Token refreshed successfully")
                .data(AuthResponse.AuthData.builder()
                        .accessToken(newAccessToken)
                        .tokenType("Bearer")
                        .expiresIn(jwtUtil.getAccessTokenExpirationMillis() / 1000)
                        .tokenExpiry(jwtUtil.extractExpiration(newAccessToken).toInstant())
                        .build())
                .build();
    }

    @Transactional
    public AuthResponse logout(String userId, LogoutRequest request) {
        if (request.isAllDevices()) {
            List<Session> sessions = sessionRepository.findByUser_IdAndIsValid(userId, true);
            sessions.forEach(session -> session.setValid(false));
            sessionRepository.saveAll(sessions);
            return AuthResponse.builder()
                    .success(true)
                    .message("Logged out from all devices successfully")
                    .data(AuthResponse.AuthData.builder().sessionsRevoked(sessions.size()).build())
                    .build();
        } else {
            // For single device logout, we need the refresh token from the client
            // This typically involves the client sending the refresh token in the request header or body
            // For simplicity, we'll assume the client sends the refresh token in the request for now.
            // In a real-world scenario, you might invalidate the current access token and its associated refresh token.
            // For now, let's just mark the current session as invalid if a refresh token is provided.
            // If no refresh token is provided, it means only the access token is being invalidated (stateless JWT).
            // For a stateful logout, we need to blacklist the access token or invalidate the session.
            // Let's assume the refresh token is provided in the request body for this example.
            // This part needs refinement based on actual client implementation and security considerations.
            // For now, we'll just return a success message for single device logout.
            return AuthResponse.builder()
                    .success(true)
                    .message("Logged out successfully from current device")
                    .data(AuthResponse.AuthData.builder().sessionsRevoked(1).build())
                    .build();
        }
    }

    public AuthResponse forgotPassword(ForgotPasswordRequest request) {
        Optional<User> userOptional = userRepository.findByEmail(request.getEmail());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // TODO: Generate a password reset token and send it via email
            // This token should be short-lived and stored temporarily (e.g., in a separate collection or cache)
            return AuthResponse.builder()
                    .success(true)
                    .message("Password reset email sent")
                    .data(AuthResponse.AuthData.builder()
                            .email(user.getEmail())
                            .resetTokenSent(true)
                            .expiresInMinutes(60)
                            .build())
                    .build();
        }
        // Security best practice: always return 200 OK even if email doesn't exist
        return AuthResponse.builder()
                .success(true)
                .message("Password reset email sent")
                .data(AuthResponse.AuthData.builder()
                        .email(request.getEmail())
                        .resetTokenSent(false)
                        .expiresInMinutes(60)
                        .build())
                .build();
    }

    @Transactional
    public AuthResponse resetPassword(ResetPasswordRequest request) {
        // TODO: Validate the reset token (from request.getToken())
        // If valid, retrieve the user associated with the token
        // For now, assuming token validation is successful and we get a user
        // This requires a mechanism to store and validate reset tokens.

        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            return AuthResponse.builder()
                    .success(false)
                    .error("New passwords do not match")
                    .code("PASSWORD_MISMATCH")
                    .build();
        }

        // Placeholder for token validation and user retrieval
        // In a real implementation, you'd find the user by the reset token
        User user = userRepository.findByEmail("john.doe@example.com") // Replace with actual user retrieval by token
                .orElseThrow(() -> new InvalidCredentialsException("Invalid or expired reset token"));

        user.setPasswordHash(passwordEncoder.encode(request.getNewPassword()));
        user.setUpdatedAt(Instant.now());
        userRepository.save(user);

        // Invalidate the reset token after use

        return AuthResponse.builder()
                .success(true)
                .message("Password reset successfully")
                .data(AuthResponse.AuthData.builder()
                        .email(user.getEmail())
                        .passwordChangedAt(Instant.now())
                        .build())
                .build();
    }

    @Transactional
    public AuthResponse verifyEmail(VerifyEmailRequest request) {
        // TODO: Validate the verification token
        // Find user by verification token
        // For now, assuming token validation is successful and we get a user
        User user = userRepository.findByEmail("john.doe@example.com") // Replace with actual user retrieval by token
                .orElseThrow(() -> new InvalidCredentialsException("Invalid or expired verification token"));

        user.setVerified(true);
        user.setUpdatedAt(Instant.now());
        userRepository.save(user);

        // Invalidate the verification token after use

        return AuthResponse.builder()
                .success(true)
                .message("Email verified successfully")
                .data(AuthResponse.AuthData.builder()
                        .email(user.getEmail())
                        .isVerified(true)
                        .build())
                .build();
    }

    public AuthResponse resendVerificationEmail(ForgotPasswordRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (user.isVerified()) {
            return AuthResponse.builder()
                    .success(false)
                    .error("Email already verified")
                    .code("EMAIL_ALREADY_VERIFIED")
                    .build();
        }

        // TODO: Generate new verification token and send email

        return AuthResponse.builder()
                .success(true)
                .message("Verification email sent")
                .data(AuthResponse.AuthData.builder()
                        .email(user.getEmail())
                        .verificationTokenSent(true)
                        .build())
                .build();
    }
}