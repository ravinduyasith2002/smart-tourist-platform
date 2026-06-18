package com.smarttouristplatform.tourismservice.model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
public class CategoryRatings {
    @Field("room_cleanliness")
    private Integer roomCleanliness;
    @Field("staff_service")
    private Integer staffService;
    private Integer amenities;
    @Field("value_for_money")
    private Integer valueForMoney;
    private Integer location;
}
