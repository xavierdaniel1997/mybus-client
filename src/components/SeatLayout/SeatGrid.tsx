"use client";

import { GiSteeringWheel } from "react-icons/gi";
import { BsDoorOpen } from "react-icons/bs";

interface SeatGridProps {
  layout: { id: string; type: string }[][];
  isUpperDeck: boolean
}

export default function SeatGrid({ layout, isUpperDeck }: SeatGridProps) {
    // console.log("layout details", layout)
  return (
    <div className="bg-gray-100 p-4 border-2 border-gray-200 rounded-lg shadow-lg relative inline-block">
      {/* TOP VIEW (driver + door) */}
      {!isUpperDeck ? <div className="flex justify-between items-center mb-3 px-2">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 flex justify-center items-center border-2 border-gray-500 text-gray-500 text-xl rounded-md">
            <BsDoorOpen />
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-8 h-8 flex justify-center items-center border-2 border-gray-400 text-gray-500 text-xl rounded-md">
            <GiSteeringWheel />
          </div>
        </div>
      </div> : <div className="p-2 h-12"></div>}

      {/* SEAT GRID */}
      <div className="flex">
        {layout.map((col, colIndex) => (
          <div key={colIndex} className="flex flex-col items-center mx-1">
            {col.map((seat, index) =>
              seat.type === "Aisle" ? (
                <div key={index} className="h-8 p-1" />
              ) : (
                <div
                  key={seat.id}
                  className={`${seat.type==="seater" ? "w-8 h-8" : "w-8 h-12"} bg-gray-400 hover:bg-gray-600 text-white text-xs flex justify-center items-center rounded-sm cursor-pointer mb-1`}
                  
                >
                  <p className="text-xs">{seat.id}</p>
                </div>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
