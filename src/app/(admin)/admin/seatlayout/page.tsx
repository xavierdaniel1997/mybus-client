import {FaRegSave} from "react-icons/fa";
import { GiSteeringWheel } from "react-icons/gi";
import { BsDoorOpen } from "react-icons/bs";

const busSeatTypeName = [
    {name: "Seat", icon: ""},
    {name: "Driver", icon: <GiSteeringWheel/>},
    {name: "Bearth", icon: ""},
    {name: "Entrance", icon: <BsDoorOpen/>}
]
export default function SeatLayout() {
  return (
    <div className="px-20 py-3">

      {/* breadcrumb */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-700">
            Create Seating Layout
          </h1>
        </div>
        <div>
          <button className="flex items-center bg-blue-600 text-gray-50 px-4 py-1.5 rounded-md cursor-pointer gap-2">
            <span>
              <FaRegSave />
            </span>
            Save
          </button>
        </div>
      </div>

      {/* create layout form */}
      <div className="mt-7 flex gap-5">
        <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">
                  Bus Type
                </label>
                <select
                  className="border rounded-sm p-2 focus:ring focus:ring-blue-500 outline-none"
                >
                    <option value="">Seater</option>
                    <option value="">Semi Sleeper</option>
                    <option value="">Sleeper</option>
                </select>
        </div>
        <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">
                  Deck
                </label>
                <select
                  className="border rounded-sm p-2 focus:ring focus:ring-blue-500 outline-none"
                >
                    <option value="">1</option>
                    <option value="">2</option>
                </select>
        </div>
        <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">
                 Columns
                </label>
                <input
                  type="number"
                  id="colums"
                  className="w-14 border rounded-sm py-2 px-1 focus:ring focus:ring-blue-500 outline-none"
                  placeholder="16"
                />
        </div>
        <div className="flex items-center gap-2">
            <label className="ext-sm text-gray-600">
                 Rows
                </label>
                <input
                  type="number"
                  id="latitude"
                  className="w-14 border rounded-md py-2 px-1 focus:ring focus:ring-blue-500 outline-none"
                  placeholder="2"
                />
        </div>
        <button className="py-2 px-3 bg-blue-700 text-gray-50 rounded-md">Clear</button>
      </div>

      {/* layout section and name of seats */}

      <div className="mt-10 flex justify-between">


         <div className="flex items-center bg-gray-100 p-3 rounded-md shadow-md">
          {/* Front section (driver + door) */}
          <div className="flex flex-col justify-between w-full h-[190px]">
            <div className="-rotate-90">
              <GiSteeringWheel size={25}/>
            </div>
            {/* <div className=""> */}
              <BsDoorOpen size={25}/>
            {/* </div> */}
          </div>
        </div>


        <div className="space-y-3">
            {busSeatTypeName.map((busTypes) => (
               <div key={busTypes.name}>
                <div className="flex items-center gap-3">
                    {busTypes.icon ? <div className="w-10 h-10 flex justify-center items-center text-blue-500 rounded-sm text-xl border-2 border-blue-500">
                        {busTypes.icon}
                </div> : <div className="w-10 h-10 bg-blue-600 rounded-sm">
                </div>}
                <p>{busTypes.name}</p>
            </div>
               </div> 
            ))}
           
        </div>
      </div>

    </div>
  );
}
