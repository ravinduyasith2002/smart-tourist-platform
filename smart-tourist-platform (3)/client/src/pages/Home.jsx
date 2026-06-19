import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { isAuthenticated as checkAuth } from "@/contexts/AuthContext";
import { useLocation } from "wouter";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Compass, Users, Hotel, MapPin, Star, Shield } from "lucide-react";

export default function Home() {
  const [loggedIn] = useState(checkAuth());
  const [, setLocation] = useLocation();

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
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Your Smart Travel Companion
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
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
                    onClick={() => setLocation("/login")}
                  >
                    Sign In
                  </Button>
                </>
              )}
            </div>
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
