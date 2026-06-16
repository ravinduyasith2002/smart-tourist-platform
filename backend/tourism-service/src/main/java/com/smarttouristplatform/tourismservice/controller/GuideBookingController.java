package com.smarttouristplatform.tourismservice.controller;
import com.smarttouristplatform.tourismservice.dto.*;
import com.smarttouristplatform.tourismservice.model.GuideBooking;
import com.smarttouristplatform.tourismservice.service.GuideBookingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/guide-bookings")
public class GuideBookingController {

    @Autowired
    private GuideBookingService guideBookingService;


     // Get logged-in tourist email/user identifier

    private String getTouristId() {
        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();

        return authentication.getName();
    }

    // ========================= CREATE GUIDE BOOKING =========================

    @PostMapping
    public ResponseEntity<ApiResponse<GuideBooking>> createGuideBooking(
            @Valid @RequestBody CreateGuideBookingRequest request) {

        try {

            String touristId = getTouristId();

            GuideBooking booking =
                    guideBookingService.createGuideBooking(request, touristId);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse<>(
                            true,
                            "Guide booking created successfully",
                            booking
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

    // ========================= GET MY GUIDE BOOKINGS =========================

    @GetMapping
    public ResponseEntity<ApiResponse<List<GuideBooking>>> getUserGuideBookings(

            @RequestParam(required = false) String status,

            @RequestParam(defaultValue = "1") int page,

            @RequestParam(defaultValue = "10") int limit) {

        try {

            String touristId = getTouristId();

            List<GuideBooking> bookings =
                    guideBookingService.getUserGuideBookings(
                            touristId,
                            status,
                            page,
                            limit);

            return ResponseEntity.ok(
                    new ApiResponse<>(
                            true,
                            "Guide bookings fetched successfully",
                            bookings
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

    // ========================= GET GUIDE BOOKING BY ID =========================

    @GetMapping("/{bookingId}")
    public ResponseEntity<ApiResponse<GuideBooking>> getGuideBookingDetails(
            @PathVariable String bookingId) {

        try {

            String touristId = getTouristId();

            GuideBooking booking =
                    guideBookingService.getGuideBookingDetails(
                            bookingId,
                            touristId);

            return ResponseEntity.ok(
                    new ApiResponse<>(
                            true,
                            "Guide booking fetched successfully",
                            booking
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

    // ========================= UPDATE GUIDE BOOKING =========================

    @PutMapping("/{bookingId}")
    public ResponseEntity<ApiResponse<GuideBooking>> updateGuideBooking(

            @PathVariable String bookingId,

            @Valid @RequestBody UpdateGuideBookingRequest request) {

        try {

            String touristId = getTouristId();

            GuideBooking updatedBooking =
                    guideBookingService.updateGuideBooking(
                            bookingId,
                            request,
                            touristId);

            return ResponseEntity.ok(
                    new ApiResponse<>(
                            true,
                            "Guide booking updated successfully",
                            updatedBooking
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

    // ========================= CANCEL GUIDE BOOKING =========================

    @PostMapping("/{bookingId}/cancel")
    public ResponseEntity<ApiResponse<GuideBooking>> cancelGuideBooking(

            @PathVariable String bookingId,

            @Valid @RequestBody CancelBookingRequest request) {

        try {

            String touristId = getTouristId();

            GuideBooking cancelledBooking =
                    guideBookingService.cancelGuideBooking(
                            bookingId,
                            request,
                            touristId);

            return ResponseEntity.ok(
                    new ApiResponse<>(
                            true,
                            "Guide booking cancelled successfully",
                            cancelledBooking
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

    // ========================= CONFIRM GUIDE BOOKING =========================

    @PostMapping("/{bookingId}/confirm")
    public ResponseEntity<ApiResponse<GuideBooking>> confirmGuideBooking(
            @PathVariable String bookingId) {

        try {

            String touristId = getTouristId();

            GuideBooking confirmedBooking =
                    guideBookingService.confirmGuideBooking(
                            bookingId,
                            touristId);

            return ResponseEntity.ok(
                    new ApiResponse<>(
                            true,
                            "Guide booking confirmed successfully",
                            confirmedBooking
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