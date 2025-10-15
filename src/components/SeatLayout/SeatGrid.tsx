"use client";

import { GiSteeringWheel } from "react-icons/gi";
import { BsDoorOpen } from "react-icons/bs";

interface SeatGridProps {
  layout: { id: string; type: string }[][];
  isUpperDeck: boolean
}

export default function SeatGrid({ layout, isUpperDeck }: SeatGridProps) {
    console.log("layout details", layout)
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-lg relative inline-block">
      {/* TOP VIEW (driver + door) */}
      {!isUpperDeck ? <div className="flex justify-between items-center mb-3 px-2">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 flex justify-center items-center border-2 border-blue-600 text-blue-600 text-xl rounded-md">
            <BsDoorOpen />
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-10 h-10 flex justify-center items-center border-2 border-blue-600 text-blue-600 text-xl rounded-md">
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
                <div key={index} className="h-8 p-3" />
              ) : (
                <div
                  key={seat.id}
                  className={`${seat.type==="seater" ? "w-12 h-14" : "w-14 h-20"} bg-blue-500 hover:bg-blue-600 text-white text-xs flex justify-center items-center rounded-sm cursor-pointer mb-1`}
                  
                >
                  {seat.id}
                </div>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
