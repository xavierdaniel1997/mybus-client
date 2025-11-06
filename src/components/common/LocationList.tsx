import { useState } from "react";
import LocationCard from "./LocationCard";

export default function LocationList() {
    const [locationInfo, setLocationInfo] = useState(null)
    return (
        <div className="px-6 sm:px-10 lg:px-96 py-12  text-gray-800">
            {/* Title + Arrows */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="font-semibold text-xl">
                    Discover Your Journey
                </h1>
            </div>
            <div>
                    <LocationCard/>
                </div>
        </div>
    )
}