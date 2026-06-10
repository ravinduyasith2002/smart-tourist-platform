package com.smarttouristplatform.authservice.dto;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;

import java.time.Instant;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserResponse {
    private String userId;
    private String email;
    private String name;
    private String role;
    private String avatarUrl;
    private String phone;
    private String bio;
    private boolean isVerified;
    private boolean isActive;
    private Instant createdAt;
    private Instant updatedAt;
}
