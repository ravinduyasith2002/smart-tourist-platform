package com.stp.backend.tourist.service;

import com.stp.backend.tourist.dto.TouristRequestDto;
import com.stp.backend.tourist.dto.TouristResponseDto;

import java.util.List;

public interface TouristService {
    TouristResponseDto createTourist(TouristRequestDto requestDto);
    TouristResponseDto getTouristById(String id);
    List<TouristResponseDto> getAllTourists();
    TouristResponseDto updateTourist(String id, TouristRequestDto requestDto);
    void deleteTourist(String id);
}
