package com.smarttouristplatform.tourismservice.dto;
import jakarta.validation.constraints.Min;
import lombok.Data;

@Data
public class UpdateHotelBookingRequest {
    @Min(value = 1, message = "Number of guests must be at least 1")
    private Integer numberOfGuests;
    private String specialRequests;
}