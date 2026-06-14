package com.smarttouristplatform.tourismservice.model;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDate;
import java.util.List;

@Data
public class ItineraryDay {
    @Field("day_number")
    private Integer dayNumber;
    private LocalDate date;
    private String location;
    private String title;
    private String description;
    private List<Activity> activities;
}