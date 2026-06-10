package com.smarttouristplatform.authservice.dto;
import com.smarttouristplatform.authservice.model.Tourist;
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
}