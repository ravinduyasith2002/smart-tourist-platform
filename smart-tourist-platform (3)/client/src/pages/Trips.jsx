import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { tripService } from "@/services/trip.service";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { TripCard } from "@/components/TripCard";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { EmptyState } from "@/components/EmptyState";
import { MapPin } from "lucide-react";
import { useLocation } from "wouter";
import { isAuthenticated as checkAuth } from "@/contexts/AuthContext";

export default function Trips() {
  const [, setLocation] = useLocation();
  const [loggedIn] = useState(checkAuth());
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    setLoading(true);
    try {
      const result = await tripService.getTrips({
        page: 1,
        limit: 12,
      });
      setTrips(Array.isArray(result) ? result : result?.data || []);
    } catch (error) {
      toast.error("Failed to load trips");
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Trips</h1>
              <p className="text-gray-600">Manage and view all your planned adventures</p>
            </div>
            <Button
              className="bg-primary hover:bg-primary/90 text-white"
              onClick={() => setLocation("/trips/create")}
            >
              Create New Trip
            </Button>
          </div>

          {/* Trips Grid */}
          {loading ? (
            <LoadingSkeleton count={6} type="card" />
          ) : trips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {trips.map((trip) => (
                <TripCard
                  key={trip.id || trip._id}
                  trip={trip}
                  onViewDetails={(tripId) => setLocation(`/trips/${tripId}`)}
                  onEdit={(tripId) => setLocation(`/trips/${tripId}/edit`)}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={MapPin}
              title="No Trips Yet"
              description="Start planning your first adventure by creating a new trip"
              actionLabel="Create Trip"
              onAction={() => setLocation("/trips/create")}
            />
          )}
        </div>
      </div>
    </>
  );
}
