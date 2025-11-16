"use client";

import React, { useMemo } from "react";
import { GiSteeringWheel } from "react-icons/gi";
import { BsDoorOpen } from "react-icons/bs";

type LayoutSeat = { id: string; type: string };

type PricingEntry = {
  seatId: string;
  price: number;
  isBooking?: boolean;
  _id?: string;
};

interface SeatGridProps {
  layout: LayoutSeat[][];
  isUpperDeck: boolean;
  basePrice?: number;
  seatPricing?: PricingEntry[];
  isUser?: boolean;
  onSeatClick?: (seatId: string, available: boolean) => void;
  selectedSeats?: string[];
}

const seatBase =
  "flex flex-col justify-center items-center text-xs rounded-sm mb-1 select-none transition-all duration-200";

function formatPrice(p?: number | null) {
  if (typeof p !== "number") return "";
  return `₹${p}`;
}

const SeatCell = React.memo(function SeatCell({
  seatId,
  sizeClasses,
  price,
  available,
  isUser,
  selected,
  onClick,
}: {
  seatId: string;
  sizeClasses: string;
  price?: number | null;
  available: boolean;
  isUser?: boolean;
  selected?: boolean;
  onClick?: () => void;
}) {
  const classes = `${seatBase} ${sizeClasses} ${
    selected
      ? "bg-gray-700 text-white"
      : available
      ? "bg-gray-400/90 text-white hover:bg-gray-700 cursor-pointer"
      : "bg-gray-300 text-gray-600 cursor-not-allowed"
  }`;

  return (
    <div
      role="button"
      aria-disabled={!available}
      title={available ? `${formatPrice(price) || "Available"}` : "Sold"}
      onClick={available ? onClick : undefined}
      className={classes}
    >
      <p className="text-[10px] truncate">{seatId}</p>
      {price != null && <p className="text-[10px] mt-0.5">{formatPrice(price)}</p>}
      {!available && <span className="text-[9px] mt-0.5 font-semibold">SOLD</span>}
    </div>
  );
});

export default function SeatGrid({
  layout,
  isUpperDeck,
  seatPricing = [],
  isUser,
  onSeatClick,
  selectedSeats,
}: SeatGridProps) {
  // seatId → price + isBooking map
  const priceMap = useMemo(() => {
    const map: Record<string, { price: number; isBooking: boolean }> = {};
    for (const p of seatPricing) {
      map[p.seatId] = { price: p.price, isBooking: !!p.isBooking };
    }
    return map;
  }, [seatPricing]);

  const getSizeClasses = (seatType: string) => {
    if (seatType === "seater") return isUser ? "w-12 h-20" : "w-8 h-8";
    return isUser ? "w-12 h-20" : "w-10 h-16";
  };

  return (
    <div className="bg-gray-100 p-4 border-2 border-gray-200 rounded-lg relative inline-block">
      {!isUpperDeck ? (
        <div className="flex justify-between items-center mb-5 px-2">
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
        </div>
      ) : (
        <div className="p-2 h-12"></div>
      )}

      {/* SEAT GRID */}
      <div className="flex">
        {layout.map((col, colIndex) => (
          <div key={colIndex} className="flex flex-col items-center mx-1">
            {col.map((seat, index) => {
              if (seat.type === "Aisle") {
                return <div key={index} className="h-8 p-1" />;
              }

              const seatInfo = priceMap[seat.id];
              const price = seatInfo?.price ?? null;

              // ✔ FIXED LOGIC: isBooking = true → seat is NOT available
              const isBooked = seatInfo?.isBooking === true;
              const available = !isBooked;

              return (
                <SeatCell
                  key={seat.id}
                  seatId={seat.id}
                  sizeClasses={getSizeClasses(seat.type)}
                  price={price}
                  available={available} // ✔ FIXED
                  isUser={isUser}
                  selected={selectedSeats?.includes(seat.id)}
                  onClick={() => onSeatClick?.(seat.id, available)} // ✔ FIXED
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
