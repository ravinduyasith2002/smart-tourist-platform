import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { guideService } from "@/services/guide.service";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { GuideCard } from "@/components/GuideCard";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { EmptyState } from "@/components/EmptyState";
import { Search, Users, MapPin, Briefcase } from "lucide-react";
import { useLocation } from "wouter";

export default function Guides() {
  const [, setLocation] = useLocation();
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Explicit properties matching backend filter payload data constraints
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    specialization: "",
  });

  // Local state holding the input string to prevent broken re-renders while typing
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetchGuides();
  }, [filters]);

  const fetchGuides = async () => {
    setLoading(true);
    try {
      const result = await guideService.getGuides({
        search: filters.search,
        location: filters.location,
        specialization: filters.specialization,
        page: 1,
        limit: 12,
      });

      // Safely check and extract payload collections based on the data schema layout
      if (result && Array.isArray(result.data)) {
        setGuides(result.data);
      } else if (Array.isArray(result)) {
        setGuides(result);
      } else {
        setGuides([]);
      }
    } catch (error) {
      toast.error("Failed to retrieve matching guide listings");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Triggers search fetch explicitly when clicking Enter or blurring the input field
  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" || e.type === "blur") {
      setFilters((prev) => ({ ...prev, search: searchInput }));
    }
  };

  const handleClearFilters = () => {
    setSearchInput("");
    setFilters({
      search: "",
      location: "",
      specialization: "",
    });
  };
  console.log("8888888",guides)
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Context Banner */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Expert Tour Guides</h1>
            <p className="text-gray-600">Find and book experienced local guides tailored for your Sri Lanka excursions</p>
          </div>

          {/* Interactive Filtering Matrix Layout */}
          <Card className="mb-8 shadow-md">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                
                {/* Search Input Element (Name Lookup) */}
                <div>
                  <Label htmlFor="search" className="text-xs font-semibold text-gray-500 uppercase">Search by Name</Label>
                  <div className="relative mt-1.5">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="Press Enter to search..."
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      onKeyDown={handleSearchSubmit}
                      onBlur={handleSearchSubmit}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Location Key Selector Parameter */}
                <div>
                  <Label htmlFor="location" className="text-xs font-semibold text-gray-500 uppercase">Target Location</Label>
                  <div className="relative mt-1.5">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <select
                      id="location"
                      value={filters.location}
                      onChange={(e) => handleSelectChange("location", e.target.value)}
                      className="w-full h-10 pl-10 pr-3 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring appearance-none cursor-pointer"
                    >
                      <option value="">All Locations</option>
                      <option value="Colombo">Colombo</option>
                      <option value="Kandy">Kandy</option>
                      <option value="Galle">Galle</option>
                      <option value="Sigiriya">Sigiriya</option>
                      <option value="Ella">Ella</option>
                    </select>
                  </div>
                </div>

                {/* Specialization Attribute Mapping */}
                <div>
                  <Label htmlFor="specialization" className="text-xs font-semibold text-gray-500 uppercase">Specialization Route</Label>
                  <div className="relative mt-1.5">
                    <Briefcase className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <select
                      id="specialization"
                      value={filters.specialization}
                      onChange={(e) => handleSelectChange("specialization", e.target.value)}
                      className="w-full h-10 pl-10 pr-3 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring appearance-none cursor-pointer"
                    >
                      <option value="">All Categories</option>
                      <option value="Cultural Tours">Cultural Tours</option>
                      <option value="Wildlife Safari">Wildlife Safari</option>
                      <option value="Adventure & Hiking">Adventure & Hiking</option>
                      <option value="Culinary Experiences">Culinary Experiences</option>
                    </select>
                  </div>
                </div>

                {/* Filter Cleanup Trigger controls wrapper */}
                <div className="flex items-end">
                  <Button
                    variant="outline"
                    className="w-full border-dashed border-gray-300 hover:bg-gray-100 transition-colors"
                    onClick={handleClearFilters}
                  >
                    Clear All Filters
                  </Button>
                </div>
                
              </div>
            </CardContent>
          </Card>

          {/* Grid Layout Output Control Flow */}
          {loading ? (
            <LoadingSkeleton count={6} type="card" />
          ) : guides.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guides.map((guide) => (
                <GuideCard
                  key={guide.guideId} 
                  guide={guide}
                  onViewDetails={(id) => setLocation(`/guides/${id}`)}
                  onBook={(id) => setLocation(`/bookings/guide/create?guideId=${id}`)}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Users}
              title="No Guides Found"
              description="We could not locate profile records that align with those specified search attributes. Modify your filter entries to locate guides."
              actionLabel="Reset Search Constraints"
              onAction={handleClearFilters}
            />
          )}
          
        </div>
      </div>
    </>
  );
}