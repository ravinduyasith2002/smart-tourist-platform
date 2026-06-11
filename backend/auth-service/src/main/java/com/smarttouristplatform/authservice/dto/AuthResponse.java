package com.smarttouristplatform.authservice.dto;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;

import java.time.Instant;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AuthResponse {
    private boolean success;
    private String message;
    private AuthData data;
    private String error;
    private String code;
    private Object details;

    @Data
    @Builder
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public static class AuthData {
        private String userId;
        private String email;
        private String name;
        private String role;
        private String phone;
        private Boolean isVerified;
        private Boolean isActive;
        private Instant createdAt;
        private Boolean verificationTokenSent;
        private String verificationEmail;
        private String accessToken;
        private String refreshToken;
        private String tokenType;
        private Long expiresIn;
        private Long refreshExpiresIn;
        private Instant tokenExpiry;
        private Instant passwordChangedAt;
        private Integer sessionsRevoked;
        private Object profile;
        private Boolean resetTokenSent;
        private Integer expiresInMinutes;
    }
}