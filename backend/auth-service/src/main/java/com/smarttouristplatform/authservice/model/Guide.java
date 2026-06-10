package com.smarttouristplatform.authservice.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@Data
@Document(collection = "guides")
public class Guide {
    @Id
    private String id; // Same as User ID

    @DBRef
    private User user; // Reference to the User document

    private String bio;
    private int experienceYears;
    private BigDecimal hourlyRate;
    private BigDecimal dailyRate;
    private int responseTimeMins = 60;
    private double cancellationRate = 0.0;
    private int totalBookings = 0;
    private int completedBookings = 0;
    private Double averageRating;
    private BigDecimal totalEarnings = BigDecimal.ZERO;
    private boolean isVerified = false;
    private Instant verificationDate;
    private boolean bankAccountVerified = false;
    private List<Specialization> specializations;
    private List<Language> languages;
    private List<Certification> certifications;
    private Instant createdAt;
    private Instant updatedAt;
}

@Data
class Specialization {
    private String name;
    private String experienceLevel;
    private String certificationUrl;
}

@Data
class Language {
    private String language;
    private String proficiency;
}

@Data
class Certification {
    private String name;
    private String org;
    private Instant issueDate;
    private Instant expiryDate;
    private String certUrl;
    private boolean isVerified;
}