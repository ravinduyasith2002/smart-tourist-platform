package com.smarttouristplatform.authservice.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.smarttouristplatform.authservice.model.Tourist;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.Instant;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TouristProfileResponse {
    private String touristId;
    private String userId;
    private int totalTrips;
    private BigDecimal totalSpent;
    private Double averageRating;
    private String preferredLanguage;
    private String preferredCurrency;
    private Tourist.TravelStyle travelStyle;
    private String bio;
    private Instant createdAt;
    private Instant updatedAt;
}