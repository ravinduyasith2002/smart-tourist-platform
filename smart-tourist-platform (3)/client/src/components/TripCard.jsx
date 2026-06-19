import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import { MapPin, Calendar, DollarSign } from "lucide-react";
import { formatDate, calculateDuration, formatCurrency } from "@/utils/helpers";

export const TripCard = ({
  trip,
  onViewDetails,
  onEdit,
}) => {
  const status = trip?.status || 'PLANNING';
  const visibility = trip?.isPublic != null
    ? (trip.isPublic ? 'public' : 'private')
    : (trip?.visibility || 'public');
  const duration = calculateDuration(trip?.startDate, trip?.endDate);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-lg text-gray-900">{trip?.title || 'Untitled Trip'}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{trip?.description || ''}</p>
          </div>
          <StatusBadge status={status} />
        </div>

        {/* Trip Details */}
        <div className="space-y-3 mb-4">
          {/* Duration */}
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Calendar className="w-4 h-4 text-primary" />
            <span>
              {formatDate(trip?.startDate)} - {formatDate(trip?.endDate)}
            </span>
            <span className="text-gray-500">({duration} days)</span>
          </div>

          {/* Budget */}
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <DollarSign className="w-4 h-4 text-green-600" />
            <span>
              Budget: {formatCurrency(trip?.budget, trip?.currency)}
            </span>
          </div>

          {/* Visibility */}
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <MapPin className="w-4 h-4 text-red-600" />
            <span className="capitalize">{visibility} Trip</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onViewDetails?.(trip?.id || trip?._id)}
          >
            View Details
          </Button>
          <Button
            className="flex-1 bg-primary hover:bg-primary/90 text-white"
            onClick={() => onEdit?.(trip?.id || trip?._id)}
          >
            Edit Trip
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
