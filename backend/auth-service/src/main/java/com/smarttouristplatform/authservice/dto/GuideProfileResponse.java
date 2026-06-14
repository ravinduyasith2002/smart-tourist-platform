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
    private String email;
    private String name;

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

    private List specializations;

    private List languages;

    private List certifications;

    private Instant createdAt;

    private Instant updatedAt;
}

