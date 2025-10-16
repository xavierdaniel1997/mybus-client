"use client"

import BusRouteStepper from "@/components/busroute/BusRouteStepper";
import StepBusDetails from "@/components/steps/StepBusDetails";
import StepConfirmation from "@/components/steps/StepConfirmation";
import StepRouteDetails from "@/components/steps/StepRouteDetails";
import StepSeatAllocation from "@/components/steps/StepSeatAllocation";
import StepTripDetails from "@/components/steps/StepTripDetails";
import { useState } from "react";
import { FaRoute } from "react-icons/fa";


export default function BusRoute(){

     const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    <StepBusDetails key="bus" />,
    <StepRouteDetails key="route" />,
    <StepTripDetails key="trip" />,
    <StepSeatAllocation key="seat" />,
    <StepConfirmation key="confirm" />,
  ];

    return(
        <div className="px-5 py-2">
            <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold text-gray-700">
                      Add New Bus Route
                    </h1>
                    <button
                      className="flex items-center bg-blue-600 text-gray-50 px-4 py-1.5 rounded-md cursor-pointer gap-2"
                    >
                      <FaRoute /> Create Route
                    </button>
                  </div>
                 
                 <div className="w-full">
                  <BusRouteStepper currentStep={currentStep} setCurrentStep={setCurrentStep} />
                  </div>

      <div className="mt-8">{steps[currentStep]}</div>

      <div className="mt-10 flex justify-between">
        <button
          onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
          disabled={currentStep === 0}
          className="px-4 py-2 border rounded-md text-gray-600 disabled:opacity-40"
        >
          Back
        </button>
        {currentStep < steps.length - 1 ? (
          <button
            onClick={() => setCurrentStep((s) => Math.min(steps.length - 1, s + 1))}
            className="px-6 py-2 bg-blue-600 text-white rounded-md"
          >
            Next
          </button>
        ) : (
          <button className="px-6 py-2 bg-green-600 text-white rounded-md">Confirm</button>
        )}
      </div>
        </div>
    )
}