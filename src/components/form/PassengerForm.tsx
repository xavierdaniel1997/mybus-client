"use client";

import { FaUser } from "react-icons/fa";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import type { UseFormRegister, UseFormWatch, UseFormSetValue } from "react-hook-form";
import { PassengerFormValues } from "@/app/types/passangerFormValues";


interface PassengerFormProps {
  passengerNumber: number;
  seatInfo: string;
  index: number;
  register: UseFormRegister<PassengerFormValues>;
  watch: UseFormWatch<PassengerFormValues>;
  setValue: UseFormSetValue<PassengerFormValues>;
}


export default function PassengerForm({
  passengerNumber,
  seatInfo,
  index,
  register,
  watch,
  setValue
}: PassengerFormProps) {

  const [isOpen, setIsOpen] = useState(true);
  const selectedGender = watch(`passengers.${index}.gender`);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-sm border p-4">

      {/* Header */}
      <div
        className="flex justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <FaUser className="text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold">Passenger {passengerNumber}</h3>
            <p className="text-gray-500 text-sm">{seatInfo}</p>
          </div>
        </div>

        {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>

      {isOpen && (
        <div className="mt-4 border-t pt-4">

          {/* Name & Age */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm">Full Name *</label>
              <input
                {...register(`passengers.${index}.name`, { required: true })}
                placeholder="Enter name"
                className="w-full border rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label className="text-sm">Age *</label>
              <input
                {...register(`passengers.${index}.age`, { required: true })}
                type="number"
                placeholder="Enter age"
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
          </div>

          {/* Gender */}
          <div className="mt-4">
            <p className="text-sm mb-2">Gender *</p>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() =>
                  setValue(`passengers.${index}.gender`, "Male")
                }
                className={`flex-1 border rounded-full px-4 py-2 ${
                  selectedGender === "Male"
                    ? "bg-blue-50 border-blue-500 text-blue-600"
                    : "border-gray-300"
                }`}
              >
                Male
              </button>

              <button
                type="button"
                onClick={() =>
                  setValue(`passengers.${index}.gender`, "Female")
                }
                className={`flex-1 border rounded-full px-4 py-2 ${
                  selectedGender === "Female"
                    ? "bg-blue-50 border-blue-500 text-blue-600"
                    : "border-gray-300"
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
