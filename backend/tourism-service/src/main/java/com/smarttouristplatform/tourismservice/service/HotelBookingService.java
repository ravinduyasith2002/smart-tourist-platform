package com.smarttouristplatform.tourismservice.service;
import com.smarttouristplatform.tourismservice.Exception.ResourceNotFoundException;
import com.smarttouristplatform.tourismservice.dto.CancelBookingRequest;
import com.smarttouristplatform.tourismservice.dto.CreateHotelBookingRequest;
import com.smarttouristplatform.tourismservice.dto.UpdateHotelBookingRequest;
import com.smarttouristplatform.tourismservice.model.HotelBooking;
import com.smarttouristplatform.tourismservice.model.HotelInfo;
import com.smarttouristplatform.tourismservice.repository.HotelBookingRepository;
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
public class HotelBookingService{

    @Autowired
    private HotelBookingRepository hotelBookingRepository;

    public HotelBooking createHotelBooking(CreateHotelBookingRequest request, String touristId) {
        HotelBooking booking = new HotelBooking();
        BeanUtils.copyProperties(request, booking);
        booking.setTouristId(touristId);
        booking.setStatus("pending");
        booking.setPaymentStatus("pending");
        booking.setCreatedAt(LocalDateTime.now());
        booking.setUpdatedAt(LocalDateTime.now());

        // Placeholder for hotel info - in a real app, this would come from a Hotel service
        HotelInfo hotelInfo = new HotelInfo();
        hotelInfo.setName("Sample Hotel Name");
        hotelInfo.setCity("Paris");
        hotelInfo.setRating(4.7);
        booking.setHotelInfo(hotelInfo);
        booking.setRoomPricePerNight(250.0); // Example pricing
        booking.setTotalPrice(booking.getRoomPricePerNight() * (booking.getCheckOutDate().getDayOfYear() - booking.getCheckInDate().getDayOfYear()));

        return hotelBookingRepository.save(booking);
    }

    public List<HotelBooking> getUserHotelBookings(String touristId, String status, int page, int limit) {
        Pageable pageable = PageRequest.of(page - 1, limit, Sort.by(Sort.Direction.DESC, "createdAt"));
        if (status != null && !status.isEmpty()) {
            return hotelBookingRepository.findByTouristIdAndStatus(touristId, status);
        } else {
            return hotelBookingRepository.findByTouristId(touristId);
        }
    }

    public HotelBooking getHotelBookingDetails(String bookingId, String touristId) {
        return hotelBookingRepository.findById(bookingId)
                .filter(booking -> booking.getTouristId().equals(touristId))
                .orElseThrow(() -> new ResourceNotFoundException("Hotel booking not found or access denied"));
    }

    public HotelBooking updateHotelBooking(String bookingId, UpdateHotelBookingRequest request, String touristId) {
        HotelBooking existingBooking = hotelBookingRepository.findById(bookingId)
                .filter(booking -> booking.getTouristId().equals(touristId))
                .orElseThrow(() -> new ResourceNotFoundException("Hotel booking not found or access denied"));

        if (!existingBooking.getStatus().equals("pending")) {
            throw new IllegalStateException("Cannot update a booking that is not in pending status.");
        }

        Optional.ofNullable(request.getNumberOfGuests()).ifPresent(existingBooking::setNumberOfGuests);
        Optional.ofNullable(request.getSpecialRequests()).ifPresent(existingBooking::setSpecialRequests);
        existingBooking.setUpdatedAt(LocalDateTime.now());

        return hotelBookingRepository.save(existingBooking);
    }

    public HotelBooking cancelHotelBooking(String bookingId, CancelBookingRequest request, String touristId) {
        HotelBooking existingBooking = hotelBookingRepository.findById(bookingId)
                .filter(booking -> booking.getTouristId().equals(touristId))
                .orElseThrow(() -> new ResourceNotFoundException("Hotel booking not found or access denied"));

        if (existingBooking.getStatus().equals("cancelled") || existingBooking.getStatus().equals("completed")) {
            throw new IllegalStateException("Cannot cancel a booking that is already cancelled or completed.");
        }

        existingBooking.setStatus("cancelled");
        existingBooking.setUpdatedAt(LocalDateTime.now());
        // In a real app, handle refunds here
        return hotelBookingRepository.save(existingBooking);
    }

    public HotelBooking checkIn(String bookingId, String touristId) {
        HotelBooking existingBooking = hotelBookingRepository.findById(bookingId)
                .filter(booking -> booking.getTouristId().equals(touristId))
                .orElseThrow(() -> new ResourceNotFoundException("Hotel booking not found or access denied"));

        if (!existingBooking.getStatus().equals("confirmed")) {
            throw new IllegalStateException("Only confirmed bookings can be checked in.");
        }
        if (existingBooking.getCheckedInAt() != null) {
            throw new IllegalStateException("Already checked in.");
        }

        existingBooking.setCheckedInAt(LocalDateTime.now());
        existingBooking.setStatus("ongoing");
        existingBooking.setUpdatedAt(LocalDateTime.now());
        return hotelBookingRepository.save(existingBooking);
    }

    public HotelBooking checkOut(String bookingId, String touristId) {
        HotelBooking existingBooking = hotelBookingRepository.findById(bookingId)
                .filter(booking -> booking.getTouristId().equals(touristId))
                .orElseThrow(() -> new ResourceNotFoundException("Hotel booking not found or access denied"));

        if (!existingBooking.getStatus().equals("ongoing")) {
            throw new IllegalStateException("Only ongoing bookings can be checked out.");
        }
        if (existingBooking.getCheckedOutAt() != null) {
            throw new IllegalStateException("Already checked out.");
        }

        existingBooking.setCheckedOutAt(LocalDateTime.now());
        existingBooking.setStatus("completed");
        existingBooking.setUpdatedAt(LocalDateTime.now());
        return hotelBookingRepository.save(existingBooking);
    }
}