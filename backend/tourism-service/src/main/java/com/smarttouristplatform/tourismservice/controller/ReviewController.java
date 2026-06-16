package com.smarttouristplatform.tourismservice.controller;

import com.smarttouristplatform.tourismservice.dto.AddReviewResponseRequest;
import com.smarttouristplatform.tourismservice.dto.ApiResponse;
import com.smarttouristplatform.tourismservice.dto.CreateGuideReviewRequest;
import com.smarttouristplatform.tourismservice.dto.CreateHotelReviewRequest;
import com.smarttouristplatform.tourismservice.dto.UpdateReviewRequest;
import com.smarttouristplatform.tourismservice.model.Review;
import com.smarttouristplatform.tourismservice.service.ReviewService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;


     // Get authenticated tourist email from JWT.

    private String getTouristId() {
        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();

        return authentication.getName();
    }


     // Create guide review.

    @PostMapping("/guides/{guideBookingId}")
    public ResponseEntity<ApiResponse<Review>> createGuideReview(
            @PathVariable String guideBookingId,
            @Valid @RequestBody CreateGuideReviewRequest request) {

        try {

            String touristId = getTouristId();

            Review review = reviewService.createGuideReview(
                    guideBookingId,
                    request,
                    touristId
            );

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse<>(
                            true,
                            "Guide review created successfully.",
                            review
                    ));

        } catch (Exception e) {

            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(
                            false,
                            e.getMessage(),
                            null
                    ));
        }
    }


     // Create hotel review.

    @PostMapping("/hotels/{hotelBookingId}")
    public ResponseEntity<ApiResponse<Review>> createHotelReview(
            @PathVariable String hotelBookingId,
            @Valid @RequestBody CreateHotelReviewRequest request) {

        try {

            String touristId = getTouristId();

            Review review = reviewService.createHotelReview(
                    hotelBookingId,
                    request,
                    touristId
            );

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse<>(
                            true,
                            "Hotel review created successfully.",
                            review
                    ));

        } catch (Exception e) {

            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(
                            false,
                            e.getMessage(),
                            null
                    ));
        }
    }


     // Get all reviews for a guide.

    @GetMapping("/guides/{guideId}")
    public ResponseEntity<ApiResponse<List<Review>>> getGuideReviews(
            @PathVariable String guideId,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(defaultValue = "-createdAt") String sort) {

        try {

            List<Review> reviews = reviewService.getGuideReviews(
                    guideId,
                    page,
                    limit,
                    sort
            );

            return ResponseEntity.ok(
                    new ApiResponse<>(
                            true,
                            "Guide reviews retrieved successfully.",
                            reviews
                    )
            );

        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(
                            false,
                            e.getMessage(),
                            null
                    ));
        }
    }


     // Get all reviews for a hotel.

    @GetMapping("/hotels/{hotelId}")
    public ResponseEntity<ApiResponse<List<Review>>> getHotelReviews(
            @PathVariable String hotelId,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(defaultValue = "-createdAt") String sort) {

        try {

            List<Review> reviews = reviewService.getHotelReviews(
                    hotelId,
                    page,
                    limit,
                    sort
            );

            return ResponseEntity.ok(
                    new ApiResponse<>(
                            true,
                            "Hotel reviews retrieved successfully.",
                            reviews
                    )
            );

        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(
                            false,
                            e.getMessage(),
                            null
                    ));
        }
    }


    //  Update review.

    @PutMapping("/{reviewId}")
    public ResponseEntity<ApiResponse<Review>> updateReview(
            @PathVariable String reviewId,
            @Valid @RequestBody UpdateReviewRequest request) {

        try {

            String touristId = getTouristId();

            Review review = reviewService.updateReview(
                    reviewId,
                    request,
                    touristId
            );

            return ResponseEntity.ok(
                    new ApiResponse<>(
                            true,
                            "Review updated successfully.",
                            review
                    )
            );

        } catch (Exception e) {

            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(
                            false,
                            e.getMessage(),
                            null
                    ));
        }
    }


    // Delete review.

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<ApiResponse<Void>> deleteReview(
            @PathVariable String reviewId) {

        try {

            String touristId = getTouristId();

            reviewService.deleteReview(
                    reviewId,
                    touristId
            );

            return ResponseEntity.ok(
                    new ApiResponse<>(
                            true,
                            "Review deleted successfully.",
                            null
                    )
            );

        } catch (Exception e) {

            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(
                            false,
                            e.getMessage(),
                            null
                    ));
        }
    }


    // Add hotel/guide owner response to a review.

    @PostMapping("/{reviewId}/response")
    public ResponseEntity<ApiResponse<Review>> addReviewResponse(
            @PathVariable String reviewId,
            @Valid @RequestBody AddReviewResponseRequest request) {

        try {

            Review review = reviewService.addReviewResponse(
                    reviewId,
                    request
            );

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse<>(
                            true,
                            "Review response added successfully.",
                            review
                    ));

        } catch (Exception e) {

            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(
                            false,
                            e.getMessage(),
                            null
                    ));
        }
    }
}