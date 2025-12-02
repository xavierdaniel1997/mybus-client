import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { TripData } from "../types/tripSearchResponse";

interface TripStore {
  searchResults: TripData[];
  selectedTrip: TripData | null;
  setSearchResults: (data: TripData[]) => void;
  setSelectedTrip: (trip: TripData | null) => void;
  clearSearchResults: () => void;
}

export const useTripStore = create<TripStore>()(
  persist(
    (set) => ({
      searchResults: [],
      selectedTrip: null,
      setSearchResults: (data) => set({ searchResults: data }),
      setSelectedTrip: (trip) => set({ selectedTrip: trip }),
      clearSearchResults: () => set({ searchResults: [], selectedTrip: null }),
    }),
    {
      name: "trip-store",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        searchResults: state.searchResults,
        selectedTrip: state.selectedTrip,
      }),
    }
  )
);
