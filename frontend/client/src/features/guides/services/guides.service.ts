/**
 * SmartTouristPlatform - Guides Service
 * API calls for guide operations
 */

import { apiClient } from '@/services/apiClient';
import { Guide, Guide_Booking, ApiListResponse } from '@/types/common';
import { GuideSearchParams, GuideProfile, GuideBookingRequest } from '../guides.types';

class GuidesService {
  /**
   * Search guides
   */
  async searchGuides(params: GuideSearchParams): Promise<ApiListResponse<Guide>> {
    const queryString = new URLSearchParams();
    if (params.search) queryString.append('search', params.search);
    if (params.languages?.length) queryString.append('languages', params.languages.join(','));
    if (params.specializations?.length) queryString.append('specializations', params.specializations.join(','));
    if (params.minRating) queryString.append('minRating', params.minRating.toString());
    if (params.maxPrice) queryString.append('maxPrice', params.maxPrice.toString());
    if (params.page) queryString.append('page', params.page.toString());
    if (params.limit) queryString.append('limit', params.limit.toString());

    return apiClient.get(`/guides?${queryString.toString()}`);
  }

  /**
   * Get guide by ID
   */
  async getGuideById(guideId: string): Promise<GuideProfile> {
    return apiClient.get(`/guides/${guideId}`);
  }

  /**
   * Get guide availability
   */
  async getGuideAvailability(guideId: string): Promise<any> {
    return apiClient.get(`/guides/${guideId}/availability`);
  }

  /**
   * Get guide reviews
   */
  async getGuideReviews(guideId: string, page: number = 1, limit: number = 10): Promise<any> {
    return apiClient.get(`/guides/${guideId}/reviews?page=${page}&limit=${limit}`);
  }

  /**
   * Book guide
   */
  async bookGuide(booking: GuideBookingRequest): Promise<Guide_Booking> {
    return apiClient.post('/guides/bookings', booking);
  }

  /**
   * Get my bookings (for guide)
   */
  async getMyBookings(status?: string): Promise<Guide_Booking[]> {
    const url = status ? `/guides/my-bookings?status=${status}` : '/guides/my-bookings';
    return apiClient.get(url);
  }

  /**
   * Update guide profile
   */
  async updateProfile(data: Partial<Guide>): Promise<Guide> {
    return apiClient.put('/guides/profile', data);
  }

  /**
   * Set availability
   */
  async setAvailability(slots: Array<{ date: string; isAvailable: boolean }>): Promise<any> {
    return apiClient.post('/guides/availability', { slots });
  }
}

export const guidesService = new GuidesService();
