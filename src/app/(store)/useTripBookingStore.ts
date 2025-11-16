// store/useTripBookingStore.ts
"use client";

import { create } from "zustand";
import { ITripData } from "../types/tripSearchResponse";
import { RoutePoint } from "../types/busroute";

interface Passenger {
  name: string;
  age: number;
  gender: string;
}

interface ContactDetails {
  phoneCode: string;
  phone: string;
  email: string;
  state: string;
  whatsappEnabled: boolean;
}

interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
}

interface TripBookingState {
  tripData: ITripData | null;
  selectedSeats: string[];
  boardingPoint?: RoutePoint;
  droppingPoint?: RoutePoint;
  passengers: Passenger[];
  currentStep: "seats" | "boarding" | "passenger";
  seatPrice?: number;
  contact?: ContactDetails;

  razorpayOrder: RazorpayOrder | null;

  // Actions
  setTripData: (data: ITripData) => void;
  toggleSeat: (seatId: string) => void;
  setBoardingPoint: (point: RoutePoint) => void;
  setDroppingPoint: (point: RoutePoint) => void;
  setPassengers: (passengers: Passenger[]) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetBooking: () => void;
  goToStep: (step: "seats" | "boarding" | "passenger") => void;
  totalSeatPrice: (price: number) => void;
  setContactDetails: (contact: ContactDetails) => void;

  setRazorpayOrder: (order: RazorpayOrder | null) => void;
  clearRazorpayOrder: () => void;
}

export const useTripBookingStore = create<TripBookingState>((set) => ({
  tripData: null,
  selectedSeats: [],
  passengers: [],
  currentStep: "seats",
  razorpayOrder: null,

  setTripData: (data) => set({ tripData: data }),

  toggleSeat: (seatId) =>
    set((state) => {
      const exists = state.selectedSeats.includes(seatId);
      return {
        selectedSeats: exists
          ? state.selectedSeats.filter((s) => s !== seatId)
          : [...state.selectedSeats, seatId],
      };
    }),

  setBoardingPoint: (point) => set({ boardingPoint: point }),
  setDroppingPoint: (point) => set({ droppingPoint: point }),

  setPassengers: (passengers) => set({ passengers }),

  nextStep: () =>
    set((state) => {
      const order = ["seats", "boarding", "passenger"] as const;
      const next = order[order.indexOf(state.currentStep) + 1] || "passenger";
      return { currentStep: next };
    }),

  prevStep: () =>
    set((state) => {
      const order = ["seats", "boarding", "passenger"] as const;
      const prev = order[order.indexOf(state.currentStep) - 1] || "seats";
      return { currentStep: prev };
    }),

  goToStep: (step) => set({ currentStep: step }),

  resetBooking: () =>
    set({
      tripData: null,
      selectedSeats: [],
      boardingPoint: undefined,
      droppingPoint: undefined,
      passengers: [],
      currentStep: "seats",
      razorpayOrder: null,
    }),

  totalSeatPrice: (price) => set({ seatPrice: price }),

  setContactDetails: (contact) =>
    set((state) => {
      if (JSON.stringify(state.contact) === JSON.stringify(contact)) {
        return state;
      }
      return { contact };
    }),

  // Razorpay
  setRazorpayOrder: (order) => set({ razorpayOrder: order }),
  clearRazorpayOrder: () => set({ razorpayOrder: null }),
}));
