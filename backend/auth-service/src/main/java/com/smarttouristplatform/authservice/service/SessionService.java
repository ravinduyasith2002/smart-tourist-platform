package com.smarttouristplatform.authservice.service;

import com.smarttouristplatform.authservice.dto.SessionResponse;
import com.smarttouristplatform.authservice.exception.ResourceNotFoundException;
import com.smarttouristplatform.authservice.model.Session;
import com.smarttouristplatform.authservice.repository.SessionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SessionService {

    private final SessionRepository sessionRepository;

    public SessionService(SessionRepository sessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    public List<SessionResponse> getActiveSessions(String userId) {
        return sessionRepository.findByUser_IdAndIsValid(userId, true).stream()
                .map(this::mapSessionToSessionResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public void revokeSession(String sessionId) {
        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new ResourceNotFoundException("Session not found"));
        session.setValid(false);
        session.setUpdatedAt(java.time.Instant.now());
        sessionRepository.save(session);
    }

    @Transactional
    public void revokeAllSessions(String userId) {
        List<Session> sessions = sessionRepository.findByUser_IdAndIsValid(userId, true);
        sessions.forEach(session -> {
            session.setValid(false);
            session.setUpdatedAt(java.time.Instant.now());
        });
        sessionRepository.saveAll(sessions);
    }

    private SessionResponse mapSessionToSessionResponse(Session session) {
        return SessionResponse.builder()
                .sessionId(session.getId())
                .userId(session.getUser().getId())
                .expiryDate(session.getExpiryDate())
                .createdAt(session.getCreatedAt())
                .updatedAt(session.getUpdatedAt())
                .isValid(session.isValid())
                .build();
    }
}