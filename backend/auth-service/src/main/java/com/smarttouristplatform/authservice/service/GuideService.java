package com.smarttouristplatform.authservice.service;



import com.smarttouristplatform.authservice.dto.CertificationRequest;
import com.smarttouristplatform.authservice.dto.GuideProfileRequest;
import com.smarttouristplatform.authservice.dto.GuideProfileResponse;
import com.smarttouristplatform.authservice.exception.ResourceNotFoundException;
import com.smarttouristplatform.authservice.model.Guide;
import com.smarttouristplatform.authservice.model.User;
import com.smarttouristplatform.authservice.repository.GuideRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Optional;

@Service
public class GuideService {

    private final GuideRepository guideRepository;

    public GuideService(GuideRepository guideRepository) {
        this.guideRepository = guideRepository;
    }

    @Transactional
    public Guide createGuideProfile(User user) {
        Guide guide = new Guide();
        guide.setId(user.getId()); // Link to User ID
        guide.setUser(user);
        guide.setExperienceYears(0);
        guide.setCreatedAt(Instant.now());
        guide.setUpdatedAt(Instant.now());
        return guideRepository.save(guide);
    }

    public Optional<GuideProfileResponse> getGuideProfileByUserId(String userId) {
        return guideRepository.findById(userId)
                .map(this::mapGuideToGuideProfileResponse);
    }

    @Transactional
    public GuideProfileResponse updateGuideProfile(String userId, GuideProfileRequest request) {
        Guide guide = guideRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Guide profile not found"));

        Optional.ofNullable(request.getBio()).ifPresent(guide::setBio);
        Optional.ofNullable(request.getExperienceYears()).ifPresent(guide::setExperienceYears);
        Optional.ofNullable(request.getHourlyRate()).ifPresent(guide::setHourlyRate);
        Optional.ofNullable(request.getDailyRate()).ifPresent(guide::setDailyRate);
        Optional.ofNullable(request.getSpecializations()).ifPresent(guide::setSpecializations);
        Optional.ofNullable(request.getLanguages()).ifPresent(guide::setLanguages);
        Optional.ofNullable(request.getCertifications()).ifPresent(guide::setCertifications);
        guide.setUpdatedAt(Instant.now());

        Guide updatedGuide = guideRepository.save(guide);
        return mapGuideToGuideProfileResponse(updatedGuide);
    }

    @Transactional
    public GuideProfileResponse addCertification(String guideId, CertificationRequest request) {
        Guide guide = guideRepository.findById(guideId)
                .orElseThrow(() -> new ResourceNotFoundException("Guide profile not found"));

        CertificationRequest certification = new CertificationRequest();
        certification.setName(request.getName());
        certification.setOrg(request.getOrg());
        certification.setIssueDate(request.getIssueDate());
        certification.setExpiryDate(request.getExpiryDate());
        certification.setCertUrl(request.getCertUrl());
        certification.setVerified(false); // New certifications are not verified by default

        if (guide.getCertifications() == null) {
            guide.setCertifications(new ArrayList<>());
        }
        guide.getCertifications().add(certification);
        guide.setUpdatedAt(Instant.now());

        Guide updatedGuide = guideRepository.save(guide);
        return mapGuideToGuideProfileResponse(updatedGuide);
    }

    @Transactional
    public void deleteCertification(String guideId, String certId) {
        Guide guide = guideRepository.findById(guideId)
                .orElseThrow(() -> new ResourceNotFoundException("Guide profile not found"));

        if (guide.getCertifications() != null) {
            guide.getCertifications().removeIf(cert -> cert.getClass().equals(certId));
            guide.setUpdatedAt(Instant.now());
            guideRepository.save(guide);
        }
    }

    // TODO: Implement search guides

    private GuideProfileResponse mapGuideToGuideProfileResponse(Guide guide) {
        return GuideProfileResponse.builder()
                .guideId(guide.getId())
                .userId(guide.getUser().getId())
                .bio(guide.getBio())
                .experienceYears(guide.getExperienceYears())
                .hourlyRate(guide.getHourlyRate())
                .dailyRate(guide.getDailyRate())
                .responseTimeMins(guide.getResponseTimeMins())
                .cancellationRate(guide.getCancellationRate())
                .totalBookings(guide.getTotalBookings())
                .completedBookings(guide.getCompletedBookings())
                .averageRating(guide.getAverageRating())
                .totalEarnings(guide.getTotalEarnings())
                .verified(guide.isVerified())
                .verificationDate(guide.getVerificationDate())
                .bankAccountVerified(guide.isBankAccountVerified())
                .specializations(guide.getSpecializations())
                .languages(guide.getLanguages())
                .certifications(guide.getCertifications())
                .createdAt(guide.getCreatedAt())
                .updatedAt(guide.getUpdatedAt())
                .build();
    }
}