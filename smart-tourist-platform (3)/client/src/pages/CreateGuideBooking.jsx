import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { guideBookingService } from "@/services/guideBooking.service";
import { tripService } from "@/services/trip.service";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { useLocation, useSearch } from "wouter";
import { formatServerError } from "@/utils/helpers";

export default function CreateGuideBooking() {
  const [, setLocation] = useLocation();
  const search = useSearch();
  const params = new URLSearchParams(search);
  const guideId = params.get("guideId");
  const [loading, setLoading] = useState(false);
  const [trips, setTrips] = useState([]);
  const [formData, setFormData] = useState({
    guideId: guideId || "",
    tripId: "",
    bookingDate: "",
    startTime: "",
    endTime: "",
    durationHours: 4,
    location: "",
    specialization: "",
    specialRequests: "",
  });

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const result = await tripService.getTrips({ page: 1, limit: 50 });
      setTrips(Array.isArray(result) ? result : result?.data || []);
    } catch {
      // trips are optional, silently fail
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.guideId || !formData.bookingDate || !formData.startTime || !formData.endTime || !formData.location) {
      toast.error("Please fill in all required fields (guide, date, start/end time, location)");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        guideId: formData.guideId,
        bookingDate: formData.bookingDate,
        startTime: formData.startTime,
        endTime: formData.endTime,
        durationHours: Number(formData.durationHours),
        location: formData.location,
      };
      if (formData.tripId) payload.tripId = formData.tripId;
      if (formData.specialization) payload.specialization = formData.specialization;
      if (formData.specialRequests) payload.specialRequests = formData.specialRequests;
      console.log('guide booking payload:', payload);
      await guideBookingService.createBooking(
        payload.guideId, payload.tripId, payload.bookingDate,
        payload.startTime, payload.endTime, payload.durationHours,
        payload.location, payload.specialization, payload.specialRequests
      );
      toast.success("Guide booked successfully!");
      setLocation("/bookings");
    } catch (error) {
      const serverData = error.response?.data;
      console.error('Booking error:', serverData);
      toast.error(formatServerError(serverData) || "Failed to book guide.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Book a Guide</CardTitle>
              <CardDescription>Reserve an expert guide for your trip</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="guideId">Guide ID *</Label>
                  <Input id="guideId" name="guideId" value={formData.guideId} onChange={handleChange} disabled={!!guideId} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tripId">Link to Trip (optional)</Label>
                  <select
                    id="tripId"
                    name="tripId"
                    value={formData.tripId}
                    onChange={handleChange}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring appearance-none cursor-pointer"
                  >
                    <option value="">-- No trip linked --</option>
                    {trips.map((trip) => (
                      <option key={trip.id || trip._id} value={trip.id || trip._id}>
                        {trip.title || trip.name || trip.id || trip._id}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bookingDate">Booking Date *</Label>
                  <Input id="bookingDate" name="bookingDate" type="date" value={formData.bookingDate} onChange={handleChange} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time *</Label>
                    <Input id="startTime" name="startTime" type="time" value={formData.startTime} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime">End Time *</Label>
                    <Input id="endTime" name="endTime" type="time" value={formData.endTime} onChange={handleChange} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="durationHours">Duration (hours)</Label>
                  <Input id="durationHours" name="durationHours" type="number" min="1" value={formData.durationHours} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input id="location" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Kandy" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialization">Specialization</Label>
                  <Input id="specialization" name="specialization" value={formData.specialization} onChange={handleChange} placeholder="e.g. Cultural Tours" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialRequests">Special Requests</Label>
                  <Textarea id="specialRequests" name="specialRequests" value={formData.specialRequests} onChange={handleChange} />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-white" disabled={loading}>
                    {loading ? "Booking..." : "Confirm Booking"}
                  </Button>
                  <Button type="button" variant="outline" className="flex-1" onClick={() => setLocation("/guides")} disabled={loading}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}