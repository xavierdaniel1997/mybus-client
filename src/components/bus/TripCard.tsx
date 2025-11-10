"use client";

import { FaBusAlt, FaStar } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";

interface TripCardProps {
  busName: string;
  busType: string;
  rating: number;
  totalRatings: number;
  departure: string;
  arrival: string;
  duration: string;
  seatsAvailable: number;
  singleSeats: number;
  originalPrice: number;
  discountedPrice: number;
  discountText?: string;
}

export default function TripCard({
  busName,
  busType,
  rating,
  totalRatings,
  departure,
  arrival,
  duration,
  seatsAvailable,
  singleSeats,
  originalPrice,
  discountedPrice,
  discountText = "Exclusive ₹100 OFF",
}: TripCardProps) {
  return (
    <div className="relative flex flex-col md:flex-row items-start justify-between gap-3 border border-gray-200 rounded-xl shadow-sm p-4 bg-white hover:shadow-md transition-all">
      {/* Left Section */}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <FaBusAlt className="text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-800">{busName}</h2>
        </div>
        <p className="text-sm text-gray-500 mt-1">{busType}</p>

        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center bg-green-600 text-white text-sm px-2 py-1 rounded-md">
            <FaStar className="mr-1 text-xs" />
            <span>{rating}</span>
          </div>
          <span className="text-gray-500 text-sm">{totalRatings}</span>
        </div>

        <div className="mt-3">
          <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-md font-medium">
            Free date change
          </span>
        </div>
      </div>

      {/* Center Section */}
      <div className="flex flex-col items-center justify-center text-center">
        <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <span>{departure}</span>
          <BsArrowRight className="text-gray-500" />
          <span>{arrival}</span>
        </div>
        <p className="text-sm text-gray-500">
          {duration} • {seatsAvailable} Seats{" "}
          <span className="text-orange-600 font-medium">({singleSeats} Single)</span>
        </p>
      </div>

      {/* Right Section */}
      <div className="flex flex-col items-end justify-between h-full mt-2 md:mt-0">
        <div className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-md font-medium">
          {discountText}
        </div>
        <div className="text-right mt-2">
          <p className="text-sm line-through text-gray-400">₹{originalPrice}</p>
          <p className="text-lg font-bold text-gray-800">₹{discountedPrice}</p>
          <p className="text-xs text-gray-500">Onwards</p>
        </div>
        <button className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded-full mt-3">
          View seats
        </button>
      </div>
    </div>
  );
}
