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
        tourist.setId(user.getId()); // Link to User ID
        tourist.setUser(user);
        tourist.setCreatedAt(Instant.now());
        tourist.setUpdatedAt(Instant.now());
        return touristRepository.save(tourist);
    }

    public Optional<TouristProfileResponse> getTouristProfileByUserId(String userId) {
        return touristRepository.findById(userId)
                .map(this::mapTouristToTouristProfileResponse);
    }

    @Transactional
    public TouristProfileResponse updateTouristProfile(String userId, TouristProfileRequest request) {
        Tourist tourist = touristRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Tourist profile not found"));

        Optional.ofNullable(request.getPreferredLanguage()).ifPresent(tourist::setPreferredLanguage);
        Optional.ofNullable(request.getPreferredCurrency()).ifPresent(tourist::setPreferredCurrency);
        Optional.ofNullable(request.getTravelStyle()).ifPresent(tourist::setTravelStyle);
        Optional.ofNullable(request.getBio()).ifPresent(tourist::setBio);
        tourist.setUpdatedAt(Instant.now());

        Tourist updatedTourist = touristRepository.save(tourist);
        return mapTouristToTouristProfileResponse(updatedTourist);
    }

    // TODO: Implement add/remove/get favorite guides

    private TouristProfileResponse mapTouristToTouristProfileResponse(Tourist tourist) {
        return TouristProfileResponse.builder()
                .touristId(tourist.getId())
                .userId(tourist.getUser().getId())
                .totalTrips(tourist.getTotalTrips())
                .totalSpent(tourist.getTotalSpent())
                .averageRating(tourist.getAverageRating())
                .preferredLanguage(tourist.getPreferredLanguage())
                .preferredCurrency(tourist.getPreferredCurrency())
                .travelStyle(tourist.getTravelStyle() != null ? Tourist.TravelStyle.valueOf(tourist.getTravelStyle().name().toLowerCase()) : null)
                .bio(tourist.getBio())
                .createdAt(tourist.getCreatedAt())
                .updatedAt(tourist.getUpdatedAt())
                .build();
    }
}