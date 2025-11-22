"use client";
import { useTripBookingStore } from "@/app/(store)/useTripBookingStore";
import SeatGrid from "@/components/SeatLayout/SeatGrid";
import BusTripDetails from "./BusTripDetails";
import { useEffect, useMemo, useState } from "react";
import { useAuthStore } from "@/app/(store)/useAuthStore";
import AuthDialog from "../common/AuthDialog";
import { useAuthDialogStore } from "@/app/(store)/useAuthDialogStore";

export default function SeatSelection() {
  const { tripData, selectedSeats, toggleSeat, nextStep, totalSeatPrice } = useTripBookingStore();
  const { open, openDialog, closeDialog } = useAuthDialogStore();
  const {user} = useAuthStore()


  const seatPricing = tripData?.seatPricing || [];

  // helper to toggle seat selection
  const handleSeatClick = (seatId: string, available: boolean) => {
    if(user){
      if (!available) return;
      toggleSeat(seatId);
    }else{
      // setAuthDialogOpen(true);
      openDialog()
    }
  };


  // total price
  const totalPrice = useMemo(() => {
    return selectedSeats.reduce((sum, id) => {
      const found = seatPricing.find((s) => s.seatId === id);
      return sum + (found?.price || 0);
    }, 0);
  }, [selectedSeats, seatPricing]);
 useEffect(() => {
  totalSeatPrice(totalPrice);
}, [totalPrice, totalSeatPrice]);

  
  return (
    <div className="mx-auto w-[95%] sm:w-[90%] md:w-[90%] lg:w-[85%] max-w-6xl pb-10">
      {/* Responsive Wrapper */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* LEFT: Seat Layout */}
        <div className="w-full lg:w-1/2 rounded-2xl p-4 sm:p-6">
          {/* Mobile: Stack decks vertically with better spacing */}
          {/* Desktop: Side by side in single row */}
          <div className="flex flex-col sm:flex-row justify-center items-start w-full">
            {/* LOWER DECK */}
            {tripData?.bus?.lowerDeck?.seats && (
              <div className="flex flex-col items-center w-full sm:min-w-[200px]">
                <p className="font-semibold text-base sm:text-lg mb-3 text-center">
                  Lower Deck
                </p>
                <div className="w-full flex justify-center">
                  <div className="overflow-x-auto scrollbar-hide w-full flex justify-center pb-2">
                    <SeatGrid
                      layout={tripData?.bus.lowerDeck?.seats}
                      isUpperDeck={false}
                      seatPricing={seatPricing}
                    onSeatClick={handleSeatClick}
                    selectedSeats={selectedSeats}
                    />
                  </div>
                </div>
              </div>
            )}
            
            {/* UPPER DECK */}
            {tripData?.bus?.upperDeck &&
              tripData?.bus?.upperDeck?.seats.length > 0 && (
                <div className="flex flex-col items-center w-full sm:min-w-[200px]">
                  <p className="font-semibold text-base sm:text-lg mb-3 text-center">
                    Upper Deck
                  </p>
                  <div className="w-full flex justify-center">
                    <div className="overflow-x-auto scrollbar-hide w-full flex justify-center pb-2">
                      <SeatGrid
                        layout={tripData?.bus.upperDeck?.seats}
                        isUpperDeck={true}
                        seatPricing={seatPricing}
                    onSeatClick={handleSeatClick} 
                    selectedSeats={selectedSeats}
                      />
                    </div>
                  </div>
                </div>
              )}
          </div>
        </div>
        
        {/* RIGHT: Bus Details */}
        <div className="w-full lg:w-1/2">
          {/* <div className="h-full flex items-center justify-center text-gray-400 text-sm sm:text-base">
            Bus details section
          </div> */}
          <BusTripDetails/>


      {selectedSeats.length > 0 && (
  <div className="w-full max-w-3xl mx-auto  mt-6 py-4 px-1 flex flex-col items-start gap-3 sm:gap-0 border-t">
    
    {/* Seats and Total Price */}
    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
      <p className="font-medium">{selectedSeats.length} Seats:</p>
      {selectedSeats.map((seat: string) => (
        <span
          key={seat}
          className="text-sm px-2 py-1 bg-gray-200 rounded-full font-medium"
        >
          {seat}
        </span>
      ))}
      <p className="font-semibold text-lg mt-1 sm:mt-0">
        ₹ {totalPrice}
      </p>
    </div>

    {/* Button */}
    <button
      className="mt-4 w-full bg-blue-500 hover:bg-blue-600 transition-colors px-4 py-2 text-gray-100 font-semibold rounded-full"
      onClick={nextStep}
    >
      Select Boarding & Dropping Point
    </button>
  </div>
)}

        </div>
      </div>
      
      {/* <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} tripId={tripData?._id}/> */}
      <AuthDialog open={open} onOpenChange={(v) => (v ? openDialog() : closeDialog())} tripId={tripData?._id}/>
    </div>
  );
}