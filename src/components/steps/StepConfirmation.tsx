import { IBus } from "@/app/types/myBus";
import { api } from "@/lib/api";
import { handleApiError } from "@/lib/utils/handleApiError";
import Image from "next/image";
import { useEffect, useState } from "react";
import SeatGrid from "../SeatLayout/SeatGrid";

interface StepConfirmationProps {
  scheduleId?: string | null;
}

export default function StepConfirmation({
  scheduleId,
}: StepConfirmationProps) {
  const [busInfo, setBusInfo] = useState<IBus | null>(null);

  const getbusInfo = async (): Promise<void> => {
    try {
      if (!scheduleId) return;
      const response = await api.get(
        `admin-mybus/get-bus-details/${scheduleId}`
      );
      setBusInfo(response.data.data.bus);
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
      <div className="flex justify-between text-gray-700">
        <div className="flex justify-between gap-10">
          <div>
            <p className="mb-3">
              <strong>Bus Details</strong>
            </p>
            <div className="space-y-3">
              <p>{busInfo?.name}</p>
              <p>
                <span>{busInfo?.registrationNo} </span> {busInfo?.brand}
              </p>
              <p>{busInfo?.layoutName}</p>

              {busInfo?.images.map((image) => (
                <div key={image}>
                  <Image
                    src={image}
                    width={250}
                    height={200}
                    unoptimized
                    alt="bus images"
                    className="object-cover rounded-sm"
                  />
                </div>
              ))}
            </div>
          </div>
          
           <div>
            <p className="font-semibold mb-2">Layout Section</p>
            <div className="flex gap-10">
              {busInfo?.lowerDeck?.seats && (
                <div>
                  <p className="text-center mb-1">Lower Deck</p>
                  <SeatGrid layout={busInfo.lowerDeck.seats} isUpperDeck={false} />
                </div>
              )}
              {busInfo?.upperDeck?.seats && busInfo.upperDeck.seats.length > 0 && (
                <div>
                  <p className="text-center mb-1">Upper Deck</p>
                  <SeatGrid layout={busInfo.upperDeck.seats} isUpperDeck={true} />
                </div>
              )}
            </div>
          </div>

        </div>
        <div>Route details</div>
      </div>
    </div>
  );
}
