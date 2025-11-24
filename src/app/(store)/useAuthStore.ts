"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { IUser } from "../types/user";

interface AuthState {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  tokenExpiry: number | null;
  _hasHydrated: boolean;

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
        const ttlSeconds = expiresIn ?? 15 * 60; 
        const expiry = Date.now() + ttlSeconds * 1000;
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

      setToken: (token, expiresIn) => {
        const expiry = Date.now() + expiresIn * 1000;
        set({
          token,
          tokenExpiry: expiry,
        });
      },

      setHasHydrated: (v) => set({ _hasHydrated: v }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        tokenExpiry: state.tokenExpiry,
        isAuthenticated: state.isAuthenticated,
        _hasHydrated: state._hasHydrated,
      }),

      onRehydrateStorage: () => (state) => {
        Promise.resolve().then(() => {
          state?.setHasHydrated?.(true);
        });
      },
    }
  )
);
