package com.smarttouristplatform.authservice.service;

import com.smarttouristplatform.authservice.dto.HotelProfileRequest;
import com.smarttouristplatform.authservice.dto.HotelProfileResponse;
import com.smarttouristplatform.authservice.exception.ResourceNotFoundException;
import com.smarttouristplatform.authservice.model.Hotel;
import com.smarttouristplatform.authservice.model.User;
import com.smarttouristplatform.authservice.repository.HotelRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;

@Service
public class HotelService {

    private final HotelRepository hotelRepository;

    public HotelService(HotelRepository hotelRepository) {
        this.hotelRepository = hotelRepository;
    }

    @Transactional
    public Hotel createHotelProfile(User user) {
        Hotel hotel = new Hotel();
        hotel.setId(user.getId());
        hotel.setUser(user);
        hotel.setCreatedAt(Instant.now());
        hotel.setUpdatedAt(Instant.now());
        return hotelRepository.save(hotel);
    }

    public Optional<HotelProfileResponse> getHotelProfileByUserId(String userId) {
        return hotelRepository.findById(userId)
                .map(this::mapHotelToHotelProfileResponse);
    }

    @Transactional
    public HotelProfileResponse updateHotelProfile(String userId, HotelProfileRequest request) {
        Hotel hotel = hotelRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Hotel profile not found"));

        Optional.ofNullable(request.getHotelName()).ifPresent(hotel::setHotelName);
        Optional.ofNullable(request.getDescription()).ifPresent(hotel::setDescription);
        Optional.ofNullable(request.getAddress()).ifPresent(hotel::setAddress);
        Optional.ofNullable(request.getCity()).ifPresent(hotel::setCity);
        Optional.ofNullable(request.getState()).ifPresent(hotel::setState);
        Optional.ofNullable(request.getCountry()).ifPresent(hotel::setCountry);
        Optional.ofNullable(request.getPostalCode()).ifPresent(hotel::setPostalCode);
        // Optional.ofNullable(request.getLocation()).ifPresent(hotel::setLocation);
        Optional.ofNullable(request.getPhone()).ifPresent(hotel::setPhone);
        Optional.ofNullable(request.getWebsite()).ifPresent(hotel::setWebsite);
        Optional.ofNullable(request.getCheckInTime()).ifPresent(hotel::setCheckInTime);
        Optional.ofNullable(request.getCheckOutTime()).ifPresent(hotel::setCheckOutTime);
        Optional.ofNullable(request.getTotalRooms()).ifPresent(hotel::setTotalRooms);
        Optional.ofNullable(request.getAvailableRooms()).ifPresent(hotel::setAvailableRooms);
        Optional.ofNullable(request.getLicenseNumber()).ifPresent(hotel::setLicenseNumber);
        Optional.ofNullable(request.getAmenities()).ifPresent(hotel::setAmenities);
        Optional.ofNullable(request.getRooms()).ifPresent(hotel::setRooms);
        hotel.setUpdatedAt(Instant.now());

        Hotel updatedHotel = hotelRepository.save(hotel);
        return mapHotelToHotelProfileResponse(updatedHotel);
    }

    // TODO: Implement search hotels

    private HotelProfileResponse mapHotelToHotelProfileResponse(Hotel hotel) {
        return HotelProfileResponse.builder()
                .hotelId(hotel.getId())
                .userId(hotel.getUser().getId())
                .hotelName(hotel.getHotelName())
                .description(hotel.getDescription())
                .address(hotel.getAddress())
                .city(hotel.getCity())
                .state(hotel.getState())
                .country(hotel.getCountry())
                .postalCode(hotel.getPostalCode())
                .location(hotel.getLocation() != null ? hotel.getLocation().toString() : null) // Convert GeoJsonPoint to String
                .phone(hotel.getPhone())
                .website(hotel.getWebsite())
                .checkInTime(hotel.getCheckInTime())
                .checkOutTime(hotel.getCheckOutTime())
                .totalRooms(hotel.getTotalRooms())
                .availableRooms(hotel.getAvailableRooms())
                .averageRating(hotel.getAverageRating())
                .totalBookings(hotel.getTotalBookings())
                .totalRevenue(hotel.getTotalRevenue())
                .verified(hotel.isVerified())
                .verificationDate(hotel.getVerificationDate())
                .licenseNumber(hotel.getLicenseNumber())
                .licenseExpiry(hotel.getLicenseExpiry())
                .amenities(hotel.getAmenities())
                .rooms(hotel.getRooms())
                .createdAt(hotel.getCreatedAt())
                .updatedAt(hotel.getUpdatedAt())
                .build();
    }
}