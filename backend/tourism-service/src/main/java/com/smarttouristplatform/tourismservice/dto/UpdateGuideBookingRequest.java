package com.smarttouristplatform.tourismservice.dto;
import lombok.Data;

@Data
public class UpdateGuideBookingRequest {
    private String startTime;
    private String endTime;
    private String specialRequests;
}