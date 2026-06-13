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
    private String id;
    private String email;

    @DBRef
    private User user;

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
    private List specializations;
    private List languages;
    private List<Certification>certifications;
    private Instant createdAt;
    private Instant updatedAt;




}

