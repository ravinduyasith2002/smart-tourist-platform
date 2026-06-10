package com.smarttouristplatform.authservice.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.math.BigDecimal;
import java.time.Instant;

@Data
@Document(collection = "tourists")
public class Tourist {
    @Id
    private String id; // Same as User ID

    @DBRef
    private User user; // Reference to the User document

    private int totalTrips = 0;
    private BigDecimal totalSpent = BigDecimal.ZERO;
    private Double averageRating;
    private String preferredLanguage;
    private String preferredCurrency = "USD";
    private TravelStyle travelStyle;
    private String bio;
    private Instant createdAt;
    private Instant updatedAt;

    public enum TravelStyle {
        BUDGET,
        MODERATE,
        LUXURY
    }
}