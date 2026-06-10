package com.smarttouristplatform.authservice.model;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.time.Instant;

@Data
@Document(collection = "sessions")
public class Session {
    @Id
    private String id;

    @DBRef
    private User user;

    private String refreshToken;
    private Instant expiryDate;
    private Instant createdAt;
    private Instant updatedAt;
    private boolean isValid = true;
}