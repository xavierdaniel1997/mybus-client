"use client";
import { create } from "zustand";

interface AuthDialogState {
  open: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

export const useAuthDialogStore = create<AuthDialogState>((set) => ({
  open: false,
  openDialog: () => set({ open: true }),
  closeDialog: () => set({ open: false }),
}));
