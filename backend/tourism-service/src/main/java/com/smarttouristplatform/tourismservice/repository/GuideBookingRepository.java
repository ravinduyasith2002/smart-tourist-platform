package com.smarttouristplatform.tourismservice.repository;
import com.smarttouristplatform.tourismservice.model.GuideBooking;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GuideBookingRepository extends MongoRepository<GuideBooking, String> {
    List<GuideBooking> findByTouristId(String touristId);
    List<GuideBooking> findByTouristIdAndStatus(String touristId, String status);
}