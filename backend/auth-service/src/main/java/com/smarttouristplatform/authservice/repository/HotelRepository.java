package com.smarttouristplatform.authservice.repository;


import com.smarttouristplatform.authservice.model.Hotel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface HotelRepository extends MongoRepository<Hotel, String> {
}