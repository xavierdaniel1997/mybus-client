// authStore.ts
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { IUser } from '../types/user';

interface AuthState {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  tokenExpiry: number | null; // Store token expiration timestamp (in milliseconds)
  setAuth: (user: IUser, token: string, expiresIn?: number) => void;
  clearAuth: () => void;
  setToken: (token: string, expiresIn: number) => void; // For updating token after refresh
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      tokenExpiry: null,
      setAuth: (user, token, expiresIn) =>
        set({
          user,
          token,
          isAuthenticated: true,
          tokenExpiry: Date.now() + ((expiresIn ?? 15 * 60) * 1000) // 15 minits
        }),
      clearAuth: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          tokenExpiry: null,
        }),
      setToken: (token, expiresIn) =>
        set({
          token,
          tokenExpiry: Date.now() + expiresIn * 1000,
        }),
    }),
    {
      name: 'auth-storage', // Key for localStorage
      storage: createJSONStorage(() => localStorage), // Use localStorage for persistence
    }
  )
);