package com.smarttouristplatform.tourismservice.service;
import com.smarttouristplatform.tourismservice.Exception.ResourceNotFoundException;
import com.smarttouristplatform.tourismservice.dto.AddItineraryDayRequest;
import com.smarttouristplatform.tourismservice.dto.CreateTripRequest;
import com.smarttouristplatform.tourismservice.dto.UpdateItineraryDayRequest;
import com.smarttouristplatform.tourismservice.dto.UpdateTripRequest;
import com.smarttouristplatform.tourismservice.model.Activity;
import com.smarttouristplatform.tourismservice.model.Destination;
import com.smarttouristplatform.tourismservice.model.ItineraryDay;
import com.smarttouristplatform.tourismservice.model.Trip;
import com.smarttouristplatform.tourismservice.repository.TripRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TripService {

    @Autowired
    private TripRepository tripRepository;

    public Trip createTrip(CreateTripRequest request, String touristId) {
        Trip trip = new Trip();
        BeanUtils.copyProperties(request, trip);
        trip.setTouristId(touristId);
        trip.setStatus("planning");
        trip.setCreatedAt(LocalDateTime.now());
        trip.setUpdatedAt(LocalDateTime.now());

        // Map DTOs to Models for nested objects
        if (request.getDestinations() != null) {
            trip.setDestinations(request.getDestinations().stream()
                    .map(dto -> {
                        Destination dest = new Destination();
                        BeanUtils.copyProperties(dto, dest);
                        return dest;
                    })
                    .collect(Collectors.toList()));
        }

        return tripRepository.save(trip);
    }

    public List<Trip> getUserTrips(String touristId, String status, int page, int limit, String sort) {
        Sort sortBy = Sort.by(sort.startsWith("-") ? Sort.Direction.DESC : Sort.Direction.ASC, sort.replace("-", ""));
        Pageable pageable = PageRequest.of(page - 1, limit, sortBy);

        if (status != null && !status.isEmpty()) {
            return tripRepository.findByTouristIdAndStatus(touristId, status);
        } else {
            return tripRepository.findByTouristId(touristId);
        }
    }

    public Trip getTripDetails(String tripId, String touristId) {
        return tripRepository.findById(tripId)
                .filter(trip -> trip.getTouristId().equals(touristId) || trip.getIsPublic())
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found or access denied"));
    }

    public Trip updateTrip(String tripId, UpdateTripRequest request, String touristId) {
        Trip existingTrip = tripRepository.findById(tripId)
                .filter(trip -> trip.getTouristId().equals(touristId))
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found or access denied"));

        Optional.ofNullable(request.getTitle()).ifPresent(existingTrip::setTitle);
        Optional.ofNullable(request.getDescription()).ifPresent(existingTrip::setDescription);
        Optional.ofNullable(request.getBudget()).ifPresent(existingTrip::setBudget);
        Optional.ofNullable(request.getIsPublic()).ifPresent(existingTrip::setIsPublic);
        existingTrip.setUpdatedAt(LocalDateTime.now());

        return tripRepository.save(existingTrip);
    }

    public void deleteTrip(String tripId, String touristId) {
        Trip existingTrip = tripRepository.findById(tripId)
                .filter(trip -> trip.getTouristId().equals(touristId))
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found or access denied"));
        tripRepository.delete(existingTrip);
    }

    public Trip addItineraryDay(String tripId, AddItineraryDayRequest request, String touristId) {
        Trip existingTrip = tripRepository.findById(tripId)
                .filter(trip -> trip.getTouristId().equals(touristId))
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found or access denied"));

        ItineraryDay newDay = new ItineraryDay();
        BeanUtils.copyProperties(request, newDay);
        if (request.getActivities() != null) {
            newDay.setActivities(request.getActivities().stream()
                    .map(dto -> {
                        Activity activity = new Activity();
                        BeanUtils.copyProperties(dto, activity);
                        return activity;
                    })
                    .collect(Collectors.toList()));
        }

        if (existingTrip.getItineraryDays() == null) {
            existingTrip.setItineraryDays(List.of(newDay));
        } else {
            existingTrip.getItineraryDays().add(newDay);
        }
        existingTrip.setUpdatedAt(LocalDateTime.now());
        return tripRepository.save(existingTrip);
    }

    public Trip updateItineraryDay(String tripId, String dayId, UpdateItineraryDayRequest request, String touristId) {
        Trip existingTrip = tripRepository.findById(tripId)
                .filter(trip -> trip.getTouristId().equals(touristId))
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found or access denied"));

        Optional<ItineraryDay> dayToUpdate = existingTrip.getItineraryDays().stream()
                .filter(day -> day.getDayNumber().toString().equals(dayId)) // Assuming dayId is dayNumber for simplicity
                .findFirst();

        if (dayToUpdate.isPresent()) {
            ItineraryDay day = dayToUpdate.get();
            Optional.ofNullable(request.getTitle()).ifPresent(day::setTitle);
            Optional.ofNullable(request.getDescription()).ifPresent(day::setDescription);
            if (request.getActivities() != null) {
                day.setActivities(request.getActivities().stream()
                        .map(dto -> {
                            Activity activity = new Activity();
                            BeanUtils.copyProperties(dto, activity);
                            return activity;
                        })
                        .collect(Collectors.toList()));
            }
            existingTrip.setUpdatedAt(LocalDateTime.now());
            return tripRepository.save(existingTrip);
        } else {
            throw new ResourceNotFoundException("Itinerary day not found");
        }
    }

    public Trip deleteItineraryDay(String tripId, String dayId, String touristId) {
        Trip existingTrip = tripRepository.findById(tripId)
                .filter(trip -> trip.getTouristId().equals(touristId))
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found or access denied"));

        boolean removed = existingTrip.getItineraryDays().removeIf(day -> day.getDayNumber().toString().equals(dayId));
        if (removed) {
            existingTrip.setUpdatedAt(LocalDateTime.now());
            return tripRepository.save(existingTrip);
        } else {
            throw new ResourceNotFoundException("Itinerary day not found");
        }
    }

    public List<Trip> getPublicTrips(String destination, String country, Double minRating, int page, int limit) {
        // This method would require more complex queries, potentially using aggregation pipeline
        // For simplicity, returning all public trips for now.
        Pageable pageable = PageRequest.of(page - 1, limit, Sort.by(Sort.Direction.DESC, "createdAt"));
        return tripRepository.findByIsPublicTrue();
    }
}