"use client";

import {
  FaBus,
  FaRoute,
  FaClock,
  FaChair,
  FaCheckCircle,
} from "react-icons/fa";
import { TbArmchair } from "react-icons/tb";

interface BusRouteStepperProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const steps = [
  { id: 0, label: "Bus Details", icon: <FaBus /> },
  { id: 1, label: "Route Details", icon: <FaRoute /> },
  { id: 2, label: "Trip Details", icon: <FaClock /> },
  { id: 3, label: "Seat Allocation", icon: <TbArmchair /> },
  { id: 4, label: "Confirmation", icon: <FaCheckCircle /> },
];

export default function BusRouteStepper({
  currentStep,
  setCurrentStep,
}: BusRouteStepperProps) {
  return (
    <div className="relative w-full flex items-center justify-between mt-8 rounded-sm">
      {/* Dotted background line */}
      <div className="absolute top-1/2 left-0 w-full border-t border-gray-300 -translate-y-1/2 z-0" />

      {/* Filled progress line */}
      <div
        className="absolute top-1/2 left-0 h-[2px] bg-blue-600 -translate-y-1/2 z-0 transition-all duration-500"
        style={{
          width: `${(currentStep / (steps.length - 1)) * 100}%`,
        }}
      />

      {/* Steps */}
      {steps.map((step, index) => {
        const isActive = currentStep === index;
        const isCompleted = currentStep > index;

        return (
          <div
            key={step.id}
            className="flex gap-2 items-center relative cursor-pointer z-10"
            onClick={() => setCurrentStep(index)}
          >
            {/* Step circle */}
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300
                ${
                  isActive
                    ? "bg-gray-400 border-gray-400 text-white"
                    : isCompleted
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-white border-gray-300 text-gray-500"
                }`}
            >
              {step.icon}
            </div>

            {/* Step label */}
            <p
              className={`text-sm p-1 font-medium bg-gray-50 z-10 ${
                isActive
                  ? "text-gray-400"
                  : isCompleted
                  ? "text-blue-600"
                  : "text-gray-500"
              }`}
            >
              {step.label}
            </p>

            {/* Dotted connector between steps */}
            {index < steps.length - 1 && (
              <div className="absolute top-1/2 right-[-50%] w-full border-t border-gray-300 -translate-y-1/2 z-0"></div>
            )}
          </div>
        );
      })}
    </div>
  );
}
