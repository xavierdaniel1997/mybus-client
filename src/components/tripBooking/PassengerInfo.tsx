"use client";

import { useTripBookingStore } from "@/app/(store)/useTripBookingStore";
import { useEffect, useState } from "react";
import ContactDetails from "../form/ContactDetails";
import PassengerForm from "../form/PassengerForm";
import RouteTimeLine from "../bus/RouteTimeLine";
import dayjs from "dayjs";
import { useAuthStore } from "@/app/(store)/useAuthStore";
import { useForm } from "react-hook-form";
import { PassengerFormValues } from "@/app/types/passangerFormValues";
import { handleApiError } from "@/lib/utils/handleApiError";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import TripSummaryPanel from "./TripSummaryPanel";

export default function PassengerInfo() {
  const {
    tripData,
    selectedSeats,
    setPassengers,
    setRazorpayOrder,
    contact,
    boardingPoint,
    droppingPoint,
    seatPrice,
  } = useTripBookingStore();
  const router = useRouter()

 const { register, handleSubmit, watch, setValue } = useForm<PassengerFormValues>({
    defaultValues: {
      passengers: selectedSeats.map(() => ({
        name: "",
        age: 0,
        gender: "",
      })),
    },
  });

 

  const stops = [boardingPoint, droppingPoint].filter(
    (p): p is NonNullable<typeof boardingPoint> => Boolean(p)
  );

  const onContinue = async (data: PassengerFormValues) => {
    setPassengers(data?.passengers); 
  try {
    console.log("contact details", contact, "passanger details", data.passengers, "selected seates", selectedSeats, "tripId", tripData?._id)
    
    const response = await api.post("/booking/reserve", {
      tripId: tripData?._id,
      seatIds: selectedSeats,
      passengers: data.passengers,
      contact,
      seatPrice,
      boardingPoint,
      droppingPoint
    });
    console.log("resposne of the reserve ticket booking.....", response)
    if(response.status === 200){
      setRazorpayOrder(response.data.razorpayOrder)
      router.push("/payment");
    }
  } catch (error) {
    handleApiError(error)
  }
};



  return (
    <div className="mx-auto w-[95%] sm:w-[90%] lg:w-[85%] max-w-6xl pb-10">

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-3 lg:gap-6">
        {/* Left Section */}
        <div className="w-full lg:w-2/3 flex flex-col gap-5">
          <ContactDetails />
          {/* Each PassengerForm should align consistently */}
          {selectedSeats.map((seat, idx) => (
            <PassengerForm
              key={idx}
              passengerNumber={idx + 1}
              seatInfo={seat}
              index={idx}
            register={register}
            watch={watch}
            setValue={setValue}
            />
          ))}
        </div>

        {/* Right Section (Trip Summary) */}
        <div className="w-full lg:w-1/3">
          {/* <div className="space-y-6 bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5">
          
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-800">
                {tripData?.bus.name}
              </h2>
              <p className="text-sm text-gray-600">
                {tripData?.arrivalTime} – {tripData?.departureTime} ·{" "}
                {tripData?.travelDate
                  ? dayjs(tripData.travelDate).format("ddd DD MMM")
                  : ""}{" "}
                <span className="text-green-600">
                  {tripData?.route.duration}
                </span>
              </p>
              <p className="text-sm text-gray-700 mt-1">
                {tripData?.bus.layoutName}, {tripData?.bus.registrationNo}
              </p>
            </div>

   
            <RouteTimeLine points={stops || []} />


            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium">{selectedSeats.length} Seats:</p>
                  {selectedSeats.map((seat: string) => (
                    <span
                      key={seat}
                      className="text-sm px-2 py-1 bg-gray-200 rounded-full font-medium"
                    >
                      {seat}
                    </span>
                  ))}
                </div>
                <p className="font-semibold text-lg mt-1 sm:mt-0">
                  ₹ {seatPrice}
                </p>
              </div>
            </div>
          </div>  */}

  {tripData ? (
    <TripSummaryPanel
      tripData={tripData}
      stops={stops || []}
      selectedSeats={selectedSeats}
      seatPrice={seatPrice || 0}
    />
  ) : null}

          {/* Button */}
          <button
            className="mt-4 w-full bg-blue-500 hover:bg-blue-600 transition-colors px-4 py-2 text-gray-100 font-semibold rounded-full text-sm sm:text-base"
            onClick={handleSubmit(onContinue)}
          >
            Continue Booking
          </button>
        </div>
      </div>
    </div>
  );
}
