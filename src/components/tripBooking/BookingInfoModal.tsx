"use client";

import {
  IBookingDetailsResponse,
  IBusDetailResponse,
  ITripWithBookings,
} from "@/app/types/myBus";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { api } from "@/lib/api";
import { handleApiError } from "@/lib/utils/handleApiError";
import { useEffect, useState } from "react";
import BusInfoCard from "../bus/BusInfoCard";
import SeatGrid from "../SeatLayout/SeatGrid";
import RouteInfoCard from "../bus/RouteInfoCard";
import MiniCalendar from "../busCreationForms/MiniCalendar";
import { ITrip } from "@/app/types/trip";
import Image from "next/image";
import BoardingDroppingPoints from "../bus/BoardingDroppingPoints";
import ReusableTable from "../common/ReusableTable";
import BusImageCarousel from "../bus/BusImageCarousel";

interface BookingModalProps {
  close: () => void;
  busId: string;
}

interface Row {
  [key: string]: React.ReactNode;
}

// const columns = [
//   { label: "BoardingPoint", field: "boardingPoint" },
//   { label: "DroppingPoint", field: "droppingPoint" },
//   { label: "Passenger Details", field: "passengerName" },
//   { label: "Seat Id", field: "seat" },
//   { label: "Phone", field: "phone" },
//   { label: "Amount", field: "amount" },
// ];

const columns = [
  { label: "Boarding Point", field: "boardingPoint" },
  { label: "Dropping Point", field: "droppingPoint" },
  { label: "Passenger Name", field: "passengerName" },
  { label: "Age", field: "age" },
  { label: "Gender", field: "gender" },
  { label: "Seat Id", field: "seat" },
  { label: "Phone", field: "phone" },
  { label: "Amount", field: "amount" },
];


