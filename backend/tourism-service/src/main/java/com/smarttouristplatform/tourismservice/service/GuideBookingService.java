package com.smarttouristplatform.tourismservice.service;

import com.smarttouristplatform.tourismservice.Exception.ResourceNotFoundException;
import com.smarttouristplatform.tourismservice.dto.CancelBookingRequest;
import com.smarttouristplatform.tourismservice.dto.CreateGuideBookingRequest;
import com.smarttouristplatform.tourismservice.dto.UpdateGuideBookingRequest;
import com.smarttouristplatform.tourismservice.model.GuideBooking;
import com.smarttouristplatform.tourismservice.model.GuideInfo;
import com.smarttouristplatform.tourismservice.repository.GuideBookingRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class GuideBookingService {

    @Autowired
    private GuideBookingRepository guideBookingRepository;

    public GuideBooking createGuideBooking(CreateGuideBookingRequest request, String touristId) {
        GuideBooking booking = new GuideBooking();
        BeanUtils.copyProperties(request, booking);
        booking.setTouristId(touristId);
        booking.setStatus("pending");
        booking.setPaymentStatus("pending");
        booking.setCreatedAt(LocalDateTime.now());
        booking.setUpdatedAt(LocalDateTime.now());

        // Placeholder for guide info - in a real app, this would come from a Guide service
        GuideInfo guideInfo = new GuideInfo();
        guideInfo.setName("Sample Guide Name");
        guideInfo.setRating(4.5);
        booking.setGuideInfo(guideInfo);
        booking.setTotalPrice(request.getDurationHours() * 75.0); // Example pricing

        return guideBookingRepository.save(booking);
    }

    public List<GuideBooking> getUserGuideBookings(String touristId, String status, int page, int limit) {
        Pageable pageable = PageRequest.of(page - 1, limit, Sort.by(Sort.Direction.DESC, "createdAt"));
        if (status != null && !status.isEmpty()) {
            return guideBookingRepository.findByTouristIdAndStatus(touristId, status);
        } else {
            return guideBookingRepository.findByTouristId(touristId);
        }
    }

    public GuideBooking getGuideBookingDetails(String bookingId, String touristId) {
        return guideBookingRepository.findById(bookingId)
                .filter(booking -> booking.getTouristId().equals(touristId))
                .orElseThrow(() -> new ResourceNotFoundException("Guide booking not found or access denied"));
    }

    public GuideBooking updateGuideBooking(String bookingId, UpdateGuideBookingRequest request, String touristId) {
        GuideBooking existingBooking = guideBookingRepository.findById(bookingId)
                .filter(booking -> booking.getTouristId().equals(touristId))
                .orElseThrow(() -> new ResourceNotFoundException("Guide booking not found or access denied"));

        if (!existingBooking.getStatus().equals("pending")) {
            throw new IllegalStateException("Cannot update a booking that is not in pending status.");
        }

        Optional.ofNullable(request.getStartTime()).ifPresent(existingBooking::setStartTime);
        Optional.ofNullable(request.getEndTime()).ifPresent(existingBooking::setEndTime);
        Optional.ofNullable(request.getSpecialRequests()).ifPresent(existingBooking::setSpecialRequests);
        existingBooking.setUpdatedAt(LocalDateTime.now());

        return guideBookingRepository.save(existingBooking);
    }

    public GuideBooking cancelGuideBooking(String bookingId, CancelBookingRequest request, String touristId) {
        GuideBooking existingBooking = guideBookingRepository.findById(bookingId)
                .filter(booking -> booking.getTouristId().equals(touristId))
                .orElseThrow(() -> new ResourceNotFoundException("Guide booking not found or access denied"));

        if (existingBooking.getStatus().equals("cancelled") || existingBooking.getStatus().equals("completed")) {
            throw new IllegalStateException("Cannot cancel a booking that is already cancelled or completed.");
        }

        existingBooking.setStatus("cancelled");
        existingBooking.setUpdatedAt(LocalDateTime.now());
        // In a real app, handle refunds here
        return guideBookingRepository.save(existingBooking);
    }

    public GuideBooking confirmGuideBooking(String bookingId, String touristId) {
        GuideBooking existingBooking = guideBookingRepository.findById(bookingId)
                .filter(booking -> booking.getTouristId().equals(touristId))
                .orElseThrow(() -> new ResourceNotFoundException("Guide booking not found or access denied"));

        if (!existingBooking.getStatus().equals("pending")) {
            throw new IllegalStateException("Only pending bookings can be confirmed.");
        }

        existingBooking.setStatus("confirmed");
        existingBooking.setPaymentStatus("paid"); // Assuming payment is handled externally before confirmation
        existingBooking.setUpdatedAt(LocalDateTime.now());
        return guideBookingRepository.save(existingBooking);
    }
}