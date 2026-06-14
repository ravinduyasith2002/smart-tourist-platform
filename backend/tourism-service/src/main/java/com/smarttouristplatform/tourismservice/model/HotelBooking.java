package com.smarttouristplatform.tourismservice.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Document(collection = "hotel_bookings")
public class HotelBooking {
    @Id
    private String id;
    @Field("tourist_id")
    private String touristId;
    @Field("hotel_id")
    private String hotelId;
    @Field("room_id")
    private String roomId;
    @Field("trip_id")
    private String tripId;
    @Field("check_in_date")
    private LocalDate checkInDate;
    @Field("check_out_date")
    private LocalDate checkOutDate;
    @Field("number_of_guests")
    private Integer numberOfGuests;
    @Field("special_requests")
    private String specialRequests;
    @Field("room_price_per_night")
    private Double roomPricePerNight;
    @Field("total_price")
    private Double totalPrice;
    private String status; // pending, confirmed, cancelled, completed
    @Field("payment_status")
    private String paymentStatus; // pending, paid, refunded
    @Field("hotel_notes")
    private String hotelNotes;
    @Field("checked_in_at")
    private LocalDateTime checkedInAt;
    @Field("checked_out_at")
    private LocalDateTime checkedOutAt;
    @Field("hotel_info")
    private HotelInfo hotelInfo;
    @Field("review_id")
    private String reviewId;
    @Field("created_at")
    private LocalDateTime createdAt;
    @Field("updated_at")
    private LocalDateTime updatedAt;
}