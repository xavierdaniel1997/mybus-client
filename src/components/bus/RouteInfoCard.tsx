import { IBusRoute } from "@/app/types/myBus";
import BoardingDroppingPoints from "./BoardingDroppingPoints";

interface RouteInfoCardProps{
    routeInfo: IBusRoute | null;
}

export default function RouteInfoCard({routeInfo}: RouteInfoCardProps){
    return(
        <div className="space-y-3">
                  <p><strong>Route Details</strong></p>
                  <p><span className="font-semibold">Route Name : </span>{routeInfo?.routeName}</p>
                  <p><span className="font-semibold">Distance : </span>{routeInfo?.distance}km<span className="font-semibold"> Duration :</span> {routeInfo?.duration}</p>
                  <p><span className="font-semibold">Source : </span>{routeInfo?.source?.name}</p>
                  <p><span className="font-semibold">Destination : </span>{routeInfo?.destination?.name}</p>
                  <BoardingDroppingPoints
                  source={routeInfo?.source ||  null}
                  destination={routeInfo?.destination || null}
                   boardingPoints={routeInfo?.boardingPoints || []}
                    droppingPoints={routeInfo?.droppingPoints || []}/>
                </div>
    )
}