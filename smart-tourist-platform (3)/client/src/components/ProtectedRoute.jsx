import { getUser, isAuthenticated } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';
import { useEffect, useState } from 'react';

export const ProtectedRoute = ({
  children,
  allowedRoles,
}) => {
  const [user] = useState(getUser());
  const [loggedIn] = useState(isAuthenticated());
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!loggedIn) {
      setLocation('/login');
      return;
    }
    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
      setLocation('/dashboard');
    }
  }, []);

  if (!loggedIn) return null;
  if (allowedRoles && user && !allowedRoles.includes(user.role)) return null;

  return <>{children}</>;
};
