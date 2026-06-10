package com.smarttouristplatform.authservice.repository;
import com.smarttouristplatform.authservice.model.Tourist;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TouristRepository extends MongoRepository<Tourist, String> {
}