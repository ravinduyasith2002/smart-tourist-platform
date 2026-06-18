package com.smarttouristplatform.tourismservice.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Data;

@Data
public class ReviewCategoriesDTO {
    @Min(1) @Max(5) private Integer knowledge;
    @Min(1) @Max(5) private Integer communication;
    @Min(1) @Max(5) private Integer punctuality;
    @Min(1) @Max(5) private Integer friendliness;
}