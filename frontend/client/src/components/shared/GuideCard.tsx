/**
 * SmartTouristPlatform - GuideCard Component
 * Reusable card for displaying guide information
 */

import { Star, MapPin, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Guide } from '@/types/common';
import { cn } from '@/lib/utils';

interface GuideCardProps {
  guide: Guide;
  onBook?: () => void;
  onViewDetails?: () => void;
}

export function GuideCard({ guide, onBook, onViewDetails }: GuideCardProps) {
  return (
    <div className="card-hover bg-card rounded-lg overflow-hidden border border-border shadow-sm">
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {guide.name.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-foreground">{guide.name}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <MapPin className="w-4 h-4" />
              <span>{guide.languages?.join(', ') || 'Multiple languages'}</span>
            </div>
          </div>
          {guide.status === 'approved' && (
            <Badge className="badge-verified">
              <Award className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'w-4 h-4',
                  i < Math.floor(guide.rating || 0)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                )}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-foreground">
            {guide.rating?.toFixed(1) || 'N/A'}
          </span>
          <span className="text-xs text-muted-foreground">
            ({guide.reviewCount || 0} reviews)
          </span>
        </div>

        {/* Specializations */}
        {guide.specializations && guide.specializations.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {guide.specializations.slice(0, 2).map((spec, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {spec}
              </Badge>
            ))}
            {guide.specializations.length > 2 && (
              <Badge variant="secondary" className="text-xs">
                +{guide.specializations.length - 2}
              </Badge>
            )}
          </div>
        )}

        {/* Price */}
        <div className="mb-4 pb-4 border-t border-border pt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Hourly Rate</span>
            <span className="font-bold text-primary">
              ${guide.hourlyRate || 'N/A'}/hr
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
            View Profile
          </Button>
          <Button
            className="flex-1 bg-primary hover:bg-primary/90 text-white"
            onClick={onBook}
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
}
