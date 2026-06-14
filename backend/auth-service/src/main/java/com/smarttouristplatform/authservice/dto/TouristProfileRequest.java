package com.smarttouristplatform.authservice.dto;
import com.smarttouristplatform.authservice.model.Tourist;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class TouristProfileRequest {
    private String preferredLanguage;
    @Pattern(regexp = "^[A-Z]{3}$", message = "Preferred currency must be a 3-letter ISO 4217 code")
    private String preferredCurrency;
    private Tourist.TravelStyle travelStyle;
    private String bio;
    @Min(value = 0, message = "Total trips cannot be negative")
    private Integer totalTrips;

    @Min(value = 0, message = "Total spent cannot be negative")
    private BigDecimal totalSpent;
}