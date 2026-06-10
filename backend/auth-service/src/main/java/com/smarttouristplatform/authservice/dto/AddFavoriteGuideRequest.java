package com.smarttouristplatform.authservice.dto;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AddFavoriteGuideRequest {
    @NotBlank(message = "Guide ID cannot be empty")
    private String guideId;
}