"use client";

import { useTripBookingStore } from "@/app/(store)/useTripBookingStore";
import PointSelector from "../bus/PointSelector";
import dayjs from "dayjs";

export default function BoardingSelection() {
  const {
    tripData,
    setBoardingPoint,
    setDroppingPoint,
    boardingPoint,
    droppingPoint,
    nextStep
  } = useTripBookingStore();

  return (
    <div className="mx-auto w-[95%] sm:w-[90%] lg:w-[85%] max-w-6xl pb-10">
      <div
        className="
          flex flex-col lg:flex-row 
          justify-center items-center lg:items-start 
          gap-6 lg:gap-8
        "
      >
        {/* Left: Boarding Points */}
        <PointSelector
          title="Boarding Points"
          subtitle={tripData?.route.source.name}
          travelDate={
            tripData?.travelDate
              ? dayjs(tripData.travelDate).format("ddd DD MMM")
              : ""
          }
          points={tripData?.route.boardingPoints || []}
          groupName="boardingPoints"
          onSelect={(pointId: string) => setBoardingPoint(pointId)}
        />

        {/* Right: Dropping Points + Button */}
        <div
          className="
            flex flex-col items-center lg:items-end 
            w-full sm:w-[320px] md:w-[360px] lg:w-[400px]
          "
        >
          <PointSelector
            title="Dropping Points"
            subtitle={tripData?.route.destination.name}
            travelDate={
              tripData?.travelDate
                ? dayjs(tripData.travelDate).format("ddd DD MMM")
                : ""
            }
            points={tripData?.route.droppingPoints || []}
            groupName="droppingPoints"
            onSelect={(pointId: string) => setDroppingPoint(pointId)}
          />

          {/* Button below right container */}
          {boardingPoint && droppingPoint && <button
            className="
              mt-4 w-full 
              bg-blue-500 hover:bg-blue-600 
              transition-colors px-4 py-2 
              text-white font-semibold rounded-full 
              text-sm sm:text-base
            "
            onClick={nextStep}
          >
            Fill Passenger Details
          </button>}
        </div>
      </div>
    </div>
  );
}
