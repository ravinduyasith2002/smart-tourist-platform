/**
 * SmartTouristPlatform - Dashboard Service
 * API calls for dashboard operations
 */

import { apiClient } from '@/services/apiClient';
import {
  DashboardStats,
  TouristDashboardData,
  GuideDashboardData,
  HotelDashboardData,
  AdminDashboardData,
} from '../dashboard.types';

class DashboardService {
  /**
   * Get general dashboard stats
   */
  async getDashboardStats(): Promise<DashboardStats> {
    return apiClient.get('/dashboard/stats');
  }

  /**
   * Get tourist dashboard data
   */
  async getTouristDashboard(): Promise<TouristDashboardData> {
    return apiClient.get('/dashboard/tourist');
  }

  /**
   * Get guide dashboard data
   */
  async getGuideDashboard(): Promise<GuideDashboardData> {
    return apiClient.get('/dashboard/guide');
  }

  /**
   * Get hotel dashboard data
   */
  async getHotelDashboard(): Promise<HotelDashboardData> {
    return apiClient.get('/dashboard/hotel');
  }

  /**
   * Get admin dashboard data
   */
  async getAdminDashboard(): Promise<AdminDashboardData> {
    return apiClient.get('/dashboard/admin');
  }

  /**
   * Get analytics data
   */
  async getAnalytics(
    startDate: string,
    endDate: string,
    metric: string
  ): Promise<any> {
    return apiClient.get(
      `/dashboard/analytics?startDate=${startDate}&endDate=${endDate}&metric=${metric}`
    );
  }

  /**
   * Get activity log
   */
  async getActivityLog(page: number = 1, limit: number = 20): Promise<any> {
    return apiClient.get(`/dashboard/activity?page=${page}&limit=${limit}`);
  }

  /**
   * Get system health
   */
  async getSystemHealth(): Promise<any> {
    return apiClient.get('/dashboard/health');
  }
}

export const dashboardService = new DashboardService();
