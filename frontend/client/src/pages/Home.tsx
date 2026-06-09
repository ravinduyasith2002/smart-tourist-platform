/**
 * SmartTouristPlatform - Home Landing Page
 * Styled by Senior UX/UI Design Pattern
 */

import { useLocation } from 'wouter';
import { ArrowRight, MapPin, Users, Hotel, CreditCard, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/config/routes';
import { useAuth } from '@/hooks/useAuth';

export default function Home() {
  const [, navigate] = useLocation();
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: MapPin,
      title: 'Plan Your Trips',
      description: 'Create detailed itineraries for your multi-day adventures',
      iconColor: 'text-emerald-500 bg-emerald-50 border-emerald-100',
    },
    {
      icon: Users,
      title: 'Book Verified Guides',
      description: 'Connect with certified local guides for authentic experiences',
      iconColor: 'text-blue-500 bg-blue-50 border-blue-100',
    },
    {
      icon: Hotel,
      title: 'Reserve Hotels',
      description: 'Find and book accommodations at the best prices',
      iconColor: 'text-indigo-500 bg-indigo-50 border-indigo-100',
    },
    {
      icon: CreditCard,
      title: 'Secure Payments',
      description: 'Safe and easy payment processing for all bookings',
      iconColor: 'text-purple-500 bg-purple-50 border-purple-100',
    },
  ];

  const testimonials = [
    {
      name: 'Alex Johnson',
      role: 'Traveler',
      comment: 'SmartTourist made planning my Sri Lanka trip so easy. The guides were amazing!',
      rating: 5,
    },
    {
      name: 'Maria Garcia',
      role: 'Tour Guide',
      comment: 'Great platform to connect with tourists. I love helping people explore new places.',
      rating: 5,
    },
    {
      name: 'David Chen',
      role: 'Hotel Owner',
      comment: 'Increased bookings significantly since joining SmartTourist.',
      rating: 4,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 antialiased selection:bg-blue-500/10 selection:text-blue-600">
      
      {/* Hero Section */}
      <section className="relative py-24 md:py-36 bg-gradient-to-b from-blue-50/70 via-indigo-50/30 to-transparent overflow-hidden">
        {/* Designer Element: Background Blur Highlights */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div className="space-y-8 max-w-xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                Discover Your <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Next Adventure</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed font-normal">
                Plan multi-day trips, book verified guides, reserve hotels, and manage everything in one place. Your complete travel companion.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button
                  onClick={() => navigate(isAuthenticated ? ROUTES.TOURIST_DASHBOARD : ROUTES.REGISTER)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-6 rounded-xl shadow-md shadow-blue-600/10 hover:shadow-lg hover:shadow-blue-600/20 transition-all duration-200 gap-2 text-base cta-button"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate(ROUTES.TOURIST_GUIDES)}
                  className="border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold px-8 py-6 rounded-xl shadow-sm transition-all duration-200 text-base"
                >
                  Explore Guides
                </Button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-6 pt-10 border-t border-slate-200/80">
                <div className="space-y-1">
                  <p className="text-3xl font-bold tracking-tight text-blue-600">10K+</p>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Users</p>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold tracking-tight text-indigo-600">500+</p>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Verified Guides</p>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold tracking-tight text-emerald-600">1000+</p>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Hotels</p>
                </div>
              </div>
            </div>

            {/* Right Visual Card */}
            <div className="hidden md:flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-indigo-500/5 rounded-3xl blur-xl" />
              <div className="relative w-full h-[420px] bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/60 p-8 flex items-center justify-center backdrop-blur-md">
                <div className="text-center space-y-4 max-w-sm">
                  <div className="w-24 h-24 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center mx-auto shadow-inner shadow-blue-500/5 animate-pulse">
                    <MapPin className="w-10 h-10 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">Explore Destinations</h3>
                  <p className="text-sm text-slate-400">Interactive maps and visual localized tracking paths open upon creation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-3">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
              Why Choose SmartTourist?
            </h2>
            <p className="text-lg text-slate-500 font-normal">
              Everything you need for the perfect trip
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="group p-8 bg-white rounded-2xl border border-slate-100 hover:border-slate-200/80 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-100 transition-all duration-300"
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 border transition-transform duration-300 group-hover:scale-105 ${feature.iconColor}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-slate-50/50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-3">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
              How It Works
            </h2>
            <p className="text-lg text-slate-500 font-normal">
              Simple steps to plan your perfect trip
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 relative">
            {[
              { step: '01', title: 'Create Trip', desc: 'Plan your itinerary' },
              { step: '02', title: 'Book Guide', desc: 'Find verified guides' },
              { step: '03', title: 'Reserve Hotel', desc: 'Book accommodations' },
              { step: '04', title: 'Enjoy Trip', desc: 'Have amazing experiences' },
            ].map((item, idx) => (
              <div key={idx} className="relative group text-center space-y-4">
                <div className="relative z-10 w-14 h-14 bg-white border border-slate-200 text-blue-600 font-bold text-lg rounded-2xl flex items-center justify-center mx-auto shadow-sm group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300">
                  {item.step}
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-lg text-slate-900">{item.title}</h3>
                  <p className="text-sm text-slate-500 font-medium">{item.desc}</p>
                </div>
                
                {/* Connector Line (Hidden on mobile grid splits) */}
                {idx < 3 && (
                  <div className="hidden md:block absolute top-7 left-[65%] w-[70%] h-[2px] bg-slate-200 group-hover:bg-blue-200 transition-colors pointer-events-none z-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-3">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
              What People Say
            </h2>
            <p className="text-lg text-slate-500 font-normal">
              Join thousands of happy travelers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div 
                key={idx} 
                className="bg-slate-50/50 rounded-2xl border border-slate-100 p-8 flex flex-col justify-between hover:shadow-lg hover:shadow-slate-100 transition-shadow duration-300"
              >
                <div>
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-slate-600 italic leading-relaxed text-base mb-6">
                    "{testimonial.comment}"
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-200/60 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-sm">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{testimonial.name}</p>
                    <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-white to-blue-50/50 border-t border-slate-100">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 md:p-16 shadow-xl shadow-blue-950/10 text-white relative overflow-hidden">
            {/* Background design accents */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-20 -translate-y-20 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-20 translate-y-20 pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                Ready to Explore?
              </h2>
              <p className="text-blue-100 text-base md:text-lg leading-relaxed font-normal opacity-90">
                Join thousands of travelers who are already discovering amazing destinations with SmartTourist.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Button
                  onClick={() => navigate(isAuthenticated ? ROUTES.TOURIST_DASHBOARD : ROUTES.REGISTER)}
                  className="bg-white hover:bg-blue-50 text-blue-600 font-bold px-8 py-6 rounded-xl shadow-md transition-all duration-200 text-base cta-button"
                >
                  Start Planning
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate(ROUTES.LOGIN)}
                  className="border-white/30 bg-transparent hover:bg-white/10 text-white font-bold px-8 py-6 rounded-xl transition-all duration-200 text-base"
                >
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}