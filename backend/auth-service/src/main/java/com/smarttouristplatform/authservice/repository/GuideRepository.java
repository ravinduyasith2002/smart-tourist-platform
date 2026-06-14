package com.smarttouristplatform.authservice.repository;

import com.smarttouristplatform.authservice.model.Guide;
import com.smarttouristplatform.authservice.model.Tourist;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface GuideRepository extends MongoRepository<Guide, String> {
    Optional<Guide> findByEmail(String email);
}