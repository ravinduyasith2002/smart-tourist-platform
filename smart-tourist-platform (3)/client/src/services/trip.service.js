import axiosInstance, { API_BASE } from '@/lib/axios';

const TRIP_API = `${API_BASE}/trips`;

export const tripService = {

  getTrips: async (filters) => {
    console.log("bare token",localStorage.getItem('accessToken'))
    console.log("user --",localStorage.getItem('user'))
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    const response = await axiosInstance.get(`${TRIP_API}?${params.toString()}`);
    return response.data;
  },

  getTripById: async (tripId) => {
    const response = await axiosInstance.get(`${TRIP_API}/${tripId}`);
    return response.data;
  },

  createTrip: async (title, description, startDate, endDate, budget, currency, isPublic, destinations) => {
    const response = await axiosInstance.post(TRIP_API, {
      title,
      description,
      startDate,
      endDate,
      budget,
      currency,
      isPublic,
      destinations: destinations || [],
    });
    return response.data;
  },

  updateTrip: async (tripId, title, description, budget, isPublic) => {
    const response = await axiosInstance.put(`${TRIP_API}/${tripId}`, {
      title,
      description,
      budget,
      isPublic,
    });
    return response.data;
  },

  deleteTrip: async (tripId) => {
    await axiosInstance.delete(`${TRIP_API}/${tripId}`);
  },

  addItinerary: async (tripId, dayNumber, date, location, title, description, activities) => {
    const response = await axiosInstance.post(`${TRIP_API}/${tripId}/itinerary`, {
      dayNumber,
      date,
      location,
      title,
      description,
      activities,
    });
    return response.data;
  },
};
