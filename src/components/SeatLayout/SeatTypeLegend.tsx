

import { GiSteeringWheel } from "react-icons/gi";
import { BsDoorOpen } from "react-icons/bs";

const busSeatTypes = [
  { name: "Seat", icon: "" },
  { name: "Driver", icon: <GiSteeringWheel /> },
  { name: "Bearth", icon: "" },
  { name: "Entrance", icon: <BsDoorOpen /> },
];

export default function SeatTypeLegend(){
    return(
        <div className="space-y-3">
    {busSeatTypes.map((busType) => (
      <div key={busType.name} className="flex items-center gap-3">
        {busType.icon ? (
          <div className="w-10 h-10 flex justify-center items-center text-blue-500 rounded-sm text-xl border-2 border-blue-500">
            {busType.icon}
          </div>
        ) : (
          <div className="w-10 h-10 bg-blue-600 rounded-sm" />
        )}
        <p>{busType.name}</p>
      </div>
    ))}
  </div>
    )
}


