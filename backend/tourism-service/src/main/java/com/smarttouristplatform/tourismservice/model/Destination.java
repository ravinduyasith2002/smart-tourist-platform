package com.smarttouristplatform.tourismservice.model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Data
public class Destination {
    private String name;
    private String country;
    private List<Double> coordinates; // [longitude, latitude]
    @Field("visit_order")
    private Integer visitOrder;
}