/**
 * SmartTouristPlatform - Footer Component
 * Application footer with links and information
 */

import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="font-bold text-lg">SmartTourist</span>
            </div>
            <p className="text-sm opacity-80">
              Your trusted platform for planning trips, booking guides, and discovering amazing destinations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li><a href="#" className="hover:opacity-100 transition-opacity">Find Guides</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Browse Hotels</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Plan Trip</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Reviews</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li><a href="#" className="hover:opacity-100 transition-opacity">Help Center</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Contact Us</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="space-y-3 text-sm opacity-80">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>support@smarttourist.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>123 Travel St, City, Country</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm opacity-80">
              &copy; 2024 SmartTouristPlatform. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:opacity-100 transition-opacity opacity-80">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:opacity-100 transition-opacity opacity-80">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:opacity-100 transition-opacity opacity-80">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
