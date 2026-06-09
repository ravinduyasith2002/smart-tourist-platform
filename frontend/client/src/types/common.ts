/**
 * SmartTouristPlatform - Global Common Types
 * Shared type definitions across the application
 */

export enum UserRole {
  TOURIST = 'tourist',
  GUIDE = 'guide',
  HOTEL = 'hotel',
  ADMIN = 'admin',
}

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  REJECTED = 'rejected',
}

export enum GuideStatus {
  PENDING_APPROVAL = 'pending_approval',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  SUSPENDED = 'suspended',
}

export enum TripStatus {
  DRAFT = 'draft',
  PLANNING = 'planning',
  BOOKED = 'booked',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface Tourist extends User {
  phone?: string;
  bio?: string;
  preferences?: string[];
  totalTrips?: number;
  averageRating?: number;
}

export interface Guide extends User {
  certification?: string;
  languages?: string[];
  specializations?: string[];
  status: GuideStatus;
  rating?: number;
  reviewCount?: number;
  hourlyRate?: number;
  availability?: AvailabilitySlot[];
  earnings?: number;
}

export interface Hotel extends User {
  address?: string;
  city?: string;
  country?: string;
  rooms?: Room[];
  rating?: number;
  reviewCount?: number;
}

export interface Room {
  id: string;
  hotelId: string;
  name: string;
  description?: string;
  capacity: number;
  pricePerNight: number;
  amenities?: string[];
  images?: string[];
  availability?: AvailabilitySlot[];
}

export interface Guide_Booking {
  id: string;
  touristId: string;
  guideId: string;
  tripId?: string;
  date: string;
  duration: number; // in hours
  status: BookingStatus;
  totalPrice: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Hotel_Booking {
  id: string;
  touristId: string;
  hotelId: string;
  roomId: string;
  tripId?: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfNights: number;
  status: BookingStatus;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface Trip {
  id: string;
  touristId: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  duration: number; // in days
  destinations: string[];
  status: TripStatus;
  itinerary: ItineraryDay[];
  guideBookings?: Guide_Booking[];
  hotelBookings?: Hotel_Booking[];
  totalBudget?: number;
  totalSpent?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ItineraryDay {
  day: number;
  date: string;
  location: string;
  activities: Activity[];
  notes?: string;
  bookedGuide?: Guide_Booking;
  bookedHotel?: Hotel_Booking;
}

export interface Activity {
  id: string;
  title: string;
  description?: string;
  time?: string;
  duration?: number; // in hours
  location?: string;
  category?: string;
}

export interface Review {
  id: string;
  authorId: string;
  targetId: string; // guideId or hotelId
  targetType: 'guide' | 'hotel';
  rating: number; // 1-5
  title?: string;
  comment?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AvailabilitySlot {
  id: string;
  startDate: string;
  endDate: string;
  isAvailable: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'booking_request' | 'booking_confirmed' | 'review_received' | 'payment_received' | 'info';
  title: string;
  message: string;
  relatedId?: string;
  isRead: boolean;
  createdAt: string;
}

export interface Payment {
  id: string;
  touristId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  type: 'guide_booking' | 'hotel_booking';
  relatedId: string; // bookingId
  transactionId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiListResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  error?: string;
}
