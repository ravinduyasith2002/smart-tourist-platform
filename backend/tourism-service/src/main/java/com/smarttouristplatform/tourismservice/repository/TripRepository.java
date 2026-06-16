package com.smarttouristplatform.tourismservice.repository;


import com.smarttouristplatform.tourismservice.model.Trip;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TripRepository extends MongoRepository<Trip, String> {
    List<Trip> findByTouristId(String touristId);
    List<Trip> findByTouristIdAndStatus(String touristId, String status);
    List<Trip> findByIsPublicTrue();

}