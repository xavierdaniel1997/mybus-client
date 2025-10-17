

import { GiSteeringWheel } from "react-icons/gi";
import { BsDoorOpen } from "react-icons/bs";

const busSeatTypes = [
  { name: "Seat", icon: null },
  { name: "Driver", icon: <GiSteeringWheel /> },
  { name: "Bearth", icon: null },
  { name: "Entrance", icon: <BsDoorOpen /> },
  { name: "Total", icon: "" },
];

interface SeatTypeLegendProps{
  totalSeat?: number
}

export default function SeatTypeLegend({totalSeat}: SeatTypeLegendProps){
    return(
        <div className="space-y-3">
    {busSeatTypes.map((busType) => (
      <div key={busType.name} className="flex items-center gap-3">
        {busType.icon ? (
          <div className="w-10 h-10 flex justify-center items-center text-blue-500 rounded-sm text-xl border-2 border-blue-500">
            {busType.icon}
          </div>
        ) : totalSeat && busType.icon !== null ? <p className=" flex justify-center items-center text-gray-600 border-2 border-gray-600 w-10 h-10 rounded-sm">{totalSeat}</p> : (
          <div className="w-10 h-10 bg-blue-600 rounded-sm text-center " />
        )}
       <p >{busType.name}</p>
      </div>
    ))}
  </div>
    )
}


