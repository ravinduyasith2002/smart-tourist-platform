package com.smarttouristplatform.tourismservice.model;


import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;

@Data
@Document(collection = "reviews")
public class Review {
    @Id
    private String id;
    @Field("tourist_id")
    private String touristId;
    @Field("guide_booking_id")
    private String guideBookingId;
    @Field("hotel_booking_id")
    private String hotelBookingId;
    @Field("guide_id")
    private String guideId;
    @Field("hotel_id")
    private String hotelId;
    private Integer rating;
    private String title;
    private String comment;
    private ReviewCategories categories; // For guide reviews
    @Field("category_ratings")
    private CategoryRatings categoryRatings; // For hotel reviews
    @Field("is_published")
    private Boolean isPublished = true;
    @Field("response_text")
    private String responseText;
    @Field("created_at")
    private LocalDateTime createdAt;
    @Field("updated_at")
    private LocalDateTime updatedAt;
}