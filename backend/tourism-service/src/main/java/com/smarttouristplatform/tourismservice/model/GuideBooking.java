package com.smarttouristplatform.tourismservice.model;


import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Document(collection = "guide_bookings")
public class GuideBooking {
    @Id
    private String id;
    @Field("tourist_id")
    private String touristId;
    @Field("guide_id")
    private String guideId;
    @Field("trip_id")
    private String tripId;
    @Field("booking_date")
    private LocalDate bookingDate;
    @Field("start_time")
    private String startTime;
    @Field("end_time")
    private String endTime;
    @Field("duration_hours")
    private Integer durationHours;
    private String location;
    private String specialization;
    @Field("special_requests")
    private String specialRequests;
    @Field("total_price")
    private Double totalPrice;
    private String status; // pending, confirmed, cancelled, completed
    @Field("payment_status")
    private String paymentStatus; // pending, paid, refunded
    @Field("guide_notes")
    private String guideNotes;
    @Field("guide_info")
    private GuideInfo guideInfo;
    @Field("review_id")
    private String reviewId;
    @Field("created_at")
    private LocalDateTime createdAt;
    @Field("updated_at")
    private LocalDateTime updatedAt;
}