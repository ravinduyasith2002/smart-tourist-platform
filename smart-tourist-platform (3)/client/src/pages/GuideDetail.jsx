import { useRoute, useLocation } from 'wouter';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { guideService } from '@/services/guide.service';
import { guideBookingService } from '@/services/guideBooking.service';
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
import { ShieldCheck, Clock, Star, Award, DollarSign, BookOpen, Globe, Mail, Phone, MessageSquare, Star as StarIcon } from 'lucide-react';

export default function GuideDetail() {
  const [, params] = useRoute('/guides/:id');
  const [, setLocation] = useLocation();
  const [guide, setGuide] = useState(null);
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
      fetchGuide(params.id);
      fetchReviews(params.id);
    }
  }, [params?.id]);

  const fetchGuide = async (id) => {
    setLoading(true);
    try {
      const res = await guideService.getGuideById(id);
      const d = res.data || res;
      setGuide(d);
    } catch (error) {
      toast.error('Failed to load guide details');
      setLocation('/guides');
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async (id) => {
    setReviewsLoading(true);
    try {
      const res = await reviewService.getGuideReviewsByGuide(id);
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
      const res = await guideBookingService.getBookings({ page: 1, limit: 50 });
      const data = res.data || res;
      const allBookings = Array.isArray(data) ? data : [];
      const guideId = params.id || guide.guideId || guide.id || guide._id;
      const matching = allBookings.filter(
        (b) => (b.guideId || b.guide?.guideId || b.guide_id) === guideId
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
      ['knowledge', 'communication', 'punctuality', 'friendliness'].forEach((key) => {
        if (categories[key]) cats[key] = categories[key];
      });
      const guideId = params.id || guide.guideId || guide.id || guide._id;
      await reviewService.createGuideReview(
        reviewDialog.bookingId, rating, title || undefined, comment || undefined,
        Object.keys(cats).length > 0 ? cats : undefined, guideId
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

  if (!guide) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <p className="text-gray-500">Guide not found</p>
        </div>
      </>
    );
  }

  const name = guide.name || guide.email?.split('@')[0] || 'Unknown Guide';
  const languages = Array.isArray(guide.languages)
    ? guide.languages.map((l) => (typeof l === 'string' ? l : l.language || ''))
    : [];
  const specializations = Array.isArray(guide.specializations)
    ? guide.specializations.map((s) => (typeof s === 'string' ? s : s.name || ''))
    : [];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-8 text-white">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-4xl font-bold text-primary shadow-md">
                  {name.charAt(0)}
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{name}</h1>
                  <p className="text-blue-100 mt-1">{guide.email}</p>
                  <div className="flex items-center gap-3 mt-2">
                    {guide.verified && (
                      <Badge className="bg-emerald-500 text-white border-0">
                        <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Verified
                      </Badge>
                    )}
                    {guide.bankAccountVerified && (
                      <Badge className="bg-blue-400 text-white border-0">Bank Verified</Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-2">About</h2>
                    <p className="text-gray-600">{guide.bio || 'No bio available.'}</p>
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-2">Specializations</h2>
                    <div className="flex flex-wrap gap-2">
                      {specializations.length > 0
                        ? specializations.map((s) => (
                            <Badge key={s} variant="secondary">{s}</Badge>
                          ))
                        : <span className="text-gray-400 text-sm">General Sightseeing</span>}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-2">Languages</h2>
                    <div className="flex flex-wrap gap-2">
                      {languages.map((lang) => (
                        <Badge key={lang} variant="outline">{lang}</Badge>
                      ))}
                    </div>
                  </div>

                  {guide.certifications?.length > 0 && (
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 mb-2">Certifications</h2>
                      <div className="space-y-2">
                        {guide.certifications.map((cert, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                            <Award className="w-4 h-4 text-amber-500" />
                            <span>{typeof cert === 'string' ? cert : cert.name || cert.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <Card className="bg-gray-50 border-0">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Rating</span>
                        <span className="font-bold flex items-center gap-1">
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                          {guide.rating?.toFixed(1) || '5.0'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Experience</span>
                        <span className="font-bold">{guide.experienceYears} Years</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Bookings</span>
                        <span className="font-bold">{guide.totalBookings ?? 0}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Completed</span>
                        <span className="font-bold text-emerald-600">{guide.completedBookings ?? 0}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Cancellation Rate</span>
                        <span className="font-bold text-red-500">{guide.cancellationRate ?? 0}%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Response</span>
                        <span className="font-bold flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-amber-500" />
                          ~{guide.responseTimeMins ?? 45} min
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Total Earnings</span>
                        <span className="font-bold text-primary">${(guide.totalEarnings ?? 0).toLocaleString()}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-primary/5 border-primary/10">
                    <CardContent className="p-4 space-y-2">
                      <div className="text-center">
                        <p className="text-xs text-gray-500 uppercase">Hourly Rate</p>
                        <p className="text-3xl font-extrabold text-gray-900">${guide.hourlyRate ?? 0}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500 uppercase">Daily Rate</p>
                        <p className="text-lg font-bold text-gray-700">${guide.dailyRate ?? 0}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                    size="lg"
                    onClick={() => setLocation(`/bookings/guide/create?guideId=${guide.guideId}`)}
                  >
                    Book This Guide
                  </Button>
                </div>
              </div>
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
                  description="This guide hasn't received any reviews yet."
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
                <p className="text-sm text-gray-500">You need to have a booking with this guide before reviewing.</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setReviewDialog({ open: false, bookingId: null });
                    setLocation(`/bookings/guide/create?guideId=${guide.id || guide._id || guide.guideId}`);
                  }}
                >
                  Book This Guide
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
                        {b.bookingDate || b.date} — {b.location || ''}
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
                      { key: 'knowledge', label: 'Knowledge' },
                      { key: 'communication', label: 'Communication' },
                      { key: 'punctuality', label: 'Punctuality' },
                      { key: 'friendliness', label: 'Friendliness' },
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