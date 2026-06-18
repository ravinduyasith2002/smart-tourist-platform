package com.smarttouristplatform.tourismservice.service;

import com.smarttouristplatform.tourismservice.Exception.ResourceNotFoundException;
import com.smarttouristplatform.tourismservice.dto.AddReviewResponseRequest;
import com.smarttouristplatform.tourismservice.dto.CreateGuideReviewRequest;
import com.smarttouristplatform.tourismservice.dto.CreateHotelReviewRequest;
import com.smarttouristplatform.tourismservice.dto.UpdateReviewRequest;
import com.smarttouristplatform.tourismservice.model.CategoryRatings;
import com.smarttouristplatform.tourismservice.model.Review;
import com.smarttouristplatform.tourismservice.model.ReviewCategories;
import com.smarttouristplatform.tourismservice.repository.ReviewRepository;
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
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    public Review createGuideReview(String guideBookingId, CreateGuideReviewRequest request, String touristId) {
        Review review = new Review();
        BeanUtils.copyProperties(request, review);
        review.setTouristId(touristId);
        review.setGuideBookingId(guideBookingId);
        // In a real app, fetch guideId from guideBookingId
        review.setGuideId("sampleGuideId");
        review.setCreatedAt(LocalDateTime.now());
        review.setUpdatedAt(LocalDateTime.now());

        ReviewCategories categories = new ReviewCategories();
        BeanUtils.copyProperties(request.getCategories(), categories);
        review.setCategories(categories);

        return reviewRepository.save(review);
    }

    public Review createHotelReview(String hotelBookingId, CreateHotelReviewRequest request, String touristId) {
        Review review = new Review();
        BeanUtils.copyProperties(request, review);
        review.setTouristId(touristId);
        review.setHotelBookingId(hotelBookingId);
        // In a real app, fetch hotelId from hotelBookingId
        review.setHotelId("sampleHotelId");
        review.setCreatedAt(LocalDateTime.now());
        review.setUpdatedAt(LocalDateTime.now());

        CategoryRatings categoryRatings = new CategoryRatings();
        BeanUtils.copyProperties(request.getCategoryRatings(), categoryRatings);
        review.setCategoryRatings(categoryRatings);

        return reviewRepository.save(review);
    }

    public List<Review> getGuideReviews(String guideId, int page, int limit, String sort) {
        Sort sortBy = Sort.by(sort.startsWith("-") ? Sort.Direction.DESC : Sort.Direction.ASC, sort.replace("-", ""));
        Pageable pageable = PageRequest.of(page - 1, limit, sortBy);
        return reviewRepository.findByGuideId(guideId);
    }

    public List<Review> getHotelReviews(String hotelId, int page, int limit, String sort) {
        Sort sortBy = Sort.by(sort.startsWith("-") ? Sort.Direction.DESC : Sort.Direction.ASC, sort.replace("-", ""));
        Pageable pageable = PageRequest.of(page - 1, limit, sortBy);
        return reviewRepository.findByHotelId(hotelId);
    }

    public Review updateReview(String reviewId, UpdateReviewRequest request, String touristId) {
        Review existingReview = reviewRepository.findById(reviewId)
                .filter(review -> review.getTouristId().equals(touristId))
                .orElseThrow(() -> new ResourceNotFoundException("Review not found or access denied"));

        Optional.ofNullable(request.getRating()).ifPresent(existingReview::setRating);
        Optional.ofNullable(request.getComment()).ifPresent(existingReview::setComment);
        existingReview.setUpdatedAt(LocalDateTime.now());

        return reviewRepository.save(existingReview);
    }

    public void deleteReview(String reviewId, String touristId) {
        Review existingReview = reviewRepository.findById(reviewId)
                .filter(review -> review.getTouristId().equals(touristId))
                .orElseThrow(() -> new ResourceNotFoundException("Review not found or access denied"));
        reviewRepository.delete(existingReview);
    }

    public Review addReviewResponse(String reviewId, AddReviewResponseRequest request) {
        Review existingReview = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found"));

        existingReview.setResponseText(request.getResponseText());
        existingReview.setUpdatedAt(LocalDateTime.now());
        return reviewRepository.save(existingReview);
    }
}