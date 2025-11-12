"use client";

import { FaBusAlt } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import { BusFeatures } from "@/app/types/addBusType";
import { busFeatureIcons } from "./FeatureIcons";

interface TripCardProps {
  busName: string;
  busType: string;
  layoutName: string;
  information: string;
  departure: string;
  arrival: string;
  duration: string;
  seatsAvailable: number;
  singleSeats: number;
  originalPrice: number;
  discountedPrice: number;
  features?: BusFeatures;
  discountText?: string;
}

export default function TripCard({
  busName,
  busType,
  layoutName,
  information,
  departure,
  arrival,
  duration,
  seatsAvailable,
  singleSeats,
  originalPrice,
  discountedPrice,
  features,
  discountText = "Exclusive ₹150 OFF",
}: TripCardProps) {
  return (
    <div className="border border-gray-200 rounded-xl p-4 sm:p-5 bg-white shadow-sm hover:shadow-md transition-all">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        {/* Left Section */}
        <div className="w-full md:w-1/3 text-left">
          <div className="flex items-center gap-2 text-gray-700">
            <FaBusAlt className="text-gray-600 text-base sm:text-lg" />
            <h2 className="text-sm sm:text-base font-semibold text-gray-800 truncate">
              {busName}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{busType}</p>

          <button className="mt-2 sm:mt-3 text-xs sm:text-sm font-medium text-blue-700 bg-blue-50 px-2.5 sm:px-3 py-1 rounded-md">
            {information}
          </button>
        </div>

        {/* Center Section */}
        <div className="w-full md:w-1/3 text-left">
          <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-gray-800">
            <span>{departure}</span>
            <BsArrowRight className="text-gray-400 text-base sm:text-lg" />
            <span>{arrival}</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {duration} • {seatsAvailable} Seats{" "}
            <span className="text-gray-700 font-medium">
              ({singleSeats} Single)
            </span>
          </p>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/3 flex flex-col items-start md:items-end text-left md:text-right">
          <div className="bg-amber-100 text-amber-800 text-[10px] sm:text-xs font-medium px-2.5 sm:px-3 py-1 rounded-full mt-1">
            {discountText}
          </div>

          <div className="flex items-center gap-1 sm:gap-2 mt-2">
            <span className="text-xs sm:text-sm line-through text-gray-400">
              ₹{originalPrice}
            </span>
            <span className="text-lg sm:text-xl font-bold text-gray-800">
              ₹{discountedPrice}
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-gray-500 -mt-1">Onwards</p>
        </div>
      </div>

      {/* ✅ Features and Button Row */}
      <div className="flex flex-row justify-between items-center border-t border-dashed mt-3 pt-3 flex-wrap gap-2">
        <div className="flex flex-wrap gap-2 text-gray-600 text-lg">
          {features &&
            Object.entries(features)
              .filter(([key, value]) => value && busFeatureIcons[key])
              .map(([key]) => (
                <span key={key} className="flex items-center text-gray-500">
                  {busFeatureIcons[key]}
                </span>
              ))}
        </div>

        <button className="bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-sm font-semibold px-5 sm:px-6 py-2 rounded-full transition-colors">
          View seats
        </button>
      </div>
    </div>
  );
}
