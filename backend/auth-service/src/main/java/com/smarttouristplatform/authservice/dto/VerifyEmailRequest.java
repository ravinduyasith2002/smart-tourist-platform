package com.smarttouristplatform.authservice.dto;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class VerifyEmailRequest {
    @NotBlank(message = "Verification token cannot be empty")
    private String token;

    public String getEmail() {
        return null;
    }
}