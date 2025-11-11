"use client";

import { FaBusAlt } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import { BusFeatures } from "@/app/types/addBusType";
import { busFeatureIcons, featureIcons } from "./FeatureIcons";


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
    <div className=" border border-gray-200 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-all">
    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
      {/* Left Section */}
      <div className="flex flex-col items-start w-full md:w-1/3">
        <div className="flex items-center gap-2 text-gray-700">
          <FaBusAlt className="text-gray-600 text-lg" />
          <h2 className="text-base font-semibold text-gray-800">{busName}</h2>
        </div>
        <p className="text-sm text-gray-500 mt-0.5">{busType}</p>

        <button className="mt-3 text-xs font-medium text-blue-700 bg-blue-50 px-3 py-1 rounded-md">
          {information}
        </button>
      </div>

      {/* Center Section */}
      <div className="flex flex-col items-center text-center w-full md:w-1/3">
        <div className="flex items-center gap-2 text-base font-semibold text-gray-800">
          <span>{departure}</span>
          <BsArrowRight className="text-gray-400 text-lg" />
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
      <div className="flex flex-col items-end w-full md:w-1/3">
        <div className="bg-amber-100 text-amber-800 text-xs font-medium px-3 py-1 rounded-full self-end">
          {discountText}
        </div>

        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm line-through text-gray-400">
            ₹{originalPrice}
          </span>
          <span className="text-xl font-bold text-gray-800">
            ₹{discountedPrice}
          </span>
        </div>
        <p className="text-xs text-gray-500 -mt-1">Onwards</p>
      </div>
    </div>
    <div className="flex justify-between items-center border-t mt-2 border-dashed">
      <div className="flex flex-wrap gap-2.5 text-gray-600 text-lg">
    {features &&
      Object.entries(features)
        .filter(([key, value]) => value && busFeatureIcons[key])
        .map(([key]) => (
          <span key={key} className="flex items-center text-gray-500">
            {busFeatureIcons[key]}
          </span>
        ))}
  </div>
      <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-6 py-2 rounded-full mt-3 transition-colors">
          View seats
        </button>
        </div>
        </div>
  );
}
