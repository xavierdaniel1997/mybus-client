import { IBus, IBusRoute, IBusSchedule } from "@/app/types/myBus";
import { api } from "@/lib/api";
import { handleApiError } from "@/lib/utils/handleApiError";
import Image from "next/image";
import { useEffect, useState } from "react";
import SeatGrid from "../SeatLayout/SeatGrid";
import { featureIcons } from "../bus/FeatureIcons";
import BusInfoCard from "../bus/BusInfoCard";
import BoardingDroppingPoints from "../bus/BoardingDroppingPoints";
import RouteInfoCard from "../bus/RouteInfoCard";

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
      <div className="flex gap-16 text-gray-700">
        <BusInfoCard busInfo={busInfo} scheduleInfo={scheduleInfo}/>
        <RouteInfoCard routeInfo={routeInfo || null}/>
      </div>
        <div className="mt-5">
          <p><strong>Scheduled Trips</strong></p>
        </div>
    </div>
  );
}
