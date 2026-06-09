/**
 * SmartTouristPlatform - TripCard Component
 * Reusable card for displaying trip information
 */

import { Calendar, MapPin, Users, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trip, TripStatus } from '@/types/common';
import { formatDate, formatCurrency, enumToReadable } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface TripCardProps {
  trip: Trip;
  onEdit?: () => void;
  onView?: () => void;
}

const statusColors: Record<TripStatus, string> = {
  draft: 'bg-muted text-muted-foreground',
  planning: 'bg-blue-100 text-blue-800',
  booked: 'bg-green-100 text-green-800',
  in_progress: 'bg-purple-100 text-purple-800',
  completed: 'bg-gray-100 text-gray-800',
  cancelled: 'bg-red-100 text-red-800',
};

export function TripCard({ trip, onEdit, onView }: TripCardProps) {
  return (
    <div className="card-hover bg-card rounded-lg overflow-hidden border border-border shadow-sm">
      {/* Header */}
      <div className="p-4 pb-0">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-foreground text-lg">{trip.title}</h3>
          <Badge className={cn(statusColors[trip.status as TripStatus])}>
            {enumToReadable(trip.status)}
          </Badge>
        </div>
        {trip.description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {trip.description}
          </p>
        )}
      </div>

      {/* Details */}
      <div className="p-4 space-y-3">
        {/* Destinations */}
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">Destinations</p>
            <p className="text-sm font-medium text-foreground">
              {trip.destinations.join(', ')}
            </p>
          </div>
        </div>

        {/* Dates */}
        <div className="flex items-start gap-2">
          <Calendar className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">Dates</p>
            <p className="text-sm font-medium text-foreground">
              {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {trip.duration} days
            </p>
          </div>
        </div>

        {/* Bookings */}
        <div className="flex items-start gap-2">
          <Users className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">Bookings</p>
            <p className="text-sm font-medium text-foreground">
              {trip.guideBookings?.length || 0} guides, {trip.hotelBookings?.length || 0} hotels
            </p>
          </div>
        </div>

        {/* Budget */}
        {trip.totalBudget && (
          <div className="flex items-start gap-2">
            <DollarSign className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Budget</p>
              <p className="text-sm font-medium text-foreground">
                {formatCurrency(trip.totalSpent || 0)} / {formatCurrency(trip.totalBudget)}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-4 pt-0 flex gap-2">
        <Button
          variant="outline"
          className="flex-1"
          onClick={onView}
        >
          View Itinerary
        </Button>
        {trip.status === 'draft' || trip.status === 'planning' ? (
          <Button
            className="flex-1 bg-primary hover:bg-primary/90 text-white"
            onClick={onEdit}
          >
            Edit
          </Button>
        ) : null}
      </div>
    </div>
  );
}
