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
import java.util.*;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final SessionRepository sessionRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final TouristService touristService;
    private final GuideService guideService;
    private final HotelService hotelService;

    public AuthService(UserRepository userRepository,
                       SessionRepository sessionRepository,
                       PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil,
                       TouristService touristService,
                       GuideService guideService,
                       HotelService hotelService) {
        this.userRepository = userRepository;
        this.sessionRepository = sessionRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.touristService = touristService;
        this.guideService = guideService;
        this.hotelService = hotelService;
    }

    // ---------------- REGISTER ----------------
    @Transactional
    public AuthResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return AuthResponse.builder()
                    .success(false)
                    .error("Email already exists")
                    .code("EMAIL_EXISTS")
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

        user.setRole(User.UserRole.valueOf(request.getRole().toUpperCase()));
        user.setPhone(request.getPhone());

        user.setCreatedAt(Instant.now());
        user.setUpdatedAt(Instant.now());
        user.setVerified(user.getRole() == User.UserRole.TOURIST);

        user.setActive(true);

        User savedUser = userRepository.save(user);

        // role-based profile creation
        switch (savedUser.getRole()) {
            case TOURIST -> touristService.createTouristProfile(savedUser);
            case GUIDE -> guideService.createGuideProfile(savedUser);
            case HOTEL -> hotelService.createHotelProfile(savedUser);
        }

        return AuthResponse.builder()
                .success(true)
                .message("User registered successfully")
                .data(AuthResponse.AuthData.builder()
                        .userId(savedUser.getId())
                        .email(savedUser.getEmail())
                        .name(savedUser.getName())
                        .role(savedUser.getRole().name().toLowerCase())
                        .isVerified(savedUser.isVerified())
                        .isActive(savedUser.isActive())
                        .createdAt(savedUser.getCreatedAt())
                        .build())
                .build();
    }

    // ---------------- LOGIN ----------------
    @Transactional
    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new InvalidCredentialsException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new InvalidCredentialsException("Invalid email or password");
        }

//        if (!user.isVerified()) {
//            return AuthResponse.builder()
//                    .success(false)
//                    .error("Account not verified")
//                    .code("ACCOUNT_NOT_VERIFIED")
//                    .build();
//        }

        String accessToken = jwtUtil.generateAccessToken(user);
        String refreshToken = jwtUtil.generateRefreshToken(user);

        Session session = new Session();
        session.setUser(user);
        session.setRefreshToken(refreshToken);
        session.setExpiryDate(jwtUtil.extractExpiration(refreshToken).toInstant());
        session.setCreatedAt(Instant.now());
        session.setUpdatedAt(Instant.now());

        sessionRepository.save(session);

        Object profileData = switch (user.getRole()) {
            case TOURIST -> touristService.getTouristProfileByUserId(user.getId()).orElse(null);
            case GUIDE -> guideService.getGuideProfileByUserId(user.getId()).orElse(null);
            case HOTEL -> hotelService.getHotelProfileByUserId(user.getId()).orElse(null);
            default -> null;
        };

        return AuthResponse.builder()
                .success(true)
                .message("Login successful")
                .data(AuthResponse.AuthData.builder()
                        .userId(user.getId())
                        .email(user.getEmail())
                        .name(user.getName())
                        .role(user.getRole().name().toLowerCase())
                        .accessToken(accessToken)
                        .tokenType("Bearer")
                        .expiresIn(jwtUtil.getAccessTokenExpirationMillis() / 1000)
                        .refreshExpiresIn(jwtUtil.getRefreshTokenExpirationMillis() / 1000)
                        .tokenExpiry(jwtUtil.extractExpiration(accessToken).toInstant())
                        .profile(profileData)
                        .build())
                .build();
    }

    // ---------------- REFRESH TOKEN ----------------
    @Transactional
    public AuthResponse refreshAccessToken(RefreshTokenRequest request) {

        String refreshToken = request.getRefreshToken();

        if (refreshToken == null || !jwtUtil.validateToken(refreshToken)) {
            throw new InvalidCredentialsException("Invalid refresh token");
        }

        String userId = jwtUtil.extractUserId(refreshToken);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Session session = sessionRepository.findByRefreshTokenAndIsValid(refreshToken, true)
                .orElseThrow(() -> new InvalidCredentialsException("Session expired"));

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

    // ---------------- LOGOUT ----------------
    @Transactional
    public AuthResponse logout(String userId, LogoutRequest request) {

        if (request.isAllDevices()) {

            List<Session> sessions = sessionRepository.findByUser_IdAndIsValid(userId, true);

            sessions.forEach(s -> s.setValid(false));
            sessionRepository.saveAll(sessions);

            return AuthResponse.builder()
                    .success(true)
                    .message("Logged out from all devices")
                    .data(AuthResponse.AuthData.builder()
                            .sessionsRevoked(sessions.size())
                            .build())
                    .build();
        }

        return AuthResponse.builder()
                .success(true)
                .message("Logged out successfully")
                .build();
    }

    // ---------------- FORGOT PASSWORD ----------------
    public AuthResponse forgotPassword(ForgotPasswordRequest request) {

        Optional<User> user = userRepository.findByEmail(request.getEmail());

        return AuthResponse.builder()
                .success(true)
                .message("If email exists, reset link sent")
                .data(AuthResponse.AuthData.builder()
                        .email(request.getEmail())
                        .resetTokenSent(user.isPresent())
                        .expiresInMinutes(60)
                        .build())
                .build();
    }

//    // ---------------- RESET PASSWORD ----------------
//    @Transactional
//    public AuthResponse resetPassword(ResetPasswordRequest request) {
//
//        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
//            throw new InvalidCredentialsException("Passwords do not match");
//        }
//
//        // TODO: replace with real token-based lookup
//        User user = userRepository.findByEmail(request.getEmail())
//                .orElseThrow(() -> new InvalidCredentialsException("Invalid reset request"));
//
//        user.setPasswordHash(passwordEncoder.encode(request.getNewPassword()));
//        user.setUpdatedAt(Instant.now());
//
//        userRepository.save(user);
//
//        return AuthResponse.builder()
//                .success(true)
//                .message("Password reset successful")
//                .build();
//    }

    // ---------------- VERIFY EMAIL ----------------
    @Transactional
    public AuthResponse verifyEmail(VerifyEmailRequest request) {

        // TODO: replace with token-based verification
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new InvalidCredentialsException("Invalid verification request"));

        user.setVerified(true);
        user.setUpdatedAt(Instant.now());

        userRepository.save(user);

        return AuthResponse.builder()
                .success(true)
                .message("Email verified")
                .build();
    }
}