package com.smarttouristplatform.authservice.repository;


import com.smarttouristplatform.authservice.model.Hotel;
import com.smarttouristplatform.authservice.model.Tourist;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface HotelRepository extends MongoRepository<Hotel, String> {
    Optional<Hotel> findByEmail(String email);
}