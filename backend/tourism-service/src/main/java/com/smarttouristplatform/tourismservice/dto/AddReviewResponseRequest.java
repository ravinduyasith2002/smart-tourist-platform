package com.smarttouristplatform.tourismservice.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AddReviewResponseRequest {
    @NotBlank(message = "Response text cannot be blank")
    private String responseText;
}