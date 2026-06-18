package com.smarttouristplatform.tourismservice.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Document(collection = "trips")
public class Trip {
    @Id
    private String id;
    @Field("tourist_id")
    private String touristId;
    private String title;
    private String description;
    @Field("start_date")
    private LocalDate startDate;
    @Field("end_date")
    private LocalDate endDate;
    private String status; // planning, confirmed, ongoing, completed, cancelled
    private Double budget;
    private String currency;
    @Field("total_spent")
    private Double totalSpent = 0.0;
    @Field("is_public")
    private Boolean isPublic = false;
    private List<Destination> destinations;
    @Field("itinerary_days")
    private List<ItineraryDay> itineraryDays;
    @Field("created_at")
    private LocalDateTime createdAt;
    @Field("updated_at")
    private LocalDateTime updatedAt;
}