package com.smarttouristplatform.authservice.model;

import lombok.Data;

import java.time.Instant;

@Data
public class Certification {

    private String certId;
    private String name;
    private String org;
    private Instant issueDate;
    private Instant expiryDate;
    private String certUrl;
    private boolean verified;
}
