"use client";

import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

interface PassengerFormProps {
  passengerNumber: number;
  seatInfo: string;
}

export default function PassengerForm({
  passengerNumber,
  seatInfo,
}: PassengerFormProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [gender, setGender] = useState("");

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5 transition-all">
      {/* Header */}
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-green-100 flex items-center justify-center">
            <FaUser className="text-green-600 text-lg sm:text-xl" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 text-base sm:text-lg">
              Passenger {passengerNumber}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500">{seatInfo}</p>
          </div>
        </div>
        {isOpen ? (
          <IoIosArrowUp className="text-gray-500 text-lg sm:text-xl" />
        ) : (
          <IoIosArrowDown className="text-gray-500 text-lg sm:text-xl" />
        )}
      </div>

      {/* Form Section */}
      {isOpen && (
        <div className="mt-4 border-t border-dashed pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter name"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Age <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                placeholder="Enter age"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm sm:text-base text-gray-700 mb-2">
              Gender <span className="text-red-500">*</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <button
                onClick={() => setGender("Male")}
                className={`flex-1 border rounded-full px-4 py-2 text-sm sm:text-base transition-all ${
                  gender === "Male"
                    ? "border-blue-500 text-blue-600 bg-blue-50"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                Male
              </button>
              <button
                onClick={() => setGender("Female")}
                className={`flex-1 border rounded-full px-4 py-2 text-sm sm:text-base transition-all ${
                  gender === "Female"
                    ? "border-blue-500 text-blue-600 bg-blue-50"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                Female
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
