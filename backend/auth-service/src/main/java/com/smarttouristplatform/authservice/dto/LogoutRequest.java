package com.smarttouristplatform.authservice.dto;
import lombok.Data;

@Data
public class LogoutRequest {
    private boolean allDevices = false;
}