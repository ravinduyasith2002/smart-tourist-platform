package com.smarttouristplatform.tourismservice.repository;

import com.smarttouristplatform.tourismservice.model.HotelBooking;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HotelBookingRepository extends MongoRepository<HotelBooking, String> {
    List<HotelBooking> findByTouristId(String touristId);
    List<HotelBooking> findByTouristIdAndStatus(String touristId, String status);
}