export default function BookingInfoModal({ close, busId }: BookingModalProps) {
  const [bookingInfo, setBookingInfo] =
    useState<IBookingDetailsResponse | null>(null);
  const [selectedTrip, setSelectedTrip] = useState<ITripWithBookings | null>(
    null
  );
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);

  useEffect(() => {
    if (!busId) return;
    const getBusInfo = async () => {
      try {
        const response = await api.get(`/booking/booking-by-bus/${busId}`);
        setBookingInfo(response.data.data);
      } catch (error) {
        handleApiError(error);
      }
    };
    getBusInfo();
  }, [busId]);

  const handleTravelDateClick = (date: Date, trips: ITripWithBookings[]) => {
    const selected = trips.find(
      (t) => new Date(t.travelDate).toDateString() === date.toDateString()
    );
    setSelectedTrip(selected || null);
  };

  if (!bookingInfo) return null;

  const selectedRoute = bookingInfo.routes[selectedRouteIndex];
  const travelDates = selectedRoute?.trips.map(
    (trip) => new Date(trip.travelDate)
  );


  // const tableData: Row[] =
  //   selectedTrip?.bookings.map((booking) => ({
  //     boardingPoint: booking.boardingPoint.landmark,
  //     droppingPoint: booking.droppingPoint.landmark,
  //     passengerName: (
  //       <div className="space-y-2">
  //         {booking.passengers.map((passanger) => (
  //           <div key={passanger.name}>
  //             <p>{passanger.name}, {passanger.age}, {passanger.gender}</p>
  //           </div>
  //         ))}
  //       </div>
  //     ),
  //     seat: (
  //       <div className="space-y-2">
  //         {booking.passengers.map((passanger) => (
  //       <div key={passanger.seatId} className="flex items-center gap-5">
  //         <p className="bg-gray-200 px-2 py-0.5 rounded font-semibold text-xs">
  //           {passanger.seatId}
  //         </p>
  //       </div>
  //     ))}
  //       </div>
  //     ),
  //     phone: booking.contact.phone,
  //     amount: booking.totalAmount,
  //     status: booking.status,
  //   })) || [];


  const tableData: Row[] = selectedTrip
  ? selectedTrip.bookings.flatMap((booking) =>
      booking.passengers.map((p) => ({
        boardingPoint: booking.boardingPoint.landmark,
        droppingPoint: booking.droppingPoint.landmark,
        passengerName: p.name,
        age: p.age,
        gender: p.gender,
        seat: <p className="bg-gray-200 px-1 py-0.5 rounded font-semibold text-xs text-center">{p.seatId}</p>,
        phone: booking.contact.phone,
        amount: selectedTrip.basePrice,
      }))
    )
  : [];



  return (
    <DialogContent className="!max-w-[160vh] max-h-[85vh] flex flex-col">
      <DialogHeader>
        <DialogTitle>
          {bookingInfo?.bus.name} / {bookingInfo?.bus.registrationNo} /{" "}
          {bookingInfo?.bus.layoutName}
        </DialogTitle>
        <DialogDescription>
          {bookingInfo?.routes.map((r, index) => (
            <button
              key={r.route._id}
              className={`my-4 px-3 py-1 ${
                selectedRouteIndex === index
                  ? "bg-blue-100 border-b-2 border-blue-500 text-blue-500"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setSelectedRouteIndex(index)}
            >
              Route {index + 1}
            </button>
          ))}
        </DialogDescription>
      </DialogHeader>

      <div className="flex p-2 overflow-y-auto gap-10 text-gray-600">
        <div className="flex gap-2 border-b pb-2"></div>

        <div className="w-2/3 space-y-5">
          <div key={selectedRoute.route._id} className="space-y-5">
            <div className="space-y-3">
              <p className="text-center font-semibold">
                {selectedRoute.route.routeName}
              </p>
              <p>{selectedRoute.route.routeDescription}</p>
            </div>
            <div className="flex justify-between">
              <div>
              <BoardingDroppingPoints
                boardingPoints={selectedRoute.route.boardingPoints || []}
                droppingPoints={selectedRoute.route.droppingPoints || []}
                source={selectedRoute.route.source}
                destination={selectedRoute.route.destination}
              />
              </div>
              <div>
              <MiniCalendar
                selectedDates={travelDates}
                onDateSelect={(date) =>
                  handleTravelDateClick(date, selectedRoute.trips)
                }
                disabled={false}
                showHeading={false}
              />
              </div>
            </div>

            <ReusableTable
              columns={columns}
              data={tableData}
              page={1}
              rowsPerPage={10}
              totalCount={tableData.length}
              onPageChange={() => {}}
              isPagination={false}
            />
          </div>
        </div>
        <div className="1/3">
          {/* <div className="flex space-y-3 gap-3">
            {bookingInfo?.bus.images.map((image) => (
              <Image
                key={image}
                src={image}
                width={0}
                height={0}
                unoptimized
                alt="bus images"
                className="object-cover rounded-sm w-32 h-20"
              />
            ))}
          </div> */}
          <div className="mx-2 mb-3">
          <BusImageCarousel images={bookingInfo?.bus.images || []} />
          </div>
          <div className="flex items-center">
            <div className="flex flex-col items-center w-full sm:min-w-[200px]">
              {/* <p className="font-semibold text-base sm:text-lg mb-3 text-center">
              Lower Deck
            </p> */}
              <div className="w-full flex justify-center">
                <div className="overflow-x-auto scrollbar-hide w-full flex justify-center pb-2">
                  <SeatGrid
                    layout={bookingInfo?.bus.lowerDeck?.seats || []}
                    isUpperDeck={false}
                    seatPricing={selectedTrip?.seatPricing || []}
                    selectedSeats={[]}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center w-full sm:min-w-[200px]">
              <div className="w-full flex justify-center">
                <div className="overflow-x-auto scrollbar-hide w-full flex justify-center pb-2">
                  <SeatGrid
                    layout={bookingInfo?.bus.upperDeck?.seats || []}
                    isUpperDeck={true}
                    seatPricing={selectedTrip?.seatPricing || []}
                    selectedSeats={[]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
