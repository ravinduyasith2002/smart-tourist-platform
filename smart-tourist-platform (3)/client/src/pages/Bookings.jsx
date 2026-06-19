import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { guideBookingService } from "@/services/guideBooking.service";
import { hotelBookingService } from "@/services/hotelBooking.service";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { EmptyState } from "@/components/EmptyState";
import { StatusBadge } from "@/components/StatusBadge";
import { Calendar, MapPin, Users } from "lucide-react";
import { isAuthenticated as checkAuth } from "@/contexts/AuthContext";
import { formatDate, formatServerError } from "@/utils/helpers";
import { useLocation } from "wouter";

export default function Bookings() {
  const [loggedIn] = useState(checkAuth());
  const [guideBookings, setGuideBookings] = useState([]);
  const [hotelBookings, setHotelBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (loggedIn) {
      fetchBookings();
    }
  }, [loggedIn]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const [guideResult, hotelResult] = await Promise.all([
        guideBookingService.getBookings({ page: 1, limit: 12 }),
        hotelBookingService.getBookings({ page: 1, limit: 12 }),
      ]);
      setGuideBookings(Array.isArray(guideResult) ? guideResult : guideResult?.data || []);
      setHotelBookings(Array.isArray(hotelResult) ? hotelResult : hotelResult?.data || []);
    } catch (error) {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelGuide = async (bookingId) => {
    try {
      await guideBookingService.cancelBooking(bookingId);
      toast.success("Guide booking cancelled");
      fetchBookings();
    } catch (error) {
      toast.error(formatServerError(error.response?.data) || "Failed to cancel booking");
    }
  };

  const handleCancelHotel = async (bookingId) => {
    try {
      await hotelBookingService.cancelBooking(bookingId);
      toast.success("Hotel booking cancelled");
      fetchBookings();
    } catch (error) {
      toast.error(formatServerError(error.response?.data) || "Failed to cancel booking");
    }
  };

  const handleCheckIn = async (bookingId) => {
    try {
      await hotelBookingService.checkIn(bookingId);
      toast.success("Checked in successfully");
      fetchBookings();
    } catch (error) {
      toast.error(formatServerError(error.response?.data) || "Failed to check in");
    }
  };

  const handleCheckOut = async (bookingId) => {
    try {
      await hotelBookingService.checkOut(bookingId);
      toast.success("Checked out successfully");
      fetchBookings();
    } catch (error) {
      toast.error(formatServerError(error.response?.data) || "Failed to check out");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
            <p className="text-gray-600">Manage your guide and hotel reservations</p>
          </div>

          <Tabs defaultValue="guides" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="guides">Guide Bookings</TabsTrigger>
              <TabsTrigger value="hotels">Hotel Bookings</TabsTrigger>
            </TabsList>

            <TabsContent value="guides" className="space-y-6">
              {loading ? (
                <LoadingSkeleton count={3} type="list" />
              ) : guideBookings.length > 0 ? (
                <div className="space-y-4">
                  {guideBookings.map((booking) => (
                    <Card key={booking.id || booking._id} className="shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-bold text-lg text-gray-900">Guide Booking</h3>
                            <p className="text-sm text-gray-600">ID: {booking.id || booking._id}</p>
                          </div>
                          <StatusBadge status={booking?.status} />
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-gray-600 font-semibold">Date</p>
                            <p className="text-sm text-gray-900">{formatDate(booking?.bookingDate)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 font-semibold">Time</p>
                            <p className="text-sm text-gray-900">{booking?.startTime || booking?.time || ''}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 font-semibold">Location</p>
                            <p className="text-sm text-gray-900">{booking?.location || ''}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 font-semibold">Total Cost</p>
                            <p className="text-sm font-bold text-primary">${booking?.totalCost ?? 0}</p>
                          </div>
                        </div>

                        {booking?.specialRequests && (
                          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                            <p className="text-xs text-gray-600 font-semibold mb-1">Special Requests</p>
                            <p className="text-sm text-gray-700">{booking.specialRequests}</p>
                          </div>
                        )}

                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => setLocation(`/guides/${booking?.guideId || booking?.guide?.guideId}`)}
                          >
                            View Details
                          </Button>
                          {booking?.status === "PENDING" && (
                            <Button
                              variant="destructive"
                              className="flex-1"
                              onClick={() => handleCancelGuide(booking.id || booking._id)}
                            >
                              Cancel Booking
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={Users}
                  title="No Guide Bookings"
                  description="You haven't booked any guides yet"
                />
              )}
            </TabsContent>

            <TabsContent value="hotels" className="space-y-6">
              {loading ? (
                <LoadingSkeleton count={3} type="list" />
              ) : hotelBookings.length > 0 ? (
                <div className="space-y-4">
                  {hotelBookings.map((booking) => (
                    <Card key={booking.id || booking._id} className="shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-bold text-lg text-gray-900">Hotel Booking</h3>
                            <p className="text-sm text-gray-600">ID: {booking.id || booking._id}</p>
                          </div>
                          <StatusBadge status={booking?.status} />
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-gray-600 font-semibold">Check-In</p>
                            <p className="text-sm text-gray-900">{formatDate(booking?.checkInDate)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 font-semibold">Check-Out</p>
                            <p className="text-sm text-gray-900">{formatDate(booking?.checkOutDate)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 font-semibold">Guests</p>
                            <p className="text-sm text-gray-900">{booking?.numberOfGuests || booking?.guests || ''}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 font-semibold">Total Cost</p>
                            <p className="text-sm font-bold text-primary">${booking?.totalCost ?? 0}</p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => setLocation(`/hotels/${booking?.hotelId || booking?.hotel?.hotelId}`)}
                          >
                            View Details
                          </Button>
                          {booking?.status === "PENDING" && (
                            <Button
                              variant="destructive"
                              className="flex-1"
                              onClick={() => handleCancelHotel(booking.id || booking._id)}
                            >
                              Cancel Booking
                            </Button>
                          )}
                          {!booking?.checkedIn && booking?.status !== "CANCELLED" && booking?.status !== "PENDING" && (
                            <Button
                              className="flex-1 bg-primary hover:bg-primary/90 text-white"
                              onClick={() => handleCheckIn(booking.id || booking._id)}
                            >
                              Check In
                            </Button>
                          )}
                          {booking?.checkedIn && !booking?.checkedOut && (
                            <Button
                              className="flex-1 bg-secondary hover:bg-secondary/90 text-white"
                              onClick={() => handleCheckOut(booking.id || booking._id)}
                            >
                              Check Out
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={MapPin}
                  title="No Hotel Bookings"
                  description="You haven't booked any hotels yet"
                />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}