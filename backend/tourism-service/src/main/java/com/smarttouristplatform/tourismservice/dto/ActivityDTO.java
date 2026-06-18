package com.smarttouristplatform.tourismservice.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ActivityDTO {
    @NotBlank(message = "Activity title cannot be blank")
    private String title;
    private String category;
    private String startTime;
    private String endTime;
    private String location;
    private Double estimatedCost;
}