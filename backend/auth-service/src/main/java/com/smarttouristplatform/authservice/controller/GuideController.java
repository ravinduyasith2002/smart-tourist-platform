package com.smarttouristplatform.authservice.controller;

import com.smarttouristplatform.authservice.dto.*;
import com.smarttouristplatform.authservice.service.GuideService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/guides")
@PreAuthorize("hasAnyAuthority('GUIDE', 'ADMIN')")
public class GuideController {

    private final GuideService guideService;

    public GuideController(GuideService guideService) {
        this.guideService = guideService;
    }

    // ---------------- helper ----------------
    private String getUserIdFromAuthentication(UserDetails userDetails) {
        return userDetails.getUsername();
    }

    // ---------------- GET MY PROFILE ----------------
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<GuideProfileResponse>> getMyGuideProfile(
            @AuthenticationPrincipal UserDetails userDetails) {

        try {
            String userEmail = getUserIdFromAuthentication(userDetails);

            GuideProfileResponse response =
                    guideService.getGuideProfileByUserId(userEmail)
                            .orElseThrow(() -> new RuntimeException("Guide profile not found"));

            return ResponseEntity.ok(
                    new ApiResponse<>(
                            true,
                            "Guide profile fetched successfully",
                            response
                    )
            );

        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new ApiResponse<>(
                            false,
                            e.getMessage(),
                            null
                    )
            );
        }
    }

    // ---------------- UPDATE PROFILE ----------------
    @PutMapping("/me")
    public ResponseEntity<ApiResponse<GuideProfileResponse>> updateMyGuideProfile(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody GuideProfileRequest request) {

        try {
            String userId = getUserIdFromAuthentication(userDetails);

            GuideProfileResponse updatedProfile =
                    guideService.updateGuideProfile(userId, request);

            return ResponseEntity.ok(
                    new ApiResponse<>(
                            true,
                            "Guide profile updated successfully",
                            updatedProfile
                    )
            );

        } catch (Exception e) {
            return ResponseEntity.status(400).body(
                    new ApiResponse<>(
                            false,
                            e.getMessage(),
                            null
                    )
            );
        }
    }

    // ---------------- ADD CERTIFICATION ----------------
    @PostMapping("/me/certifications")
    public ResponseEntity<ApiResponse<GuideProfileResponse>> addCertification(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody CertificationRequest request) {

        try {
            String guideId = getUserIdFromAuthentication(userDetails);

            GuideProfileResponse updated =
                    guideService.addCertification(guideId, request);

            return ResponseEntity.ok(
                    new ApiResponse<>(
                            true,
                            "Certification added successfully",
                            updated
                    )
            );

        } catch (Exception e) {
            return ResponseEntity.status(400).body(
                    new ApiResponse<>(
                            false,
                            e.getMessage(),
                            null
                    )
            );
        }
    }

    // ---------------- GET CERTIFICATIONS ----------------
    @GetMapping("/me/certifications")
    public ResponseEntity<ApiResponse<List<CertificationRequest>>> getCertifications(
            @AuthenticationPrincipal UserDetails userDetails) {

        try {
            String guideId = getUserIdFromAuthentication(userDetails);

            GuideProfileResponse profile =
                    guideService.getGuideProfileByUserId(guideId)
                            .orElseThrow(() -> new RuntimeException("Guide not found"));

            return ResponseEntity.ok(
                    new ApiResponse<>(
                            true,
                            "Certifications fetched successfully",
                            List.of() // replace with real mapping later
                    )
            );

        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new ApiResponse<>(
                            false,
                            e.getMessage(),
                            null
                    )
            );
        }
    }

    // ---------------- DELETE CERTIFICATION ----------------
    @DeleteMapping("/me/certifications/{cert_id}")
    public ResponseEntity<ApiResponse<Void>> deleteCertification(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable("cert_id") String certId) {

        try {
            String guideId = getUserIdFromAuthentication(userDetails);

            guideService.deleteCertification(guideId, certId);

            return ResponseEntity.ok(
                    new ApiResponse<>(
                            true,
                            "Certification deleted successfully",
                            null
                    )
            );

        } catch (Exception e) {
            return ResponseEntity.status(400).body(
                    new ApiResponse<>(
                            false,
                            e.getMessage(),
                            null
                    )
            );
        }
    }


    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<List<GuideProfileResponse>>> getAllGuides() {

        try {
            List<GuideProfileResponse> guides = guideService.getAllGuides();

            return ResponseEntity.ok(
                    new ApiResponse<>(
                            true,
                            "All guides fetched successfully",
                            guides
                    )
            );

        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    new ApiResponse<>(
                            false,
                            "Failed to fetch guides: " + e.getMessage(),
                            null
                    )
            );
        }
    }

//    // ---------------- SEARCH GUIDES ----------------
//    @GetMapping("/search")
//    @PreAuthorize("isAuthenticated()")
//    public ResponseEntity<ApiResponse<List<GuideProfileResponse>>> searchGuides(
//            @RequestParam(required = false) String city,
//            @RequestParam(required = false) String language) {
//
//        try {
//            List<GuideProfileResponse> guides =
//                    guideService.searchGuides(city, language);
//
//            return ResponseEntity.ok(
//                    new ApiResponse<>(
//                            true,
//                            "Guides fetched successfully",
//                            guides
//                    )
//            );
//
//        } catch (Exception e) {
//            return ResponseEntity.status(400).body(
//                    new ApiResponse<>(
//                            false,
//                            e.getMessage(),
//                            null
//                    )
//            );
//        }
//    }

    // ---------------- GET BY ID ----------------
    @GetMapping("/{guide_id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<GuideProfileResponse>> getGuideProfileById(
            @PathVariable("guide_id") String guideId) {

        try {
            GuideProfileResponse response =
                    guideService.getGuideProfileByUserId(guideId)
                            .orElseThrow(() -> new RuntimeException("Guide not found"));

            return ResponseEntity.ok(
                    new ApiResponse<>(
                            true,
                            "Guide profile fetched successfully",
                            response
                    )
            );

        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new ApiResponse<>(
                            false,
                            e.getMessage(),
                            null
                    )
            );
        }
    }
}