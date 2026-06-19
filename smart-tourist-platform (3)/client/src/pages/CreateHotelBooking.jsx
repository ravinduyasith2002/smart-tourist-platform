import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { hotelBookingService } from "@/services/hotelBooking.service";
import { hotelService } from "@/services/hotel.service";
import { tripService } from "@/services/trip.service";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { useLocation, useSearch } from "wouter";
import { formatServerError } from "@/utils/helpers";

export default function CreateHotelBooking() {
  const [, setLocation] = useLocation();
  const search = useSearch();
  const params = new URLSearchParams(search);
  const hotelId = params.get("hotelId");
  const roomIdParam = params.get("roomId");
  const [loading, setLoading] = useState(false);
  const [trips, setTrips] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({
    hotelId: hotelId || "",
    roomId: roomIdParam || "",
    tripId: "",
    checkInDate: "",
    checkOutDate: "",
    numberOfGuests: 1,
    specialRequests: "",
  });

  useEffect(() => {
    fetchTrips();
  }, []);

  useEffect(() => {
    if (formData.hotelId) fetchRooms(formData.hotelId);
    else setRooms([]);
  }, [formData.hotelId]);

  const fetchTrips = async () => {
    try {
      const result = await tripService.getTrips({ page: 1, limit: 50 });
      setTrips(Array.isArray(result) ? result : result?.data || []);
    } catch {
      // trips are optional
    }
  };

  const fetchRooms = async (id) => {
    try {
      const res = await hotelService.getHotelById(id);
      const d = res.data || res;
      if (Array.isArray(d.rooms)) setRooms(d.rooms);
    } catch {
      // rooms are optional
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.hotelId || !formData.checkInDate || !formData.checkOutDate) {
      toast.error("Please fill in all required fields");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        hotelId: formData.hotelId,
        checkInDate: formData.checkInDate,
        checkOutDate: formData.checkOutDate,
        numberOfGuests: Number(formData.numberOfGuests),
      };
      if (formData.roomId) payload.roomId = formData.roomId;
      if (formData.tripId) payload.tripId = formData.tripId;
      if (formData.specialRequests) payload.specialRequests = formData.specialRequests;
      console.log('hotel booking payload:', payload);
      await hotelBookingService.createBooking(
        payload.hotelId, payload.roomId, payload.tripId,
        payload.checkInDate, payload.checkOutDate,
        payload.numberOfGuests, payload.specialRequests
      );
      toast.success("Hotel booked successfully!");
      setLocation("/bookings");
    } catch (error) {
      const serverData = error.response?.data;
      console.error('Booking error:', serverData);
      toast.error(formatServerError(serverData) || "Failed to book hotel");
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
              <CardTitle className="text-2xl">Book a Hotel</CardTitle>
              <CardDescription>Reserve your accommodation</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hotelId">Hotel ID *</Label>
                  <Input id="hotelId" name="hotelId" value={formData.hotelId} onChange={handleChange} disabled={!!hotelId} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="roomId">Room</Label>
                  <select
                    id="roomId"
                    name="roomId"
                    value={formData.roomId}
                    onChange={handleChange}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring appearance-none cursor-pointer"
                  >
                    <option value="">-- Select a room --</option>
                    {rooms.map((room, idx) => (
                      <option key={room.roomNumber || idx} value={room.roomNumber || room.roomId}>
                        {room.roomType} {room.roomNumber} — LKR {room.pricePerNight?.toLocaleString()}/night {room.available ? '' : '(unavailable)'}
                      </option>
                    ))}
                  </select>
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="checkInDate">Check-In Date *</Label>
                    <Input id="checkInDate" name="checkInDate" type="date" value={formData.checkInDate} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="checkOutDate">Check-Out Date *</Label>
                    <Input id="checkOutDate" name="checkOutDate" type="date" value={formData.checkOutDate} onChange={handleChange} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="numberOfGuests">Number of Guests</Label>
                  <Input id="numberOfGuests" name="numberOfGuests" type="number" min="1" value={formData.numberOfGuests} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialRequests">Special Requests</Label>
                  <Textarea id="specialRequests" name="specialRequests" value={formData.specialRequests} onChange={handleChange} />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-white" disabled={loading}>
                    {loading ? "Booking..." : "Confirm Booking"}
                  </Button>
                  <Button type="button" variant="outline" className="flex-1" onClick={() => setLocation("/hotels")} disabled={loading}>
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