"use client";

import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import TripForm from "../busCreationForms/TripForm";
import { FormDataTrip } from "@/app/types/bustrip";
import { IoMdClose } from "react-icons/io";
import dayjs from "dayjs";
import MiniCalendar from "../busCreationForms/MiniCalendar";

export default function StepTripScheduler() {
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
    <div className="p-6">
      {/* Step Navigation */}
      <div className="flex items-center gap-4 mb-6">
        {[1, 2, 3].map((s) => (
          <button
            key={s}
            onClick={() => setStep(s)}
            className={`px-3 py-1 rounded-md border ${
              step === s
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            {s === 1
              ? "Details"
              : s === 2
              ? "Seat Pricing"
              : "Review & Schedule"}
          </button>
        ))}
      </div>

      <div className="flex flex-row gap-12">
        {/* LEFT: FORM SECTION */}
        <div className="flex-1 w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 p-4 border rounded-md"
          >
            {step === 1 && (
              <TripForm
                control={control}
                onNext={() => setStep(2)}
                onSave={() => setStep(3)}
                seatFieldsCount={fields.length}
                appendSeat={append}
                removeSeat={remove}
              />
            )}

            {step === 2 && (
              <section>
                <h3 className="text-sm text-gray-600 mb-2">Seat Pricing</h3>

                {fields.map((f, idx) => (
                  <div
                    key={f.id}
                    className="flex items-center gap-3 mb-2 border-b pb-2"
                  >
                    <Controller
                      name={`seatPricing.${idx}.seatId` as const}
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          className="border w-1/3 rounded-sm py-1.5 px-1"
                          placeholder="Seat ID"
                        />
                      )}
                    />

                    <Controller
                      name={`seatPricing.${idx}.price` as const}
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="number"
                          className="border w-1/3 rounded-sm py-1.5 px-1"
                          placeholder="Price"
                        />
                      )}
                    />

                    <Controller
                      name={`seatPricing.${idx}.isAvailable` as const}
                      control={control}
                      render={({ field }) => (
                        <select
                          {...field}
                          className="border w-1/4 rounded-sm py-1.5 px-1"
                        >
                          <option value="true">Available</option>
                          <option value="false">Unavailable</option>
                        </select>
                      )}
                    />

                    <button
                      type="button"
                      onClick={() => remove(idx)}
                      className="text-gray-500 bg-gray-300/40 border rounded-sm py-1.5 px-1"
                    >
                      <IoMdClose size={20} />
                    </button>
                  </div>
                ))}

                <div className="flex items-center gap-3 mt-3">
                  <button
                    type="button"
                    onClick={() =>
                      append({ seatId: "", price: 0, isAvailable: true })
                    }
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Add Seat
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-3 py-1 border rounded-sm"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-sm"
                  >
                    Next: Review
                  </button>
                </div>
              </section>
            )}

            {step === 3 && (
              <section>
                <h3 className="text-sm text-gray-600 mb-2">Review</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex gap-2">
                    <strong>Bus:</strong>
                    <span>{watch().bus || "-"}</span>
                  </div>
                  <div className="flex gap-2">
                    <strong>Route:</strong>
                    <span>{watch().route || "-"}</span>
                  </div>
                  <div className="flex gap-2">
                    <strong>Departure:</strong>
                    <span>{watch().departureTime || "-"}</span>
                  </div>
                  <div className="flex gap-2">
                    <strong>Arrival:</strong>
                    <span>{watch().arrivalTime || "-"}</span>
                  </div>
                  <div className="flex gap-2">
                    <strong>Base Price:</strong>
                    <span>₹ {watch().basePrice ?? 0}</span>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <button
                      type="submit"
                      className="bg-green-600 text-white px-4 py-2 rounded-sm"
                    >
                      Save Trip
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-3 py-1 border rounded-sm"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </section>
            )}
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
    </div>
  );
}
