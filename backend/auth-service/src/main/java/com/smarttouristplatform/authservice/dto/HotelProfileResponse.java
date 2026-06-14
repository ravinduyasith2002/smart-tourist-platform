package com.smarttouristplatform.authservice.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class HotelProfileResponse {

    private String hotelId;

    private String userId;

    private String email;

    private String hotelName;

    private String description;

    private String address;

    private String city;

    private String state;

    private String country;

    private String postalCode;

    // Readable location
    private String location;

    // GPS Coordinates
    private Double latitude;

    private Double longitude;

    private String phone;

    private String website;

    private String checkInTime;

    private String checkOutTime;

    private int totalRooms;

    private int availableRooms;

    private Double averageRating;

    private int totalBookings;

    private BigDecimal totalRevenue;

    private boolean verified;

    private Instant verificationDate;

    private String licenseNumber;

    private Instant licenseExpiry;

    private List<String> amenities;

    private List<Object> rooms;

    private Instant createdAt;

    private Instant updatedAt;
}