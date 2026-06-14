package com.smarttouristplatform.authservice.controller;

import com.smarttouristplatform.authservice.dto.ApiResponse;
import com.smarttouristplatform.authservice.dto.HotelProfileRequest;
import com.smarttouristplatform.authservice.dto.HotelProfileResponse;
import com.smarttouristplatform.authservice.service.HotelService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hotels")
@PreAuthorize("hasAnyAuthority('HOTEL', 'ADMIN')")
public class HotelController {

    private final HotelService hotelService;

    public HotelController(HotelService hotelService) {
        this.hotelService = hotelService;
    }


    // AUTH HELPERS
    private String getUserEmailFromAuth(UserDetails userDetails) {
        return userDetails.getUsername();
    }


    // GET MY HOTEL PROFILE
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<HotelProfileResponse>> getMyHotelProfile(
            @AuthenticationPrincipal UserDetails userDetails) {

        try {
            String email = getUserEmailFromAuth(userDetails);

            HotelProfileResponse response = hotelService.getHotelProfileByUserEmail(email)
                    .orElseThrow(() -> new RuntimeException("Hotel profile not found"));

            return ResponseEntity.ok(
                    new ApiResponse<>(true, "Hotel profile fetched successfully", response)
            );

        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new ApiResponse<>(false, e.getMessage(), null)
            );
        }
    }


    // UPDATE MY HOTEL PROFILE
    @PutMapping("/me")
    public ResponseEntity<ApiResponse<HotelProfileResponse>> updateMyHotelProfile(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody HotelProfileRequest request) {

        try {
            String email = getUserEmailFromAuth(userDetails);

            HotelProfileResponse updated = hotelService.updateHotelProfile(email, request);

            return ResponseEntity.ok(
                    new ApiResponse<>(true, "Hotel profile updated successfully", updated)
            );

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    new ApiResponse<>(false, e.getMessage(), null)
            );
        }
    }

// ---------------- GET ALL HOTELS ----------------
    @GetMapping
    @PreAuthorize("permitAll()")
    public ResponseEntity<ApiResponse<List<HotelProfileResponse>>> getAllHotels() {

        try {
            List<HotelProfileResponse> hotels = hotelService.getAllHotels();

            return ResponseEntity.ok(
                    new ApiResponse<>(
                            true,
                            "Hotels fetched successfully",
                            hotels
                    )
            );

        } catch (Exception e) {

            return ResponseEntity.status(500).body(
                    new ApiResponse<>(
                            false,
                            e.getMessage(),
                            null
                    )
            );
        }
    }


    // GET HOTEL BY ID
    @GetMapping("/{hotel_id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<HotelProfileResponse>> getHotelById(
            @PathVariable("hotel_id") String hotelId) {

        try {
            HotelProfileResponse response = hotelService.getHotelProfileByUserId(hotelId)
                    .orElseThrow(() -> new RuntimeException("Hotel not found"));

            return ResponseEntity.ok(
                    new ApiResponse<>(true, "Hotel fetched successfully", response)
            );

        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new ApiResponse<>(false, e.getMessage(), null)
            );
        }
    }


    // SEARCH HOTELS
    @GetMapping("/search")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<List<HotelProfileResponse>>> searchHotels(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String country) {

        try {
            // TODO: implement service search logic
            List<HotelProfileResponse> result = List.of();

            return ResponseEntity.ok(
                    new ApiResponse<>(true, "Hotels fetched successfully", result)
            );

        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    new ApiResponse<>(false, e.getMessage(), null)
            );
        }
    }


    // NEARBY HOTELS
    @GetMapping("/nearby")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<List<HotelProfileResponse>>> searchNearbyHotels(
            @RequestParam double latitude,
            @RequestParam double longitude,
            @RequestParam(defaultValue = "10000") double radius) {

        try {
            // TODO: MongoDB geo query implementation
            List<HotelProfileResponse> result = List.of();

            return ResponseEntity.ok(
                    new ApiResponse<>(true, "Nearby hotels fetched successfully", result)
            );

        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    new ApiResponse<>(false, e.getMessage(), null)
            );
        }
    }



}