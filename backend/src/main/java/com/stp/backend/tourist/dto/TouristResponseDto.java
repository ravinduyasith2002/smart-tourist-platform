package com.stp.backend.tourist.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TouristResponseDto {
    private String id;

    //Base user fields
    private String name;
    private String email;
    private String phone;
    private String avatar;
    private String bio;
    private String city;
    private String country;

    // Tourist-Specific Fields
    private List<String> preferences;
    private Integer totalTrips;
    private Double averageRating;
    private List<String> favouriteDestinations;
}
