"use client";

import { ITripData } from "@/app/types/tripSearchResponse";
import RouteTimeLine from "../bus/RouteTimeLine";
import dayjs from "dayjs";
import { RoutePoint } from "@/app/types/busroute";
import { ContactDetails, Passenger } from "@/app/types/passanger";

interface TripSummaryPanelProps {
  tripData: ITripData;
  stops: RoutePoint[];
  selectedSeats: string[];
  seatPrice: number;
  contact?: ContactDetails;
  passengers?: Passenger[];
}

export default function TripSummaryPanel({
  tripData,
  stops,
  selectedSeats,
  seatPrice,
  contact,
  passengers,
}: TripSummaryPanelProps) {
  return (
    <div className="w-full">
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

            <h1 className="text-base font-semibold text-gray-800 mb-2">Your ticket will be sent to</h1>
        <div className="space-y-2  border-t">
            <p className="mt-2">{contact?.email}</p>
            <p>{contact?.phone}</p>
        </div>

        {/* Passenger + Seat Mapping */}
<div className="mt-4">
  <h3 className="text-base font-semibold text-gray-800 mb-2">
    Passenger Details
  </h3>

  <div className="space-y-3  border-t border-b">
    {passengers?.map((passenger, index) => {
      const seat = selectedSeats[index];

      return (
        <div
          key={index}
          className="flex items-center justify-between p-3"
        >
          {/* Passenger Info */}
          <div className="flex flex-col">
            <span className="font-medium text-gray-900">{passenger.name}</span>
            <span className="text-sm text-gray-600">
              {passenger.gender} · {passenger.age} yrs
            </span>
          </div>

          {/* Seat Pill */}
          <span className="px-3 py-1 bg-gray-300 rounded-full text-sm font-semibold">
            {seat}
          </span>
        </div>
      );
    })}
  </div>
</div>


        {/* Seats Info */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-medium">{selectedSeats.length} Seats:</p>

              {selectedSeats.map((seat) => (
                <span
                  key={seat}
                  className="text-sm px-2 py-1 bg-gray-200 rounded-full font-medium"
                >
                  {seat}
                </span>
              ))}
            </div>

            <p className="font-semibold text-lg mt-1 sm:mt-0">
            Total  ₹ {seatPrice}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
