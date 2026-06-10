package com.smarttouristplatform.authservice.repository;

import com.smarttouristplatform.authservice.model.Guide;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface GuideRepository extends MongoRepository<Guide, String> {
}