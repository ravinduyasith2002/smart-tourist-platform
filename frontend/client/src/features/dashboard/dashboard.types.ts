/**
 * SmartTouristPlatform - Dashboard Feature Types
 */

export interface DashboardStats {
  totalUsers: number;
  activeBookings: number;
  totalRevenue: number;
  averageRating: number;
  pendingApprovals?: number;
  systemHealth?: {
    uptime: number;
    responseTime: number;
    errorRate: number;
  };
}

export interface TouristDashboardData {
  stats: {
    completedTrips: number;
    upcomingTrips: number;
    totalGuides: number;
    totalSpent: number;
  };
  recentTrips: any[];
  upcomingBookings: any[];
  recommendations: any[];
}

export interface GuideDashboardData {
  stats: {
    totalBookings: number;
    acceptedBookings: number;
    earnings: number;
    averageRating: number;
  };
  pendingBookings: any[];
  recentReviews: any[];
  upcomingSchedule: any[];
}

export interface HotelDashboardData {
  stats: {
    totalBookings: number;
    occupancyRate: number;
    revenue: number;
    averageRating: number;
  };
  pendingBookings: any[];
  roomOccupancy: any[];
  recentReviews: any[];
}

export interface AdminDashboardData {
  stats: {
    totalUsers: number;
    totalBookings: number;
    totalRevenue: number;
    systemHealth: number;
  };
  pendingApprovals: any[];
  recentActivity: any[];
  analytics: {
    userGrowth: any[];
    bookingTrends: any[];
    revenueChart: any[];
  };
}
