import { IBusRoute } from "@/app/types/myBus";
import BoardingDroppingPoints from "./BoardingDroppingPoints";

interface RouteInfoCardProps{
    routeInfo: IBusRoute | null;
}

export default function RouteInfoCard({routeInfo}: RouteInfoCardProps){

    console.log("route details form the route card", routeInfo)
    return(
        <div className="flex  gap-5  border-2 border-gray-200 rounded-md px-8 py-5">
            <div className="space-y-3">
                  <p><strong>Route Details</strong></p>
                  <p className="font-semibold text-lg">{routeInfo?.routeName}</p>
                  <p><span className="font-semibold">Distance : </span>{routeInfo?.distance}km<span className="font-semibold"> Duration :</span> {routeInfo?.duration}</p>
                  <p><span className="font-semibold">Source : </span>{routeInfo?.source?.name}</p>
                  <p><span className="font-semibold">Destination : </span>{routeInfo?.destination?.name}</p>
                  <h3 className="font-semibold text-lg">Bus route</h3>
                  <p>
                    {routeInfo?.routeDescription}
                  </p>
                  </div>
                </div>
    )
}