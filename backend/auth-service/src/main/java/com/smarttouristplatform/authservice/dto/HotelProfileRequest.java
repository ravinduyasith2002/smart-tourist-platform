package com.smarttouristplatform.authservice.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.Instant;
import java.util.List;

@Data
public class HotelProfileRequest {

    @NotBlank(message = "Hotel name cannot be empty")
    private String hotelName;

    private String description;

    @NotBlank(message = "Address cannot be empty")
    private String address;

    @NotBlank(message = "City cannot be empty")
    private String city;

    private String state;

    @NotBlank(message = "Country cannot be empty")
    private String country;

    private String postalCode;

    private String phone;

    private String website;

    private String checkInTime;

    private String checkOutTime;

    private Double averageRating;

    private Boolean isVerified;

    private Instant verificationDate;

    private Instant licenseExpiry;

    @Min(value = 0, message = "Total rooms cannot be negative")
    private Integer totalRooms;

    @Min(value = 0, message = "Available rooms cannot be negative")
    private Integer availableRooms;

    private String licenseNumber;

    private List amenities;

    private List rooms;
}