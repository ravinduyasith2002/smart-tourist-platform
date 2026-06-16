package com.smarttouristplatform.tourismservice.dto;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import lombok.Data;

@Data
public class CreateHotelBookingRequest {
    @NotBlank(message = "Hotel ID cannot be blank")
    private String hotelId;
    @NotBlank(message = "Room ID cannot be blank")
    private String roomId;
    @NotBlank(message = "Trip ID cannot be blank")
    private String tripId;
    @NotNull(message = "Check-in date cannot be null")
    private LocalDate checkInDate;
    @NotNull(message = "Check-out date cannot be null")
    private LocalDate checkOutDate;
    @Min(value = 1, message = "Number of guests must be at least 1")
    private Integer numberOfGuests;
    private String specialRequests;
}