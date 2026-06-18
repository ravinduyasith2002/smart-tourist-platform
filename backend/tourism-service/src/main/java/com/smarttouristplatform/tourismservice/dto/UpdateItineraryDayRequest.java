package com.smarttouristplatform.tourismservice.dto;
import jakarta.validation.Valid;
import lombok.Data;
import java.util.List;

@Data
public class UpdateItineraryDayRequest {
    private String title;
    private String description;
    @Valid
    private List<ActivityDTO> activities;
}