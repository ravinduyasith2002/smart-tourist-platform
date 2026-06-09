/**\n * SmartTouristPlatform - Hotels Listing Page\n */

import { useState } from 'react';
import { Search, Filter, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { HotelCard } from '@/components/shared/HotelCard';
import { Hotel } from '@/types/common';
import { toast } from 'sonner';

// Mock data
const mockHotels: Hotel[] = [
  {
    id: '1',
    email: 'contact@luxehotel.com',
    name: 'Luxe Mountain Resort',
    avatar: undefined,
    role: 'hotel' as const as any,
    address: '123 Mountain Road',
    city: 'Kandy',
    country: 'Sri Lanka',
    rating: 4.8,
    reviewCount: 156,
    rooms: [
      {
        id: 'r1',
        hotelId: '1',
        name: 'Deluxe Room',
        capacity: 2,
        pricePerNight: 120,
        amenities: ['WiFi', 'AC', 'TV'],
        images: [],
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'info@beachhotel.com',
    name: 'Tropical Beach Hotel',
    avatar: undefined,
    role: 'hotel' as const as any,
    address: '456 Beach Street',
    city: 'Colombo',
    country: 'Sri Lanka',
    rating: 4.6,
    reviewCount: 203,
    rooms: [
      {
        id: 'r2',
        hotelId: '2',
        name: 'Ocean View Room',
        capacity: 2,
        pricePerNight: 150,
        amenities: ['WiFi', 'AC', 'Balcony'],
        images: [],
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    email: 'reservations@cityhotel.com',
    name: 'City Center Hotel',
    avatar: undefined,
    role: 'hotel' as const as any,
    address: '789 Main Street',
    city: 'Bangkok',
    country: 'Thailand',
    rating: 4.7,
    reviewCount: 289,
    rooms: [
      {
        id: 'r3',
        hotelId: '3',
        name: 'Standard Room',
        capacity: 2,
        pricePerNight: 90,
        amenities: ['WiFi', 'AC'],
        images: [],
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    email: 'hello@boutique.com',
    name: 'Boutique Garden Hotel',
    avatar: undefined,
    role: 'hotel' as const as any,
    address: '321 Garden Lane',
    city: 'Nuwara Eliya',
    country: 'Sri Lanka',
    rating: 4.9,
    reviewCount: 127,
    rooms: [
      {
        id: 'r4',
        hotelId: '4',
        name: 'Garden Suite',
        capacity: 3,
        pricePerNight: 180,
        amenities: ['WiFi', 'AC', 'Spa', 'Garden View'],
        images: [],
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function HotelsListing() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [filteredHotels, setFilteredHotels] = useState(mockHotels);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterHotels(query, selectedCity);
  };

  const handleCityFilter = (city: string) => {
    const newCity = selectedCity === city ? null : city;
    setSelectedCity(newCity);
    filterHotels(searchQuery, newCity);
  };

  const filterHotels = (query: string, city: string | null) => {
    let filtered = mockHotels;

    if (query) {
      filtered = filtered.filter(
        (hotel) =>
          hotel.name.toLowerCase().includes(query.toLowerCase()) ||
          hotel.city?.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (city) {
      filtered = filtered.filter((hotel) => hotel.city === city);
    }

    setFilteredHotels(filtered);
  };

  const handleBookHotel = (hotelId: string) => {
    toast.success('Hotel booking initiated!');
  };

  const handleViewDetails = (hotelId: string) => {
    toast.info('Opening hotel details...');
  };

  const cities = Array.from(new Set(mockHotels.map((h) => h.city))).filter(Boolean) as string[];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-secondary/10 to-primary/10 border-b border-border py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-foreground mb-2">Find Your Perfect Stay</h1>
          <p className="text-muted-foreground">Browse and book hotels worldwide</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Search and Filters */}
        <div className="mb-8">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search hotels by name or city..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 h-12"
            />
          </div>

          {/* City Filters */}
          <div className="flex flex-wrap gap-2">
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="w-4 h-4" />
              Cities:
            </span>
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => handleCityFilter(city)}
                className={`px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                  selectedCity === city
                    ? 'bg-secondary text-white'
                    : 'bg-accent text-foreground hover:bg-muted'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredHotels.length} hotel{filteredHotels.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Hotels Grid */}
        {filteredHotels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                onBook={() => handleBookHotel(hotel.id)}
                onViewDetails={() => handleViewDetails(hotel.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No hotels found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
