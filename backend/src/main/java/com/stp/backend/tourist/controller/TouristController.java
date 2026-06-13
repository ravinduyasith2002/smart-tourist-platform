package com.stp.backend.tourist.controller;

import com.fasterxml.classmate.types.ResolvedObjectType;
import com.stp.backend.tourist.dto.TouristRequestDto;
import com.stp.backend.tourist.dto.TouristResponseDto;
import com.stp.backend.tourist.service.TouristService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // Makes this a REST API controller
@RequestMapping("/api/v1/tourists") // Base URL for all endpoints below
@RequiredArgsConstructor // Injects our TouristService
public class TouristController {

    private final TouristService touristService;

    /**
     * CREATE a new Tourist
     * Endpoint: POST /api/v1/tourists
     */
    @PostMapping
    public ResponseEntity<TouristResponseDto> createTourist(@Valid @RequestBody TouristRequestDto requestDto){
        // @Valid triggers the checks (like @Email)
        // @RequestBody converts React's JSON into our Java DTO
        TouristResponseDto createdTourist = touristService.createTourist(requestDto);

        // Return 201 CREATED status along with the saved data
        return new ResponseEntity<>(createdTourist, HttpStatus.CREATED);
    }

    /**
     * GET a specific Tourist by ID
     * Endpoint: GET /api/v1/tourists/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<TouristResponseDto> getTouristById(@PathVariable String id){
        // @PathVariable extracts the {id} from the URL
        TouristResponseDto tourist = touristService.getTouristById(id);

        // Return 200 OK status
        return new ResponseEntity<>(tourist, HttpStatus.OK);
    }

    /**
     * GET all Tourists
     * Endpoint: GET /api/v1/tourists
     */
    @GetMapping
    public ResponseEntity<List<TouristResponseDto>> getAllTourists(){
        List<TouristResponseDto> tourists = touristService.getAllTourists();
        return new ResponseEntity<>(tourists, HttpStatus.OK);
    }
    /**
     * UPDATE a Tourist's profile
     * Endpoint: PUT /api/v1/tourists/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<TouristResponseDto> updateTourist(
            @PathVariable String id,
            @Valid @RequestBody TouristRequestDto requestDto){
        TouristResponseDto updatedTourist = touristService.updateTourist(id,requestDto);
        return new ResponseEntity<>(updatedTourist, HttpStatus.OK);
    }
    /**
     * DELETE a Tourist
     * Endpoint: DELETE /api/v1/tourists/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTourist(@PathVariable String id){
        touristService.deleteTourist(id);
        // Return 200 OK with a simple success message
        return new ResponseEntity<>("Tourist deleted successfully", HttpStatus.OK);
    }
}
