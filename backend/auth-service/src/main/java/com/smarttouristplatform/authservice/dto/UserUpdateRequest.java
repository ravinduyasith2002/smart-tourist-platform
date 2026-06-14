package com.smarttouristplatform.authservice.dto;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserUpdateRequest {
    @Size(min = 2, max = 255, message = "Name must be between 2 and 255 characters")
    private String name;
    private String avatarUrl;
    private String phone;
    private String bio;
}