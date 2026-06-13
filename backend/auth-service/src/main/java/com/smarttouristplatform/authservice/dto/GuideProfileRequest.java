package com.smarttouristplatform.authservice.dto;
import jakarta.validation.constraints.Min;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class GuideProfileRequest {

    private String bio;

    @Min(value = 0, message = "Experience years cannot be negative")
    private Integer experienceYears;

    @Min(value = 0, message = "Hourly rate must be positive")
    private BigDecimal hourlyRate;

    @Min(value = 0, message = "Daily rate must be positive")
    private BigDecimal dailyRate;

    // OPTIONAL but useful (from your DB)
    private Integer responseTimeMins;

    private Double cancellationRate;

    private Integer totalBookings;

    private Integer completedBookings;

    private BigDecimal totalEarnings;

    private Boolean isVerified;

    private Boolean bankAccountVerified;

    // FIXED TYPES (VERY IMPORTANT)
    private List specializations;

    private List languages;

    private List certifications;
}