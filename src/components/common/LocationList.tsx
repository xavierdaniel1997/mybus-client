import { useEffect, useState } from "react";
import LocationCard from "./LocationCard";
import { api } from "@/lib/api";
import { handleApiError } from "@/lib/utils/handleApiError";
import { ILocation } from "@/app/types/locations";
import { FaMapLocation } from "react-icons/fa6";

export default function LocationList() {
    const [locationInfo, setLocationInfo] = useState<ILocation[]>([])

    const getLocations = async () => {
        try{
            const response = await api.get("location/all-locations")
            setLocationInfo(response.data.data)
        }catch(error){
            handleApiError(error)
        }
    }

    useEffect(() => {
        getLocations()
    }, [])

    console.log("location info....", locationInfo)


    return (
        <div className="px-6 sm:px-10 lg:px-96 py-12  text-gray-800">
            {/* Title + Arrows */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="font-semibold text-xl flex items-center gap-2">
                    <span><FaMapLocation size={25}/></span>
                    Discover Your Journey
                </h1>
            </div>
            <div className="flex flex-wrap justify-center gap-5">
                {locationInfo.length > 0 && locationInfo.map((location: ILocation) => (
                    <LocationCard key={location._id} locationName={location.name} locationImage={location.locationImage}/>
                ))}
                    
                </div>
        </div>
    )
}