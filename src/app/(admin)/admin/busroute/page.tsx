"use client";

import {useEffect, useRef, useState} from "react";
import {FaRoute} from "react-icons/fa";
import BusRouteStepper from "@/components/busroute/BusRouteStepper";
import StepBusDetails from "@/components/steps/StepBusDetails";
import StepRouteDetails from "@/components/steps/StepRouteDetails";
import StepTripDetails, {
  StepTripSchedulerRef,
} from "@/components/steps/StepTripDetails";
import StepConfirmation from "@/components/steps/StepConfirmation";
import {StepBusDetailsRef} from "@/app/types/addBusType";
import {StepRouteDetailsRef} from "@/app/types/busroute";
import {api} from "@/lib/api";
import {handleApiError} from "@/lib/utils/handleApiError";

export default function BusRoute() {
  const [currentStep, setCurrentStep] = useState(0);
  const busDetailsRef = useRef<StepBusDetailsRef>(null);
  const routeDetailsRef = useRef<StepRouteDetailsRef>(null);
  const tripDetailsRef = useRef<StepTripSchedulerRef>(null);
  const [routeId, setRouteId] = useState<string | null>(null);
  const [scheduleId, setScheduleId] = useState<string | null>(null);
  const [routeDetail, setRouteDetail] = useState(null);

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
    <StepRouteDetails
      key="route"
      ref={routeDetailsRef}
      routeId={routeId || null}
      routeDetail={routeDetail || null}
      busId={busId || null}
    />,
    <StepTripDetails
      key="trip"
      ref={tripDetailsRef}
      routeId={routeId}
      routeDetail={routeDetail || null}
      busId={busId}
      scheduleId={scheduleId || null}
    />,
    // <StepSeatAllocation key="seat" />,
    <StepConfirmation
     key="confirm" 
      scheduleId={scheduleId || null}
     />,
  ];

  const handleNext = async () => {
    if (currentStep === 0) {
      const busIdResponse = await busDetailsRef.current?.createBus();
      if (busIdResponse && typeof busIdResponse === "string") {
        setBusId(busIdResponse);
        setCurrentStep((prev) => prev + 1);
      }
    } else if (currentStep === 1) {
      const routeId = await routeDetailsRef.current?.createRoute();
      if (routeId) {
        setRouteId(routeId);
        setCurrentStep((prev) => prev + 1);
      } else {
        console.warn("Route creation failed or cancelled; staying on step.");
      }
    } else if (currentStep === 2) {
      const scheduleId = await tripDetailsRef.current?.createTrip();
      if (scheduleId) {
        console.log("Trip created with ID:", scheduleId);
        setScheduleId(scheduleId)
        setCurrentStep((prev) => prev + 1);
      } else {
        console.warn("Trip creation failed; staying on step.");
      }
    } else {
      setCurrentStep((s) => s + 1);
    }
  };

  useEffect(() => {
    const fetchRouteDetails = async () => {
      if (!routeId) return;
      try {
        const response = await api.get(`/myroute/route-detail/${routeId}`);
        if (response.status === 200 && response.data.data) {
          setRouteDetail(response.data.data);
        }
      } catch (error) {
        handleApiError(error);
      }
    };

    fetchRouteDetails();
  }, [routeId]);

  return (
    <div className="px-5 py-2">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-700">
          Add New Bus Route
        </h1>
      </div>

      <div className="w-full mt-4">
        <BusRouteStepper
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
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
          // <button
          //   onClick={handleNext}
          //   className="px-6 py-1 bg-blue-600 text-white rounded-md"
          // >
          //   {currentStep === 0 ? "Save & Next" : "Next"}
          // </button>
          <button
            onClick={handleNext}
            className="px-6 py-1.5 bg-blue-600 text-white rounded-md"
          >
            {busId ? "Update & Next" : "Save & Next"}
          </button>
        ) : (
           <button className="flex items-center bg-blue-600 text-gray-50 px-4 py-1.5 rounded-md cursor-pointer gap-2">
          <FaRoute /> Create Route
        </button>
        )}
      </div>
    </div>
  );
}
