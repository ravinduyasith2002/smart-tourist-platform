import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getUser, updateUser } from "@/contexts/AuthContext";
import { useLocation } from "wouter";
import {
  MapPin, Users, Hotel, Compass, Wallet, Globe, Award, ClipboardList,
  Building, Clock, Phone, Mail, DoorOpen, CalendarCheck, Eye, LogOut,
  Star, BookOpen, Trophy, Languages, DollarSign, Shield
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { userService } from "@/services/user.service";
import { touristService } from "@/services/tourist.service";
import { hotelService } from "@/services/hotel.service";
import { guideService } from "@/services/guide.service";
import { tripService } from "@/services/trip.service";
import { guideBookingService } from "@/services/guideBooking.service";
import { hotelBookingService } from "@/services/hotelBooking.service";

function TouristDashboard({ user, profile }) {
  const [, setLocation] = useLocation();
  const [trips, setTrips] = useState([]);
  const [guideBookings, setGuideBookings] = useState([]);
  const [hotelBookings, setHotelBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      tripService.getTrips({}),
      guideBookingService.getBookings({}),
      hotelBookingService.getBookings({}),
    ]).then(([t, g, h]) => {
      if (t.status === 'fulfilled') setTrips(Array.isArray(t.value?.data || t.value) ? t.value.data || t.value : []);
      if (g.status === 'fulfilled') setGuideBookings(Array.isArray(g.value?.data || g.value) ? g.value.data || g.value : []);
      if (h.status === 'fulfilled') setHotelBookings(Array.isArray(h.value?.data || h.value) ? h.value.data || h.value : []);
    }).finally(() => setLoading(false));
  }, []);

  const p = { ...user, ...(profile || {}) };
  const totalBookings = guideBookings.length + hotelBookings.length;
  const activeTrips = trips.filter(t => t.status === 'ONGOING' || t.status === 'PLANNING').length;

  return (
    <>
      <div className="bg-white rounded-xl p-6 mb-8 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center gap-4">
        <img
          src={p.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80"}
          alt={p.name || "Avatar"}
          className="w-16 h-16 rounded-full object-cover border border-slate-200 shadow-sm"
        />
        <div className="text-center sm:text-left flex-1">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {p.name || "Traveler"}</h1>
          <p className="text-sm text-gray-500 italic mt-0.5">"{p.bio || "Ready for the next adventure."}"</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <Card className="shadow-md lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-blue-600" /> Account Management
            </CardTitle>
            <CardDescription>Your profile and contact details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Name</p>
                <p className="font-medium text-gray-900 mt-0.5">{p.name || "Not provided"}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email</p>
                <p className="font-medium text-gray-900 mt-0.5 break-all">{p.email || "Not provided"}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Phone</p>
                <p className="font-medium text-gray-900 mt-0.5">{p.phone || "Not provided"}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Role</p>
                <p className="font-bold text-primary capitalize mt-0.5">{(p.role || "TOURIST").toLowerCase()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Globe className="w-5 h-5 text-teal-600" /> Travel Settings
            </CardTitle>
            <CardDescription>Your preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3.5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 font-medium">Language</span>
              <span className="font-semibold text-gray-900">{p.preferredLanguage || "English"}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 font-medium">Currency</span>
              <span className="font-semibold text-gray-900">{p.preferredCurrency || "USD"}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 font-medium">Travel Style</span>
              <span className="px-2 py-0.5 text-xs font-bold rounded bg-teal-100 text-teal-800 uppercase tracking-wide">
                {p.travelStyle || "MODERATE"}
              </span>
            </div>
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-sm">
              <span className="text-gray-500 font-medium">Total Spent</span>
              <span className="font-bold text-emerald-600 flex items-center gap-0.5">
                <Wallet className="w-4 h-4" /> {p.preferredCurrency || "USD"} {p.totalSpent ?? 0}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Create Trip", desc: "Plan your next adventure", icon: Compass, href: "/trips/create", color: "bg-blue-100 text-blue-600" },
            { title: "Browse Guides", desc: "Find expert tour guides", icon: Users, href: "/guides", color: "bg-teal-100 text-teal-600" },
            { title: "Browse Hotels", desc: "Find perfect accommodations", icon: Hotel, href: "/hotels", color: "bg-purple-100 text-purple-600" },
            { title: "My Trips", desc: "View your planned trips", icon: MapPin, href: "/trips", color: "bg-orange-100 text-orange-600" },
          ].map((a) => {
            const Icon = a.icon;
            return (
              <Card key={a.title} className="hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between" onClick={() => setLocation(a.href)}>
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${a.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-lg">{a.title}</CardTitle>
                  <CardDescription>{a.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white">Get Started</Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-gray-600">Active Trips</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">{loading ? "..." : activeTrips}</p>
            <p className="text-xs text-gray-500 mt-2">{activeTrips === 0 ? "No ongoing trips" : "Planning or ongoing itineraries"}</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-gray-600">Total Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-secondary">{loading ? "..." : totalBookings}</p>
            <p className="text-xs text-gray-500 mt-2">{totalBookings === 0 ? "No bookings yet" : "Guides & hotels secured"}</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-gray-600">Lifetime Trips</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-orange-600 flex items-center gap-1.5">
              <Award className="w-6 h-6 opacity-80" /> {p.totalTrips ?? trips.length}
            </p>
            <p className="text-xs text-gray-500 mt-2">Adventures completed</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function HotelDashboard({ user, profile }) {
  const [, setLocation] = useLocation();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    hotelBookingService.getBookings({}).then((res) => {
      const d = res?.data || res;
      setBookings(Array.isArray(d) ? d : []);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);
  
  const hp = { ...user, ...(profile || {}) };

  const activeCheckIns = bookings.filter(b => b.status === 'BOOKED' || b.status === 'CHECKED_IN').length;
  const pendingBookings = bookings.filter(b => b.status === 'PENDING').length;
  const checkedIn = bookings.filter(b => b.status === 'CHECKED_IN').length;
  const completedStays = bookings.filter(b => b.status === 'CHECKED_OUT' || b.status === 'COMPLETED').length;

  return (
    <>
      <div className="bg-white rounded-xl p-6 mb-8 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center gap-4">
        <img
          src={hp.logo || hp.imageUrl || user.avatarUrl || "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=150&h=150&q=80"}
          alt={hp.hotelName || user.name || "Hotel"}
          className="w-20 h-20 rounded-xl object-cover border border-slate-200 shadow-sm"
        />
        <div className="text-center sm:text-left flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{hp.hotelName || user.name || "Hotel Dashboard"}</h1>
          <p className="text-sm text-gray-500 mt-0.5">{hp.description || "Manage your hotel operations"}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <Card className="shadow-md lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Building className="w-5 h-5 text-blue-600" /> Hotel Information
            </CardTitle>
            <CardDescription>Your hotel profile and contact details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Hotel Name</p>
                <p className="font-medium text-gray-900 mt-0.5">{hp.hotelName || user.name || "Not provided"}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email</p>
                <p className="font-medium text-gray-900 mt-0.5 break-all flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-gray-400" /> {hp.email || user.email || "Not provided"}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Phone</p>
                <p className="font-medium text-gray-900 mt-0.5 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-gray-400" /> {hp.phone || "Not provided"}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Address</p>
                <p className="font-medium text-gray-900 mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" /> {hp.address ? `${hp.address}, ${hp.city || ""}` : "Not provided"}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Check-In</p>
                <p className="font-medium text-gray-900 mt-0.5 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-green-500" /> {hp.checkInTime || "14:00"}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Check-Out</p>
                <p className="font-medium text-gray-900 mt-0.5 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-red-500" /> {hp.checkOutTime || "11:00"}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Rooms</p>
                <p className="font-medium text-gray-900 mt-0.5">{hp.totalRooms ?? "N/A"}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Available Rooms</p>
                <p className="font-medium text-gray-900 mt-0.5 flex items-center gap-1">
                  <DoorOpen className="w-3.5 h-3.5 text-blue-500" /> {hp.availableRooms ?? "N/A"}
                </p>
              </div>
              {hp.licenseNumber && (
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">License</p>
                  <p className="font-medium text-gray-900 mt-0.5 flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-gray-400" /> {hp.licenseNumber}
                  </p>
                </div>
              )}
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Role</p>
                <p className="font-bold text-primary capitalize mt-0.5">{user.role || "HOTEL"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-teal-600" /> Today's Overview
            </CardTitle>
            <CardDescription>Quick snapshot</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 font-medium">Active Reservations</span>
              <span className="font-semibold text-gray-900">{loading ? "..." : activeCheckIns}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 font-medium">Pending Requests</span>
              <span className="font-semibold text-gray-900">{loading ? "..." : pendingBookings}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 font-medium">Checked In</span>
              <span className="px-2 py-0.5 text-xs font-bold rounded bg-green-100 text-green-800">{loading ? "..." : checkedIn}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 font-medium">Completed Stays</span>
              <span className="font-semibold text-gray-900">{loading ? "..." : completedStays}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 font-medium">Total Revenue</span>
              <span className="font-bold text-emerald-600">{hp.totalRevenue ? `$${hp.totalRevenue}` : "$0"}</span>
            </div>
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-sm">
              <span className="text-gray-500 font-medium">Total Bookings</span>
              <span className="font-bold text-blue-600">{loading ? "..." : bookings.length}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {hp.amenities?.length > 0 && (
        <Card className="shadow-md mb-8">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" /> Amenities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {hp.amenities.map((a, i) => (
                <span key={i} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">{a}</span>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "View Bookings", desc: "Manage reservations", icon: ClipboardList, href: "/bookings", color: "bg-blue-100 text-blue-600" },
            { title: "Edit Profile", desc: "Update hotel details", icon: Building, href: "/profile/hotel", color: "bg-teal-100 text-teal-600" },
            { title: "View Listing", desc: "See guest view", icon: Eye, href: "/hotels", color: "bg-purple-100 text-purple-600" },
            { title: "My Profile", desc: "Account settings", icon: Users, href: "/profile", color: "bg-orange-100 text-orange-600" },
          ].map((a) => {
            const Icon = a.icon;
            return (
              <Card key={a.title} className="hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between" onClick={() => setLocation(a.href)}>
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${a.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-lg">{a.title}</CardTitle>
                  <CardDescription>{a.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white">Open</Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-gray-600">Active Reservations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">{loading ? "..." : activeCheckIns}</p>
            <p className="text-xs text-gray-500 mt-2">{activeCheckIns === 0 ? "No active reservations" : "Guests currently booked or checked in"}</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-gray-600">Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-600">{loading ? "..." : pendingBookings}</p>
            <p className="text-xs text-gray-500 mt-2">{pendingBookings === 0 ? "No pending requests" : "Awaiting response"}</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-gray-600">Completed Stays</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600 flex items-center gap-1.5">
              <LogOut className="w-6 h-6 opacity-80" /> {loading ? "..." : completedStays}
            </p>
            <p className="text-xs text-gray-500 mt-2">Checked-out guests to date</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function GuideDashboard({ user, profile }) {
  const [, setLocation] = useLocation();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    guideBookingService.getBookings({}).then((res) => {
      const d = res?.data || res;
      setBookings(Array.isArray(d) ? d : []);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const gp = { ...user, ...(profile || {}) };;

  const activeBookings = bookings.filter(b => b.status === 'ACCEPTED' || b.status === 'CONFIRMED').length;
  const pendingBookings = bookings.filter(b => b.status === 'PENDING').length;
  const completedTours = bookings.filter(b => b.status === 'COMPLETED').length;

  return (
    <>
      <div className="bg-white rounded-xl p-6 mb-8 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center gap-4">
        <img
          src={gp.profileImage || gp.avatarUrl || user.avatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"}
          alt={user.name || "Guide"}
          className="w-20 h-20 rounded-full object-cover border border-slate-200 shadow-sm"
        />
        <div className="text-center sm:text-left flex-1">
          <h1 className="text-2xl font-bold text-gray-900">Welcome, {user.name || "Guide"}</h1>
          <p className="text-sm text-gray-500 mt-0.5">{gp.bio || "Professional tour guide"}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <Card className="shadow-md lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" /> Guide Profile
            </CardTitle>
            <CardDescription>Your professional details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Name</p>
                <p className="font-medium text-gray-900 mt-0.5">{user.name || "Not provided"}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email</p>
                <p className="font-medium text-gray-900 mt-0.5 break-all">{gp.email || user.email || "Not provided"}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Experience</p>
                <p className="font-medium text-gray-900 mt-0.5">{gp.experienceYears ? `${gp.experienceYears} years` : "Not provided"}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Response Time</p>
                <p className="font-medium text-gray-900 mt-0.5">{gp.responseTimeMins ? `${gp.responseTimeMins} mins` : "N/A"}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Hourly Rate</p>
                <p className="font-medium text-gray-900 mt-0.5 flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-green-500" /> {gp.hourlyRate ? `$${gp.hourlyRate}` : "Not set"}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Daily Rate</p>
                <p className="font-medium text-gray-900 mt-0.5 flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-green-500" /> {gp.dailyRate ? `$${gp.dailyRate}` : "Not set"}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Bookings</p>
                <p className="font-medium text-gray-900 mt-0.5">{gp.totalBookings ?? 0}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Earnings</p>
                <p className="font-medium text-gray-900 mt-0.5 font-bold text-emerald-600">${gp.totalEarnings?.toFixed(2) || "0.00"}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Verified</p>
                <p className="mt-0.5">
                  {gp.isVerified
                    ? <span className="px-2 py-0.5 text-xs font-bold rounded bg-green-100 text-green-800">Verified</span>
                    : <span className="px-2 py-0.5 text-xs font-bold rounded bg-yellow-100 text-yellow-800">Unverified</span>}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Role</p>
                <p className="font-bold text-primary capitalize mt-0.5">{user.role || "GUIDE"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Trophy className="w-5 h-5 text-teal-600" /> Performance
            </CardTitle>
            <CardDescription>Your stats at a glance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 font-medium">Completed Tours</span>
              <span className="font-semibold text-gray-900">{gp.completedBookings ?? 0}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 font-medium">Cancellation Rate</span>
              <span className="font-semibold text-gray-900">{gp.cancellationRate ? `${gp.cancellationRate}%` : "0%"}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 font-medium">Languages</span>
              <span className="font-semibold text-gray-900 flex items-center gap-1">
                <Languages className="w-3.5 h-3.5 text-gray-400" /> {gp.languages?.length || 0}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 font-medium">Specializations</span>
              <span className="font-semibold text-gray-900">{gp.specializations?.length || 0}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 font-medium">Bank Verified</span>
              <span className="font-semibold text-gray-900">{gp.bankAccountVerified ? "Yes" : "No"}</span>
            </div>
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-sm">
              <span className="text-gray-500 font-medium">Total Earnings</span>
              <span className="font-bold text-emerald-600">${gp.totalEarnings?.toFixed(2) || "0.00"}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {gp.languages?.length > 0 && (
        <Card className="shadow-md mb-8">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Languages className="w-5 h-5 text-blue-500" /> Languages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {gp.languages.map((l, i) => (
                <span key={i} className="px-3 py-1.5 bg-teal-50 text-teal-700 rounded-full text-sm font-medium">
                  {l.language || l} {l.proficiency ? `- ${l.proficiency}` : ""}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {gp.specializations?.length > 0 && (
        <Card className="shadow-md mb-8">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" /> Specializations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {gp.specializations.map((s, i) => (
                <span key={i} className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">{s.name || s}</span>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {gp.certifications?.length > 0 && (
        <Card className="shadow-md mb-8">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Award className="w-5 h-5 text-orange-500" /> Certifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {gp.certifications.filter(c => c && c.name).map((c, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <Shield className={`w-5 h-5 mt-0.5 ${c.verified ? 'text-green-500' : 'text-gray-400'}`} />
                  <div>
                    <p className="font-medium text-gray-900">{c.name}</p>
                    <p className="text-xs text-gray-500">{c.org}{c.expiryDate ? ` · Exp: ${new Date(c.expiryDate).toLocaleDateString()}` : ""}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "View Bookings", desc: "Manage tour requests", icon: ClipboardList, href: "/bookings", color: "bg-blue-100 text-blue-600" },
            { title: "Edit Profile", desc: "Update guide details", icon: BookOpen, href: "/profile/guide", color: "bg-teal-100 text-teal-600" },
            { title: "Browse Hotels", desc: "Find accommodations", icon: Hotel, href: "/hotels", color: "bg-purple-100 text-purple-600" },
            { title: "My Profile", desc: "Account settings", icon: Users, href: "/profile", color: "bg-orange-100 text-orange-600" },
          ].map((a) => {
            const Icon = a.icon;
            return (
              <Card key={a.title} className="hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between" onClick={() => setLocation(a.href)}>
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${a.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-lg">{a.title}</CardTitle>
                  <CardDescription>{a.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white">Open</Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-gray-600">Active Tours</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">{loading ? "..." : activeBookings}</p>
            <p className="text-xs text-gray-500 mt-2">{activeBookings === 0 ? "No active tours" : "Accepted or confirmed tours"}</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-gray-600">Pending Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-600">{loading ? "..." : pendingBookings}</p>
            <p className="text-xs text-gray-500 mt-2">{pendingBookings === 0 ? "No pending requests" : "Awaiting your response"}</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-gray-600">Completed Tours</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600 flex items-center gap-1.5">
              <Trophy className="w-6 h-6 opacity-80" /> {loading ? "..." : completedTours}
            </p>
            <p className="text-xs text-gray-500 mt-2">Total completed tours</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default function Dashboard() {
  const [localUser] = useState(getUser());
  const [profile, setProfile] = useState(null);
  const [roleProfile, setRoleProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const userRole = (localUser?.role || "TOURIST").toUpperCase();
        const promises = [userService.getMe()];
        if (userRole === "HOTEL") promises.push(hotelService.getMe());
        else if (userRole === "GUIDE") promises.push(guideService.getMe());
        else promises.push(touristService.getMe());

        const results = await Promise.allSettled(promises);
        const userRes = results[0];

        let baseProfile = localUser;
        let roleSpecific = null;

        if (userRes.status === 'fulfilled') {
          const d = userRes.value?.data || userRes.value;
          if (d) baseProfile = d;
        }

        if (results.length > 1 && results[1].status === 'fulfilled') {
          const d = results[1].value?.data || results[1].value;
          if (d) roleSpecific = d;
        }

        setProfile(baseProfile);
        setRoleProfile(roleSpecific);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const user = profile || localUser || {};
  const role = (user?.role || "TOURIST").toUpperCase();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
            </div>
          ) : (
            <>
              {role === "HOTEL" && <HotelDashboard user={user} profile={roleProfile} />}
              {role === "GUIDE" && <GuideDashboard user={user} profile={roleProfile} />}
              {(!role || role === "TOURIST" || role === "ADMIN") && <TouristDashboard user={user} profile={roleProfile} />}
            </>
          )}
        </main>
      </div>
    </>
  );
}
