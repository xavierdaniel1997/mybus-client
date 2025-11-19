"use client"

import { MyBookingsResponse, TicketGroup } from "@/app/types/myBookings";
import TicketCard from "@/components/tripBooking/TicketCard";
import { api } from "@/lib/api";
import { formatDayLabel } from "@/lib/utils/dateFormat";
import { handleApiError } from "@/lib/utils/handleApiError";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function MyBookings(){
    const [groups, setGroups] = useState<TicketGroup[]>([]);
  const [loading, setLoading] = useState(true);

    const getMyBookings = async () => {
        try{
            const resposne = await api.get<MyBookingsResponse>("booking/my-bookings");
             setGroups(resposne.data.data);
        }catch(error){
            handleApiError(error)
        }finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        getMyBookings()
    }, [])

    const handleCancelSuccess = (bookingId: string, seatId: string) => {
  setGroups(prev =>
    prev.map(group => ({
      ...group,
      tickets: group.tickets.filter(
        t => !(t.bookingId === bookingId && t.seatId === seatId)
      )
    })).filter(group => group.tickets.length > 0) 
  );
};



  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading bookings...
      </div>
    );
  }

  if (groups.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        No bookings found.
      </div>
    );
  }

    return(
       <div className="space-y-8 p-4">
      {groups.map((group) => (
        <div key={group.date}>
          <h2 className="text-xl font-semibold mb-4 uppercase">
            {formatDayLabel(group.date)}
          </h2>

          <div className="space-y-4">
            {group.tickets.map((ticket) => (
              <TicketCard 
              key={ticket.bookingId + ticket.seatId} 
                ticket={ticket} 
                onCancelSuccess={handleCancelSuccess}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
     
    )
}