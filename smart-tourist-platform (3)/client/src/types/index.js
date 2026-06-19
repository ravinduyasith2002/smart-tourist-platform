/** @typedef {{ id: string, name: string, email: string, phone: string, bio?: string, role: string, avatarUrl?: string, nic?: string, password?: string }} User */
/** @typedef {"TOURIST" | "GUIDE" | "ADMIN"} UserRole */
/** @typedef {{ email: string, password: string }} AuthCredentials */
/** @typedef {{ accessToken: string, user: User }} AuthResponse */
/** @typedef {{ nic: string, name: string, email: string, phone: string, password: string, avatarUrl?: string, bio?: string }} RegisterData */
/** @typedef {{ name?: string, email?: string, phone?: string, bio?: string, avatarUrl?: string }} UpdateUserData */
/** @typedef {{ id: string, userId: string, preferredLanguage?: string, preferredCurrency?: string, travelStyle?: string, totalTrips?: number, totalSpent?: number, bio?: string, user?: User }} TouristProfile */
/** @typedef {{ preferredLanguage?: string, preferredCurrency?: string, travelStyle?: string, totalTrips?: number, totalSpent?: number, bio?: string }} UpdateTouristData */
/** @typedef {{ id: string, title: string, description?: string, startDate: string, endDate: string, budget?: number, currency?: string, status: string, visibility: string, destinations?: Destination[], itinerary?: Itinerary[], createdAt?: string, updatedAt?: string }} Trip */
/** @typedef {{ guideBookings?: GuideBooking[], hotelBookings?: HotelBooking[] } & Trip} TripDetails */
/** @typedef {{ name: string, country?: string, coordinates?: number[], visitOrder?: number }} Destination */
/** @typedef {{ dayNumber: number, date: string, location: string, title: string, description?: string, activities?: Activity[] }} Itinerary */
/** @typedef {{ title: string, category: string, startTime: string, endTime: string, location?: string, estimatedCost?: number }} Activity */
/** @typedef {{ title: string, description?: string, startDate: string, endDate: string, budget?: number, currency?: string, visibility?: string, destinations?: Destination[] }} CreateTripData */
/** @typedef {{ title?: string, description?: string, budget?: number, visibility?: string }} UpdateTripData */
/** @typedef {{ id: string, name: string, rating: number, experience: number, languages: string[], specialization: string[], hourlyRate: number, avatarUrl?: string, bio?: string }} Guide */
/** @typedef {{ email?: string, phone?: string, reviews?: GuideReview[], totalReviews?: number, completedTours?: number } & Guide} GuideDetails */
/** @typedef {{ search?: string, languages?: string[], specialization?: string[], minRating?: number, maxPrice?: number, sortBy?: string }} GuideFilter */
/** @typedef {{ id: string, name: string, rating: number, location: string, pricePerNight: number, email?: string, phone?: string, amenities?: string[], images?: string[], description?: string }} Hotel */
/** @typedef {{ reviews?: HotelReview[], totalReviews?: number, rooms?: HotelRoom[] } & Hotel} HotelDetails */
/** @typedef {{ id: string, roomNumber: string, type: string, pricePerNight: number, capacity: number, amenities?: string[] }} HotelRoom */
/** @typedef {{ id: string, guideId: string, tripId: string, bookingDate: string, startTime: string, endTime: string, time?: string, durationHours: number, location: string, specialization: string, specialRequests?: string, status: string, totalCost?: number }} GuideBooking */
/** @typedef {{ guide?: Guide, trip?: Trip } & GuideBooking} GuideBookingDetails */
/** @typedef {{ guideId: string, tripId: string, bookingDate: string, startTime: string, endTime: string, durationHours: number, location: string, specialization: string, specialRequests?: string }} CreateGuideBookingData */
/** @typedef {{ id: string, hotelId: string, roomId: string, tripId: string, checkInDate: string, checkOutDate: string, numberOfGuests: number, guests?: number, specialRequests?: string, status: string, checkedIn?: boolean, checkedOut?: boolean, totalCost?: number }} HotelBooking */
/** @typedef {{ hotel?: Hotel, trip?: Trip } & HotelBooking} HotelBookingDetails */
/** @typedef {{ hotelId: string, roomId: string, tripId: string, checkInDate: string, checkOutDate: string, numberOfGuests: number, specialRequests?: string }} CreateHotelBookingData */
/** @typedef {{ id: string, guideBookingId: string, userId: string, rating: number, title?: string, comment?: string, categories?: { knowledge: number, communication: number, punctuality: number, friendliness: number }, createdAt?: string }} GuideReview */
/** @typedef {{ id: string, hotelBookingId: string, userId: string, rating: number, title?: string, comment?: string, categoryRatings?: { roomCleanliness: number, staffService: number, amenities: number, valueForMoney: number, location: number }, createdAt?: string }} HotelReview */
/** @typedef {{ rating: number, title?: string, comment?: string, categories?: { knowledge: number, communication: number, punctuality: number, friendliness: number } }} CreateGuideReviewData */
/** @typedef {{ rating: number, title?: string, comment?: string, categoryRatings?: { roomCleanliness: number, staffService: number, amenities: number, valueForMoney: number, location: number } }} CreateHotelReviewData */
/** @typedef {{ data: T[], total: number, page: number, limit: number, totalPages: number }} PaginatedResponse */
