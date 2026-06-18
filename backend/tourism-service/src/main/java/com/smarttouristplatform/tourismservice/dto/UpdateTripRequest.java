package com.smarttouristplatform.tourismservice.dto;
import jakarta.validation.constraints.DecimalMin;
import lombok.Data;

@Data
public class UpdateTripRequest {
    private String title;
    private String description;
    @DecimalMin(value = "0.0", inclusive = false, message = "Budget must be positive")
    private Double budget;
    private Boolean isPublic;
}
