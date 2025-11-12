// components/trip/steps/PassengerInfo.tsx
"use client";


import { useTripBookingStore } from "@/app/(store)/useTripBookingStore";
import { useState } from "react";

export default function PassengerInfo() {
  const { selectedSeats, setPassengers, passengers, prevStep } = useTripBookingStore();
  const [localPassengers, setLocalPassengers] = useState(
    passengers.length
      ? passengers
      : selectedSeats.map(() => ({ name: "", age: "", gender: "M" }))
  );


  return (
    <div className="mx-auto w-[95%] sm:w-[90%] lg:w-[85%] max-w-6xl pb-10">
      <h2 className="font-semibold mb-4 text-lg text-gray-700">Enter Passenger Details</h2>
   
    </div>
  );
}
