package com.smarttouristplatform.authservice.controller;

import com.smarttouristplatform.authservice.dto.ApiResponse;
import com.smarttouristplatform.authservice.dto.TouristProfileRequest;
import com.smarttouristplatform.authservice.dto.TouristProfileResponse;
import com.smarttouristplatform.authservice.service.TouristService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tourists")
@PreAuthorize("hasAnyAuthority('TOURIST', 'ADMIN')")
public class TouristController {

    private final TouristService touristService;

    public TouristController(TouristService touristService) {
        this.touristService = touristService;
    }

    // ===================== GET USER ID =====================
    private String getUserIdFromAuthentication(UserDetails userDetails) {
        return userDetails.getUsername();
    }

    // ===================== GET PROFILE =====================
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<TouristProfileResponse>> getMyTouristProfile(
            @AuthenticationPrincipal UserDetails userDetails) {

        try {

            String userEmail = getUserIdFromAuthentication(userDetails);


            TouristProfileResponse response =
                    touristService.getTouristProfileByUserId(userEmail)
                            .orElseThrow(() -> new RuntimeException("Tourist profile not found"));

            return ResponseEntity.ok(
                    new ApiResponse<>(
                            true,
                            "Tourist profile fetched successfully",
                            response
                    )
            );

        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ApiResponse<>(
                            false,
                            e.getMessage(),
                            null
                    )
            );
        }
    }

    // ===================== UPDATE PROFILE =====================
    @PutMapping("/me")
    public ResponseEntity<ApiResponse<TouristProfileResponse>> updateMyTouristProfile(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody TouristProfileRequest request) {

        try {
            String userEmail = getUserIdFromAuthentication(userDetails);

            TouristProfileResponse updatedProfile =
                    touristService.updateTouristProfile(userEmail, request);

            return ResponseEntity.ok(
                    new ApiResponse<>(
                            true,
                            "Tourist profile updated successfully",
                            updatedProfile
                    )
            );

        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ApiResponse<>(
                            false,
                            e.getMessage(),
                            null
                    )
            );
        }
    }

//    // ===================== ADD FAVORITE GUIDE =====================
//    @PostMapping("/favorites/guides/{guide_id}")
//    public ResponseEntity<ApiResponse<Void>> addFavoriteGuide(
//            @AuthenticationPrincipal UserDetails userDetails,
//            @PathVariable("guide_id") String guideId) {
//
//        try {
//            String userId = getUserIdFromAuthentication(userDetails);
//
//            touristService.addFavoriteGuide(userId, guideId);
//
//            return ResponseEntity.ok(
//                    new ApiResponse<>(
//                            true,
//                            "Guide added to favorites",
//                            null
//                    )
//            );
//
//        } catch (Exception e) {
//
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
//                    new ApiResponse<>(
//                            false,
//                            e.getMessage(),
//                            null
//                    )
//            );
//        }
//    }
//
//    // ===================== REMOVE FAVORITE GUIDE =====================
//    @DeleteMapping("/favorites/guides/{guide_id}")
//    public ResponseEntity<ApiResponse<Void>> removeFavoriteGuide(
//            @AuthenticationPrincipal UserDetails userDetails,
//            @PathVariable("guide_id") String guideId) {
//
//        try {
//            String userId = getUserIdFromAuthentication(userDetails);
//
//            touristService.removeFavoriteGuide(userId, guideId);
//
//            return ResponseEntity.ok(
//                    new ApiResponse<>(
//                            true,
//                            "Guide removed from favorites",
//                            null
//                    )
//            );
//
//        } catch (Exception e) {
//
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
//                    new ApiResponse<>(
//                            false,
//                            e.getMessage(),
//                            null
//                    )
//            );
//        }
//    }
//
//    // ===================== GET FAVORITE GUIDES =====================
//    @GetMapping("/favorites/guides")
//    public ResponseEntity<ApiResponse<List<String>>> getFavoriteGuides(
//            @AuthenticationPrincipal UserDetails userDetails) {
//
//        try {
//            String userId = getUserIdFromAuthentication(userDetails);
//
//            List<String> favoriteGuides =
//                    touristService.getFavoriteGuides(userId);
//
//            return ResponseEntity.ok(
//                    new ApiResponse<>(
//                            true,
//                            "Favorite guides fetched successfully",
//                            favoriteGuides
//                    )
//            );
//
//        } catch (Exception e) {
//
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
//                    new ApiResponse<>(
//                            false,
//                            e.getMessage(),
//                            null
//                    )
//            );
//        }
//    }
}