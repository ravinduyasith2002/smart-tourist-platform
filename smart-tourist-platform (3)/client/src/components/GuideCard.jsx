import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rating } from "./Rating";
import { ShieldCheck, Clock } from "lucide-react";

export const GuideCard = ({
  guide,
  onViewDetails,
  onBook,
}) => {
  // ADJSUTMENT: Derive a clean name from the email if the explicit name property is missing or blank
  const name = React.useMemo(() => {
    if (guide?.name && guide.name.trim() !== "") {
      return guide.name;
    }
    
    if (guide?.email) {
      // Extract the local part before the '@' symbol
      const localPart = guide.email.split("@")[0];
      
      // Split by common delimiters like periods, underscores, or hyphens
      return localPart
        .split(/[._-]/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }
    
    return "Unknown Guide";
  }, [guide?.name, guide?.email]);
  
  // Dynamic rating assessment fallback tracking
  const completionRate = guide?.totalBookings > 0 
    ? (guide?.completedBookings / guide?.totalBookings) * 5 
    : 5.0;
  const rating = guide?.rating ?? (completionRate > 0 ? completionRate : 4.8);

  // Safely parse languages whether they are objects or raw strings
  const languages = Array.isArray(guide?.languages)
    ? guide.languages.map((langObj) => {
        if (typeof langObj === "string") return langObj;
        return langObj?.language || ""; 
      }).filter(Boolean)
    : ["English", "Sinhala"]; 

  // Dynamic expertise tag extraction from bio string parsing 
  const specializations = [];
  if (guide?.bio) {
    if (guide.bio.toLowerCase().includes("adventure")) specializations.push("Adventure");
    if (guide.bio.toLowerCase().includes("wildlife")) specializations.push("Wildlife");
    if (guide.bio.toLowerCase().includes("local")) specializations.push("Local Culture");
  }
  if (specializations.length === 0) {
    specializations.push("General Sightseeing");
  }

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-200 bg-white border border-slate-100 flex flex-col justify-between">
      <div>
        {/* Banner Display Wrap */}
        <div className="relative h-40 bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-2xl font-bold text-primary shadow-md border border-slate-50">
            {name.charAt(0)}
          </div>
          
          {/* Verification Badge indicator validation */}
          {guide?.verified && (
            <span className="absolute top-3 right-3 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5" /> VERIFIED
            </span>
          )}
        </div>

        <CardContent className="p-5">
          {/* Identity Title */}
          <h3 className="font-bold text-lg text-gray-900 mb-1 tracking-tight">{name}</h3>
          
          {/* Short Bio block snippet */}
          <p className="text-xs text-gray-500 line-clamp-2 mb-3 h-8">
            {guide?.bio || "Professional local tour guide in Sri Lanka."}
          </p>

          {/* Ratings & Volume counter block row */}
          <div className="flex items-center gap-2 mb-3.5">
            <Rating rating={Math.round(rating)} size="sm" />
            <span className="text-xs font-semibold text-gray-600">({rating.toFixed(1)})</span>
            <span className="text-gray-300 text-xs">•</span>
            <span className="text-xs text-gray-500 font-medium">{guide?.totalBookings ?? 0} bookings</span>
          </div>

          {/* Metrics Layout Matrix List */}
          <div className="space-y-2 mb-4 pt-3 border-t border-slate-50">
            {/* Experience Profile tracker */}
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400 font-medium">Experience</span>
              <span className="font-semibold text-gray-800">{guide?.experienceYears ?? 0} Years</span>
            </div>

            {/* Response Time Tracker mapping */}
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400 font-medium">Response Time</span>
              <span className="font-semibold text-slate-600 flex items-center gap-1">
                <Clock className="w-3 h-3 text-amber-500" /> ~{guide?.responseTimeMins ?? 45} mins
              </span>
            </div>

            {/* Spoken Languages rendered safely as clean string items */}
            <div className="flex justify-between items-start text-xs">
              <span className="text-gray-400 font-medium mt-0.5">Languages</span>
              <div className="flex flex-wrap gap-1 justify-end max-w-[70%]">
                {languages.slice(0, 2).map((lang) => (
                  <span
                    key={lang}
                    className="inline-block bg-slate-100 text-slate-700 text-[10px] font-medium px-1.5 py-0.5 rounded"
                  >
                    {lang}
                  </span>
                ))}
                {languages.length > 2 && (
                  <span className="text-[10px] text-gray-400 font-bold">+{languages.length - 2}</span>
                )}
              </div>
            </div>

            {/* Target specialty tag expertise text map */}
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400 font-medium">Expertise</span>
              <span className="font-semibold text-teal-600 text-right truncate max-w-[70%]">
                {specializations.join(" & ")}
              </span>
            </div>
          </div>
        </CardContent>
      </div>

      {/* Pricing Matrix Footer and navigational controllers */}
      <div className="p-5 pt-0 mt-auto">
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <span className="text-xs text-gray-400 block font-medium">Hourly Rate</span>
            <span className="text-xl font-extrabold text-gray-900">${guide?.hourlyRate ?? 0}</span>
            <span className="text-xs text-gray-500 font-normal"> /hr</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-400 block font-medium">Daily Standard</span>
            <span className="text-sm font-bold text-slate-700">${guide?.dailyRate ?? 0}</span>
          </div>
        </div>

        {/* Action Triggers linked securely to back-end guideId tracking paths */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1 text-xs h-9 border-slate-200 hover:bg-slate-50"
            onClick={() => onViewDetails?.(guide?.guideId)}
          >
            View Details
          </Button>
          <Button
            className="flex-1 text-xs h-9 bg-primary hover:bg-primary/90 text-white shadow-sm"
            onClick={() => onBook?.(guide?.guideId)}
          >
            Book Guide
          </Button>
        </div>
      </div>
    </Card>
  );
};