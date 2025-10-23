// components/steps/StepRouteDetails.tsx
"use client";

import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import {LoadScript, Autocomplete, Libraries} from "@react-google-maps/api";
import {useForm, useFieldArray, Controller} from "react-hook-form";
import RouteMap from "../common/RouteMap";
import {IoMdClose} from "react-icons/io";
import {api} from "@/lib/api";
import {toast} from "sonner";
import {handleApiError} from "@/lib/utils/handleApiError";

const libraries: Libraries = ["places"];

interface GeoPoint {
  name: string;
  lat: number;
  lng: number;
  time?: string;
  landmark?: string;
}

interface Bus {
  _id: string;
  name: string;
}

export interface FormData {
  routeName: string;
  busId: string;
  source: GeoPoint;
  destination: GeoPoint;
  boardingPoints: GeoPoint[];
  droppingPoints: GeoPoint[];
  stops: GeoPoint[];
  distance: number;
  duration: string;
}

interface StepRouteDetailsProps {
  busId: string | null;
}

export interface StepRouteDetailsRef {
  /**
   * Creates the route using current form values.
   * Returns created route id string on success, undefined on failure.
   */
  createRoute: () => Promise<string | undefined>;
}

const StepRouteDetails = forwardRef<StepRouteDetailsRef, StepRouteDetailsProps>(
  ({busId}, ref) => {
    const {control, handleSubmit, setValue, watch, getValues} =
      useForm<FormData>({
        defaultValues: {
          routeName: "",
          busId: busId || "",
          distance: 0,
          duration: "",
          source: {name: "", lat: 0, lng: 0},
          destination: {name: "", lat: 0, lng: 0},
          boardingPoints: [],
          droppingPoints: [],
          stops: [],
        },
      });

    const {
      fields: boardingFields,
      append: appendBoarding,
      remove: removeBoarding,
    } = useFieldArray({
      control,
      name: "boardingPoints",
    });

    const {
      fields: droppingFields,
      append: appendDropping,
      remove: removeDropping,
    } = useFieldArray({
      control,
      name: "droppingPoints",
    });

    const {
      fields: stopsFields,
      append: appendStop,
      remove: removeStop,
    } = useFieldArray({
      control,
      name: "stops",
    });

    const [directions, setDirections] =
      useState<google.maps.DirectionsResult | null>(null);
    const [loadingCreate, setLoadingCreate] = useState(false);

    const sourceRef = useRef<HTMLInputElement>(null);
    const destinationRef = useRef<HTMLInputElement>(null);
    const boardingRefs = useRef<google.maps.places.Autocomplete[]>([]);
    const droppingRefs = useRef<google.maps.places.Autocomplete[]>([]);
    const stopsRefs = useRef<google.maps.places.Autocomplete[]>([]);

    const source = watch("source");
    const destination = watch("destination");
    const stops = watch("stops");

    const handlePlaceSelect = (
      autocomplete: google.maps.places.Autocomplete,
      field: keyof Pick<
        FormData,
        "source" | "destination" | "boardingPoints" | "droppingPoints" | "stops"
      >,
      index?: number
    ) => {
      const place = autocomplete.getPlace();
      if (!place.geometry || !place.geometry.location) return;

      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      const name = place.name || place.formatted_address || "";

      if (
        index !== undefined &&
        (field === "boardingPoints" ||
          field === "droppingPoints" ||
          field === "stops")
      ) {
        setValue(`${field}.${index}.lat`, lat);
        setValue(`${field}.${index}.lng`, lng);
        setValue(`${field}.${index}.name`, name);
      } else if (field === "source" || field === "destination") {
        setValue(`${field}.lat`, lat);
        setValue(`${field}.lng`, lng);
        setValue(`${field}.name`, name);
      }
    };

    const calculateRoute = useCallback(() => {
      if (!source?.lat || !destination?.lat) {
        console.warn("Source or destination missing");
        return;
      }

      const directionsService = new google.maps.DirectionsService();
      const waypoints = stops
        .filter((s) => s.lat && s.lng)
        .map((stop) => ({
          location: {lat: stop.lat, lng: stop.lng},
          stopover: true,
        }));

      directionsService.route(
        {
          origin: {lat: source.lat, lng: source.lng},
          destination: {lat: destination.lat, lng: destination.lng},
          waypoints,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && result) {
            setDirections(result);
            const route = result.routes[0];
            if (route) {
              // compute total distance/duration from all legs:
              let totalDistance = 0;
              let totalDurationSeconds = 0;
              route.legs.forEach((leg) => {
                totalDistance += leg.distance?.value || 0;
                totalDurationSeconds += leg.duration?.value || 0;
              });
              setValue("distance", totalDistance);
              // convert seconds to readable text
              const hours = Math.floor(totalDurationSeconds / 3600);
              const mins = Math.floor((totalDurationSeconds % 3600) / 60);
              setValue(
                "duration",
                hours > 0 ? `${hours} hr ${mins} min` : `${mins} min`
              );
            }
          } else {
            console.error("Directions request failed:", status);
            setDirections(null);
          }
        }
      );
    }, [source, destination, stops, setValue]);

    // Expose createRoute to parent via ref
    useImperativeHandle(ref, () => ({
      createRoute: async (): Promise<string | undefined> => {
        // use handleSubmit to validate fields before sending
        let createdId: string | undefined = undefined;

        await handleSubmit(async (data) => {
          if (!busId) {
            // Parent should ensure busId exists, but guard here too.
            console.error(
              "Bus ID is missing. Create bus before creating route."
            );
            return;
          }

          setLoadingCreate(true);

          const payload = {
            ...data,
            busId: busId,
          };

          try {
            const response = await api.post(
              "myroute/create-new-busroute",
              payload
            );
             console.log(
                "this is the response of newley created route....",
                response
              );
            if (response.status === 200) {
              createdId = response?.data?.data?._id;
              toast.success(response.data.message);
             
            }
          } catch (error) {
            console.error("Error creating route...", error);
            handleApiError(error);
          } finally {
            setLoadingCreate(false);
          }
        })(); // call returned function to run validation + submit

        return createdId;
      },
    }));

    const onSubmit = (data: FormData) => {
      // fallback local submit (won't be used if parent invokes createRoute())
      console.log("Form submit (local):", data);
    };

    const addPoint = (type: "boardingPoints" | "droppingPoints" | "stops") => {
      const append =
        type === "boardingPoints"
          ? appendBoarding
          : type === "droppingPoints"
          ? appendDropping
          : appendStop;
      append({name: "", lat: 0, lng: 0, time: "", landmark: ""});
    };

    const removePoint = (
      type: "boardingPoints" | "droppingPoints" | "stops",
      index: number
    ) => {
      const remove =
        type === "boardingPoints"
          ? removeBoarding
          : type === "droppingPoints"
          ? removeDropping
          : removeStop;
      remove(index);
    };

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
    if (!apiKey) {
      return (
        <div>
          Error: Google Maps API key is missing. Please set
          NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in .env.local.
        </div>
      );
    }

    return (
      <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
        <form
          className="bg-gray-100/50 rounded-md px-8 py-5 flex w-full justify-between gap-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex-1 space-y-3">
            <div className="flex flex-col mb-3">
              <label className="text-sm text-gray-600">Route Name</label>
              <Controller
                name="routeName"
                control={control}
                render={({field}) => (
                  <input
                    {...field}
                    className="w-full border rounded-sm py-1.5 px-1 focus:ring focus:ring-blue-500 outline-none"
                    placeholder="Route name"
                  />
                )}
              />
            </div>

            <div></div>

            <h3 className="text-sm text-gray-600 mb-1">Source</h3>
            <div className="flex items-center gap-5">
              <div className="flex flex-col mb-1">
                <Autocomplete
                  onLoad={(auto) =>
                    auto.addListener("place_changed", () =>
                      handlePlaceSelect(auto, "source")
                    )
                  }
                >
                  <input
                    ref={sourceRef}
                    className="w-full border rounded-sm py-1.5 px-1 focus:ring focus:ring-blue-500 outline-none"
                    placeholder="Search source"
                  />
                </Autocomplete>
              </div>

              <div className="flex flex-col mb-1">
                <Controller
                  name="source.time"
                  control={control}
                  render={({field}) => (
                    <input
                      {...field}
                      className="w-full border rounded-sm py-1.5 px-1 focus:ring focus:ring-blue-500 outline-none"
                      placeholder="Time"
                    />
                  )}
                />
              </div>
              <div className="flex flex-col mb-1">
                <Controller
                  name="source.landmark"
                  control={control}
                  render={({field}) => (
                    <input
                      {...field}
                      className="w-full border rounded-sm py-1.5 px-1 focus:ring focus:ring-blue-500 outline-none"
                      placeholder="Landmark"
                    />
                  )}
                />
              </div>
            </div>

            <h3 className="text-sm text-gray-600 mb-1">Destination</h3>
            <div className="flex items-center gap-5">
              <div className="flex flex-col mb-1">
                <Autocomplete
                  onLoad={(auto) =>
                    auto.addListener("place_changed", () =>
                      handlePlaceSelect(auto, "destination")
                    )
                  }
                >
                  <input
                    ref={destinationRef}
                    className="w-full border rounded-sm py-1.5 px-1 focus:ring focus:ring-blue-500 outline-none"
                    placeholder="Search destination"
                  />
                </Autocomplete>
              </div>

              <div className="flex flex-col mb-1">
                <Controller
                  name="destination.time"
                  control={control}
                  render={({field}) => (
                    <input
                      {...field}
                      value={field.value ?? ""}
                      className="w-full border rounded-sm py-1.5 px-1 focus:ring focus:ring-blue-500 outline-none"
                      placeholder="Time"
                    />
                  )}
                />
              </div>
              <div className="flex flex-col mb-1">
                <Controller
                  name="destination.landmark"
                  control={control}
                  render={({field}) => (
                    <input
                      {...field}
                      className="w-full border rounded-sm py-1.5 px-1 focus:ring focus:ring-blue-500 outline-none"
                      placeholder="Landmark"
                    />
                  )}
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm text-gray-600 mb-1">Boarding Points</h3>
              {boardingFields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-5 mb-2">
                  <div className="flex flex-col mb-1">
                    <Autocomplete
                      onLoad={(auto) => {
                        boardingRefs.current[index] = auto;
                        auto.addListener("place_changed", () =>
                          handlePlaceSelect(auto, "boardingPoints", index)
                        );
                      }}
                    >
                      <input
                        className="w-full border rounded-sm py-1.5 px-1 focus:ring focus:ring-blue-500 outline-none"
                        placeholder={`Boarding point ${index + 1}`}
                      />
                    </Autocomplete>
                  </div>

                  <div className="flex flex-col mb-1">
                    <Controller
                      name={`boardingPoints.${index}.time`}
                      control={control}
                      render={({field}) => (
                        <input
                          {...field}
                          value={field.value ?? ""}
                          className="w-full border rounded-sm py-1.5 px-1 focus:ring focus:ring-blue-500 outline-none"
                          placeholder="Time"
                        />
                      )}
                    />
                  </div>

                  <div className="flex flex-col mb-1">
                    <Controller
                      name={`boardingPoints.${index}.landmark`}
                      control={control}
                      render={({field}) => (
                        <input
                          {...field}
                          className="w-full border rounded-sm py-1.5 px-1 focus:ring focus:ring-blue-500 outline-none"
                          placeholder="Landmark"
                        />
                      )}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => removePoint("boardingPoints", index)}
                    className="text-gray-500 bg-gray-300/40 border rounded-sm py-1.5 px-1 focus:ring focus:ring-blue-400 outline-none"
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

            <div>
              <h3 className="text-sm text-gray-600 mb-1">Dropping Points</h3>
              {droppingFields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-5 mb-2">
                  <div className="flex flex-col mb-1">
                    <Autocomplete
                      onLoad={(auto) => {
                        droppingRefs.current[index] = auto;
                        auto.addListener("place_changed", () =>
                          handlePlaceSelect(auto, "droppingPoints", index)
                        );
                      }}
                    >
                      <input
                        className="w-full border rounded-sm py-1.5 px-1 focus:ring focus:ring-blue-500 outline-none"
                        placeholder={`Dropping point ${index + 1}`}
                      />
                    </Autocomplete>
                  </div>

                  <div className="flex flex-col mb-1">
                    <Controller
                      name={`droppingPoints.${index}.time`}
                      control={control}
                      render={({field}) => (
                        <input
                          {...field}
                          className="w-full border rounded-sm py-1.5 px-1 focus:ring focus:ring-blue-500 outline-none"
                          placeholder="Time"
                        />
                      )}
                    />
                  </div>

                  <div className="flex flex-col mb-1">
                    <Controller
                      name={`droppingPoints.${index}.landmark`}
                      control={control}
                      render={({field}) => (
                        <input
                          {...field}
                          className="w-full border rounded-sm py-1.5 px-1 focus:ring focus:ring-blue-500 outline-none"
                          placeholder="Landmark"
                        />
                      )}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => removePoint("droppingPoints", index)}
                    className="text-gray-500 bg-gray-300/40 border rounded-sm py-1.5 px-1 focus:ring focus:ring-blue-400 outline-none"
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

            <div>
              <h3 className="text-sm text-gray-600 mb-1">Stops</h3>
              {stopsFields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-5 mb-2">
                  <div className="flex flex-col mb-1">
                    <Autocomplete
                      onLoad={(auto) => {
                        stopsRefs.current[index] = auto;
                        auto.addListener("place_changed", () =>
                          handlePlaceSelect(auto, "stops", index)
                        );
                      }}
                    >
                      <input
                        className="w-full border rounded-sm py-1.5 px-1 focus:ring focus:ring-blue-500 outline-none"
                        placeholder={`Stop ${index + 1}`}
                      />
                    </Autocomplete>
                  </div>

                  <div className="flex flex-col mb-1">
                    <Controller
                      name={`stops.${index}.time`}
                      control={control}
                      render={({field}) => (
                        <input
                          {...field}
                          className="w-full border rounded-sm py-1.5 px-1 focus:ring focus:ring-blue-500 outline-none"
                          placeholder="Time"
                        />
                      )}
                    />
                  </div>

                  <div className="flex flex-col mb-1">
                    <Controller
                      name={`stops.${index}.landmark`}
                      control={control}
                      render={({field}) => (
                        <input
                          {...field}
                          className="w-full border rounded-sm py-1.5 px-1 focus:ring focus:ring-blue-500 outline-none"
                          placeholder="Landmark"
                        />
                      )}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => removePoint("stops", index)}
                    className="text-gray-500 bg-gray-300/40 border rounded-sm py-1.5 px-1 focus:ring focus:ring-blue-400 outline-none"
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

          <div className="flex-1">
            <div className="h-[420px]">
              <RouteMap
                source={source}
                destination={destination}
                boardingPoints={getValues("boardingPoints")}
                droppingPoints={getValues("droppingPoints")}
                stops={stops}
                // directions={directions}
              />
            </div>

            <div className="mb-3 flex gap-3 items-center">
              <button
                type="button"
                onClick={calculateRoute}
                className="text-blue-600"
              >
                Calculate and Show Route
              </button>

              <p className="text-sm text-gray-600">
                  <strong>Distance:</strong>{" "}
                  {(watch("distance") / 1000).toFixed(2)} km,
                </p>

                <p className="text-sm text-gray-600">
                  <strong>Duration:</strong> {watch("duration")}
                </p>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={async () => {
                  const created = await (
                    ref as React.RefObject<StepRouteDetailsRef>
                  )?.current?.createRoute?.();
                  if (created) {
                    // optionally navigate or set UI feedback
                    console.log("Created route id:", created);
                  }
                }}
                className="px-4 py-1 bg-blue-600 text-white rounded-md"
              >
                {loadingCreate ? "Saving..." : "Save Route"}
              </button>
            </div>
          </div>
        </form>
      </LoadScript>
    );
  }
);

StepRouteDetails.displayName = "StepRouteDetails";

export default StepRouteDetails;
