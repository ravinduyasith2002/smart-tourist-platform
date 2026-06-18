package com.smarttouristplatform.tourismservice.controller;

import com.smarttouristplatform.tourismservice.dto.*;
import com.smarttouristplatform.tourismservice.model.Trip;
import com.smarttouristplatform.tourismservice.service.TripService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips")
public class TripController {

    @Autowired
    private TripService tripService;


//    Get logged-in tourist email/user identifier

    private String getTouristId() {
        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();

        return authentication.getName();
    }

    // ========================= CREATE TRIP =========================

    @PostMapping
    public ResponseEntity<ApiResponse<Trip>> createTrip(
            @Valid @RequestBody CreateTripRequest request) {

        try {
            String touristId = getTouristId();

            Trip trip = tripService.createTrip(request, touristId);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse<>(
                            true,
                            "Trip created successfully",
                            trip
                    ));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse<>(
                            false,
                            e.getMessage(),
                            null
                    ));
        }
    }

    // ========================= GET MY TRIPS =========================

    @GetMapping
    public ResponseEntity<ApiResponse<List<Trip>>> getUserTrips(

            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(defaultValue = "-startDate") String sort) {

        try {

            String touristId = getTouristId();

            List<Trip> trips =
                    tripService.getUserTrips(
                            touristId,
                            status,
                            page,
                            limit,
                            sort);

            return ResponseEntity.ok(
                    new ApiResponse<>(
                            true,
                            "Trips fetched successfully",
                            trips
                    ));

        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse<>(
                            false,
                            e.getMessage(),
                            null
                    ));
        }
    }

    // ========================= GET TRIP BY ID =========================

    @GetMapping("/{tripId}")
    public ResponseEntity<ApiResponse<Trip>> getTripDetails(
            @PathVariable String tripId) {

        try {

            String touristId = getTouristId();

            Trip trip =
                    tripService.getTripDetails(tripId, touristId);

            return ResponseEntity.ok(
                    new ApiResponse<>(
                            true,
                            "Trip fetched successfully",
                            trip
                    ));

        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(
                            false,
                            e.getMessage(),
                            null
                    ));
        }
    }

    // ========================= UPDATE TRIP =========================

    @PutMapping("/{tripId}")
    public ResponseEntity<ApiResponse<Trip>> updateTrip(

            @PathVariable String tripId,

            @Valid @RequestBody UpdateTripRequest request) {

        try {

            String touristId = getTouristId();

            Trip updated =
                    tripService.updateTrip(
                            tripId,
                            request,
                            touristId);

            return ResponseEntity.ok(
                    new ApiResponse<>(
                            true,
                            "Trip updated successfully",
                            updated
                    ));

        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse<>(
                            false,
                            e.getMessage(),
                            null
                    ));
        }
    }

    // ========================= DELETE TRIP =========================

    @DeleteMapping("/{tripId}")
    public ResponseEntity<ApiResponse<Void>> deleteTrip(
            @PathVariable String tripId) {

        try {

            String touristId = getTouristId();

            tripService.deleteTrip(
                    tripId,
                    touristId);

            return ResponseEntity.ok(
                    new ApiResponse<>(
                            true,
                            "Trip deleted successfully",
                            null
                    ));

        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse<>(
                            false,
                            e.getMessage(),
                            null
                    ));
        }
    }

    // ========================= ADD ITINERARY DAY =========================

    @PostMapping("/{tripId}/itinerary")
    public ResponseEntity<ApiResponse<Trip>> addItineraryDay(

            @PathVariable String tripId,

            @Valid @RequestBody AddItineraryDayRequest request) {

        try {

            String touristId = getTouristId();

            Trip updated =
                    tripService.addItineraryDay(
                            tripId,
                            request,
                            touristId);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse<>(
                            true,
                            "Itinerary day added successfully",
                            updated
                    ));

        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse<>(
                            false,
                            e.getMessage(),
                            null
                    ));
        }
    }

    // ========================= UPDATE ITINERARY DAY =========================

    @PutMapping("/{tripId}/itinerary/{dayId}")
    public ResponseEntity<ApiResponse<Trip>> updateItineraryDay(

            @PathVariable String tripId,

            @PathVariable String dayId,

            @Valid @RequestBody UpdateItineraryDayRequest request) {

        try {

            String touristId = getTouristId();

            Trip updated =
                    tripService.updateItineraryDay(
                            tripId,
                            dayId,
                            request,
                            touristId);

            return ResponseEntity.ok(
                    new ApiResponse<>(
                            true,
                            "Itinerary day updated successfully",
                            updated
                    ));

        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse<>(
                            false,
                            e.getMessage(),
                            null
                    ));
        }
    }

    // ========================= DELETE ITINERARY DAY =========================

    @DeleteMapping("/{tripId}/itinerary/{dayId}")
    public ResponseEntity<ApiResponse<Trip>> deleteItineraryDay(

            @PathVariable String tripId,

            @PathVariable String dayId) {

        try {

            String touristId = getTouristId();

            Trip updated =
                    tripService.deleteItineraryDay(
                            tripId,
                            dayId,
                            touristId);

            return ResponseEntity.ok(
                    new ApiResponse<>(
                            true,
                            "Itinerary day deleted successfully",
                            updated
                    ));

        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse<>(
                            false,
                            e.getMessage(),
                            null
                    ));
        }
    }

    // ========================= GET PUBLIC TRIPS =========================

    @GetMapping("/public")
    public ResponseEntity<ApiResponse<List<Trip>>> getPublicTrips(

            @RequestParam(required = false) String destination,

            @RequestParam(required = false) String country,

            @RequestParam(required = false) Double minRating,

            @RequestParam(defaultValue = "1") int page,

            @RequestParam(defaultValue = "10") int limit) {

        try {

            List<Trip> trips =
                    tripService.getPublicTrips(
                            destination,
                            country,
                            minRating,
                            page,
                            limit);

            return ResponseEntity.ok(
                    new ApiResponse<>(
                            true,
                            "Public trips fetched successfully",
                            trips
                    ));

        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse<>(
                            false,
                            e.getMessage(),
                            null
                    ));
        }
    }

}