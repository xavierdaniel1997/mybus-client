"use client";

import { useState } from "react";
import {
  MdOutlineAirlineSeatReclineExtra,
  MdOutlineAirlineSeatIndividualSuite,
  MdOutlineAirlineSeatFlatAngled,
} from "react-icons/md";
import { HiSwitchHorizontal } from "react-icons/hi";
import { BsCalendarDate } from "react-icons/bs";
import { FaLocationArrow } from "react-icons/fa";

export default function SearchForm() {
  const [activeTab, setActiveTab] = useState("Seater");

  const tabs = [
    { name: "Seater", icon: <MdOutlineAirlineSeatReclineExtra /> },
    { name: "Semi-Sleeper", icon: <MdOutlineAirlineSeatFlatAngled /> },
    { name: "Sleeper", icon: <MdOutlineAirlineSeatIndividualSuite /> },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mx-auto w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] max-w-5xl">
      {/* ===== Tabs ===== */}
      <div className="flex justify-around sm:justify-start gap-4 sm:gap-8 border-b pb-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex items-center gap-2 text-gray-700 font-medium pb-2 border-b-2 transition ${
              activeTab === tab.name
                ? "border-red-500 text-red-600"
                : "border-transparent"
            }`}
          >
            <span className="text-xl">{tab.icon}</span>
            <span className="whitespace-nowrap">{tab.name}</span>
          </button>
        ))}
      </div>

      {/* ===== Search Form ===== */}
      <form className="mt-4 flex flex-col lg:flex-row items-stretch gap-3 w-full">
        {/* From Input */}
        <div className="flex items-center bg-gray-100 rounded-lg px-4 py-3 flex-1 min-w-[150px]">
          <FaLocationArrow className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Leaving From"
            className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-500"
          />
        </div>

        {/* Swap Button */}
        <div className="flex justify-center items-center lg:px-1">
          <HiSwitchHorizontal className="text-gray-500 text-2xl rotate-90 lg:rotate-0" />
        </div>

        {/* To Input */}
        <div className="flex items-center bg-gray-100 rounded-lg px-4 py-3 flex-1 min-w-[150px]">
          <FaLocationArrow className="text-gray-500 mr-2 rotate-180" />
          <input
            type="text"
            placeholder="Going To"
            className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-500"
          />
        </div>

        {/* Departure Date */}
        <div className="flex items-center justify-between bg-gray-100 rounded-lg px-4 py-3 flex-1 min-w-[190px]">
          <div className="flex items-center gap-2">
            {/* <BsCalendarDate className="text-gray-500" /> */}
            <span className="text-gray-700 font-medium">Dept</span>
          </div>
          <input
            type="date"
            className="bg-transparent outline-none text-gray-700 font-semibold w-[120px]"
            defaultValue={new Date().toISOString().split("T")[0]}
          />
        </div>

        {/* Buttons Section */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-2 lg:gap-3 w-full lg:w-auto">
          <button
            type="button"
            className="bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 px-4 py-2 font-medium"
          >
            Today
          </button>
          <button
            type="button"
            className="bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 px-4 py-2 font-medium"
          >
            Tomorrow
          </button>
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-6 py-2 font-semibold w-full sm:w-auto"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
