import axiosInstance, { API_BASE } from '@/lib/axios';

const TOURIST_API = `${API_BASE}/tourists`;

export const touristService = {
  getMe: async () => {
    const response = await axiosInstance.get(`${TOURIST_API}/me`);
    return response.data;
  },

  updateMe: async (preferredLanguage, preferredCurrency, travelStyle, totalTrips, totalSpent, bio) => {
    const response = await axiosInstance.put(`${TOURIST_API}/me`, {
      preferredLanguage, preferredCurrency, travelStyle,
      totalTrips, totalSpent, bio,
    });
    return response.data;
  },

  getTouristById: async (touristId) => {
    const response = await axiosInstance.get(`${TOURIST_API}/${touristId}`);
    return response.data;
  },
};
