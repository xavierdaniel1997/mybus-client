import { create } from "zustand";
import { TripData } from "../types/tripSearchResponse";

interface TripStore {
  searchResults: TripData[];
  setSearchResults: (data: TripData[]) => void;
  clearSearchResults: () => void;
}

export const useTripStore = create<TripStore>((set) => ({
  searchResults: [],
  setSearchResults: (data) => set({ searchResults: data }),
  clearSearchResults: () => set({ searchResults: [] }),
}));
