"use client";

import { useRef, useState } from "react";
import { FaRoute } from "react-icons/fa";
import BusRouteStepper from "@/components/busroute/BusRouteStepper";
import StepBusDetails from "@/components/steps/StepBusDetails";
import StepRouteDetails from "@/components/steps/StepRouteDetails";
import StepTripDetails from "@/components/steps/StepTripDetails";
import StepSeatAllocation from "@/components/steps/StepSeatAllocation";
import StepConfirmation from "@/components/steps/StepConfirmation";
import { StepBusDetailsRef } from "@/app/types/AddBusDetails";

export default function BusRoute() {
  const [currentStep, setCurrentStep] = useState(0);
  const busDetailsRef = useRef<StepBusDetailsRef>(null);

    // ✅ Persistent bus data stored here
  const [busId, setBusId] = useState<string | null>(null);
  const [busDetails, setBusDetails] = useState({
    name: "",
    registrationNo: "",
    brand: "",
    busType: "",
    layoutId: "",
    information: "",
    features: {
      wifi: false,
      chargingPoint: false,
      waterBottle: false,
      blankets: false,
      snacks: false,
      readingLight: false,
      cctv: false,
      pillow: false,
    },
  });

  const steps = [
    <StepBusDetails
     key="bus" 
    ref={busDetailsRef} 
      busDetails={busDetails}
      setBusDetails={setBusDetails}
      busId={busId}
      setBusId={setBusId}
    />,
    <StepRouteDetails key="route" />,
    <StepTripDetails key="trip" />,
    <StepSeatAllocation key="seat" />,
    <StepConfirmation key="confirm" />,
  ];

  const handleNext = async () => {
    if (currentStep === 0) {
      const busIdResponse = await busDetailsRef.current?.createBus();
      if (busIdResponse && typeof busIdResponse === "string") {
      setBusId(busIdResponse); 
      setCurrentStep((prev) => prev + 1);
    }
    } else {
      setCurrentStep((s) => s + 1);
    }
  };

  return (
    <div className="px-5 py-2">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-700">
          Add New Bus Route
        </h1>
        <button className="flex items-center bg-blue-600 text-gray-50 px-4 py-1.5 rounded-md cursor-pointer gap-2">
          <FaRoute /> Create Route
        </button>
      </div>

      <div className="w-full mt-4">
        <BusRouteStepper currentStep={currentStep} setCurrentStep={setCurrentStep} />
      </div>

      <div className="mt-8">{steps[currentStep]}</div>

      <div className="mt-10 flex justify-between">
        <button
          onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
          disabled={currentStep === 0}
          className="px-4 py-1 border rounded-md text-gray-600 disabled:opacity-40"
        >
          Back
        </button>
        {currentStep < steps.length - 1 ? (
          <button
            onClick={handleNext}
            className="px-6 py-1 bg-blue-600 text-white rounded-md"
          >
            {currentStep === 0 ? "Save & Next" : "Next"}
          </button>
        ) : (
          <button className="px-6 py-2 bg-green-600 text-white rounded-md">
            Confirm
          </button>
        )}
      </div>
    </div>
  );
}
