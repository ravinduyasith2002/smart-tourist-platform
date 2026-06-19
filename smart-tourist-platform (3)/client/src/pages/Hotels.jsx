import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { hotelService } from "@/services/hotel.service";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { HotelCard } from "@/components/HotelCard";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { EmptyState } from "@/components/EmptyState";
import { Search, Hotel as HotelIcon } from "lucide-react";
import { useLocation } from "wouter";

export default function Hotels() {
  const [, setLocation] = useLocation();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Controls state changes on user confirmation to limit excess re-fetches
  const [filters, setFilters] = useState({
    search: "",
    location: "",
  });

  // Local state properties tracking active typing values 
  const [searchInput, setSearchInput] = useState("");
  const [locationInput, setLocationInput] = useState("");

  useEffect(() => {
    fetchHotels();
  }, [filters]);

  const fetchHotels = async () => {
    setLoading(true);
    try {
      const result = await hotelService.getHotels({
        search: filters.search,
        location: filters.location,
        page: 1,
        limit: 12,
      });
      setHotels(Array.isArray(result) ? result : result?.data || []);
    } catch (error) {
      toast.error("Failed to load hotels");
    } finally {
      setLoading(false);
    }
  };

  // Triggers state filtration when hitting enter or clicking out of input
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setFilters({
        search: searchInput,
        location: locationInput,
      });
    }
  };

  const handleApplyFilters = () => {
    setFilters({
      search: searchInput,
      location: locationInput,
    });
  };

  const handleClearFilters = () => {
    setSearchInput("");
    setLocationInput("");
    setFilters({ search: "", location: "" });
  };

  console.log("hotels ==",hotels);
  

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Description Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Hotels</h1>
            <p className="text-gray-600">Discover and book perfect accommodations for your trip</p>
          </div>

          {/* Filters Interface Panel */}
          <Card className="mb-8 shadow-md border border-slate-100">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div>
                  <Label htmlFor="search" className="text-xs font-semibold text-gray-500 uppercase">Search Hotels</Label>
                  <div className="relative mt-1.5">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="Hotel name or keyword..."
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location" className="text-xs font-semibold text-gray-500 uppercase">Location</Label>
                  <div className="mt-1.5">
                    <Input
                      id="location"
                      placeholder="City or area name..."
                      value={locationInput}
                      onChange={(e) => setLocationInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                  </div>
                </div>

                <div>
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                    onClick={handleApplyFilters}
                  >
                    Apply Filters
                  </Button>
                </div>

                <div>
                  <Button
                    variant="outline"
                    className="w-full border-dashed border-gray-300"
                    onClick={handleClearFilters}
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hotels Card Rendering Grid layout */}
          {loading ? (
            <LoadingSkeleton count={6} type="card" />
          ) : hotels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels.map((hotel) => (
                <HotelCard
                  key={hotel.hotelId} // Syncs directly to unique database identifier property
                  hotel={hotel}
                  onViewDetails={(id) => setLocation(`/hotels/${id}`)}
                  onBook={(id) => setLocation(`/bookings/hotel/create?hotelId=${id}`)}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={HotelIcon}
              title="No Hotels Found"
              description="Try adjusting your search filters or clear values to explore current property vacancies."
              actionLabel="Clear Filters"
              onAction={handleClearFilters}
            />
          )}
        </div>
      </div>
    </>
  );
}