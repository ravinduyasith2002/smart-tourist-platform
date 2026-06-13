package com.stp.backend.tourist.service.impl;

import com.stp.backend.common.exception.ResourceNotFoundException;
import com.stp.backend.tourist.dto.TouristRequestDto;
import com.stp.backend.tourist.dto.TouristResponseDto;
import com.stp.backend.tourist.mapper.TouristMapper;
import com.stp.backend.tourist.model.Tourist;
import com.stp.backend.tourist.repository.TouristRepository;
import com.stp.backend.tourist.service.TouristService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service // Tells Spring Boot this is where our business logic lives
@RequiredArgsConstructor // Lombok magic: Generates a constructor to inject our Repository and Mapper
public class TouristServiceImpl implements TouristService {
    private final TouristRepository touristRepository;
    private final TouristMapper touristMapper;

    @Override
    public TouristResponseDto createTourist(TouristRequestDto requestDto){
        // Business Logic: Check if we want to allow duplicate emails (for now, we'll just save it,
        // but we can add validation here later!)

        // 1. Convert incoming DTO to Entity using our Mapper
        Tourist touristEntity = touristMapper.mapToEntity(requestDto);

        // 2. Save the Entity to MongoDB
        Tourist savedTourist = touristRepository.save(touristEntity);

        // 3. Convert the saved Entity back to a Response DTO and return it
        return touristMapper.mapToResponseDto(savedTourist);
    }

    @Override
    public TouristResponseDto getTouristById(String id){
        // Find the tourist. If not found, throw a basic RuntimeException
        // (We will upgrade this to a Custom Exception in the next step!)
        Tourist tourist = touristRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Tourist not found with id : "+id));
        return touristMapper.mapToResponseDto(tourist);
    }

    @Override
    public List<TouristResponseDto> getAllTourists(){
        // Retrieve all tourists from the DB
        List<Tourist> tourists = touristRepository.findAll();

        // Convert the List of Entities into a List of Response DTOs using Java Streams
        return tourists.stream()
                .map(touristMapper::mapToResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public TouristResponseDto updateTourist(String id, TouristRequestDto requestDto){
        // 1. Check if the tourist exists first
        Tourist existingTourist = touristRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tourist not found with id : "+id));

        // 2. Update the fields (We don't update ID, averageRating, or totalTrips here)
        existingTourist.setName(requestDto.getName());
        existingTourist.setEmail(requestDto.getEmail());
        existingTourist.setPhone(requestDto.getPhone());
        existingTourist.setAvatar(requestDto.getAvatar());
        existingTourist.setBio(requestDto.getBio());
        existingTourist.setCity(requestDto.getCity());
        existingTourist.setCountry(requestDto.getCountry());
        existingTourist.setPreferences(requestDto.getPreferences());
        existingTourist.setFavouriteDestinations(requestDto.getFavouriteDestinations());

        // 3. Save the updated entity
        Tourist updatedTourist = touristRepository.save(existingTourist);

        // 4. Map back to DTO
        return touristMapper.mapToResponseDto(updatedTourist);
    }

    @Override
    public void deleteTourist(String id){
        // Verify existence before deleting
        Tourist existingTourist = touristRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tourist not found with id : "+id));
        touristRepository.delete(existingTourist);
    }
}
