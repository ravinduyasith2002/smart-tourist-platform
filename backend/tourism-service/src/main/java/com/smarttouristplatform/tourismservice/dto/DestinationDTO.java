package com.smarttouristplatform.tourismservice.dto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Data
public class DestinationDTO {
    @NotBlank(message = "Destination name cannot be blank")
    private String name;
    @NotBlank(message = "Country cannot be blank")
    private String country;
    @NotNull(message = "Coordinates cannot be null")
    @Size(min = 2, max = 2, message = "Coordinates must contain exactly two values (longitude, latitude)")
    private List<Double> coordinates;
    @NotNull(message = "Visit order cannot be null")
    private Integer visitOrder;
}