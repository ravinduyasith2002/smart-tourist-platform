/**
 * SmartTouristPlatform - Hotels Service
 * API calls for hotel operations
 */

import { apiClient } from '@/services/apiClient';
import { Hotel, Hotel_Booking, Room, ApiListResponse } from '@/types/common';
import { HotelSearchParams, HotelDetail, HotelBookingRequest } from '../hotels.types';

class HotelsService {
  /**
   * Search hotels
   */
  async searchHotels(params: HotelSearchParams): Promise<ApiListResponse<Hotel>> {
    const queryString = new URLSearchParams();
    if (params.search) queryString.append('search', params.search);
    if (params.city) queryString.append('city', params.city);
    if (params.country) queryString.append('country', params.country);
    if (params.checkInDate) queryString.append('checkInDate', params.checkInDate);
    if (params.checkOutDate) queryString.append('checkOutDate', params.checkOutDate);
    if (params.guests) queryString.append('guests', params.guests.toString());
    if (params.minPrice) queryString.append('minPrice', params.minPrice.toString());
    if (params.maxPrice) queryString.append('maxPrice', params.maxPrice.toString());
    if (params.minRating) queryString.append('minRating', params.minRating.toString());
    if (params.page) queryString.append('page', params.page.toString());
    if (params.limit) queryString.append('limit', params.limit.toString());

    return apiClient.get(`/hotels?${queryString.toString()}`);
  }

  /**
   * Get hotel by ID
   */
  async getHotelById(hotelId: string): Promise<HotelDetail> {
    return apiClient.get(`/hotels/${hotelId}`);
  }

  /**
   * Get hotel rooms
   */
  async getHotelRooms(hotelId: string): Promise<Room[]> {
    return apiClient.get(`/hotels/${hotelId}/rooms`);
  }

  /**
   * Get room details
   */
  async getRoomDetails(hotelId: string, roomId: string): Promise<any> {
    return apiClient.get(`/hotels/${hotelId}/rooms/${roomId}`);
  }

  /**
   * Check room availability
   */
  async checkAvailability(
    hotelId: string,
    roomId: string,
    checkInDate: string,
    checkOutDate: string
  ): Promise<{ available: boolean; price: number }> {
    return apiClient.get(
      `/hotels/${hotelId}/rooms/${roomId}/availability?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`
    );
  }

  /**
   * Book hotel
   */
  async bookHotel(booking: HotelBookingRequest): Promise<Hotel_Booking> {
    return apiClient.post('/hotels/bookings', booking);
  }

  /**
   * Get my bookings (for hotel owner)
   */
  async getMyBookings(status?: string): Promise<Hotel_Booking[]> {
    const url = status ? `/hotels/my-bookings?status=${status}` : '/hotels/my-bookings';
    return apiClient.get(url);
  }

  /**
   * Get hotel reviews
   */
  async getHotelReviews(hotelId: string, page: number = 1, limit: number = 10): Promise<any> {
    return apiClient.get(`/hotels/${hotelId}/reviews?page=${page}&limit=${limit}`);
  }

  /**
   * Update hotel profile
   */
  async updateProfile(data: Partial<Hotel>): Promise<Hotel> {
    return apiClient.put('/hotels/profile', data);
  }

  /**
   * Update room
   */
  async updateRoom(hotelId: string, roomId: string, data: Partial<Room>): Promise<Room> {
    return apiClient.put(`/hotels/${hotelId}/rooms/${roomId}`, data);
  }
}

export const hotelsService = new HotelsService();
