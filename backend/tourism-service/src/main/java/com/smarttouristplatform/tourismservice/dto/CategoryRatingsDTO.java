package com.smarttouristplatform.tourismservice.dto;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Data;

@Data
public class CategoryRatingsDTO {
    @Min(1) @Max(5) private Integer roomCleanliness;
    @Min(1) @Max(5) private Integer staffService;
    @Min(1) @Max(5) private Integer amenities;
    @Min(1) @Max(5) private Integer valueForMoney;
    @Min(1) @Max(5) private Integer location;
}