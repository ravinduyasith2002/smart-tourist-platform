/**
 * SmartTouristPlatform - useAuth Hook
 * Custom hook for accessing auth state and methods
 */

import { useEffect, useState } from 'react';
import { authStore } from '@/store/auth.store';
import { User, UserRole } from '@/types/common';

interface UseAuthReturn {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  hasRole: (role: UserRole) => boolean;
  updateUser: (user: Partial<User>) => void;
}

export function useAuth(): UseAuthReturn {
  const [state, setState] = useState(() => authStore.getState());

  useEffect(() => {
    const unsubscribe = authStore.subscribe(() => {
      setState(authStore.getState());
    });

    return unsubscribe;
  }, []);

  return {
    user: state.user,
    token: state.token,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,
    login: (user: User, token: string) => authStore.setAuth(user, token),
    logout: () => authStore.clearAuth(),
    hasRole: (role: UserRole) => authStore.hasRole(role),
    updateUser: (user: Partial<User>) => authStore.updateUser(user),
  };
}
