package com.smarttouristplatform.authservice.dto;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;

import java.time.Instant;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SessionResponse {
    private String sessionId;
    private String userId;
    private Instant expiryDate;
    private Instant createdAt;
    private Instant updatedAt;
    private boolean isValid;
}