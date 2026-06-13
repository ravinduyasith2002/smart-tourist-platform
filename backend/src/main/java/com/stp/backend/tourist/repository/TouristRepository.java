package com.stp.backend.tourist.repository;

import com.stp.backend.tourist.model.Tourist;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TouristRepository extends MongoRepository<Tourist, String> {

}
