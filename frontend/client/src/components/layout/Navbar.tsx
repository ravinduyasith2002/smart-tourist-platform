/**
 * SmartTouristPlatform - Navbar Component
 * Main navigation bar with logo, menu, and user profile
 */

import { useState } from 'react';
import { useLocation } from 'wouter';
import { Menu, X, Bell, User, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/config/routes';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [, navigate] = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME);
  };

  const handleNavigation = (route: string) => {
    navigate(route);
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavigation(ROUTES.HOME)}>
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline text-foreground">SmartTourist</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {!isAuthenticated ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => handleNavigation(ROUTES.LOGIN)}
                  className="text-foreground hover:text-primary"
                >
                  Login
                </Button>
                <Button
                  onClick={() => handleNavigation(ROUTES.REGISTER)}
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  Register
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-4">
                {/* Notifications */}
                <button className="relative p-2 hover:bg-accent rounded-lg transition-colors">
                  <Bell className="w-5 h-5 text-foreground" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
                </button>

                {/* User Menu */}
                <div className="flex items-center gap-3 pl-4 border-l border-border">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium text-foreground">{user?.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
                  </div>
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-accent rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-border">
            {!isAuthenticated ? (
              <div className="flex flex-col gap-2 pt-4">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => handleNavigation(ROUTES.LOGIN)}
                >
                  Login
                </Button>
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                  onClick={() => handleNavigation(ROUTES.REGISTER)}
                >
                  Register
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-4">
                <button className="flex items-center gap-3 w-full px-4 py-2 hover:bg-accent rounded-lg transition-colors text-foreground">
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </button>
                <button className="flex items-center gap-3 w-full px-4 py-2 hover:bg-accent rounded-lg transition-colors text-foreground">
                  <Bell className="w-4 h-4" />
                  <span>Notifications</span>
                </button>
                <button className="flex items-center gap-3 w-full px-4 py-2 hover:bg-accent rounded-lg transition-colors text-foreground">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
                <button
                  className="flex items-center gap-3 w-full px-4 py-2 hover:bg-destructive/10 rounded-lg transition-colors text-destructive"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
