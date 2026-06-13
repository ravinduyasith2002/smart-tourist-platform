package com.smarttouristplatform.authservice.service;

import com.smarttouristplatform.authservice.dto.CertificationRequest;
import com.smarttouristplatform.authservice.dto.GuideProfileRequest;
import com.smarttouristplatform.authservice.dto.GuideProfileResponse;
import com.smarttouristplatform.authservice.exception.ResourceNotFoundException;
import com.smarttouristplatform.authservice.model.Certification;
import com.smarttouristplatform.authservice.model.Guide;
import com.smarttouristplatform.authservice.model.User;
import com.smarttouristplatform.authservice.repository.GuideRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class GuideService {

    private final GuideRepository guideRepository;

    public GuideService(GuideRepository guideRepository) {
        this.guideRepository = guideRepository;
    }


    // CREATE GUIDE PROFILE

    @Transactional
    public Guide createGuideProfile(User user) {

        Guide guide = new Guide();

        guide.setId(user.getId());
        guide.setEmail(user.getEmail());
        guide.setUser(user);

        // default values for new guide profile
        guide.setExperienceYears(0);
        guide.setResponseTimeMins(60);
        guide.setCancellationRate(0.0);
        guide.setTotalBookings(0);
        guide.setCompletedBookings(0);
        guide.setTotalEarnings(java.math.BigDecimal.ZERO);
        guide.setVerified(false);
        guide.setBankAccountVerified(false);

        guide.setCreatedAt(Instant.now());
        guide.setUpdatedAt(Instant.now());

        return guideRepository.save(guide);
    }


    // GET GUIDE PROFILE BY EMAIL

    public Optional<GuideProfileResponse> getGuideProfileByUserId(String email) {
        return guideRepository.findByEmail(email)
                .map(this::mapGuideToGuideProfileResponse);
    }
    // GET GUIDE PROFILE BY ID

    public Optional<GuideProfileResponse> getGuideProfileById(String userID) {
        return guideRepository.findById(userID)
                .map(this::mapGuideToGuideProfileResponse);
    }


    // UPDATE GUIDE PROFILE

    @Transactional
    public GuideProfileResponse updateGuideProfile(String email,
                                                   GuideProfileRequest request) {

        Guide guide = guideRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Guide profile not found"));

        // update only if value is provided (PATCH-style update)
        Optional.ofNullable(request.getBio()).ifPresent(guide::setBio);
        Optional.ofNullable(request.getExperienceYears()).ifPresent(guide::setExperienceYears);
        Optional.ofNullable(request.getHourlyRate()).ifPresent(guide::setHourlyRate);
        Optional.ofNullable(request.getDailyRate()).ifPresent(guide::setDailyRate);

        Optional.ofNullable(request.getResponseTimeMins()).ifPresent(guide::setResponseTimeMins);
        Optional.ofNullable(request.getCancellationRate()).ifPresent(guide::setCancellationRate);
        Optional.ofNullable(request.getTotalBookings()).ifPresent(guide::setTotalBookings);
        Optional.ofNullable(request.getCompletedBookings()).ifPresent(guide::setCompletedBookings);
        Optional.ofNullable(request.getTotalEarnings()).ifPresent(guide::setTotalEarnings);
        Optional.ofNullable(request.getIsVerified()).ifPresent(guide::setVerified);
        Optional.ofNullable(request.getBankAccountVerified()).ifPresent(guide::setBankAccountVerified);

        Optional.ofNullable(request.getSpecializations()).ifPresent(guide::setSpecializations);
        Optional.ofNullable(request.getLanguages()).ifPresent(guide::setLanguages);
        Optional.ofNullable(request.getCertifications()).ifPresent(guide::setCertifications);

        guide.setUpdatedAt(Instant.now());

        return mapGuideToGuideProfileResponse(
                guideRepository.save(guide)
        );
    }


    // ADD CERTIFICATION

    @Transactional
    public GuideProfileResponse addCertification(String guideEmail,
                                                 CertificationRequest request) {

        Guide guide = guideRepository.findByEmail(guideEmail)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Guide profile not found"));

        Certification certification = new Certification();

        // generate unique certification ID
        certification.setCertId(UUID.randomUUID().toString());

        certification.setName(request.getName());
        certification.setOrg(request.getOrg());
        certification.setIssueDate(request.getIssueDate());
        certification.setExpiryDate(request.getExpiryDate());
        certification.setCertUrl(request.getCertUrl());
        certification.setVerified(false);

        // initialize list if null
        if (guide.getCertifications() == null) {
            guide.setCertifications(new ArrayList<>());
        }

        guide.getCertifications().add(certification);

        guide.setUpdatedAt(Instant.now());

        return mapGuideToGuideProfileResponse(
                guideRepository.save(guide)
        );
    }


    // GET ALL CERTIFICATIONS

    @Transactional(readOnly = true)
    public List<Certification> getCertifications(String guideEmail) {

        Guide guide = guideRepository.findByEmail(guideEmail)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Guide profile not found"));

        return guide.getCertifications() == null
                ? new ArrayList<>()
                : guide.getCertifications();
    }


    // DELETE CERTIFICATION

    @Transactional
    public void deleteCertification(String guideEmail,
                                    String certId) {

        Guide guide = guideRepository.findByEmail(guideEmail)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Guide profile not found"));

        if (guide.getCertifications() == null ||
                guide.getCertifications().isEmpty()) {
            throw new ResourceNotFoundException("No certifications found");
        }

        boolean removed = guide.getCertifications()
                .removeIf(cert -> certId.equals(cert.getCertId()));

        if (!removed) {
            throw new ResourceNotFoundException("Certification not found");
        }

        guide.setUpdatedAt(Instant.now());
        guideRepository.save(guide);
    }


    // GET ALL GUIDES

    public List<GuideProfileResponse> getAllGuides() {
        return guideRepository.findAll()
                .stream()
                .map(this::mapGuideToGuideProfileResponse)
                .toList();
    }


    // MAPPER: ENTITY -> DTO

    private GuideProfileResponse mapGuideToGuideProfileResponse(Guide guide) {

        return GuideProfileResponse.builder()
                .guideId(guide.getId())
                .userId(guide.getUser().getId())
                .email(guide.getUser().getEmail())
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