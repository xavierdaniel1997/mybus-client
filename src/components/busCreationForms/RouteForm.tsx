// components/steps/RouteForm.tsx
"use client";

import { Controller, Control, UseFieldArrayReturn } from "react-hook-form";
import { Autocomplete } from "@react-google-maps/api";
import { IoMdClose } from "react-icons/io";
import { FormData } from "@/app/types/busroute";

interface RouteFormProps {
  control: Control<FormData>;
 sourceRef: React.RefObject<HTMLInputElement | null>;
  destinationRef: React.RefObject<HTMLInputElement | null>;
  handlePlaceSelect: (
    autocomplete: google.maps.places.Autocomplete,
    field: keyof Pick<FormData, "source" | "destination" | "boardingPoints" | "droppingPoints" | "stops">,
    index?: number
  ) => void;
  boardingFields: UseFieldArrayReturn<FormData, "boardingPoints">["fields"];
  droppingFields: UseFieldArrayReturn<FormData, "droppingPoints">["fields"];
  stopsFields: UseFieldArrayReturn<FormData, "stops">["fields"];
  addPoint: (type: "boardingPoints" | "droppingPoints" | "stops") => void;
  removePoint: (type: "boardingPoints" | "droppingPoints" | "stops", index: number) => void;
  boardingRefs: React.MutableRefObject<google.maps.places.Autocomplete[]>;
  droppingRefs: React.MutableRefObject<google.maps.places.Autocomplete[]>;
  stopsRefs: React.MutableRefObject<google.maps.places.Autocomplete[]>;
}

export default function RouteForm({
  control,
  sourceRef,
  destinationRef,
  handlePlaceSelect,
  boardingFields,
  droppingFields,
  stopsFields,
  addPoint,
  removePoint,
  boardingRefs,
  droppingRefs,
  stopsRefs,
}: RouteFormProps) {
  return (
    <div className="flex-1 space-y-4">
      {/* Route Name */}
      <div className="flex flex-col mb-3">
        <label className="text-sm text-gray-600">Route Name</label>
        <Controller
          name="routeName"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              className="border rounded-sm py-1.5 px-1 focus:ring focus:ring-blue-500 outline-none"
              placeholder="Route name"
            />
          )}
        />
      </div>

      {/* Source */}
      <h3 className="text-sm text-gray-600 mb-1">Source</h3>
      <div className="flex items-center gap-5">
        <Autocomplete
          onLoad={(auto) => auto.addListener("place_changed", () => handlePlaceSelect(auto, "source"))}
        >
          <input
            ref={sourceRef}
            className="border rounded-sm py-1.5 px-1 focus:ring focus:ring-blue-500 outline-none"
            placeholder="Search source"
          />
        </Autocomplete>

        {/* <Controller
          name="source.time"
          control={control}
          render={({ field }) => (
            <input {...field}
             value={field.value || ""}
              className="border w-30 rounded-sm py-1.5 px-1" placeholder="Time" />
          )}
        /> */}
        <Controller
  name="destination.time"
  control={control}
  render={({ field }) => (
    <input
      {...field}
      type="time"
      value={field.value || ""}
      onChange={(e) => field.onChange(e.target.value)}
      className="border w-30 rounded-sm py-1.5 px-1"
      step="60"
    />
  )}
