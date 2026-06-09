/**
 * SmartTouristPlatform - Users Service
 * API calls for user operations
 */

import { apiClient } from '@/services/apiClient';
import { User, ApiListResponse } from '@/types/common';
import { UserUpdateRequest, UserSearchParams, TouristProfile, GuideProfile, HotelProfile } from '../users.types';

class UsersService {
  /**
   * Get user by ID
   */
  async getUserById(userId: string): Promise<User> {
    return apiClient.get(`/users/${userId}`);
  }

  /**
   * Get current user profile
   */
  async getMyProfile(): Promise<User> {
    return apiClient.get('/users/me');
  }

  /**
   * Update user profile
   */
  async updateProfile(data: UserUpdateRequest): Promise<User> {
    return apiClient.put('/users/me', data);
  }

  /**
   * Upload avatar
   */
  async uploadAvatar(file: File): Promise<{ url: string }> {
    return apiClient.uploadFile('/users/avatar', file);
  }

  /**
   * Search users
   */
  async searchUsers(params: UserSearchParams): Promise<ApiListResponse<User>> {
    const queryString = new URLSearchParams();
    if (params.role) queryString.append('role', params.role);
    if (params.search) queryString.append('search', params.search);
    if (params.city) queryString.append('city', params.city);
    if (params.country) queryString.append('country', params.country);
    if (params.page) queryString.append('page', params.page.toString());
    if (params.limit) queryString.append('limit', params.limit.toString());

    return apiClient.get(`/users?${queryString.toString()}`);
  }

  /**
   * Get tourist profile
   */
  async getTouristProfile(userId: string): Promise<TouristProfile> {
    return apiClient.get(`/users/${userId}/tourist`);
  }

  /**
   * Get guide profile
   */
  async getGuideProfile(userId: string): Promise<GuideProfile> {
    return apiClient.get(`/users/${userId}/guide`);
  }

  /**
   * Get hotel profile
   */
  async getHotelProfile(userId: string): Promise<HotelProfile> {
    return apiClient.get(`/users/${userId}/hotel`);
  }

  /**
   * Delete account
   */
  async deleteAccount(password: string): Promise<{ message: string }> {
    return apiClient.post('/users/me/delete', { password });
  }

  /**
   * Get user notifications
   */
  async getNotifications(page: number = 1, limit: number = 20): Promise<any> {
    return apiClient.get(`/users/notifications?page=${page}&limit=${limit}`);
  }

  /**
   * Mark notification as read
   */
  async markNotificationAsRead(notificationId: string): Promise<{ message: string }> {
    return apiClient.put(`/users/notifications/${notificationId}/read`, {});
  }

  /**
   * Mark all notifications as read
   */
  async markAllNotificationsAsRead(): Promise<{ message: string }> {
    return apiClient.put('/users/notifications/read-all', {});
  }
}

export const usersService = new UsersService();
