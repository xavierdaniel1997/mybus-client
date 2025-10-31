"use client";

import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import TripForm from "../busCreationForms/TripForm";
import { FormDataTrip } from "@/app/types/bustrip";
import dayjs from "dayjs";
import MiniCalendar from "../busCreationForms/MiniCalendar";
import { RouteDetailsRes } from "@/app/types/busroute";

interface StepTripDetailsProps {
  busId?: string | null;
  routeId?: string | null;
  routeDetail?: RouteDetailsRes | null;
}

export default function StepTripScheduler({ busId, routeId, routeDetail }: StepTripDetailsProps) {
  // const { control, handleSubmit, watch, reset } = useForm<FormDataTrip>({
  //   defaultValues: {
  //     bus: "",
  //     route: "",
  //     travelDate: undefined,
  //     departureTime: "",
  //     arrivalTime: "",
  //     basePrice: 0,
  //     seatPricing: [],
  //     status: "scheduled",
  //   },
  // });


  const { control, handleSubmit, watch, reset } = useForm<FormDataTrip>({
  defaultValues: {
    bus: "",
    route: "",
    frequency: "daily",
    departureTime: "",
    arrivalTime: "",
    basePrice: 0,
    startDate: "",
    endDate: "",
    active: true,
    seatPricing: [],
    status: "scheduled",
  },
});


  const { fields, append, remove } = useFieldArray({
    control,
    name: "seatPricing",
  });

  const [step, setStep] = useState<number>(1);
  const [scheduledDates, setScheduledDates] = useState<Date[]>([]);

  // ✅ Pre-fill the form when routeDetail is available
  useEffect(() => {
    if (routeDetail) {
      reset({
        bus: routeDetail.bus?._id || "",
        route: routeDetail._id || "",
        departureTime: routeDetail.source?.time
          ? convertTo24Hour(routeDetail.source.time)
          : "",
        arrivalTime: routeDetail.destination?.time
          ? convertTo24Hour(routeDetail.destination.time)
          : "",
        basePrice: 0,
        seatPricing: [],
        status: "scheduled",
      });
    }
  }, [routeDetail, reset]);

  // 🕒 Utility to convert 8:20PM → 20:20 (for input type="time")
  const convertTo24Hour = (timeStr: string) => {
    const [time, modifier] = timeStr.split(/(AM|PM)/i);
    const [rawHours, rawMinutes] = time.split(":").map(Number);
    let hours = rawHours;
    const minutes = rawMinutes;
    if (modifier.toUpperCase() === "PM" && hours < 12) hours += 12;
    if (modifier.toUpperCase() === "AM" && hours === 12) hours = 0;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  };

  const handleDateSelect = (date: Date) => {
    setScheduledDates((prev) => {
      const exists = prev.some((d) => dayjs(d).isSame(date, "day"));
      return exists
        ? prev.filter((d) => !dayjs(d).isSame(date, "day"))
        : [...prev, date];
    });
  };

  const onSubmit = (data: FormDataTrip) => {
    console.log("Saving trip payload", {
      ...data,
      scheduledDates: scheduledDates.map((d) => dayjs(d).format("YYYY-MM-DD")),
    });
    alert("Trip saved (mock). Check console.");
    reset();
    setScheduledDates([]);
    setStep(1);
  };

  const watchStart = watch("startDate");
const watchEnd = watch("endDate");

useEffect(() => {
  if (watchStart && watchEnd) {
    const start = dayjs(watchStart);
    const end = dayjs(watchEnd);
    const range: Date[] = [];
    let d = start;
    while (d.isBefore(end) || d.isSame(end, "day")) {
      range.push(d.toDate());
      d = d.add(1, "day");
    }
    setScheduledDates(range);
  }
}, [watchStart, watchEnd]);


  console.log("this is the data of route form the tripDetails routeDetails...", routeDetail);

  return (
    <div className="p-6 flex justify-between flex-row gap-16">
      {/* LEFT: FORM SECTION */}
      <div className="flex-1 w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-4">
          <TripForm
            control={control}
            onNext={() => setStep(2)}
            onSave={() => setStep(3)}
            seatFieldsCount={fields.length}
            appendSeat={append}
            removeSeat={remove}
          />
        </form>
      </div>

      {/* RIGHT: MINI CALENDAR SECTION */}
      <div className="flex-1">
        <MiniCalendar
          selectedDates={scheduledDates}
          onDateSelect={handleDateSelect}
        />
      </div>
    </div>
  );
}