/>


        <Controller
          name="source.landmark"
          control={control}
          render={({ field }) => (
            <input {...field}
            value={field.value || ""}
            className="border w-full rounded-sm py-1.5 px-1" placeholder="Landmark" />
          )}
        />
      </div>

      {/* Destination */}
      <h3 className="text-sm text-gray-600 mb-1">Destination</h3>
      <div className="flex items-center gap-5">
        <Autocomplete
          onLoad={(auto) => auto.addListener("place_changed", () => handlePlaceSelect(auto, "destination"))}
        >
          <input
            ref={destinationRef}
            className="border rounded-sm py-1.5 px-1 focus:ring focus:ring-blue-500 outline-none"
            placeholder="Search destination"
          />
        </Autocomplete>

        <Controller
          name="source.time"
          control={control}
          render={({ field }) => (
            // <input {...field} 
            // value={field.value || ""}
            // className="border w-30 rounded-sm py-1.5 px-1" placeholder="Time" />
            <input
      {...field}
      type="time"
      value={field.value || ""}
      onChange={(e) => field.onChange(e.target.value)}
      className="border w-30 rounded-sm py-1.5 px-1"
      step="60"
    />
          )}
        />

        <Controller
          name="destination.landmark"
          control={control}
          render={({ field }) => (
            <input {...field} 
            value={field.value || ""}
            className="border w-full rounded-sm py-1.5 px-1" placeholder="Landmark" />
          )}
        />
      </div>

      {/* Boarding Points */}
      <div className="w-full">
        <h3 className="text-sm text-gray-600 mb-1">Boarding Points</h3>
        {boardingFields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-5 mb-2">
            <Autocomplete
              onLoad={(auto) => {
                boardingRefs.current[index] = auto;
                auto.addListener("place_changed", () =>
                  handlePlaceSelect(auto, "boardingPoints", index)
                );
              }}
            >
              <input
                className="border rounded-sm py-1.5 px-1"
                placeholder={`Boarding point ${index + 1}`}
              />
            </Autocomplete>

            <Controller
              name={`boardingPoints.${index}.time`}
              control={control}
              render={({ field }) => (
                // <input {...field} className="border  w-20 rounded-sm py-1.5 px-1" placeholder="Time" />
                <input
      {...field}
      type="time"
      value={field.value || ""}
      onChange={(e) => field.onChange(e.target.value)}
      className="border w-30 rounded-sm py-1.5 px-1"
      step="60"
    />
              )}
            />

            <Controller
              name={`boardingPoints.${index}.landmark`}
              control={control}
              render={({ field }) => (
                <input {...field} className="border rounded-sm py-1.5 px-1" placeholder="Landmark" />
              )}
            />

            <button
              type="button"
              onClick={() => removePoint("boardingPoints", index)}
              className="text-gray-500 bg-gray-300/40 border rounded-sm py-1.5 px-1"
            >
              <IoMdClose size={23} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addPoint("boardingPoints")}
          className="text-sm text-blue-600 hover:underline"
        >
          Add Boarding Point
        </button>
      </div>

      {/* Dropping Points */}
      <div className="w-full">
        <h3 className="text-sm text-gray-600 mb-1">Dropping Points</h3>
        {droppingFields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-5 mb-2">
            <Autocomplete
              onLoad={(auto) => {
                droppingRefs.current[index] = auto;
                auto.addListener("place_changed", () =>
                  handlePlaceSelect(auto, "droppingPoints", index)
                );
              }}
            >
              <input
                className="border w-full rounded-sm py-1.5 px-1"
                placeholder={`Dropping point ${index + 1}`}
              />
            </Autocomplete>

            <Controller
              name={`droppingPoints.${index}.time`}
              control={control}
              render={({ field }) => (
                // <input {...field} className="border w-20 rounded-sm py-1.5 px-1" placeholder="Time" />
                <input
      {...field}
      type="time"
      value={field.value || ""}
      onChange={(e) => field.onChange(e.target.value)}
      className="border w-30 rounded-sm py-1.5 px-1"
      step="60"
    />
              )}
            />

            <Controller
              name={`droppingPoints.${index}.landmark`}
              control={control}
              render={({ field }) => (
                <input {...field} className="border rounded-sm py-1.5 px-1" placeholder="Landmark" />
              )}
            />

            <button
              type="button"
              onClick={() => removePoint("droppingPoints", index)}
              className="text-gray-500 bg-gray-300/40 border rounded-sm py-1.5 px-1"
            >
              <IoMdClose size={23} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addPoint("droppingPoints")}
          className="text-sm text-blue-600 hover:underline"
        >
          Add Dropping Point
        </button>
      </div>

      {/* Stops */}
      <div className="w-full">
        <h3 className="text-sm text-gray-600 mb-1">Stops</h3>
        {stopsFields.map((field, index) => (
          <div key={field.id} className="flex w-full items-center gap-5 mb-2">
            <Autocomplete
              onLoad={(auto) => {
                stopsRefs.current[index] = auto;
                auto.addListener("place_changed", () =>
                  handlePlaceSelect(auto, "stops", index)
                );
              }}
            >
              <input
                className="border w-full rounded-sm py-1.5 px-1"
                placeholder={`Stop ${index + 1}`}
              />
            </Autocomplete>

            <Controller
              name={`stops.${index}.time`}
              control={control}
              render={({ field }) => (
                // <input {...field} className="border w-20 rounded-sm py-1.5 px-1" placeholder="Time" />
                <input
      {...field}
      type="time"
      value={field.value || ""}
      onChange={(e) => field.onChange(e.target.value)}
      className="border w-30 rounded-sm py-1.5 px-1"
      step="60"
    />
              )}
            />

            <Controller
              name={`stops.${index}.landmark`}
              control={control}
              render={({ field }) => (
                <input {...field} className="border rounded-sm py-1.5 px-1" placeholder="Landmark" />
              )}
            />

            <button
              type="button"
              onClick={() => removePoint("stops", index)}
              className="text-gray-500 bg-gray-300/40 border rounded-sm py-1.5 px-1"
            >
              <IoMdClose size={23} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addPoint("stops")}
          className="text-sm text-blue-600 hover:underline"
        >
          Add Stop
        </button>
      </div>
    </div>
  );
}
