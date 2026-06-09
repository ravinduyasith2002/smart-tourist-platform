/**
 * SmartTouristPlatform - Trips Feature Types
 */

import { Trip, ItineraryDay, Activity } from '@/types/common';

export interface TripCreateRequest {
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  destinations: string[];
  budget?: number;
}

export interface TripUpdateRequest extends Partial<TripCreateRequest> {
  id: string;
}

export interface ItineraryDayRequest {
  day: number;
  date: string;
  location: string;
  activities: ActivityRequest[];
  notes?: string;
}

export interface ActivityRequest {
  title: string;
  description?: string;
  time?: string;
  duration?: number;
  location?: string;
  category?: string;
}

export interface TripStats {
  totalTrips: number;
  completedTrips: number;
  upcomingTrips: number;
  totalSpent: number;
  totalGuideBookings: number;
  totalHotelBookings: number;
  averageRating: number;
}

export interface TripSearchParams {
  status?: string;
  startDate?: string;
  endDate?: string;
  destination?: string;
  page?: number;
  limit?: number;
}
