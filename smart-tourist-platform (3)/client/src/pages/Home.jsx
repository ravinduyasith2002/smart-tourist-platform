import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { isAuthenticated as checkAuth } from "@/contexts/AuthContext";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Compass, Users, Hotel, MapPin, Star, Shield } from "lucide-react";

// Rotating hero backgrounds — all free-to-use beach/coastal shots (Unsplash License)
const heroImages = [
  "https://images.unsplash.com/photo-1755928683108-6ef780a17382?auto=format&fit=crop&w=1920&q=80", // Hamilton Island, turquoise water + palms
  "https://images.unsplash.com/photo-1733508244270-1155719f22d3?auto=format&fit=crop&w=1920&q=80", // golden beach sunset, rolling waves
  "https://images.unsplash.com/photo-1745383792762-ccaeb8e972d0?auto=format&fit=crop&w=1920&q=80", // aerial drone shot, boat near white sand
  "https://images.unsplash.com/photo-1692017827818-f020b6d75975?auto=format&fit=crop&w=1920&q=80", // palm trees, blue sky, daytime paradise
];

const SLIDE_DURATION_MS = 5000;

export default function Home() {
  const [loggedIn] = useState(checkAuth());
  const [, setLocation] = useLocation();
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % heroImages.length);
    }, SLIDE_DURATION_MS);
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: Compass,
      title: "Plan Adventures",
      description: "Create detailed trip itineraries with destinations and activities",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Users,
      title: "Expert Guides",
      description: "Connect with experienced local guides for authentic experiences",
      color: "bg-teal-100 text-teal-600",
    },
    {
      icon: Hotel,
      title: "Perfect Stays",
      description: "Book accommodations that match your travel style and budget",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: Star,
      title: "Reviews & Ratings",
      description: "Share experiences and read authentic reviews from travelers",
      color: "bg-orange-100 text-orange-600",
    },
    {
      icon: MapPin,
      title: "Explore Destinations",
      description: "Discover hidden gems and popular attractions worldwide",
      color: "bg-red-100 text-red-600",
    },
    {
      icon: Shield,
      title: "Secure Bookings",
      description: "Book with confidence with our secure payment and booking system",
      color: "bg-green-100 text-green-600",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
        {/* Hero Section — auto-rotating beach photo slideshow */}
        <section className="relative min-h-[640px] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
          {heroImages.map((src, index) => (
            <div
              key={src}
              aria-hidden={index !== slideIndex}
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-[1500ms] ease-in-out ${
                index === slideIndex ? "opacity-100" : "opacity-0"
              }`}
              style={{ backgroundImage: `url('${src}')` }}
            />
          ))}

          {/* Gradient overlay for text legibility, tinted to match brand palette */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-teal-900/50 to-cyan-800/20" />

          <div className="relative max-w-7xl mx-auto text-center py-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Your Smart Travel Companion
            </h1>
            <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto drop-shadow-md">
              Plan unforgettable adventures, connect with expert guides, and discover perfect accommodations all in one platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {loggedIn ? (
                <>
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white"
                    onClick={() => setLocation("/dashboard")}
                  >
                    Go to Dashboard
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/10 border-white/80 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
                    onClick={() => setLocation("/guides")}
                  >
                    Browse Guides
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white"
                    onClick={() => setLocation("/register")}
                  >
                    Get Started
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/10 border-white/80 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
                    onClick={() => setLocation("/login")}
                  >
                    Sign In
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Slide indicator dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
            {heroImages.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSlideIndex(index)}
                aria-label={`Show background ${index + 1}`}
                aria-current={index === slideIndex}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === slideIndex ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose SmartTouristPlatform?</h2>
              <p className="text-lg text-gray-600">Everything you need for an amazing travel experience</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary to-secondary rounded-2xl p-12 text-center text-white shadow-xl">
            <h2 className="text-4xl font-bold mb-4">Ready to Start Your Adventure?</h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of travelers who are discovering amazing experiences with SmartTouristPlatform
            </p>
            {!loggedIn && (
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-gray-100 font-semibold"
                onClick={() => setLocation("/register")}
              >
                Create Your Account Today
              </Button>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <p>&copy; 2026 SmartTouristPlatform. All rights reserved.</p>
            <p className="mt-2 text-sm">Your trusted travel companion for unforgettable adventures</p>
          </div>
        </footer>
      </div>
    </>
  );
}