import axiosInstance, { API_BASE } from '@/lib/axios';

const REVIEW_API = `${API_BASE}/reviews`;

export const reviewService = {
  createGuideReview: async (guideBookingId, rating, title, comment, categories) => {
    const response = await axiosInstance.post(`${REVIEW_API}/guides/${guideBookingId}`, {
      rating, title, comment, categories,
    });
    return response.data;
  },

  getGuideReviews: async (guideId) => {
    const response = await axiosInstance.get(`${REVIEW_API}/guides?guideId=${guideId}`);
    return response.data;
  },

  createHotelReview: async (hotelBookingId, rating, title, comment, categoryRatings) => {
    const response = await axiosInstance.post(`${REVIEW_API}/hotels/${hotelBookingId}`, {
      rating, title, comment, categoryRatings,
    });
    return response.data;
  },

  getHotelReviews: async (hotelId) => {
    const response = await axiosInstance.get(`${REVIEW_API}/hotels?hotelId=${hotelId}`);
    return response.data;
  },

  updateGuideReview: async (reviewId, data) => {
    const response = await axiosInstance.put(`${REVIEW_API}/guides/${reviewId}`, data);
    return response.data;
  },

  updateHotelReview: async (reviewId, data) => {
    const response = await axiosInstance.put(`${REVIEW_API}/hotels/${reviewId}`, data);
    return response.data;
  },

  deleteGuideReview: async (reviewId) => {
    await axiosInstance.delete(`${REVIEW_API}/guides/${reviewId}`);
  },

  deleteHotelReview: async (reviewId) => {
    await axiosInstance.delete(`${REVIEW_API}/hotels/${reviewId}`);
  },
};
