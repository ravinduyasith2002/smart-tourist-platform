/**
 * SmartTouristPlatform - Tourist Dashboard Page\n */

import { useLocation } from 'wouter';
import { Plus, MapPin, Users, DollarSign, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/shared/StatCard';
import { TripCard } from '@/components/shared/TripCard';
import { ROUTES } from '@/config/routes';
import { Trip, TripStatus } from '@/types/common';

// Mock data
const mockTrips: Trip[] = [
  {
    id: '1',
    touristId: '1',
    title: 'Sri Lanka Adventure',
    description: 'Explore the beautiful island of Sri Lanka with local guides',
    startDate: '2024-07-15',
    endDate: '2024-07-22',
    duration: 7,
    destinations: ['Colombo', 'Kandy', 'Nuwara Eliya'],
    status: 'booked' as TripStatus,
    itinerary: [],
    guideBookings: [],
    hotelBookings: [],
    totalBudget: 5000,
    totalSpent: 3200,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    touristId: '1',
    title: 'Thailand Beach Tour',
    description: 'Relax on pristine beaches and explore local culture',
    startDate: '2024-08-01',
    endDate: '2024-08-08',
    duration: 7,
    destinations: ['Bangkok', 'Phuket', 'Krabi'],
    status: 'planning' as TripStatus,
    itinerary: [],
    guideBookings: [],
    hotelBookings: [],
    totalBudget: 4000,
    totalSpent: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function TouristDashboard() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, Traveler!</h1>
              <p className="text-muted-foreground">Plan your next adventure and explore the world</p>
            </div>
            <Button
              onClick={() => navigate(ROUTES.TOURIST_CREATE_TRIP)}
              className="bg-primary hover:bg-primary/90 text-white cta-button"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Trip
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            icon={MapPin}
            label="Trips Completed"
            value="3"
            trend={{ value: 100, isPositive: true }}
            color="primary"
          />
          <StatCard
            icon={Calendar}
            label="Upcoming Trips"
            value="2"
            color="secondary"
          />
          <StatCard
            icon={Users}
            label="Guides Booked"
            value="8"
            trend={{ value: 25, isPositive: true }}
            color="green"
          />
          <StatCard
            icon={DollarSign}
            label="Total Spent"
            value="$12,450"
            trend={{ value: 15, isPositive: false }}
            color="yellow"
          />
        </div>

        {/* Trips Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Your Trips</h2>
            <Button
              variant="outline"
              onClick={() => navigate(ROUTES.TOURIST_TRIPS)}
            >
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockTrips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                onEdit={() => navigate(`/tourist/trips/${trip.id}/edit`)}
                onView={() => navigate(`/tourist/trips/${trip.id}`)}
              />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => navigate(ROUTES.TOURIST_GUIDES)}
              className="p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-all text-left"
            >
              <Users className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-foreground mb-1">Find Guides</h3>
              <p className="text-sm text-muted-foreground">Browse verified tour guides</p>
            </button>
            <button
              onClick={() => navigate(ROUTES.TOURIST_HOTELS)}
              className="p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-all text-left"
            >
              <MapPin className="w-8 h-8 text-secondary mb-3" />
              <h3 className="font-semibold text-foreground mb-1">Book Hotels</h3>
              <p className="text-sm text-muted-foreground">Find accommodations</p>
            </button>
            <button
              onClick={() => navigate(ROUTES.TOURIST_BOOKINGS)}
              className="p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-all text-left"
            >
              <Calendar className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-semibold text-foreground mb-1">My Bookings</h3>
              <p className="text-sm text-muted-foreground">View all your bookings</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
