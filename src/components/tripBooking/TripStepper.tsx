"use client";

import { useTripBookingStore } from "@/app/(store)/useTripBookingStore";
import SeatSelection from "./SeatSelection";
import BoardingSelection from "./BoardingSelection";
import PassengerInfo from "./PassengerInfo";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";

const steps = ["seats", "boarding", "passenger"] as const;

export default function TripStepper() {
  const { tripData, currentStep } = useTripBookingStore();

  const renderStep = () => {
    switch (currentStep) {
      case "seats":
        return <SeatSelection />;
      case "boarding":
        return <BoardingSelection />;
      case "passenger":
        return <PassengerInfo />;
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Fixed Stepper Header under Navbar */}
      <div className="fixed top-[85px] left-0 w-full z-40 bg-white">
        {/* Route Info */}
        <div className="flex items-center gap-3 px-4 sm:px-6 pt-5 pb-2">
          <Link
            href="/"
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <IoMdClose size={22} />
          </Link>
          <p className="font-semibold text-base sm:text-lg truncate w-full">
            {tripData?.route?.routeName || "Trip Details"}
          </p>
        </div>

        {/* Step Tabs */}
        <div className="flex justify-start sm:justify-center gap-5 sm:gap-6 p-4 sm:p-0 overflow-x-auto scrollbar-hide font-medium border-b">
          {steps.map((step) => (
            <StepButton key={step} step={step} />
          ))}
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="pt-[130px] sm:pt-[140px] p-4 sm:p-6">{renderStep()}</div>
    </div>
  );
}

function StepButton({ step }: { step: "seats" | "boarding" | "passenger" }) {
  const { currentStep, goToStep,  prevStep } = useTripBookingStore();
  const active = currentStep === step;

  const label =
    step === "seats"
      ? "1. Select Seats"
      : step === "boarding"
      ? "2. Boarding & Drop"
      : "3. Passenger Info";

  return (
    <button
    //  onClick={() => goToStep(step)}
    onClick={prevStep}
      className={`whitespace-nowrap text-sm sm:text-base transition-colors ${
        active
          ? "text-blue-600 border-b-2 border-blue-600 pb-2.5"
          : "text-gray-500 pb-2.5"
      }`}
    >
      {label}
    </button>
  );
}
