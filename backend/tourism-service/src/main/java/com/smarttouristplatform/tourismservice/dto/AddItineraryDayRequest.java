package com.smarttouristplatform.tourismservice.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;
import lombok.Data;

@Data
public class AddItineraryDayRequest {
    @NotNull(message = "Day number cannot be null")
    private Integer dayNumber;
    @NotNull(message = "Date cannot be null")
    private LocalDate date;
    @NotBlank(message = "Location cannot be blank")
    private String location;
    @NotBlank(message = "Title cannot be blank")
    private String title;
    private String description;
    @Valid
    private List<ActivityDTO> activities;
}