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
import MiniCalendar from "../busCreationForms/MiniCalendar";
import { ITrip } from "@/app/types/trip";

interface StepConfirmationProps {
  scheduleId?: string | null;
}

export default function StepConfirmation({
  scheduleId,
}: StepConfirmationProps) {
  const [busInfo, setBusInfo] = useState<IBus | null>(null);
  const [scheduleInfo, setScheduleInfo] = useState<IBusSchedule | null>(null);
  const [routeInfo, setRouteInfo] = useState<IBusRoute | null>(null);
  const [tripInfo, setTripInfo] = useState<ITrip[]>()
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const getbusInfo = async (): Promise<void> => {
    try {
      if (!scheduleId) return;
      const response = await api.get(
        `admin-mybus/get-bus-details/${scheduleId}`
      );
      setBusInfo(response.data.data.bus);
      setScheduleInfo(response.data.data.schedule);
      setRouteInfo(response.data.data.route);
      setTripInfo(response.data.data.trips)
      console.log("checking the resposn of businfo", response);
    } catch (error) {
      handleApiError(error);
    }
  };

  useEffect(() => {
    getbusInfo();
  }, [scheduleId]);

  useEffect(() => {
  if (tripInfo && Array.isArray(tripInfo)) {
    const parsed = tripInfo.map((trip) => new Date(trip.travelDate));
    setSelectedDates(parsed);
  }
}, [tripInfo]);

console.log("tripinfo in the bus confermation........", selectedDates)

  return (
    <div className="bg-gray-100/90 rounded-md px-8 py-5">
      <div className="flex justify-between gap-16 text-gray-700">
        <BusInfoCard busInfo={busInfo} scheduleInfo={scheduleInfo} />
        <RouteInfoCard routeInfo={routeInfo || null} />
      </div>
      <div className="mt-9 flex gap-15">
      <div className="space-y-3">
        <p>
          <strong>Scheduled Trips</strong>
        </p>
        <p>
          <span className="font-semibold">Schedule : </span>
          {scheduleInfo?.frequency}
        </p>
        <p>
          <span className="font-semibold">Departure Time : </span>
          {scheduleInfo?.departureTime}{" "}
          <span className="font-semibold"> Arrival Time : </span>
          {scheduleInfo?.arrivalTime}
        </p>
        <div className="flex items-center gap-2">
        <p><span className="font-semibold">Frequency : </span>{scheduleInfo?.frequency}</p>
        <p><span className="font-semibold">Interval : </span>{scheduleInfo?.customInterval}</p>
        </div>
      </div>
      <div className="">
        <MiniCalendar
        selectedDates={selectedDates}
    onDateSelect={() => {}}
    disabled={true}
        />
      </div>
      </div>
    </div>
  );
}
