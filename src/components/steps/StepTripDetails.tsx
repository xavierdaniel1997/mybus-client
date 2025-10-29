"use client";

import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import TripForm from "../busCreationForms/TripForm";
import { FormDataTrip } from "@/app/types/bustrip";
import { IoMdClose } from "react-icons/io";
import dayjs from "dayjs";
import MiniCalendar from "../busCreationForms/MiniCalendar";

interface StepTripDetailsProps {
  busId?: string | null;
  routeId?: string | null;
  routeDetail?: any;
}

export default function StepTripScheduler({ busId, routeId, routeDetail }: StepTripDetailsProps) {
  const { control, handleSubmit, watch, reset } = useForm<FormDataTrip>({
    defaultValues: {
      bus: "",
      route: "",
      travelDate: undefined,
      departureTime: "",
      arrivalTime: "",
      basePrice: 0,
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

  const handleDateSelect = (date: Date) => {
    setScheduledDates((prev) => {
      const exists = prev.some((d) => dayjs(d).isSame(date, "day"));
      return exists
        ? prev.filter((d) => !dayjs(d).isSame(date, "day"))
        : [...prev, date];
    });
  };

  const removeScheduledDate = (date: Date) => {
    setScheduledDates((prev) =>
      prev.filter((d) => !dayjs(d).isSame(date, "day"))
    );
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

  return (

      <div className="p-6 flex flex-row gap-12">
        {/* LEFT: FORM SECTION */}
        <div className="flex-1 w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 p-4"
          >
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
