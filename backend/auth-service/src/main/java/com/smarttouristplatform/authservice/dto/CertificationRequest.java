package com.smarttouristplatform.authservice.dto;
import lombok.Data;
import java.time.Instant;

@Data
public class CertificationRequest {
    private String name;
    private String org;
    private Instant issueDate;
    private Instant expiryDate;
    private String certUrl;
}