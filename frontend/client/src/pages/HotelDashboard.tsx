/**
 * SmartTouristPlatform - Hotel Dashboard Page
 */

import { Calendar, DollarSign, Star, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/shared/StatCard';
import { Badge } from '@/components/ui/badge';

export default function HotelDashboard() {
  const pendingBookings = [
    {
      id: '1',
      guestName: 'Alice Johnson',
      room: 'Deluxe Room 101',
      checkIn: '2024-07-15',
      checkOut: '2024-07-18',
      nights: 3,
      totalPrice: 360,
      status: 'pending',
    },
    {
      id: '2',
      guestName: 'Bob Smith',
      room: 'Ocean View 205',
      checkIn: '2024-07-16',
      checkOut: '2024-07-20',
      nights: 4,
      totalPrice: 600,
      status: 'pending',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-secondary/10 to-primary/10 border-b border-border py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-foreground mb-2">Hotel Dashboard</h1>
          <p className="text-muted-foreground">Manage your bookings and occupancy</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            icon={Calendar}
            label="Total Bookings"
            value="48"
            trend={{ value: 15, isPositive: true }}
            color="primary"
          />
          <StatCard
            icon={Home}
            label="Occupancy Rate"
            value="85%"
            trend={{ value: 5, isPositive: true }}
            color="secondary"
          />
          <StatCard
            icon={DollarSign}
            label="Monthly Revenue"
            value="$8,950"
            trend={{ value: 12, isPositive: true }}
            color="green"
          />
          <StatCard
            icon={Star}
            label="Average Rating"
            value="4.6"
            color="yellow"
          />
        </div>

        {/* Pending Bookings */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Pending Booking Confirmations</h2>
          <div className="space-y-4">
            {pendingBookings.map((booking) => (
              <div key={booking.id} className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2">{booking.guestName}</h3>
                    <div className="grid grid-cols-4 gap-4 text-sm text-muted-foreground mb-3">
                      <div>
                        <span className="text-xs">Room</span>
                        <p className="font-medium text-foreground">{booking.room}</p>
                      </div>
                      <div>
                        <span className="text-xs">Check-in</span>
                        <p className="font-medium text-foreground">{booking.checkIn}</p>
                      </div>
                      <div>
                        <span className="text-xs">Nights</span>
                        <p className="font-medium text-foreground">{booking.nights} nights</p>
                      </div>
                      <div>
                        <span className="text-xs">Total Price</span>
                        <p className="font-medium text-foreground">${booking.totalPrice}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="text-destructive hover:bg-destructive/10">
                      Reject
                    </Button>
                    <Button className="bg-secondary hover:bg-secondary/90 text-white">
                      Confirm
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Room Occupancy */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Room Occupancy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Deluxe Room', 'Ocean View', 'Standard Room'].map((room, idx) => (
              <div key={idx} className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-4">{room}</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Occupancy</span>
                    <span className="font-bold text-primary">75%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>3 booked</span>
                    <span>1 available</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reviews */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Recent Guest Reviews</h2>
          <div className="space-y-4">
            {[1, 2].map((idx) => (
              <div key={idx} className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground">Guest Name</h3>
                    <p className="text-sm text-muted-foreground">Room 101 • 3 days ago</p>
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
                  "Beautiful hotel with excellent service. The staff was very helpful and friendly!"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
