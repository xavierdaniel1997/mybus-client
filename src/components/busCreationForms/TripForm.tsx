import React from "react";
import {
  Controller,
  Control,
  UseFieldArrayRemove,
  UseFieldArrayAppend,
} from "react-hook-form";
import { FormDataTrip } from "@/app/types/bustrip";
import { IoMdClose } from "react-icons/io";

interface TripFormProps {
  control: Control<FormDataTrip>;
  onNext: () => void;
  onSave?: () => void;
  seatFieldsCount: number;
  appendSeat: UseFieldArrayAppend<FormDataTrip, "seatPricing">;
  removeSeat: UseFieldArrayRemove;
}

export default function TripForm({
  control,
  onNext,
  onSave,
  seatFieldsCount,
  appendSeat,
  removeSeat,
}: TripFormProps) {
  return (
    <div className="space-y-4">

      {/* Bus & Route */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-600">Bus</label>
        <Controller
          name="bus"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              placeholder="Bus ID or select"
              className="border rounded-sm py-1.5 px-1 focus:ring focus:ring-blue-500 outline-none"
            />
          )}
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm text-gray-600">Route</label>
        <Controller
          name="route"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              placeholder="Route ID or select"
              className="border rounded-sm py-1.5 px-1 focus:ring focus:ring-blue-500 outline-none"
            />
          )}
        />
      </div>

      {/* Frequency */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-600">Trip Frequency</label>
        <Controller
          name="frequency"
          control={control}
          render={({ field }) => (
            <select {...field} className="border rounded-sm py-1.5 px-1">
              <option value="daily">Daily</option>
              <option value="weekdays">Weekdays</option>
              <option value="custom">Custom</option>
            </select>
          )}
        />
      </div>

      {/* Time */}
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <label className="text-sm text-gray-600">Departure Time</label>
          <Controller
            name="departureTime"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="time"
                className="border w-full rounded-sm py-1.5 px-1"
              />
            )}
          />
        </div>

        <div className="flex-1">
          <label className="text-sm text-gray-600">Arrival Time</label>
          <Controller
            name="arrivalTime"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="time"
                className="border w-full rounded-sm py-1.5 px-1"
              />
            )}
          />
        </div>
      </div>

      {/* Start & End Date */}
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <label className="text-sm text-gray-600">Start Date</label>
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="date"
                className="border w-full rounded-sm py-1.5 px-1"
              />
            )}
          />
        </div>

        <div className="flex-1">
          <label className="text-sm text-gray-600">End Date</label>
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="date"
                className="border w-full rounded-sm py-1.5 px-1"
              />
            )}
          />
        </div>
      </div>

      {/* Base Price */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-600">Base Price (₹)</label>
        <Controller
          name="basePrice"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              min={0}
              className="border rounded-sm py-1.5 px-1"
            />
          )}
        />
      </div>

      {/* Active Toggle */}
      <div className="flex items-center gap-2">
        <Controller
          name="active"
          control={control}
          render={({ field }) => (
            <input
              type="checkbox"
              checked={!!field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
            />
          )}
        />
        <label className="text-sm text-gray-600">Active Schedule</label>
      </div>

      {/* Seat Pricing */}
      {/* <div className="flex items-center justify-between">
        <div className="text-sm">Seat pricing entries: {seatFieldsCount}</div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() =>
              appendSeat({ seatId: "", price: 0, isAvailable: true })
            }
            className="text-sm text-blue-600 hover:underline"
          >
            Add Seat
          </button>
        </div>
      </div> */}

      {/* Buttons */}
      {/* <div className="flex gap-3">
        <button
          type="button"
          onClick={onNext}
          className="bg-blue-600 text-white px-4 py-2 rounded-sm"
        >
          Next
        </button>
        <button
          type="button"
          onClick={onSave}
          className="border px-4 py-2 rounded-sm"
        >
          Save
        </button>
      </div> */}
    </div>
  );
}
