/**
 * SmartTouristPlatform - Users Feature Types
 */

import { User, Tourist, Guide, Hotel } from '@/types/common';

export interface UserProfile extends User {
  avatar?: string;
  bio?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
}

export interface TouristProfile extends Tourist {
  preferences?: string[];
  totalTrips?: number;
  averageRating?: number;
  favoriteDestinations?: string[];
}

export interface GuideProfile extends Guide {
  bio?: string;
  certifications?: string[];
  experience?: number;
  responseTime?: number;
  cancellationRate?: number;
}

export interface HotelProfile extends Hotel {
  description?: string;
  amenities?: string[];
  policies?: {
    checkInTime?: string;
    checkOutTime?: string;
    cancellationPolicy?: string;
  };
}

export interface UserUpdateRequest {
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  address?: string;
  city?: string;
  country?: string;
}

export interface UserSearchParams {
  role?: string;
  search?: string;
  city?: string;
  country?: string;
  page?: number;
  limit?: number;
}
