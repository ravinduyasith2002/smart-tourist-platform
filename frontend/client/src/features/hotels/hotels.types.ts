/**
 * SmartTouristPlatform - Hotels Feature Types\n */

import { Hotel, Room, Hotel_Booking } from '@/types/common';

export interface HotelSearchParams {
  search?: string;
  city?: string;
  country?: string;
  checkInDate?: string;
  checkOutDate?: string;
  guests?: number;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  page?: number;
  limit?: number;
}

export interface HotelDetail extends Hotel {
  description?: string;
  amenities?: string[];
  images?: string[];
  policies?: {
    checkInTime?: string;
    checkOutTime?: string;
    cancellationPolicy?: string;
  };
}

export interface RoomDetail extends Room {
  description?: string;
  images?: string[];
  reviews?: Array<{
    rating: number;
    comment: string;
  }>;
}

export interface HotelBookingRequest {
  hotelId: string;
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  specialRequests?: string;
}

export interface HotelAvailability {
  hotelId: string;
  roomId: string;
  availableDates: string[];
}
