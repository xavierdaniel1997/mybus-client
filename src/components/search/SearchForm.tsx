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
import axios from "axios";
import { toast } from "sonner";

type Props = {
  onSearch: (params: { from: string; to: string; date: string; seatType: string }) => void;
};

  type GeoCity = { city: string };

export default function SearchForm({ onSearch }: Props) {
  const [seatType, setSeatType] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [fromSuggestions, setFromSuggestions] = useState<string[]>([]);
  const [toSuggestions, setToSuggestions] = useState<string[]>([]);
  const [selectedDateOption, setSelectedDateOption] = useState<"today" | "tomorrow" | "custom">("custom");

  const [loading, setLoading] = useState(false);
 


  const fetchCities = async (query: string, setSuggestions: (suggestions: string[]) => void) => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get<{ data: GeoCity[] }>(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities`,
        {
          params: { countryIds: "IN", namePrefix: query },
          headers: {
            "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY!,
            "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
          },
        }
      );
      const cities = res.data.data.map((item) => item.city);
      setSuggestions(cities.slice(0, 6)); 
    } catch (err) {
      console.error(err);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };



    const seatTypes = [
    { name: "Seater", icon: <MdOutlineAirlineSeatReclineExtra /> },
    { name: "Semi-Sleeper", icon: <MdOutlineAirlineSeatFlatAngled /> },
    { name: "Sleeper", icon: <MdOutlineAirlineSeatIndividualSuite /> },
  ];


  const handleSelectSeatType = (seat: string) => {
  setSeatType(prev => (prev === seat ? "" : seat));
};


  //   const handleSwap = () => {
  //   setFrom(prev => {
  //     const old = prev;
  //     setFrom(to);
  //     setTo(old);
  //     return to;
  //   });
  // };

  const handleSwap = () => {
  const temp = from;
  setFrom(to);
  setTo(temp);
};


   const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // optional: basic validation
    if (!from || !to || !date) {
      // you can toast or show an inline error
      toast.error("Missing fields");
      return;
    }
    onSearch({ from, to, date, seatType });
  };


  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mx-auto w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] max-w-6xl">
      {/* ===== Tabs ===== */}
      <div className="flex justify-around sm:justify-start gap-4 sm:gap-8 border-b overflow-x-auto">
        {seatTypes.map((tab) => (
          <button
            key={tab.name}
            onClick={() => handleSelectSeatType(tab.name)}
            className={`flex items-center gap-2 text-gray-700 font-medium pb-2 border-b-2 transition ${
              seatType === tab.name
                ? "border-blue-500 text-blue-600"
                : "border-transparent"
            }`}
          >
            <span className={`text-xl ${
              seatType === tab.name
                ? "border-blue-500 text-blue-600"
                : "border-transparent"
            }`}>{tab.icon}</span>
            <span className={`whitespace-nowrap ${
              seatType === tab.name
                ? "border-blue-500 text-blue-600"
                : "border-transparent"
            }`}>{tab.name}</span>
          </button>
        ))}
      </div>

      {/* ===== Search Form ===== */}
      <form onSubmit={submit} className="mt-4 flex flex-col lg:flex-row items-stretch gap-3 w-full">
       
<div className="relative flex items-center bg-gray-100 rounded-lg px-4 py-3 flex-1 min-w-[150px]">
  <FaLocationArrow className="text-gray-500 mr-2" />
  <input
    type="text"
    value={from}
    onChange={(e) => {
      const value = e.target.value;
      setFrom(value);
      fetchCities(value, setFromSuggestions);
    }}
    placeholder="Leaving From"
    className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-500"
  />
  {fromSuggestions.length > 0 && (
    <ul className="absolute top-full left-0 w-full bg-white shadow-lg rounded-lg mt-1 max-h-48 overflow-auto z-10">
      {fromSuggestions.map((city) => (
        <li
          key={city}
          onClick={() => {
            setFrom(city);
            setFromSuggestions([]);
          }}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        >
          {city}
        </li>
      ))}
    </ul>
  )}
</div>


        {/* Swap Button */}
        <div className="flex justify-center items-center lg:px-1">
          <button
            type="button"
            onClick={handleSwap}
            aria-label="swap"
            className=""
          >
          <HiSwitchHorizontal className="text-gray-500 text-2xl rotate-90 lg:rotate-0" />
          </button>
        </div>

       {/* To Input */}
<div className="relative flex items-center bg-gray-100 rounded-lg px-4 py-3 flex-1 min-w-[150px]">
  <FaLocationArrow className="text-gray-500 mr-2 rotate-180" />
  <input
    type="text"
    value={to}
    onChange={(e) => {
      const value = e.target.value;
      setTo(value);
      fetchCities(value, setToSuggestions);
    }}
    placeholder="Going To"
    className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-500"
  />
  {toSuggestions.length > 0 && (
    <ul className="absolute top-full left-0 w-full bg-white shadow-lg rounded-lg mt-1 max-h-48 overflow-auto z-10">
      {toSuggestions.map((city) => (
        <li
          key={city}
          onClick={() => {
            setTo(city);
            setToSuggestions([]);
          }}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        >
          {city}
        </li>
      ))}
    </ul>
  )}
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
            // defaultValue={new Date().toISOString().split("T")[0]}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* Buttons Section */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-2 lg:gap-3 w-full lg:w-auto">
          <button
            type="button"
            // className="bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 px-4 py-2 font-medium"
             className={`rounded-lg px-4 py-2 font-medium transition ${
    selectedDateOption === "today"
      ? "bg-red-500 text-white"
      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
  }`}
            onClick={() => setDate(new Date().toISOString().split("T")[0])}
          >
            Today
          </button>
          <button
            type="button"
            // className="bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 px-4 py-2 font-medium"
             className={`rounded-lg px-4 py-2 font-medium transition ${
    selectedDateOption === "tomorrow"
      ? "bg-red-500 text-white"
      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
  }`}
             onClick={() => {
              const t = new Date();
              t.setDate(t.getDate() + 1);
              setDate(t.toISOString().split("T")[0]);
            }}
          >
            Tomorrow
          </button>
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-6 py-2 font-semibold w-full sm:w-auto " 
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
