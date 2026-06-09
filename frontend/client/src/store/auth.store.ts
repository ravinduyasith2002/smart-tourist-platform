/**
 * SmartTouristPlatform - Auth Store
 * Manages authentication state and user session
 */

import { User, UserRole } from '@/types/common';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

class AuthStore {
  private state: AuthState = initialState;
  private listeners: Set<() => void> = new Set();

  /**
   * Subscribe to state changes
   */
  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /**
   * Notify all listeners of state change
   */
  private notify(): void {
    this.listeners.forEach(listener => listener());
  }

  /**
   * Get current state
   */
  getState(): AuthState {
    return { ...this.state };
  }

  /**
   * Set user and token
   */
  setAuth(user: User, token: string): void {
    this.state = {
      ...this.state,
      user,
      token,
      isAuthenticated: true,
      error: null,
    };
    this.notify();
  }

  /**
   * Clear auth (logout)
   */
  clearAuth(): void {
    this.state = {
      ...this.state,
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
    };
    this.notify();
  }

  /**
   * Set loading state
   */
  setLoading(isLoading: boolean): void {
    this.state = { ...this.state, isLoading };
    this.notify();
  }

  /**
   * Set error
   */
  setError(error: string | null): void {
    this.state = { ...this.state, error };
    this.notify();
  }

  /**
   * Update user
   */
  updateUser(user: Partial<User>): void {
    if (this.state.user) {
      this.state.user = { ...this.state.user, ...user };
      this.notify();
    }
  }

  /**
   * Check if user has specific role
   */
  hasRole(role: UserRole): boolean {
    return this.state.user?.role === role;
  }

  /**
   * Check if user is authenticated
   */
  isAuth(): boolean {
    return this.state.isAuthenticated;
  }

  /**
   * Get current user
   */
  getUser(): User | null {
    return this.state.user || null;
  }

  /**
   * Get auth token
   */
  getToken(): string | null {
    return this.state.token || null;
  }
}

export const authStore = new AuthStore();
