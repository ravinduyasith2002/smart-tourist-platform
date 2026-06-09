/**
 * SmartTouristPlatform - Route Configuration
 * Centralized route definitions for navigation and routing
 */

export const ROUTES = {
  // Public routes
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password/:token',
  
  // Tourist routes
  TOURIST_DASHBOARD: '/tourist/dashboard',
  TOURIST_TRIPS: '/tourist/trips',
  TOURIST_CREATE_TRIP: '/tourist/trips/create',
  TOURIST_TRIP_DETAIL: '/tourist/trips/:tripId',
  TOURIST_TRIP_EDIT: '/tourist/trips/:tripId/edit',
  TOURIST_GUIDES: '/tourist/guides',
  TOURIST_GUIDE_DETAIL: '/tourist/guides/:guideId',
  TOURIST_HOTELS: '/tourist/hotels',
  TOURIST_HOTEL_DETAIL: '/tourist/hotels/:hotelId',
  TOURIST_BOOKINGS: '/tourist/bookings',
  TOURIST_REVIEWS: '/tourist/reviews',
  TOURIST_PROFILE: '/tourist/profile',
  TOURIST_SETTINGS: '/tourist/settings',
  TOURIST_NOTIFICATIONS: '/tourist/notifications',
  
  // Guide routes
  GUIDE_DASHBOARD: '/guide/dashboard',
  GUIDE_BOOKINGS: '/guide/bookings',
  GUIDE_AVAILABILITY: '/guide/availability',
  GUIDE_EARNINGS: '/guide/earnings',
  GUIDE_REVIEWS: '/guide/reviews',
  GUIDE_PROFILE: '/guide/profile',
  GUIDE_SETTINGS: '/guide/settings',
  GUIDE_NOTIFICATIONS: '/guide/notifications',
  
  // Hotel routes
  HOTEL_DASHBOARD: '/hotel/dashboard',
  HOTEL_ROOMS: '/hotel/rooms',
  HOTEL_BOOKINGS: '/hotel/bookings',
  HOTEL_AVAILABILITY: '/hotel/availability',
  HOTEL_REVIEWS: '/hotel/reviews',
  HOTEL_PROFILE: '/hotel/profile',
  HOTEL_SETTINGS: '/hotel/settings',
  HOTEL_NOTIFICATIONS: '/hotel/notifications',
  
  // Admin routes
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_USERS: '/admin/users',
  ADMIN_GUIDES: '/admin/guides',
  ADMIN_GUIDE_APPROVALS: '/admin/guides/approvals',
  ADMIN_BOOKINGS: '/admin/bookings',
  ADMIN_PAYMENTS: '/admin/payments',
  ADMIN_ANALYTICS: '/admin/analytics',
  ADMIN_SETTINGS: '/admin/settings',
  
  // Error routes
  NOT_FOUND: '/404',
  UNAUTHORIZED: '/401',
  FORBIDDEN: '/403',
  ERROR: '/error',
} as const;

export type RouteKey = keyof typeof ROUTES;

export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.FORGOT_PASSWORD,
];

export const PROTECTED_ROUTES = [
  ROUTES.TOURIST_DASHBOARD,
  ROUTES.GUIDE_DASHBOARD,
  ROUTES.HOTEL_DASHBOARD,
  ROUTES.ADMIN_DASHBOARD,
];

export const ROLE_BASED_ROUTES = {
  tourist: [
    ROUTES.TOURIST_DASHBOARD,
    ROUTES.TOURIST_TRIPS,
    ROUTES.TOURIST_GUIDES,
    ROUTES.TOURIST_HOTELS,
    ROUTES.TOURIST_BOOKINGS,
  ],
  guide: [
    ROUTES.GUIDE_DASHBOARD,
    ROUTES.GUIDE_BOOKINGS,
    ROUTES.GUIDE_AVAILABILITY,
  ],
  hotel: [
    ROUTES.HOTEL_DASHBOARD,
    ROUTES.HOTEL_ROOMS,
    ROUTES.HOTEL_BOOKINGS,
  ],
  admin: [
    ROUTES.ADMIN_DASHBOARD,
    ROUTES.ADMIN_USERS,
    ROUTES.ADMIN_GUIDES,
  ],
} as const;
