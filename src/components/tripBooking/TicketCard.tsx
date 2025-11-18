"use client";

import { FaBus, FaLongArrowAltRight } from "react-icons/fa";

export default function BusTicketCard() {
  return (
    <div className="bg-gray-50 rounded-2xl shadow-lg overflow-hidden border border-gray-200 w-full max-w-3xl mx-auto">

      {/* Header */}
      <div className="bg-blue-600 text-white px-6 py-3 flex justify-between">
        <div className="flex items-center gap-2">
          <FaBus className="text-md" />
          <h1 className="font-semibold text-lg">CityLink Travels</h1>
        </div>
        <p className="uppercase text-sm md:text-base">Bus Ticket</p>
      </div>

      {/* Content Wrapper */}
      <div className="flex flex-col md:flex-row">

        {/* Left Info Section */}
        <div className="px-6 py-4 md:w-2/3 grid grid-cols-2 sm:grid-cols-3 gap-y-4 text-sm">

          <div>
            <p className="text-gray-500 text-xs">Passenger</p>
            <p className="font-semibold text-base sm:text-lg">John Doe</p>
          </div>

          <div>
            <p className="text-gray-500 text-xs">Date</p>
            <p className="font-semibold text-base sm:text-lg">20 Nov 2025</p>
          </div>

          <div>
            <p className="text-gray-500 text-xs">Bus No</p>
            <p className="font-semibold text-base sm:text-lg">CLX 2025</p>
          </div>

          <div>
            <p className="text-gray-500 text-xs">Seat</p>
            <p className="font-semibold text-base">18A</p>
          </div>

          <div>
            <p className="text-gray-500 text-xs">Boarding Time</p>
            <p className="font-semibold text-base sm:text-lg">08:20</p>
          </div>

          <div>
            <p className="text-gray-500 text-xs">Departure</p>
            <p className="font-semibold text-base sm:text-lg">08:40</p>
          </div>

        </div>

        {/* Right Route Section */}
        <div className="px-6 py-4 md:w-1/3 border-t md:border-t-0 md:border-l flex items-center justify-between">

          {/* FROM */}
          <div>
            <p className="text-gray-400 text-xs">FROM</p>
            <p className="text-blue-600 font-bold text-lg">NYC</p>
            <p className="text-gray-600 text-xs">New York</p>
          </div>

          {/* Arrow */}
          <div className="flex-1 flex items-center justify-center">
            <FaLongArrowAltRight size={25} className="scale-x-[2]" />
          </div>

          {/* TO */}
          <div>
            <p className="text-gray-400 text-xs">TO</p>
            <p className="text-blue-600 font-bold text-lg">BOS</p>
            <p className="text-gray-600 text-xs">Boston</p>
          </div>

        </div>

      </div>
    </div>
  );
}
