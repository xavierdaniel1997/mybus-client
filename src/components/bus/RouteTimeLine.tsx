"use client";

import { useState } from "react";
import { RoutePoint } from "@/app/types/busroute";

interface RouteTimeLineProps {
  points: RoutePoint[];
}

export default function RouteTimeLine({ points }: RouteTimeLineProps) {
  const [showAll, setShowAll] = useState(false);

  // Show first 2 if collapsed, else show all
  const visiblePoints = showAll ? points : points.slice(0, 2);

  return (
    <div className="px-8 pb-8 relative">
      <div className="relative">
        {/* Center Line */}
        <div className="absolute left-[70px] top-0 bottom-0 w-[2px] bg-gray-300"></div>

        {/* Points */}
        <div className="space-y-6">
          {visiblePoints.map((location) => (
            <div key={location._id} className="flex items-start gap-4 relative">
              {/* Time */}
              <div className="w-[70px] text-left">
                <p className="font-semibold text-sm text-gray-900">{location.time}</p>
              </div>

              {/* Dot */}
              <div className="relative">
                <span className="absolute right-[10px] top-1 w-[10px] h-[10px] bg-gray-500 rounded-full"></span>
              </div>

              {/* Location Details */}
              <div>
                <p className="font-semibold text-md text-gray-900">{location.landmark}</p>
                <p className="text-[11px] text-gray-500">{location.name}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Toggle Button */}
       {points.length > 2 && (
  <div className="mt-4 sticky bottom-0 z-10 backdrop-blur-md bg-blue-50 shadow-2xl  rounded-full">
    <button
      onClick={() => setShowAll((prev) => !prev)}
      className="w-full text-sm font-medium text-blue-600 hover:underline focus:outline-none p-2 rounded-full"
    >
      {showAll ? "See less" : "See more"}
    </button>
  </div>
)}

      </div>
    </div>
  );
}
