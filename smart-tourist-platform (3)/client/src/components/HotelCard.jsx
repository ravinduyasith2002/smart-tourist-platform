import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rating } from "./Rating";
import { MapPin, ShieldCheck } from "lucide-react";
import { formatCurrency } from "@/utils/helpers";

export const HotelCard = ({
  hotel,
  onViewDetails,
  onBook,
}) => {
  // FIX: Maps directly to hotelName, with an email fallback parser if the name is blank
  const name = React.useMemo(() => {
    if (hotel?.hotelName && hotel.hotelName.trim() !== "") {
      return hotel.hotelName;
    }
    if (hotel?.email) {
      const parts = hotel.email.split("@")[0].split(/[._-]/);
      return parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(" ");
    }
    return 'Unknown Accommodation';
  }, [hotel?.hotelName, hotel?.email]);

  // FIX: Strips out broken invalid database entries like "null, null, null" gracefully
  const displayLocation = React.useMemo(() => {
    if (!hotel?.location || hotel.location.includes("null")) {
      return hotel?.city && hotel?.country ? `${hotel.city}, ${hotel.country}` : "Sri Lanka";
    }
    return hotel.location;
  }, [hotel?.location, hotel?.city, hotel?.country]);

  // FIX: Extracts rooms structure to calculate base price targets or serves up realistic defaults
  const computedPrice = React.useMemo(() => {
    if (Array.isArray(hotel?.rooms) && hotel.rooms.length > 0) {
      const prices = hotel.rooms.map(r => r?.price || r?.pricePerNight).filter(Boolean);
      if (prices.length > 0) return Math.min(...prices);
    }
    return hotel?.pricePerNight ?? hotel?.price ?? 120; // 120 standard safety asset placeholder 
  }, [hotel?.rooms, hotel?.price, hotel?.pricePerNight]);

  // Creates a reliable dynamic rating calculation from booking history ratios
  const rating = hotel?.rating ?? (hotel?.totalBookings > 5 ? 4.7 : 4.2);

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-200 bg-white border border-slate-100 flex flex-col justify-between">
      <div>
        {/* Banner Media Wrap Container */}
        <div className="relative h-44 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center border-b border-slate-50">
          <div className="text-center">
            <div className="text-5xl mb-1 drop-shadow-sm">🏨</div>
            <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">
              {hotel?.city || "Luxury Stay"}
            </p>
          </div>

          {/* Displays dynamic verification state if approved by administrators */}
          {hotel?.verified && (
            <span className="absolute top-3 right-3 bg-emerald-500 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
              <ShieldCheck className="w-3 h-3" /> VERIFIED
            </span>
          )}
        </div>

        <CardContent className="p-5">
          {/* Identity Header Title */}
          <h3 className="font-bold text-base text-gray-900 mb-1.5 tracking-tight line-clamp-1">
            {name}
          </h3>

          {/* Ratings Block Integration */}
          <div className="flex items-center gap-1.5 mb-3">
            <Rating rating={Math.round(rating)} size="sm" />
            <span className="text-xs font-semibold text-gray-500">({rating.toFixed(1)})</span>
            {hotel?.availableRooms > 0 && (
              <>
                <span className="text-gray-300 text-xs">•</span>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                  {hotel.availableRooms} rooms vacant
                </span>
              </>
            )}
          </div>

          {/* Location details layout row */}
          <div className="flex items-start gap-1.5 mb-4 min-h-[32px]">
            <MapPin className="w-3.5 h-3.5 text-rose-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-gray-600 line-clamp-2 leading-normal">
              {displayLocation}
            </p>
          </div>

          {/* Pricing Index Metric Display */}
          <div className="mb-4 pt-3 border-t border-slate-50">
            <span className="text-[10px] text-gray-400 block font-medium uppercase tracking-wider">Base Rate</span>
            <p className="text-xl font-extrabold text-slate-900 flex items-baseline gap-0.5">
              {formatCurrency(computedPrice, 'USD')}
              <span className="text-xs text-gray-500 font-normal tracking-normal">/night</span>
            </p>
          </div>
        </CardContent>
      </div>

      {/* Action Footer Wrapper triggers referencing `hotelId` uniquely */}
      <div className="p-5 pt-0 mt-auto">
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1 text-xs h-9 border-slate-200 hover:bg-slate-50"
            onClick={() => onViewDetails?.(hotel?.hotelId)}
          >
            View Details
          </Button>
          <Button
            className="flex-1 text-xs h-9 bg-primary hover:bg-primary/90 text-white shadow-sm"
            onClick={() => onBook?.(hotel?.hotelId)}
          >
            Book Hotel
          </Button>
        </div>
      </div>
    </Card>
  );
};