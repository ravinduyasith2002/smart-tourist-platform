package com.smarttouristplatform.tourismservice.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CancelBookingRequest {
    @NotBlank(message = "Reason for cancellation cannot be blank")
    private String reason;
}