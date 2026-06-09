/**
 * SmartTouristPlatform - HotelCard Component
 * Reusable card for displaying hotel information
 */

import { Star, MapPin, Wifi, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Hotel } from '@/types/common';
import { cn } from '@/lib/utils';

interface HotelCardProps {
  hotel: Hotel;
  onBook?: () => void;
  onViewDetails?: () => void;
}

export function HotelCard({ hotel, onBook, onViewDetails }: HotelCardProps) {
  return (
    <div className="card-hover bg-card rounded-lg overflow-hidden border border-border shadow-sm">
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-secondary/20 to-primary/20 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {hotel.name.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-foreground">{hotel.name}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <MapPin className="w-4 h-4" />
              <span>{hotel.city}, {hotel.country}</span>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'w-4 h-4',
                  i < Math.floor(hotel.rating || 0)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                )}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-foreground">
            {hotel.rating?.toFixed(1) || 'N/A'}
          </span>
          <span className="text-xs text-muted-foreground">
            ({hotel.reviewCount || 0} reviews)
          </span>
        </div>

        {/* Amenities */}
        <div className="flex gap-2 mb-3">
          <Badge variant="secondary" className="text-xs flex items-center gap-1">
            <Wifi className="w-3 h-3" />
            WiFi
          </Badge>
          <Badge variant="secondary" className="text-xs flex items-center gap-1">
            <Utensils className="w-3 h-3" />
            Restaurant
          </Badge>
        </div>

        {/* Price */}
        <div className="mb-4 pb-4 border-t border-border pt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Per Night</span>
            <span className="font-bold text-secondary">
              ${hotel.rooms?.[0]?.pricePerNight || 'N/A'}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onViewDetails}
          >
            View Details
          </Button>
          <Button
            className="flex-1 bg-secondary hover:bg-secondary/90 text-white"
            onClick={onBook}
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
}
