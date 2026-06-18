package com.smarttouristplatform.tourismservice.model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
public class Activity {
    private String title;
    private String category;
    @Field("start_time")
    private String startTime;
    @Field("end_time")
    private String endTime;
    private String location;
    @Field("estimated_cost")
    private Double estimatedCost;
}