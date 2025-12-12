"use client";

import { useRef } from "react";
import { useTripBookingStore } from "@/app/(store)/useTripBookingStore";
import Image from "next/image";
import { FaBusAlt, FaRoute, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import RouteTimeLine from "../bus/RouteTimeLine";
import dayjs from "dayjs";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import BusImageCarousel from "../bus/BusImageCarousel";

export default function BusTripDetails() {
  const { tripData } = useTripBookingStore();

  // Refs for scroll targets
  const routeRef = useRef<HTMLDivElement>(null);
  const boardingRef = useRef<HTMLDivElement>(null);
  const droppingRef = useRef<HTMLDivElement>(null);
  const restStopRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const imageScrollRef = useRef<HTMLDivElement>(null);

const scrollContainer = (direction: "left" | "right") => {
  if (!imageScrollRef.current) return;

  const amount = 260; // width per image + spacing

  imageScrollRef.current.scrollBy({
    left: direction === "left" ? -amount : amount,
    behavior: "smooth"
  });
};


  const tabs = [
    { label: "Bus route", ref: routeRef },
    { label: "Boarding point", ref: boardingRef },
    { label: "Dropping point", ref: droppingRef },
    { label: "Rest stop", ref: restStopRef },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto rounded-xl shadow-md border border-gray-200 bg-white overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">{tripData?.bus.name}</h2>
          <p className="text-sm text-gray-600">
            {tripData?.arrivalTime} – {tripData?.departureTime} ·  {tripData?.travelDate ? dayjs(tripData.travelDate).format("ddd DD MMM") : ""}
          </p>
          <p className="text-sm text-gray-700 mt-1">{tripData?.bus.layoutName}</p>
          <p className="text-sm text-gray-700 mt-1">
            {tripData?.bus.registrationNo}
          </p>
        </div>
        <div className="flex items-center gap-2 mt-3 sm:mt-0">
          <div className="flex items-center bg-green-100 text-green-700 text-sm px-2 py-1 rounded-md">
            <FaStar className="mr-1 text-green-600" /> 4.3
          </div>
          <span className="text-gray-500 text-sm">(64)</span>
        </div>
      </div>


      {/* Image Carousel */}
<div className="relative w-full overflow-hidden">
  {/* Left Button */}
  {/* <button
    onClick={() => scrollContainer("left")}
    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full shadow hover:bg-white/20 z-10"
  >
    <BsChevronLeft size={16} />
  </button> */}


  <BusImageCarousel images={tripData?.bus.images || []} />

  {/* Right Button */}
  {/* <button
    onClick={() => scrollContainer("right")}
    className="absolute right-2 top-1/2 -translate-y-1/2  p-2 rounded-full hover:bg-white/30 z-10"
  >
    <BsChevronRight size={16} />
  </button> */}
</div>


      {/* Tabs */}
      <div className="flex border-b text-sm font-medium text-gray-600">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            className={`flex-1 text-center py-2 hover:text-blue-500 ${
              idx === 0 ? "text-blue-500 border-b-2 border-blue-500" : ""
            }`}
            onClick={() => scrollToSection(tab.ref)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Why Book This Bus */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 text-lg">
          Why book  MyBus?
        </h3>
        <p className="text-gray-500 text-sm">
          MyBus makes travel easy and safe, with real-time seat availability, verified operators, and instant booking confirmations for a comfortable journey every time
        </p>
      </div>

      {/* Route Section */}
      <div ref={routeRef} className="p-4 border-t scroll-mt-20">
        <h3 className="font-semibold text-gray-800 mb-2 text-lg flex items-center gap-2">
          <FaRoute /> Bus route
        </h3>
        <p className="text-gray-700 text-sm flex flex-wrap items-center">
          {tripData?.route.routeDescription}
        </p>
        <p className="text-gray-500 text-xs mt-1">{tripData?.route.duration}</p>
      </div>

      {/* Boarding Section */}
      <div ref={boardingRef} className="p-4 border-t scroll-mt-20">
        <h3 className="font-semibold text-gray-800 text-lg flex items-center gap-2">
          <FaMapMarkerAlt /> Boarding point
        </h3>
        <p className="text-gray-700 text-sm mb-4">
          {tripData?.route.source.name}
        </p>
        <RouteTimeLine points={tripData?.route.boardingPoints || []} />
      </div>

      {/* Dropping Section */}
      <div ref={droppingRef} className="p-4 border-t scroll-mt-20">
        <h3 className="font-semibold text-gray-800 text-lg flex items-center gap-2">
          <FaMapMarkerAlt /> Dropping point
        </h3>
        <p className="text-gray-700 text-sm mb-4">
          {tripData?.route.destination.name}
        </p>
        <RouteTimeLine points={tripData?.route.droppingPoints || []} />
      </div>

      {/* Rest Stop Section */}
      <div ref={restStopRef} className="p-4 border-t scroll-mt-20">
        <h3 className="font-semibold text-gray-800 text-lg flex items-center gap-2">
          <FaBusAlt /> Rest stop
        </h3>
        <p className="text-gray-500 text-sm">
          No rest stop details available at the moment.
        </p>
      </div>
    </div>
  );
}
