"use client"
import { IRoutePoint } from "@/app/types/myBus";
import { useMemo, useState } from "react";



interface BoardingDroppingPointsProps{
    boardingPoints : IRoutePoint[];
    droppingPoints: IRoutePoint[];
    source: IRoutePoint | null;
    destination: IRoutePoint | null;

}

export default function BoardingDroppingPoints({boardingPoints, droppingPoints, source, destination}: BoardingDroppingPointsProps) {
  const [tab, setTab] = useState("boarding");
//   const points = tab === "boarding" ? boardingPoints : droppingPoints;
  const points = useMemo(() => {
    if (tab === "boarding") {
      // Add source at the beginning if available
      return source ? [source, ...boardingPoints] : boardingPoints;
    } else {
      // Add destination at the end if available
      return destination ? [...droppingPoints, destination] : droppingPoints;
    }
  }, [tab, boardingPoints, droppingPoints, source, destination]);

  return (
    <div className="min-w-[45vh] max-w-lg mx-auto overflow-y-auto  max-h-[420px]  rounded-md border-2 border-gray-200 bg-white">
      <h2 className="font-semibold text-base mb-4 text-gray-900 px-8 pt-8">
        Boarding and Dropping Points
      </h2>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-4 text-sm font-medium">
        <button
          className={`flex-1 py-2 text-center border-b-2 ${
            tab === "boarding" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500"
          }`}
          onClick={() => setTab("boarding")}
        >
          Boarding Point
        </button>
        <button
          className={`flex-1 py-2 text-center border-b-2 ${
            tab === "dropping" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500"
          }`}
          onClick={() => setTab("dropping")}
        >
          Dropping Point
        </button>
      </div>

      {/* Timeline */}
      <div className="px-8 pb-8 relative ">
        <div className="relative">

          {/* Center Line - moved closer */}
          <div className="absolute left-[70px] top-0 bottom-0 w-[2px] bg-gray-300"></div>

          {/* Points */}
          <div className="space-y-6">
            {points.map((location) => (
              <div key={location._id} className="flex items-start gap-4 relative">

                {/* Time */}
                <div className="w-[70px] text-left">
                  <p className="font-semibold text-sm text-gray-900">{location.time}</p>
                  {/* <p className="text-[11px] text-gray-500">{item?.date}</p> */}
                </div>

                {/* Dot aligned with new line */}
                <div className="relative">
                  <span className="absolute right-[10px] top-1 w-[10px] h-[10px] bg-gray-500 rounded-full"></span>
                </div>

                {/* Location Details */}
                <div className="">
                  <p className="font-semibold text-md text-gray-900">{location.landmark}</p>
                  <p className="text-[11px] text-gray-500">{location.name}</p>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
