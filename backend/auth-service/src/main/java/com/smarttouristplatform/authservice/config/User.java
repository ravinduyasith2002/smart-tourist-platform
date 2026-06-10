package com.smarttouristplatform.authservice.config;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Document(collection =
        "`users`")
public class User {
    @Id
    private String id;

    @Indexed(unique = true)
    private String email;
    private String passwordHash;
    private String name;
    private UserRole role;
    private String avatarUrl;
    private String phone;
    private String bio;
    private boolean isVerified = false;
    private boolean isActive = true;
    private boolean isDeleted = false;
    private Instant deletedAt;
    private Instant createdAt;
    private Instant updatedAt;

    public enum UserRole {
        TOURIST,
        GUIDE,
        HOTEL,
        ADMIN
    }
}