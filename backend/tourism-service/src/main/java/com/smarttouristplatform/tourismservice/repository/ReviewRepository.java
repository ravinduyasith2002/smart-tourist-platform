package com.smarttouristplatform.tourismservice.repository;
import com.smarttouristplatform.tourismservice.model.Review;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends MongoRepository<Review, String> {
    List<Review> findByGuideId(String guideId);
    List<Review> findByHotelId(String hotelId);
}