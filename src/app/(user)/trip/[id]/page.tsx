"use client";

import { useTripBookingStore } from "@/app/(store)/useTripBookingStore";
import TripStepper from "@/components/tripBooking/TripStepper";
import { api } from "@/lib/api";
import { handleApiError } from "@/lib/utils/handleApiError";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function TripDetailsPage() {
  const { id } = useParams();
  const setTripData = useTripBookingStore((s) => s.setTripData);

  const getTripDetail = async () => {
    if (!id) return;
    try {
      const response = await api.get(`/mytrips/get-trip-detail/${id}`);
      setTripData(response.data);
    } catch (error) {
      handleApiError(error);
    }
  };
  useEffect(() => {
    getTripDetail();
  }, [id]);

 

   return <TripStepper />;
}
