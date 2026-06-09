/**
 * SmartTouristPlatform - Guide Dashboard Page
 */

import { Calendar, DollarSign, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/shared/StatCard';
import { Badge } from '@/components/ui/badge';

export default function GuideDashboard() {
  const pendingBookings = [
    {
      id: '1',
      touristName: 'John Doe',
      date: '2024-07-15',
      duration: 4,
      location: 'Kandy',
      status: 'pending',
    },
    {
      id: '2',
      touristName: 'Jane Smith',
      date: '2024-07-18',
      duration: 6,
      location: 'Nuwara Eliya',
      status: 'pending',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-foreground mb-2">Guide Dashboard</h1>
          <p className="text-muted-foreground">Manage your bookings and earnings</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            icon={Users}
            label="Total Bookings"
            value="24"
            trend={{ value: 12, isPositive: true }}
            color="primary"
          />
          <StatCard
            icon={Calendar}
            label="Upcoming Tours"
            value="3"
            color="secondary"
          />
          <StatCard
            icon={DollarSign}
            label="Total Earnings"
            value="$2,450"
            trend={{ value: 8, isPositive: true }}
            color="green"
          />
          <StatCard
            icon={Star}
            label="Average Rating"
            value="4.8"
            color="yellow"
          />
        </div>

        {/* Pending Bookings */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Pending Booking Requests</h2>
          <div className="space-y-4">
            {pendingBookings.map((booking) => (
              <div key={booking.id} className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2">{booking.touristName}</h3>
                    <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                      <div>
                        <span className="text-xs">Date</span>
                        <p className="font-medium text-foreground">{booking.date}</p>
                      </div>
                      <div>
                        <span className="text-xs">Duration</span>
                        <p className="font-medium text-foreground">{booking.duration} hours</p>
                      </div>
                      <div>
                        <span className="text-xs">Location</span>
                        <p className="font-medium text-foreground">{booking.location}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="text-destructive hover:bg-destructive/10">
                      Reject
                    </Button>
                    <Button className="bg-primary hover:bg-primary/90 text-white">
                      Accept
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reviews */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Recent Reviews</h2>
          <div className="space-y-4">
            {[1, 2].map((idx) => (
              <div key={idx} className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground">Tourist Name</h3>
                    <p className="text-sm text-muted-foreground">2 days ago</p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-foreground">
                  "Amazing experience! John was very knowledgeable and friendly. Highly recommended!"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
