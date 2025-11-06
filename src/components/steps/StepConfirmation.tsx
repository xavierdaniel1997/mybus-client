import { IBus, IBusRoute, IBusSchedule } from "@/app/types/myBus";
import { api } from "@/lib/api";
import { handleApiError } from "@/lib/utils/handleApiError";
import Image from "next/image";
import { useEffect, useState } from "react";
import SeatGrid from "../SeatLayout/SeatGrid";
import { featureIcons } from "../bus/FeatureIcons";
import BusInfoCard from "../bus/BusInfoCard";

interface StepConfirmationProps {
  scheduleId?: string | null;
}

export default function StepConfirmation({
  scheduleId,
}: StepConfirmationProps) {
  const [busInfo, setBusInfo] = useState<IBus | null>(null);
  const [scheduleInfo, setScheduleInfo] = useState<IBusSchedule | null>(null)
  const [routeInfo, setRouteInfo] = useState<IBusRoute | null>(null)

  const getbusInfo = async (): Promise<void> => {
    try {
      if (!scheduleId) return;
      const response = await api.get(
        `admin-mybus/get-bus-details/${scheduleId}`
      );
      setBusInfo(response.data.data.bus);
      setScheduleInfo(response.data.data.schedule);
      setRouteInfo(response.data.data.route)
      console.log("checking the resposn of businfo", response);
    } catch (error) {
      handleApiError(error);
    }
  };

  useEffect(() => {
    getbusInfo();
  }, [scheduleId]);

  return (
    <div className="bg-gray-100/90 rounded-md px-8 py-5">
      <div className="flex gap-10 text-gray-700">
        {/* <div className="flex justify-between gap-10">
          <div>
            <p className="mb-3">
              <strong>Bus Details</strong>
            </p>
            <div className="space-y-3">
              <p><span className="font-semibold">Bus Name : </span>{busInfo?.name}</p>
              <p>
               <span className="font-semibold">Registration No : </span> <span>{busInfo?.registrationNo} </span> <span className="font-semibold">Brand : </span> {busInfo?.brand}
              </p>
              <p><span className="font-semibold">Layout Type : </span>{busInfo?.layoutName}</p>

              {busInfo?.images.map((image) => (
                <div key={image}>
                  <Image
                    src={image}
                    width={0}
                    height={0}
                    unoptimized
                    alt="bus images"
                    className="object-cover rounded-sm w-250 h-200"
                  />
                </div>
              ))}

              {busInfo?.features && (
                <div className="mt-4 w-sm">
                  <h3 className="text-gray-700 text-sm font-semibold mb-2">
                    Features
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {Object.entries(busInfo.features)
                      .filter(([_, value]) => value)
                      .map(([feature]) => (
                        <div
                          key={feature}
                          className="flex items-center gap-2 px-3 py-2 border rounded-lg bg-gray-50 hover:bg-gray-100 transition"
                        >
                          {featureIcons[feature]}
                          <span className="text-gray-700 text-sm capitalize">
                            {feature.replace(/([A-Z])/g, " $1")}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}

            </div>
          </div>

          <div>
            <div className="flex gap-10">
              {busInfo?.lowerDeck?.seats && (
                <div>
                  <p className="text-center mb-1">Lower Deck</p>
                  <SeatGrid layout={busInfo.lowerDeck.seats} isUpperDeck={false} price={scheduleInfo?.basePrice}/>
                </div>
              )}
              {busInfo?.upperDeck?.seats && busInfo.upperDeck.seats.length > 0 && (
                <div>
                  <p className="text-center mb-1">Upper Deck</p>
                  <SeatGrid layout={busInfo.upperDeck.seats} isUpperDeck={true} price={scheduleInfo?.basePrice}/>
                </div>
              )}
            </div>
          </div>

        </div> */}
        <BusInfoCard busInfo={busInfo} scheduleInfo={scheduleInfo}/>
        <div>
          <p><strong>Route Details</strong></p>
          <p><span className="font-semibold">Route Name : </span>{routeInfo?.routeName}</p>
        </div>
      </div>
    </div>
  );
}
