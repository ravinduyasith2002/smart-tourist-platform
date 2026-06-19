import { useRoute, useLocation } from 'wouter';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { hotelService } from '@/services/hotel.service';
import { hotelBookingService } from '@/services/hotelBooking.service';
import { reviewService } from '@/services/review.service';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { ReviewCard } from '@/components/ReviewCard';
import { EmptyState } from '@/components/EmptyState';
import { isAuthenticated as checkAuth } from '@/contexts/AuthContext';
import { formatServerError } from '@/utils/helpers';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Rating } from '@/components/Rating';
import { MapPin, Mail, Phone, Globe, Clock, ShieldCheck, Building, Star, Bed, Users, DollarSign, Wifi, CheckCircle, XCircle, MessageSquare, Star as StarIcon } from 'lucide-react';

export default function HotelDetail() {
  const [, params] = useRoute('/hotels/:id');
  const [, setLocation] = useLocation();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [loggedIn] = useState(checkAuth());
  const [reviewDialog, setReviewDialog] = useState({ open: false, bookingId: null });
  const [reviewForm, setReviewForm] = useState({ rating: 0, title: '', comment: '', categories: {} });
  const [completedBookings, setCompletedBookings] = useState([]);
  const [fetchingBookings, setFetchingBookings] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (params?.id) {
      fetchHotel(params.id);
      fetchReviews(params.id);
    }
  }, [params?.id]);

  const fetchHotel = async (id) => {
    setLoading(true);
    try {
      const res = await hotelService.getHotelById(id);
      const d = res.data || res;
      setHotel(d);
    } catch (error) {
      toast.error('Failed to load hotel details');
      setLocation('/hotels');
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async (id) => {
    setReviewsLoading(true);
    try {
      const res = await reviewService.getHotelReviewsByHotel(id);
      const data = res.data || res;
      setReviews(Array.isArray(data) ? data : []);
    } catch {
      setReviews([]);
    } finally {
      setReviewsLoading(false);
    }
  };

  const openReviewDialog = async () => {
    if (!loggedIn) {
      setLocation('/login');
      return;
    }
    setFetchingBookings(true);
    setReviewDialog({ open: true, bookingId: null });
    try {
      const res = await hotelBookingService.getBookings({ page: 1, limit: 50 });
      const data = res.data || res;
      const allBookings = Array.isArray(data) ? data : [];
      const hotelId = params.id || hotel.hotelId || hotel.id || hotel._id;
      const matching = allBookings.filter(
        (b) => (b.hotelId || b.hotel?.hotelId || b.hotel_id) === hotelId
      );
      setCompletedBookings(matching);
    } catch {
      setCompletedBookings([]);
    } finally {
      setFetchingBookings(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!reviewForm.rating) {
      toast.error('Please select a rating');
      return;
    }
    if (!reviewDialog.bookingId) {
      toast.error('Please select a booking');
      return;
    }
    setSubmitting(true);
    try {
      const { rating, title, comment, categories } = reviewForm;
      const cats = {};
      ['roomCleanliness', 'staffService', 'amenities', 'valueForMoney', 'location'].forEach((key) => {
        if (categories[key]) cats[key] = categories[key];
      });
      const hotelId = params.id || hotel.hotelId || hotel.id || hotel._id;
      await reviewService.createHotelReview(
        reviewDialog.bookingId, rating, title || undefined, comment || undefined,
        Object.keys(cats).length > 0 ? cats : undefined, hotelId
      );
      toast.success('Review submitted successfully');
      setReviewDialog({ open: false, bookingId: null });
      fetchReviews(params.id);
    } catch (error) {
      toast.error(formatServerError(error.response?.data) || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <LoadingSkeleton count={1} type="card" />
        </div>
      </>
    );
  }

  if (!hotel) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <p className="text-gray-500">Hotel not found</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

          {/* Header */}
          <Card className="shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 text-white">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center text-4xl font-bold text-purple-600 shadow-md">
                  <Building className="w-10 h-10" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{hotel.hotelName}</h1>
                  <p className="text-purple-100 mt-1 flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> {hotel.location || `${hotel.city}, ${hotel.state}, ${hotel.country}`}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    {hotel.verified && (
                      <Badge className="bg-emerald-500 text-white border-0">
                        <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Verified
                      </Badge>
                    )}
                    {hotel.rating && (
                      <span className="flex items-center gap-1 text-yellow-200">
                        <Star className="w-4 h-4 fill-yellow-200" /> {hotel.rating.toFixed(1)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Main info */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-2">About</h2>
                    <p className="text-gray-600">{hotel.description || 'No description available.'}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-3">
                      <h3 className="font-semibold text-gray-900">Address</h3>
                      <p className="text-gray-600">{hotel.address}<br />{hotel.city}, {hotel.state} {hotel.postalCode}<br />{hotel.country}</p>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-semibold text-gray-900">Contact</h3>
                      <p className="text-gray-600 space-y-1">
                        {hotel.email && <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {hotel.email}</span>}
                        {hotel.phone && <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {hotel.phone}</span>}
                        {hotel.website && <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" /> {hotel.website}</span>}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Check-in / Check-out</h3>
                    <div className="flex gap-4 text-sm">
                      <Badge variant="outline" className="text-xs">
                        <Clock className="w-3 h-3 mr-1" /> Check-in: {hotel.checkInTime || '14:00'}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <Clock className="w-3 h-3 mr-1" /> Check-out: {hotel.checkOutTime || '11:00'}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Amenities</h3>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(hotel.amenities) && hotel.amenities.length > 0
                        ? hotel.amenities.map((a) => <Badge key={a} variant="secondary"><Wifi className="w-3 h-3 mr-1" />{a}</Badge>)
                        : <span className="text-gray-400 text-sm">Not specified</span>}
                    </div>
                  </div>

                  {hotel.licenseNumber && (
                    <div className="text-xs text-gray-400">
                      License: {hotel.licenseNumber}
                      {hotel.licenseExpiry && ` (expires ${new Date(hotel.licenseExpiry).toLocaleDateString()})`}
                    </div>
                  )}
                </div>

                {/* Right: Stats sidebar */}
                <div className="space-y-4">
                  <Card className="bg-gray-50 border-0">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Total Rooms</span>
                        <span className="font-bold">{hotel.totalRooms ?? 0}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Available</span>
                        <span className="font-bold text-emerald-600">{hotel.availableRooms ?? 0}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Total Bookings</span>
                        <span className="font-bold">{hotel.totalBookings ?? 0}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Revenue</span>
                        <span className="font-bold text-primary">${(hotel.totalRevenue ?? 0).toLocaleString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rooms Section */}
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Bed className="w-5 h-5" /> Rooms ({hotel.rooms?.length || 0})
              </h2>

              {Array.isArray(hotel.rooms) && hotel.rooms.length > 0 ? (
                <div className="space-y-4">
                  {hotel.rooms.map((room, idx) => (
                    <Card key={room.roomNumber || idx} className={`border ${room.available ? 'border-slate-200' : 'border-red-200 bg-red-50'}`}>
                      <CardContent className="p-5">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-gray-900">{room.roomType} - Room {room.roomNumber}</h3>
                              {room.available
                                ? <Badge className="bg-emerald-100 text-emerald-700 border-0 text-xs">Available</Badge>
                                : <Badge className="bg-red-100 text-red-700 border-0 text-xs">Unavailable</Badge>}
                            </div>
                            <p className="text-sm text-gray-500">{room.description || `Capacity: ${room.capacity} guests`}</p>
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                              <span className="flex items-center gap-1"><Users className="w-3 h-3" /> Up to {room.capacity} guests</span>
                            </div>
                          </div>
                          <div className="text-right flex flex-row md:flex-col items-center md:items-end gap-3">
                            <div>
                              <span className="text-2xl font-extrabold text-gray-900">LKR {room.pricePerNight?.toLocaleString()}</span>
                              <span className="text-xs text-gray-500"> /night</span>
                            </div>
                            <Button
                              size="sm"
                              className="bg-primary hover:bg-primary/90 text-white"
                              disabled={!room.available}
                              onClick={() => setLocation(`/bookings/hotel/create?hotelId=${hotel.hotelId}&roomId=${room.roomNumber}`)}
                            >
                              {room.available ? 'Book Now' : 'Unavailable'}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">No room information available.</p>
              )}
            </CardContent>
          </Card>

          {/* Reviews Section */}
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" /> Reviews ({reviews.length})
                </h2>
                <Button
                  size="sm"
                  className="bg-amber-500 hover:bg-amber-600 text-white"
                  onClick={openReviewDialog}
                >
                  <StarIcon className="w-4 h-4 mr-1" /> Write a Review
                </Button>
              </div>

              {reviewsLoading ? (
                <div className="space-y-3">
                  <LoadingSkeleton count={3} type="list" />
                </div>
              ) : reviews.length > 0 ? (
                <div className="space-y-3">
                  {reviews.map((review) => (
                    <ReviewCard key={review.id || review._id} review={review} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={MessageSquare}
                  title="No Reviews Yet"
                  description="This hotel hasn't received any reviews yet."
                />
              )}
            </CardContent>
          </Card>

        </div>
      </div>

      {/* Review Dialog */}
      <Dialog open={reviewDialog.open} onOpenChange={(open) => setReviewDialog(prev => ({ ...prev, open }))}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Write a Review</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {fetchingBookings ? (
              <p className="text-sm text-gray-500 text-center py-4">Loading your bookings...</p>
            ) : completedBookings.length === 0 ? (
              <div className="text-center py-4 space-y-2">
                <p className="text-sm text-gray-500">You need to have a booking at this hotel before reviewing.</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setReviewDialog({ open: false, bookingId: null });
                    setLocation(`/bookings/hotel/create?hotelId=${hotel.id || hotel._id || hotel.hotelId}`);
                  }}
                >
                  Book This Hotel
                </Button>
              </div>
            ) : (
              <>
                <div className="space-y-1.5">
                  <Label>Select Booking</Label>
                  <select
                    className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                    value={reviewDialog.bookingId || ''}
                    onChange={(e) => setReviewDialog(prev => ({ ...prev, bookingId: e.target.value }))}
                  >
                    <option value="">Choose a completed booking...</option>
                    {completedBookings.map((b) => (
                      <option key={b.id || b._id} value={b.id || b._id}>
                        {b.checkInDate || b.date} — {b.hotelName || ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <Label>Rating *</Label>
                  <Rating
                    rating={reviewForm.rating}
                    size="lg"
                    interactive
                    onRatingChange={(val) => setReviewForm(prev => ({ ...prev, rating: val }))}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="review-title">Title</Label>
                  <Input
                    id="review-title"
                    placeholder="Summarize your experience"
                    value={reviewForm.title}
                    onChange={(e) => setReviewForm(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="review-comment">Comment</Label>
                  <Textarea
                    id="review-comment"
                    placeholder="Tell others about your experience"
                    rows={3}
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Detailed Ratings (optional)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { key: 'roomCleanliness', label: 'Room Cleanliness' },
                      { key: 'staffService', label: 'Staff Service' },
                      { key: 'amenities', label: 'Amenities' },
                      { key: 'valueForMoney', label: 'Value for Money' },
                      { key: 'location', label: 'Location' },
                    ].map(({ key, label }) => (
                      <div key={key} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                        <span className="text-sm text-gray-700">{label}</span>
                        <Rating
                          rating={reviewForm.categories[key] || 0}
                          size="sm"
                          interactive
                          onRatingChange={(val) => setReviewForm(prev => ({
                            ...prev,
                            categories: { ...prev.categories, [key]: val },
                          }))}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setReviewDialog({ open: false, bookingId: null })}
                    disabled={submitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-primary hover:bg-primary/90 text-white"
                    onClick={handleSubmitReview}
                    disabled={submitting || !reviewForm.rating || !reviewDialog.bookingId}
                  >
                    {submitting ? 'Submitting...' : 'Submit Review'}
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}