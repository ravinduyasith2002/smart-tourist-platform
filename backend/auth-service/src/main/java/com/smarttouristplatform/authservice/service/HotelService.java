package com.smarttouristplatform.authservice.service;

import com.smarttouristplatform.authservice.dto.HotelProfileRequest;
import com.smarttouristplatform.authservice.dto.HotelProfileResponse;
import com.smarttouristplatform.authservice.exception.ResourceNotFoundException;
import com.smarttouristplatform.authservice.model.Hotel;
import com.smarttouristplatform.authservice.model.User;
import com.smarttouristplatform.authservice.repository.HotelRepository;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
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
        hotel.setEmail(user.getEmail());
        hotel.setUser(user);
        hotel.setCreatedAt(Instant.now());
        hotel.setUpdatedAt(Instant.now());
        return hotelRepository.save(hotel);
    }

    public Optional<HotelProfileResponse> getHotelProfileByUserId(String userId) {
        return hotelRepository.findById(userId)
                .map(this::mapHotelToHotelProfileResponse);
    }
    public Optional<HotelProfileResponse> getHotelProfileByUserEmail(String userEmail) {
        return hotelRepository.findByEmail(userEmail)
                .map(this::mapHotelToHotelProfileResponse);
    }

    @Transactional
    public HotelProfileResponse updateHotelProfile(
            String userEmail,
            HotelProfileRequest request) {

        Hotel hotel = hotelRepository.findByEmail(userEmail)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Hotel profile not found"));

        Optional.ofNullable(request.getHotelName()).ifPresent(hotel::setHotelName);
        Optional.ofNullable(request.getDescription()).ifPresent(hotel::setDescription);
        Optional.ofNullable(request.getAddress()).ifPresent(hotel::setAddress);
        Optional.ofNullable(request.getCity()).ifPresent(hotel::setCity);
        Optional.ofNullable(request.getState()).ifPresent(hotel::setState);
        Optional.ofNullable(request.getCountry()).ifPresent(hotel::setCountry);
        Optional.ofNullable(request.getPostalCode()).ifPresent(hotel::setPostalCode);

        Optional.ofNullable(request.getPhone()).ifPresent(hotel::setPhone);
        Optional.ofNullable(request.getWebsite()).ifPresent(hotel::setWebsite);

        Optional.ofNullable(request.getCheckInTime()).ifPresent(hotel::setCheckInTime);
        Optional.ofNullable(request.getCheckOutTime()).ifPresent(hotel::setCheckOutTime);

        Optional.ofNullable(request.getTotalRooms()).ifPresent(hotel::setTotalRooms);
        Optional.ofNullable(request.getAvailableRooms()).ifPresent(hotel::setAvailableRooms);

        Optional.ofNullable(request.getLicenseNumber()).ifPresent(hotel::setLicenseNumber);
        Optional.ofNullable(request.getLicenseExpiry()).ifPresent(hotel::setLicenseExpiry);

        Optional.ofNullable(request.getAmenities()).ifPresent(hotel::setAmenities);
        Optional.ofNullable(request.getRooms()).ifPresent(hotel::setRooms);

        // Optional Geo Location
        if (request.getLatitude() != null && request.getLongitude() != null) {
            hotel.setLocation(
                    new GeoJsonPoint(
                            request.getLongitude(),
                            request.getLatitude()
                    )
            );
        }

        hotel.setUpdatedAt(Instant.now());

        Hotel updatedHotel = hotelRepository.save(hotel);

        return mapHotelToHotelProfileResponse(updatedHotel);
    }

    // TODO: Implement search hotels

    private HotelProfileResponse mapHotelToHotelProfileResponse(Hotel hotel) {

        return HotelProfileResponse.builder()
                .hotelId(hotel.getId())
                .userId(hotel.getUser().getId())
                .email(hotel.getUser().getEmail())

                .hotelName(hotel.getHotelName())
                .description(hotel.getDescription())

                .address(hotel.getAddress())
                .city(hotel.getCity())
                .state(hotel.getState())
                .country(hotel.getCountry())
                .postalCode(hotel.getPostalCode())

                // Readable location
                .location(
                        hotel.getAddress() + ", " +
                                hotel.getCity() + ", " +
                                hotel.getCountry()
                )

                // Coordinates
                .latitude(
                        hotel.getLocation() != null
                                ? hotel.getLocation().getY()
                                : null
                )

                .longitude(
                        hotel.getLocation() != null
                                ? hotel.getLocation().getX()
                                : null
                )

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