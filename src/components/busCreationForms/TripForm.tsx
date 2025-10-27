
"use client";

import React from 'react';
import { Controller, Control, UseFieldArrayRemove, UseFieldArrayAppend } from 'react-hook-form';
import { FormDataTrip } from '@/app/types/bustrip';
import { IoMdClose } from 'react-icons/io';

interface TripFormProps {
  control: Control<FormDataTrip>;
  onNext: () => void;
  onSave?: () => void; // optional save handler from parent
  seatFieldsCount: number;
  appendSeat: UseFieldArrayAppend<FormDataTrip, "seatPricing">;
  removeSeat: UseFieldArrayRemove;
}

export default function TripForm({ control, onNext, onSave, seatFieldsCount, appendSeat, removeSeat }: TripFormProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col">
        <label className="text-sm text-gray-600">Bus</label>
        <Controller
          name="bus"
          control={control}
          render={({ field }) => (
            <input {...field} placeholder="Bus ID or select" className="border rounded-sm py-1.5 px-1 focus:ring focus:ring-blue-500 outline-none" />
          )}
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm text-gray-600">Route</label>
        <Controller
          name="route"
          control={control}
          render={({ field }) => (
            <input {...field} placeholder="Route ID or select" className="border rounded-sm py-1.5 px-1 focus:ring focus:ring-blue-500 outline-none" />
          )}
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1">
          <label className="text-sm text-gray-600">Departure Time</label>
          <Controller
            name="departureTime"
            control={control}
            render={({ field }) => (
              <input {...field} type="time" className="border w-full rounded-sm py-1.5 px-1" />
            )}
          />
        </div>

        <div className="flex-1">
          <label className="text-sm text-gray-600">Arrival Time</label>
          <Controller
            name="arrivalTime"
            control={control}
            render={({ field }) => (
              <input {...field} type="time" className="border w-full rounded-sm py-1.5 px-1" />
            )}
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label className="text-sm text-gray-600">Base Price (₹)</label>
        <Controller
          name="basePrice"
          control={control}
          render={({ field }) => (
            <input {...field} type="number" min={0} className="border rounded-sm py-1.5 px-1" />
          )}
        />
      </div>

      {/* seat pricing quick controls */}
      <div className="flex items-center justify-between">
        <div className="text-sm">Seat pricing entries: {seatFieldsCount}</div>
        <div className="flex gap-3">
          <button type="button" onClick={() => appendSeat({ seatId: '', price: 0, isAvailable: true })} className="text-sm text-blue-600 hover:underline">Add Seat</button>
        </div>
      </div>

      <div className="flex gap-3">
        <button type="button" onClick={onNext} className="bg-blue-600 text-white px-4 py-2 rounded-sm">Next</button>
        <button type="button" onClick={onSave} className="border px-4 py-2 rounded-sm">Save</button>
      </div>
    </div>
  );
}


