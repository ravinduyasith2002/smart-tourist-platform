package com.smarttouristplatform.authservice.repository;
import com.smarttouristplatform.authservice.model.Tourist;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface TouristRepository extends MongoRepository<Tourist, String> {
    Optional<Tourist> findByEmail(String email);

}