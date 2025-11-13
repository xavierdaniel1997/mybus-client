"use client";

import { useTripBookingStore } from "@/app/(store)/useTripBookingStore";
import { useState } from "react";
import ContactDetails from "../form/ContactDetails";
import PassengerForm from "../form/PassengerForm";
import RouteTimeLine from "../bus/RouteTimeLine";
import dayjs from "dayjs";

export default function PassengerInfo() {
  const {
    tripData,
    selectedSeats,
    setPassengers,
    passengers,
    prevStep,
    boardingPoint,
    droppingPoint,
    seatPrice,
  } = useTripBookingStore();

  const [localPassengers, setLocalPassengers] = useState(
    passengers.length
      ? passengers
      : selectedSeats.map(() => ({ name: "", age: "", gender: "M" }))
  );

  const stops = [boardingPoint, droppingPoint].filter(
    (p): p is NonNullable<typeof boardingPoint> => Boolean(p)
  );

  return (
    <div className="mx-auto w-[95%] sm:w-[90%] lg:w-[85%] max-w-6xl pb-10">

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-3 lg:gap-6">
        {/* Left Section */}
        <div className="w-full lg:w-2/3 flex flex-col gap-5">
          <ContactDetails />
          {/* Each PassengerForm should align consistently */}
          {selectedSeats.map((seat, idx) => (
            <PassengerForm
              key={idx}
              passengerNumber={idx + 1}
              seatInfo={seat}
            />
          ))}
        </div>

        {/* Right Section (Trip Summary) */}
        <div className="w-full lg:w-1/3">
          <div className="space-y-6 bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5">
            {/* Trip Header */}
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-800">
                {tripData?.bus.name}
              </h2>
              <p className="text-sm text-gray-600">
                {tripData?.arrivalTime} – {tripData?.departureTime} ·{" "}
                {tripData?.travelDate
                  ? dayjs(tripData.travelDate).format("ddd DD MMM")
                  : ""}{" "}
                <span className="text-green-600">
                  {tripData?.route.duration}
                </span>
              </p>
              <p className="text-sm text-gray-700 mt-1">
                {tripData?.bus.layoutName}, {tripData?.bus.registrationNo}
              </p>
            </div>

            {/* Route Timeline */}
            <RouteTimeLine points={stops || []} />

            {/* Seats Info */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium">{selectedSeats.length} Seats:</p>
                  {selectedSeats.map((seat: string) => (
                    <span
                      key={seat}
                      className="text-sm px-2 py-1 bg-gray-200 rounded-full font-medium"
                    >
                      {seat}
                    </span>
                  ))}
                </div>
                <p className="font-semibold text-lg mt-1 sm:mt-0">
                  ₹ {seatPrice}
                </p>
              </div>
            </div>
          </div>

          {/* Button */}
          <button
            className="mt-4 w-full bg-blue-500 hover:bg-blue-600 transition-colors px-4 py-2 text-gray-100 font-semibold rounded-full text-sm sm:text-base"
          >
            Continue Booking
          </button>
        </div>
      </div>
    </div>
  );
}
