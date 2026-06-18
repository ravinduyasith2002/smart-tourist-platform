package com.smarttouristplatform.tourismservice.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.time.LocalDate;
import lombok.Data;

@Data
public class CreateGuideBookingRequest {
    @NotBlank(message = "Guide ID cannot be blank")
    private String guideId;
    @NotBlank(message = "Trip ID cannot be blank")
    private String tripId;
    @NotNull(message = "Booking date cannot be null")
    private LocalDate bookingDate;
    @NotBlank(message = "Start time cannot be blank")
    private String startTime;
    @NotBlank(message = "End time cannot be blank")
    private String endTime;
    @NotNull(message = "Duration in hours cannot be null")
    @Positive(message = "Duration in hours must be positive")
    private Integer durationHours;
    @NotBlank(message = "Location cannot be blank")
    private String location;
    private String specialization;
    private String specialRequests;
}