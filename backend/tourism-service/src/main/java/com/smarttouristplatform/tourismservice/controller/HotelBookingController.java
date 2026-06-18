package com.smarttouristplatform.tourismservice.controller;

import com.smarttouristplatform.tourismservice.dto.ApiResponse;
import com.smarttouristplatform.tourismservice.dto.CancelBookingRequest;
import com.smarttouristplatform.tourismservice.dto.CreateHotelBookingRequest;
import com.smarttouristplatform.tourismservice.dto.UpdateHotelBookingRequest;
import com.smarttouristplatform.tourismservice.model.HotelBooking;
import com.smarttouristplatform.tourismservice.service.HotelBookingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hotel-bookings")
public class HotelBookingController {

    @Autowired
    private HotelBookingService hotelBookingService;

    /**
     * Get logged-in tourist email/user identifier
     */
    private String getTouristId() {
        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();

        return authentication.getName();
    }

    // ========================= CREATE HOTEL BOOKING =========================

    @PostMapping
    public ResponseEntity<ApiResponse<HotelBooking>> createHotelBooking(
            @Valid @RequestBody CreateHotelBookingRequest request) {

        try {

            String touristId = getTouristId();

            HotelBooking booking =
                    hotelBookingService.createHotelBooking(request, touristId);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse<>(
                            true,
                            "Hotel booking created successfully",
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

    // ========================= GET MY HOTEL BOOKINGS =========================

    @GetMapping
    public ResponseEntity<ApiResponse<List<HotelBooking>>> getUserHotelBookings(

            @RequestParam(required = false) String status,

            @RequestParam(defaultValue = "1") int page,

            @RequestParam(defaultValue = "10") int limit) {

        try {

            String touristId = getTouristId();

            List<HotelBooking> bookings =
                    hotelBookingService.getUserHotelBookings(
                            touristId,
                            status,
                            page,
                            limit);

            return ResponseEntity.ok(
                    new ApiResponse<>(
                            true,
                            "Hotel bookings fetched successfully",
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

    // ========================= GET HOTEL BOOKING BY ID =========================

    @GetMapping("/{bookingId}")
    public ResponseEntity<ApiResponse<HotelBooking>> getHotelBookingDetails(
            @PathVariable String bookingId) {

        try {

            String touristId = getTouristId();

            HotelBooking booking =
                    hotelBookingService.getHotelBookingDetails(
                            bookingId,
                            touristId);

            return ResponseEntity.ok(
                    new ApiResponse<>(
                            true,
                            "Hotel booking fetched successfully",
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

    // ========================= UPDATE HOTEL BOOKING =========================

    @PutMapping("/{bookingId}")
    public ResponseEntity<ApiResponse<HotelBooking>> updateHotelBooking(

            @PathVariable String bookingId,

            @Valid @RequestBody UpdateHotelBookingRequest request) {

        try {

            String touristId = getTouristId();

            HotelBooking updatedBooking =
                    hotelBookingService.updateHotelBooking(
                            bookingId,
                            request,
                            touristId);

            return ResponseEntity.ok(
                    new ApiResponse<>(
                            true,
                            "Hotel booking updated successfully",
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

    // ========================= CANCEL HOTEL BOOKING =========================

    @PostMapping("/{bookingId}/cancel")
    public ResponseEntity<ApiResponse<HotelBooking>> cancelHotelBooking(

            @PathVariable String bookingId,

            @Valid @RequestBody CancelBookingRequest request) {

        try {

            String touristId = getTouristId();

            HotelBooking cancelledBooking =
                    hotelBookingService.cancelHotelBooking(
                            bookingId,
                            request,
                            touristId);

            return ResponseEntity.ok(
                    new ApiResponse<>(
                            true,
                            "Hotel booking cancelled successfully",
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

    // ========================= CHECK IN =========================

    @PostMapping("/{bookingId}/check-in")
    public ResponseEntity<ApiResponse<HotelBooking>> checkIn(
            @PathVariable String bookingId) {

        try {

            String touristId = getTouristId();

            HotelBooking checkedInBooking =
                    hotelBookingService.checkIn(
                            bookingId,
                            touristId);

            return ResponseEntity.ok(
                    new ApiResponse<>(
                            true,
                            "Hotel check-in completed successfully",
                            checkedInBooking
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

    // ========================= CHECK OUT =========================

    @PostMapping("/{bookingId}/check-out")
    public ResponseEntity<ApiResponse<HotelBooking>> checkOut(
            @PathVariable String bookingId) {

        try {

            String touristId = getTouristId();

            HotelBooking checkedOutBooking =
                    hotelBookingService.checkOut(
                            bookingId,
                            touristId);

            return ResponseEntity.ok(
                    new ApiResponse<>(
                            true,
                            "Hotel check-out completed successfully",
                            checkedOutBooking
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