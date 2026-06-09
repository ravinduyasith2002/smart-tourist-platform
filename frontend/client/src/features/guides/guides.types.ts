/**
 * SmartTouristPlatform - Guides Feature Types
 */

import { Guide, Guide_Booking } from '@/types/common';

export interface GuideSearchParams {
  search?: string;
  languages?: string[];
  specializations?: string[];
  minRating?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}

export interface GuideProfile extends Guide {
  bio?: string;
  certifications?: string[];
  experience?: number; // years
  responseTime?: number; // minutes
  cancellationRate?: number; // percentage
}

export interface GuideBookingRequest {
  guideId: string;
  date: string;
  duration: number;
  notes?: string;
}

export interface GuideAvailability {
  guideId: string;
  availableSlots: Array<{
    date: string;
    startTime: string;
    endTime: string;
  }>;
}
