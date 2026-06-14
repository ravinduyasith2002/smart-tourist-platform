package com.smarttouristplatform.authservice.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@Data
@Document(collection = "hotels")
public class Hotel {

    @Id
    private String id;

    private String email;

    @DBRef
    private User user;

    private String hotelName;

    private String description;

    private String address;

    private String city;

    private String state;

    private String country;

    private String postalCode;

    /**
     * MongoDB GeoJSON Location
     * X = Longitude
     * Y = Latitude
     */
    private GeoJsonPoint location;

    private String phone;

    private String website;

    private String checkInTime = "14:00";

    private String checkOutTime = "11:00";

    private int totalRooms;

    private int availableRooms;

    private Double averageRating;

    private int totalBookings = 0;

    private BigDecimal totalRevenue = BigDecimal.ZERO;

    private boolean isVerified = false;

    private Instant verificationDate;

    private String licenseNumber;

    private Instant licenseExpiry;

    private List<String> amenities;

    private List<Object> rooms;

    private Instant createdAt;

    private Instant updatedAt;
}