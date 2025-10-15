import {ISeat} from "@/app/types/seat";

interface SeatProps {
  seat: ISeat;
}

export default function Seat({seat}: SeatProps) {
  return (
    <div
      className={`w-10 h-10 flex justify-center items-center rounded-sm cursor-pointer mb-1 text-xs text-white ${
        seat.type === "Aisle" ? "h-8 p-3" : "bg-blue-500 hover:bg-blue-600"
      }`}
    >
      {seat.type !== "Aisle" && seat.id}
    </div>
  );
}
