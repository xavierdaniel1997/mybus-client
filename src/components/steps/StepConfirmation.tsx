import { IBus, IBusRoute, IBusSchedule } from "@/app/types/myBus";
import { api } from "@/lib/api";
import { handleApiError } from "@/lib/utils/handleApiError";
import { useEffect, useState } from "react";
import SeatGrid from "../SeatLayout/SeatGrid";
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
  const [tripInfo, setTripInfo] = useState<ITrip[]>();
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
      setTripInfo(response.data.data.trips);
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

        console.log("checking the resposn of businfo routedescription................", routeInfo);

  return (
    <div className="bg-gray-100/90 rounded-md p-5">
      <div className="flex gap-5 text-gray-700">
        <div className="w-2/3">
          <BusInfoCard busInfo={busInfo} scheduleInfo={scheduleInfo} />

          <div className="mt-5">

          <RouteInfoCard routeInfo={routeInfo || null} />
          </div>


          <div className="mt-6 flex gap-15  border-2 border-gray-200 rounded-md px-8 py-5">
            <div className="">
              <MiniCalendar
                selectedDates={selectedDates}
                onDateSelect={() => {}}
                disabled={true}
              />
            </div>
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
                <p>
                  <span className="font-semibold">Frequency : </span>
                  {scheduleInfo?.frequency}
                </p>
                <p>
                  <span className="font-semibold">Interval : </span>
                  {scheduleInfo?.customInterval}
                </p>
              </div>
            </div>
          </div>

        </div>
        <div className="w-1/3">

          <BoardingDroppingPoints
            source={routeInfo?.source || null}
            destination={routeInfo?.destination || null}
            boardingPoints={routeInfo?.boardingPoints || []}
            droppingPoints={routeInfo?.droppingPoints || []}
          />
          <div className="mt-5  border-2 border-gray-200 rounded-md px-8 py-5">
            <div className="flex gap-10">
              {busInfo?.lowerDeck?.seats && (
                <div>
                  <p className="text-center font-semibold mb-1">Lower Deck</p>
                  <SeatGrid
                    layout={busInfo.lowerDeck.seats}
                    isUpperDeck={false}
                    basePrice={scheduleInfo?.basePrice}
                  />
                </div>
              )}
              {busInfo?.upperDeck?.seats &&
                busInfo.upperDeck.seats.length > 0 && (
                  <div>
                    <p className="text-center font-semibold mb-1">Upper Deck</p>
                    <SeatGrid
                      layout={busInfo.upperDeck.seats}
                      isUpperDeck={true}
                      basePrice={scheduleInfo?.basePrice}
                    />
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
