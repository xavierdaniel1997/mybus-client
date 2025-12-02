"use client";

import { useTripBookingStore } from "@/app/(store)/useTripBookingStore";
import { useTripStore } from "@/app/(store)/useTripStore";
import TripStepper from "@/components/tripBooking/TripStepper";
import { api } from "@/lib/api";
import { handleApiError } from "@/lib/utils/handleApiError";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function TripDetailsPage() {
  const { id } = useParams();
  const setTripData = useTripBookingStore((s) => s.setTripData);
  const tripData = useTripBookingStore((s) => s.tripData);
  const { selectedTrip, searchResults } = useTripStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getTripDetail = async () => {
      if (!id) {
        setIsLoading(false);
        return;
      }

      try {
        // Check if we have cached trip for instant UI feedback
        const cachedTrip = selectedTrip?._id === id
          ? selectedTrip
          : searchResults.find((trip) => trip._id === id);

        // If we have cached data, show it immediately for instant feedback
        // But still fetch full details in background for seat layout
        if (cachedTrip) {
          // Show basic trip info immediately
          setIsLoading(false);
        }

        // Always fetch full trip details from API (includes seat layout)
        const response = await api.get(`/mytrips/get-trip-detail/${id}`);
        setTripData(response.data);
        setIsLoading(false);
      } catch (error) {
        handleApiError(error);
        setIsLoading(false);
      }
    };

    getTripDetail();
  }, [id, selectedTrip, searchResults, setTripData]);

  // Show loading state only on initial load
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading trip details...</p>
        </div>
      </div>
    );
  }

  return <TripStepper />;
}
