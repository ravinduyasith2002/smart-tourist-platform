package com.smarttouristplatform.tourismservice.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;
import lombok.Data;

@Data
public class CreateTripRequest {
    @NotBlank(message = "Title cannot be blank")
    private String title;
    private String description;
    @NotNull(message = "Start date cannot be null")
    private LocalDate startDate;
    @NotNull(message = "End date cannot be null")
    private LocalDate endDate;
    @DecimalMin(value = "0.0", inclusive = false, message = "Budget must be positive")
    private Double budget;
    @NotBlank(message = "Currency cannot be blank")
    private String currency;
    private Boolean isPublic = false;
    @Valid
    private List<DestinationDTO> destinations;
}