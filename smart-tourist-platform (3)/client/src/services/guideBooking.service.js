import axiosInstance, { API_BASE } from '@/lib/axios';

const GUIDE_BOOKING_API = `${API_BASE}/guide-bookings`;

export const guideBookingService = {
  getBookings: async (filters) => {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    const response = await axiosInstance.get(`${GUIDE_BOOKING_API}?${params.toString()}`);
    return response.data;
  },

  getBookingById: async (bookingId) => {
    const response = await axiosInstance.get(`${GUIDE_BOOKING_API}/${bookingId}`);
    return response.data;
  },

  createBooking: async (guideId, tripId, bookingDate, startTime, endTime, durationHours, location, specialization, specialRequests) => {
    const payload = { guideId, bookingDate };
    if (tripId) payload.tripId = tripId;
    if (startTime) payload.startTime = startTime;
    if (endTime) payload.endTime = endTime;
    if (durationHours != null) payload.durationHours = durationHours;
    if (location) payload.location = location;
    if (specialization) payload.specialization = specialization;
    if (specialRequests) payload.specialRequests = specialRequests;
    console.log('guide booking payload:', payload);
    const response = await axiosInstance.post(GUIDE_BOOKING_API, payload);
    return response.data;
  },

  cancelBooking: async (bookingId) => {
    await axiosInstance.post(`${GUIDE_BOOKING_API}/${bookingId}/cancel`);
  },

  acceptBooking: async (bookingId) => {
    const response = await axiosInstance.post(`${GUIDE_BOOKING_API}/${bookingId}/accept`);
    return response.data;
  },

  rejectBooking: async (bookingId) => {
    const response = await axiosInstance.post(`${GUIDE_BOOKING_API}/${bookingId}/reject`);
    return response.data;
  },
};
