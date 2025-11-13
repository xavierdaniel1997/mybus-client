"use client";

import { RoutePoint } from "@/app/types/busroute";
import { useState } from "react";

interface PointSelectorProps {
  title: string;
  subtitle?: string;
  travelDate?: string;
  points: RoutePoint[];
  groupName: string;
  // onSelect: (pointId: string) => void;
  onSelect:(point: RoutePoint) => void;
}

export default function PointSelector({
  title,
  subtitle,
  travelDate,
  points,
  groupName,
  onSelect,
}: PointSelectorProps) {
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);

  const handleSelect = (point: RoutePoint) => {
    setSelectedPoint(point._id);
    onSelect?.(point);
  };

  return (
    <div
      className="
        w-full sm:w-[320px] md:w-[360px] lg:w-[400px]
        bg-white rounded-2xl shadow border p-4
        flex flex-col
        h-auto md:h-[520px] lg:h-[560px]
      "
    >
      {/* Header */}
      <div className="mb-4">
        <h2 className="font-semibold text-lg text-gray-900">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>

      {/* Points List */}
      <div className="divide-y divide-gray-200 overflow-y-auto flex-1">
        {points.map((point) => (
          <label
            key={point._id}
            className={`flex items-center justify-between py-3 px-2 cursor-pointer transition-colors rounded-lg ${
              selectedPoint === point._id
                ? "bg-blue-50 border border-blue-100"
                : "hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-3">
              {/* Time + Date stacked */}
              <div className="flex flex-col w-20 text-center">
                <span className="text-sm font-semibold text-gray-800">
                  {point.time}
                </span>
                <span className="text-xs text-gray-500">{travelDate}</span>
              </div>

              {/* Landmark + Place */}
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-900">
                  {point.landmark}
                </span>
                <span className="text-xs text-gray-500">{point.name}</span>
              </div>
            </div>

            <input
              type="radio"
              name={groupName}
              checked={selectedPoint === point._id}
              onChange={() => handleSelect(point)}
              className="accent-blue-600 w-4 h-4"
            />
          </label>
        ))}
      </div>
    </div>
  );
}
