
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { IUser } from '../types/user';

interface AuthState {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  tokenExpiry: number | null; // timestamp in ms
  _hasHydrated: boolean; // internal flag to indicate persist finished
  
  setAuth: (user: IUser, token: string, expiresIn?: number) => void;
  clearAuth: () => void;
  setToken: (token: string, expiresIn: number) => void;
  setHasHydrated: (v: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      tokenExpiry: null,
      _hasHydrated: false,

      setAuth: (user, token, expiresIn) => {
        const expiry = Date.now() + ((expiresIn ?? 15 * 60) * 1000);
        set({
          user,
          token,
          isAuthenticated: true,
          tokenExpiry: expiry,
        });
      },

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

      setHasHydrated: (v) => set({ _hasHydrated: v }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),

      // called before/after rehydrate
      onRehydrateStorage: () => (state) => {
        // state is the store's set/get; we can set the hydration flag after rehydrate.
        // Delay a microtask to ensure persisted state applied before we set the flag.
        Promise.resolve().then(() => {
          state?.setHasHydrated?.(true);
        });
      },
    }
  )
);
