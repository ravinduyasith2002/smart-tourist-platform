/**
 * SmartTouristPlatform - Trips Service
 * API calls for trip operations
 */

import { apiClient } from '@/services/apiClient';
import { Trip, ApiListResponse } from '@/types/common';
import {
  TripCreateRequest,
  TripUpdateRequest,
  TripSearchParams,
  TripStats,
  ItineraryDayRequest,
} from '../trips.types';

class TripsService {
  /**
   * Create new trip
   */
  async createTrip(data: TripCreateRequest): Promise<Trip> {
    return apiClient.post('/trips', data);
  }

  /**
   * Get trip by ID
   */
  async getTripById(tripId: string): Promise<Trip> {
    return apiClient.get(`/trips/${tripId}`);
  }

  /**
   * Get all trips
   */
  async getTrips(params: TripSearchParams): Promise<ApiListResponse<Trip>> {
    const queryString = new URLSearchParams();
    if (params.status) queryString.append('status', params.status);
    if (params.startDate) queryString.append('startDate', params.startDate);
    if (params.endDate) queryString.append('endDate', params.endDate);
    if (params.destination) queryString.append('destination', params.destination);
    if (params.page) queryString.append('page', params.page.toString());
    if (params.limit) queryString.append('limit', params.limit.toString());

    return apiClient.get(`/trips?${queryString.toString()}`);
  }

  /**
   * Update trip
   */
  async updateTrip(data: TripUpdateRequest): Promise<Trip> {
    const { id, ...updateData } = data;
    return apiClient.put(`/trips/${id}`, updateData);
  }

  /**
   * Delete trip
   */
  async deleteTrip(tripId: string): Promise<{ message: string }> {
    return apiClient.delete(`/trips/${tripId}`);
  }

  /**
   * Add itinerary day
   */
  async addItineraryDay(tripId: string, day: ItineraryDayRequest): Promise<Trip> {
    return apiClient.post(`/trips/${tripId}/itinerary`, day);
  }

  /**
   * Update itinerary day
   */
  async updateItineraryDay(tripId: string, dayNumber: number, day: Partial<ItineraryDayRequest>): Promise<Trip> {
    return apiClient.put(`/trips/${tripId}/itinerary/${dayNumber}`, day);
  }

  /**
   * Delete itinerary day
   */
  async deleteItineraryDay(tripId: string, dayNumber: number): Promise<Trip> {
    return apiClient.delete(`/trips/${tripId}/itinerary/${dayNumber}`);
  }

  /**
   * Get trip statistics
   */
  async getTripStats(): Promise<TripStats> {
    return apiClient.get('/trips/stats');
  }

  /**
   * Publish trip (make it public)
   */
  async publishTrip(tripId: string): Promise<Trip> {
    return apiClient.post(`/trips/${tripId}/publish`, {});
  }

  /**
   * Cancel trip
   */
  async cancelTrip(tripId: string, reason?: string): Promise<Trip> {
    return apiClient.post(`/trips/${tripId}/cancel`, { reason });
  }

  /**
   * Complete trip
   */
  async completeTrip(tripId: string): Promise<Trip> {
    return apiClient.post(`/trips/${tripId}/complete`, {});
  }
}

export const tripsService = new TripsService();
