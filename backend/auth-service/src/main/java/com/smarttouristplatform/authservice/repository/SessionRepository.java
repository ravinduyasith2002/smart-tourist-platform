package com.smarttouristplatform.authservice.repository;
import com.smarttouristplatform.authservice.model.Session;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface SessionRepository extends MongoRepository<Session, String> {
    Optional<Session> findByRefreshTokenAndIsValid(String refreshToken, boolean isValid);
    List<Session> findByUser_IdAndIsValid(String userId, boolean isValid);
}