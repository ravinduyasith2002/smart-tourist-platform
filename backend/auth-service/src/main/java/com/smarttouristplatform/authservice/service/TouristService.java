package com.smarttouristplatform.authservice.service;

import com.smarttouristplatform.authservice.dto.TouristProfileRequest;
import com.smarttouristplatform.authservice.dto.TouristProfileResponse;
import com.smarttouristplatform.authservice.exception.ResourceNotFoundException;
import com.smarttouristplatform.authservice.model.Tourist;
import com.smarttouristplatform.authservice.model.User;
import com.smarttouristplatform.authservice.repository.TouristRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;

@Service
public class TouristService {

    private final TouristRepository touristRepository;

    public TouristService(TouristRepository touristRepository) {
        this.touristRepository = touristRepository;
    }

    @Transactional
    public Tourist createTouristProfile(User user) {
        Tourist tourist = new Tourist();
        tourist.setId(user.getId());
        tourist.setEmail(user.getEmail());
        tourist.setUser(user);
        tourist.setCreatedAt(Instant.now());
        tourist.setUpdatedAt(Instant.now());

        return touristRepository.save(tourist);
    }

    public Optional<TouristProfileResponse> getTouristProfileByUserId(String userEmail) {
        return touristRepository.findByEmail(userEmail)
                .map(this::mapTouristToTouristProfileResponse);
    }

    @Transactional
    public TouristProfileResponse updateTouristProfile(String userEmail, TouristProfileRequest request) {

        Tourist tourist = touristRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Tourist profile not found"));


        if (request.getPreferredLanguage() != null) {
            tourist.setPreferredLanguage(request.getPreferredLanguage());
        }

        if (request.getPreferredCurrency() != null) {
            tourist.setPreferredCurrency(request.getPreferredCurrency());
        }


        if (request.getTravelStyle() != null) {
            tourist.setTravelStyle(
                    Tourist.TravelStyle.from(request.getTravelStyle().toString())
            );
        }

        if (request.getTotalTrips() != null) {
            tourist.setTotalTrips(request.getTotalTrips());
        }

        if (request.getTotalSpent() != null) {
            tourist.setTotalSpent(request.getTotalSpent());
        }

        if (request.getBio() != null) {
            tourist.setBio(request.getBio());
        }

        tourist.setUpdatedAt(Instant.now());

        Tourist updated = touristRepository.save(tourist);

        return mapTouristToTouristProfileResponse(updated);
    }

    private TouristProfileResponse mapTouristToTouristProfileResponse(Tourist tourist) {

        return TouristProfileResponse.builder()
                .touristId(tourist.getId())
                .userId(tourist.getUser() != null ? tourist.getUser().getId() : null)
                .totalTrips(tourist.getTotalTrips())
                .totalSpent(tourist.getTotalSpent())
                .averageRating(tourist.getAverageRating())
                .preferredLanguage(tourist.getPreferredLanguage())
                .preferredCurrency(tourist.getPreferredCurrency())


                .travelStyle(
                        tourist.getTravelStyle() != null
                                ? Tourist.TravelStyle.valueOf(tourist.getTravelStyle().name())
                                : null
                )

                .bio(tourist.getBio())
                .createdAt(tourist.getCreatedAt())
                .updatedAt(tourist.getUpdatedAt())
                .build();
    }
}