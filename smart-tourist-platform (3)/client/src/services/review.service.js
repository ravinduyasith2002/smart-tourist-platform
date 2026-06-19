import axiosInstance, { API_BASE } from '@/lib/axios';

const REVIEW_API = `${API_BASE}/reviews`;

export const reviewService = {
  // Guide reviews
  createGuideReview: async (guideBookingId, rating, title, comment, categories, guideId) => {
    const response = await axiosInstance.post(`${REVIEW_API}/guides/${guideBookingId}`, {
      rating, title, comment, categories, guideId,
    });
    return response.data;
  },

  getGuideReviewsByGuide: async (guideId, page = 1, limit = 10) => {
    const response = await axiosInstance.get(`${REVIEW_API}/guides/${guideId}`, {
      params: { page, limit },
    });
    return response.data;
  },

  // Hotel reviews
  createHotelReview: async (hotelBookingId, rating, title, comment, categoryRatings, hotelId) => {
    const response = await axiosInstance.post(`${REVIEW_API}/hotels/${hotelBookingId}`, {
      rating, title, comment, categoryRatings, hotelId,
    });
    return response.data;
  },

  getHotelReviewsByHotel: async (hotelId, sort = '-rating') => {
    const response = await axiosInstance.get(`${REVIEW_API}/hotels/${hotelId}`, {
      params: { sort },
    });
    return response.data;
  },
};
