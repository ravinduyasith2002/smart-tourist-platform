package com.stp.backend.tourist.mapper;

import com.stp.backend.tourist.dto.TouristRequestDto;
import com.stp.backend.tourist.dto.TouristResponseDto;
import com.stp.backend.tourist.model.Tourist;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
@Component
public class TouristMapper {
    /**
     * Converts an incoming Request DTO from React into a Database Entity.
     * We use this when CREATING or UPDATING a tourist.
     */
    public Tourist mapToEntity(TouristRequestDto requestDto){
        if(requestDto == null){
            return null;
        }
        return Tourist.builder()
                .name(requestDto.getName())
                .email(requestDto.getEmail())
                .phone(requestDto.getPhone())
                .avatar(requestDto.getAvatar())
                .bio(requestDto.getBio())
                .city(requestDto.getCity())
                .country(requestDto.getCountry())
        // Ensure we don't save null lists to MongoDB; save empty lists instead
                .preferences(requestDto.getPreferences() != null? requestDto.getPreferences() : new ArrayList<>())
                .favouriteDestinations(requestDto.getFavouriteDestinations() != null? requestDto.getFavouriteDestinations() : new ArrayList<>())
                .totalTrips(0)
                .averageRating(0.0)
                .build();
    }
    /**
     * Converts a Database Entity into an outgoing Response DTO for React.
     * We use this when returning data to the frontend.
     */
    public TouristResponseDto mapToResponseDto(Tourist tourist){
        if(tourist == null){
            return null;
        }
        return TouristResponseDto.builder()
                .id(tourist.getId())
                .name(tourist.getName())
                .email(tourist.getEmail())
                .phone(tourist.getPhone())
                .avatar(tourist.getAvatar())
                .bio(tourist.getBio())
                .city(tourist.getCity())
                .country(tourist.getCountry())
                .preferences(tourist.getPreferences())
                .favouriteDestinations(tourist.getFavouriteDestinations())
                .totalTrips(tourist.getTotalTrips())
                .averageRating(tourist.getAverageRating())
                .build();
    }
}
