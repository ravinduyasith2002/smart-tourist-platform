package com.smarttouristplatform.authservice.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class GuideProfileResponse {

    private String guideId;
    private String userId;
    private String bio;

    private int experienceYears;

    private BigDecimal hourlyRate;

    private BigDecimal dailyRate;

    private int responseTimeMins;

    private double cancellationRate;

    private int totalBookings;

    private int completedBookings;

    private Double averageRating;

    private BigDecimal totalEarnings;

    private boolean verified;

    private Instant verificationDate;

    private boolean bankAccountVerified;

    private List<Specialization> specializations;

    private List<Language> languages;

    private List<Certification > certifications;

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