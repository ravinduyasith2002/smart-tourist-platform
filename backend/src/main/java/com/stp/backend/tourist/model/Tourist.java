package com.stp.backend.tourist.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "tourists")
public class Tourist {
    @Id
    private String id;
    //Base user fields
    private String name;
    private String email;
    private String phone;
    private String avatar;
    private String bio;
    private String city;
    private String country;

    //Tourist-specific fields
    private List<String> preferences;
    private Integer totalTrips;
    private Double averageRating;
    private List<String> favouriteDestinations;


}
