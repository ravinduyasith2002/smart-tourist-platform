import axiosInstance, { API_BASE } from '@/lib/axios';

const HOTEL_API = `${API_BASE}/hotels`;

export const hotelService = {
  getHotels: async (filters) => {
    const params = new URLSearchParams();
    if (filters?.search) params.append('search', filters.search);
    if (filters?.location) params.append('location', filters.location);
    if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString());
    if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
    if (filters?.minRating) params.append('minRating', filters.minRating.toString());
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    const response = await axiosInstance.get(`${HOTEL_API}?${params.toString()}`);
    return response.data;
  },

  getHotelById: async (hotelId) => {
    const response = await axiosInstance.get(`${HOTEL_API}/${hotelId}`);
    return response.data;
  },

  getHotelsByLocation: async (location) => {
    const response = await axiosInstance.get(`${HOTEL_API}?location=${location}`);
    return response.data;
  },

  getMe: async () => {
    const response = await axiosInstance.get(`${HOTEL_API}/me`);
    return response.data;
  },

  updateMe: async (hotelName, description, address, city, state, country, postalCode, phone, website, checkInTime, checkOutTime, amenities) => {
    const payload = { hotelName, description, address, city, state, country, postalCode, phone, website, checkInTime, checkOutTime };
    if (amenities) payload.amenities = amenities;
    const response = await axiosInstance.put(`${HOTEL_API}/me`, payload);
    return response.data;
  },
};
