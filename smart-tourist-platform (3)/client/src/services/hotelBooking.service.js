import axiosInstance, { API_BASE } from '@/lib/axios';

const HOTEL_BOOKING_API = `${API_BASE}/hotel-bookings`;

export const hotelBookingService = {
  getBookings: async (filters) => {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    const response = await axiosInstance.get(`${HOTEL_BOOKING_API}?${params.toString()}`);
    return response.data;
  },

  getBookingById: async (bookingId) => {
    const response = await axiosInstance.get(`${HOTEL_BOOKING_API}/${bookingId}`);
    return response.data;
  },

  createBooking: async (hotelId, roomId, tripId, checkInDate, checkOutDate, numberOfGuests, specialRequests) => {
    const payload = { hotelId, checkInDate, checkOutDate };
    if (roomId) payload.roomId = roomId;
    if (tripId) payload.tripId = tripId;
    if (numberOfGuests != null) payload.numberOfGuests = numberOfGuests;
    if (specialRequests) payload.specialRequests = specialRequests;
    console.log('hotel booking payload:', payload);
    const response = await axiosInstance.post(HOTEL_BOOKING_API, payload);
    return response.data;
  },

  cancelBooking: async (bookingId) => {
    await axiosInstance.post(`${HOTEL_BOOKING_API}/${bookingId}/cancel`);
  },

  checkIn: async (bookingId) => {
    const response = await axiosInstance.post(`${HOTEL_BOOKING_API}/${bookingId}/check-in`);
    return response.data;
  },

  checkOut: async (bookingId) => {
    const response = await axiosInstance.post(`${HOTEL_BOOKING_API}/${bookingId}/check-out`);
    return response.data;
  },
};
