"use client";

import { Ticket } from "@/app/types/myBookings";
import dayjs from "dayjs";
import { useState } from "react";
import { FaBus, FaLongArrowAltRight } from "react-icons/fa";
import CancelTicketModal from "./CancelTicketModal";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { api } from "@/lib/api";

interface BusTicketCardProps{
  ticket: Ticket,
  onCancelSuccess: (bookingId: string, seatId: string) => void
}

export default function BusTicketCard({ ticket, onCancelSuccess }: BusTicketCardProps) {
  const { passenger, trip, seatId } = ticket;
  const { bus, route, travelDate } = trip;

  const [openCancelModal, setOpenCancelModal] = useState(false);


  const handleCancelBooking = async () => {
  try {
    const res = await api.patch(`/booking/cancel/${ticket.bookingId}`, {
      seatId: ticket.seatId,
    });
    if(res.status === 200){
      onCancelSuccess(ticket.bookingId, ticket.seatId);
      setOpenCancelModal(false);
    }
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="bg-gray-50 rounded-2xl shadow-lg overflow-hidden border border-gray-200 w-full max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-blue-600 text-white px-6 py-3 flex justify-between">
        <div className="flex items-center gap-2">
          <FaBus className="text-md" />
          <h1 className="font-semibold text-lg">{bus.name}</h1>
        </div>
        <p className="uppercase text-sm md:text-base">₹ {ticket.totalAmount}</p>
      </div>

      {/* Wrapper */}
      <div className="flex flex-col md:flex-row">

        {/* Left Info */}
        <div className="px-6 py-4 md:w-2/3 grid grid-cols-2 sm:grid-cols-3 gap-y-4 text-sm">
          <div>
            <p className="text-gray-500 text-xs">Passenger</p>
            <p className="font-semibold text-base sm:text-lg">
              {passenger.name}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-xs">Date</p>
            <p className="font-semibold text-base sm:text-lg">
              {dayjs(travelDate).format("DD MMM YYYY")}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-xs">Bus No</p>
            <p className="font-semibold text-base sm:text-lg">{bus.registrationNo}</p>
          </div>

          <div>
            <p className="text-gray-500 text-xs">Seat</p>
            <p className="font-semibold text-base">{seatId}</p>
          </div>

          <div>
            <p className="text-gray-500 text-xs">Boarding Time</p>
            <p className="font-semibold text-base sm:text-lg">{ticket.boardingPoint.time}</p>
          </div>

          <div>
            <p className="text-gray-500 text-xs">Arrival</p>
            <p className="font-semibold text-base sm:text-lg">{ticket.droppingPoint.time}</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="px-6 py-4 md:w-1/3 border-t md:border-t-0 md:border-l flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-xs">FROM</p>
              <p className="text-blue-600 font-bold text-lg">{ticket.boardingPoint.landmark}</p>
              <p className="text-gray-600 text-xs">{route.source.landmark}</p>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <FaLongArrowAltRight size={25} />
            </div>

            <div>
              <p className="text-gray-400 text-xs">TO</p>
              <p className="text-blue-600 font-bold text-lg">{ticket.droppingPoint.landmark}</p>
              <p className="text-gray-600 text-xs">{route.destination.landmark}</p>
            </div>
          </div>

          <div className="text-right">
            <Dialog open={openCancelModal} onOpenChange={setOpenCancelModal}>
              <DialogTrigger asChild>
                <button className="bg-gray-300 rounded-full px-3 py-1 text-xs cursor-pointer">
                  Cancel
                </button>
              </DialogTrigger>

              <CancelTicketModal
              close={() => setOpenCancelModal(false)} 
                seatId={seatId}
                bookingId={ticket.bookingId}
                onConfirm={handleCancelBooking}
              />
            </Dialog>
          </div>
        </div>

      </div>
    </div>
  );
}
