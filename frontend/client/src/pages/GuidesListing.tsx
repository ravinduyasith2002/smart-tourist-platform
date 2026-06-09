/**\n * SmartTouristPlatform - Guides Listing Page\n */

import { useState } from 'react';
import { Search, Filter, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GuideCard } from '@/components/shared/GuideCard';
import { Guide, GuideStatus } from '@/types/common';
import { toast } from 'sonner';

// Mock data
const mockGuides: Guide[] = [
  {
    id: '1',
    email: 'john@example.com',
    name: 'John Smith',
    avatar: undefined,
    role: 'guide' as const as any,
    certification: 'Professional Tour Guide',
    languages: ['English', 'Spanish', 'French'],
    specializations: ['Mountain Trekking', 'Cultural Tours'],
    status: 'approved' as GuideStatus,
    rating: 4.8,
    reviewCount: 42,
    hourlyRate: 50,
    earnings: 5000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'sarah@example.com',
    name: 'Sarah Johnson',
    avatar: undefined,
    role: 'guide' as const as any,
    certification: 'Adventure Guide',
    languages: ['English', 'German'],
    specializations: ['Beach Tours', 'Water Sports'],
    status: 'approved' as GuideStatus,
    rating: 4.9,
    reviewCount: 58,
    hourlyRate: 60,
    earnings: 7200,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    email: 'mike@example.com',
    name: 'Mike Chen',
    avatar: undefined,
    role: 'guide' as const as any,
    certification: 'Heritage Tour Specialist',
    languages: ['English', 'Mandarin', 'Japanese'],
    specializations: ['Historical Sites', 'Museum Tours'],
    status: 'approved' as GuideStatus,
    rating: 4.7,
    reviewCount: 35,
    hourlyRate: 45,
    earnings: 4500,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    email: 'emma@example.com',
    name: 'Emma Wilson',
    avatar: undefined,
    role: 'guide' as const as any,
    certification: 'Eco-Tourism Guide',
    languages: ['English', 'Portuguese'],
    specializations: ['Nature Tours', 'Wildlife'],
    status: 'approved' as GuideStatus,
    rating: 4.6,
    reviewCount: 28,
    hourlyRate: 55,
    earnings: 3300,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function GuidesListing() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [filteredGuides, setFilteredGuides] = useState(mockGuides);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterGuides(query, selectedLanguage);
  };

  const handleLanguageFilter = (language: string) => {
    const newLanguage = selectedLanguage === language ? null : language;
    setSelectedLanguage(newLanguage);
    filterGuides(searchQuery, newLanguage);
  };

  const filterGuides = (query: string, language: string | null) => {
    let filtered = mockGuides;

    if (query) {
      filtered = filtered.filter(
        (guide) =>
          guide.name.toLowerCase().includes(query.toLowerCase()) ||
          guide.specializations?.some((spec) =>
            spec.toLowerCase().includes(query.toLowerCase())
          )
      );
    }

    if (language) {
      filtered = filtered.filter((guide) =>
        guide.languages?.includes(language)
      );
    }

    setFilteredGuides(filtered);
  };

  const handleBookGuide = (guideId: string) => {
    toast.success('Guide booking initiated!');
  };

  const handleViewProfile = (guideId: string) => {
    toast.info('Opening guide profile...');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-foreground mb-2">Find Your Perfect Guide</h1>
          <p className="text-muted-foreground">Browse and book verified tour guides</p>
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
              placeholder="Search guides by name or specialization..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 h-12"
            />
          </div>

          {/* Language Filters */}
          <div className="flex flex-wrap gap-2">
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="w-4 h-4" />
              Languages:
            </span>
            {['English', 'Spanish', 'French', 'German', 'Mandarin', 'Portuguese'].map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageFilter(lang)}
                className={`px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                  selectedLanguage === lang
                    ? 'bg-primary text-white'
                    : 'bg-accent text-foreground hover:bg-muted'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredGuides.length} guide{filteredGuides.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Guides Grid */}
        {filteredGuides.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuides.map((guide) => (
              <GuideCard
                key={guide.id}
                guide={guide}
                onBook={() => handleBookGuide(guide.id)}
                onViewDetails={() => handleViewProfile(guide.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No guides found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
