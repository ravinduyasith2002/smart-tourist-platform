package com.smarttouristplatform.authservice.dto;
import jakarta.validation.constraints.Min;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class GuideProfileRequest {
    private String bio;
    @Min(value = 0, message = "Experience years cannot be negative")
    private Integer experienceYears;
    @Min(value = 0, message = "Hourly rate must be positive")
    private BigDecimal hourlyRate;
    @Min(value = 0, message = "Daily rate must be positive")
    private BigDecimal dailyRate;
    private List<Specialization> specializations;
    private List<Language> languages;
    private List<Certification> certifications;
}

