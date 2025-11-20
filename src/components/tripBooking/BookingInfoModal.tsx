"use client";

import { IBusDetailResponse } from "@/app/types/myBus";
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


interface BookingModalProps{
    close: () => void;
    busId: string
}

export default function BookingInfoModal({
close,
busId
}: BookingModalProps) {

   const [busInfo, setBusInfo] = useState<IBusDetailResponse | null>(null)

     useEffect(() => {
         if (!busId) return;
        const getBusInfo = async () => {
            try{
                const response = await api.get(`/mybus/get-bus/${busId}`)
                setBusInfo(response.data.data)
            }catch(error){
                handleApiError(error)
            }
        }
        getBusInfo()   
    }, [busId])


  return (
    <DialogContent className="!max-w-6xl max-h-[85vh] flex flex-col">
      <DialogHeader>
        <DialogTitle>{busInfo?.bus.name}</DialogTitle>
        <DialogDescription>
        Description {busId}
        </DialogDescription>
      </DialogHeader>

      <div className="flex-1 p-2 overflow-y-auto space-y-2">
              <BusInfoCard busInfo={busInfo?.bus || null}  />
      
              {/* {busInfo?.routes.map((routes) => (
                  <RouteInfoCard key={routes._id} routeInfo={routes || null} />
              ))} */}
            </div>

      <DialogFooter>
        <button className="px-4 py-2 rounded-md border text-sm"
        onClick={close}>
          Close
        </button>
      </DialogFooter>
    </DialogContent>
  );
}
