"use client";

import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { handleApiError } from "@/lib/utils/handleApiError";
import RouteMap from "../common/RouteMap";
import RouteForm from "../busCreationForms/RouteForm";
import {
  FormData,
  StepRouteDetailsProps,
  StepRouteDetailsRef,
  libraries,
} from "@/app/types/busroute";
import { FaBus } from "react-icons/fa6";

const StepRouteDetails = forwardRef<StepRouteDetailsRef, StepRouteDetailsProps>(
  ({ busId, routeId, routeDetail }, ref) => {
    const { control, handleSubmit, reset, setValue, watch, getValues } =
      useForm<FormData>({
        defaultValues: {
          routeName: "",
          bus: busId || "",
          routeDescription: "",
          distance: 0,
          duration: "",
          source: { name: "", lat: 0, lng: 0 },
          destination: { name: "", lat: 0, lng: 0 },
          boardingPoints: [],
          droppingPoints: [],
          stops: [],
        },
      });

    // field arrays
    const {
      fields: boardingFields,
      append: appendBoarding,
      remove: removeBoarding,
    } = useFieldArray({ control, name: "boardingPoints" });

    const {
      fields: droppingFields,
      append: appendDropping,
      remove: removeDropping,
    } = useFieldArray({ control, name: "droppingPoints" });

    const {
      fields: stopsFields,
      append: appendStop,
      remove: removeStop,
    } = useFieldArray({ control, name: "stops" });

    const [loadingCreate, setLoadingCreate] = useState(false);
    const [directions, setDirections] =
      useState<google.maps.DirectionsResult | null>(null);
    const [mapLoaded, setMapLoaded] = useState(false);

    const sourceRef = useRef<HTMLInputElement | null>(null);
    const destinationRef = useRef<HTMLInputElement | null>(null);
    const boardingRefs = useRef<google.maps.places.Autocomplete[]>([]);
    const droppingRefs = useRef<google.maps.places.Autocomplete[]>([]);
    const stopsRefs = useRef<google.maps.places.Autocomplete[]>([]);

    const source = watch("source");
    const destination = watch("destination");
    const stops = watch("stops");

    // ✅ Load Google Maps API
    const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
      libraries,
    });

    useEffect(() => {
      if (isLoaded) {
        console.log("✅ Google Maps API loaded successfully");
        setMapLoaded(true);
      }
    }, [isLoaded]);

    // ✅ Function to calculate route
    const calculateRoute = useCallback(async () => {
      if (!mapLoaded) return;
      if (!source?.lat || !destination?.lat) return;

      try {
        const directionsService = new google.maps.DirectionsService();
        const result = await directionsService.route({
          origin: { lat: source.lat, lng: source.lng },
          destination: { lat: destination.lat, lng: destination.lng },
          travelMode: google.maps.TravelMode.DRIVING,
        });

        if (result.routes.length > 0) {
          setDirections(result);
          const leg = result.routes[0].legs[0];
          if (leg) {
            const distanceKm = (leg.distance?.value ?? 0) / 1000;
            const durationText = leg.duration?.text || "";
            setValue("distance", distanceKm);
            setValue("duration", durationText);
          }
        }
      } catch (err) {
        console.error("Error calculating route:", err);
        toast.error("Failed to calculate route distance and duration.");
      }
    }, [source, destination, setValue, mapLoaded]);

    // ✅ Automatically calculate route when source/destination change
    useEffect(() => {
      if (source?.lat && destination?.lat && mapLoaded) {
        calculateRoute();
      }
    }, [source?.lat, source?.lng, destination?.lat, destination?.lng, mapLoaded, calculateRoute]);

    // ✅ Handle place selection
    const handlePlaceSelect = useCallback(
      (
        autocomplete: google.maps.places.Autocomplete,
        field: keyof FormData,
        index?: number
      ) => {
        const place = autocomplete.getPlace();
        if (!place.geometry?.location) return;

        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const name = place.name || place.formatted_address || "";

        if (
          index !== undefined &&
          ["boardingPoints", "droppingPoints", "stops"].includes(field)
        ) {
          const typedField = field as "boardingPoints" | "droppingPoints" | "stops";
          setValue(`${typedField}.${index}.lat` as const, lat);
          setValue(`${typedField}.${index}.lng` as const, lng);
          setValue(`${typedField}.${index}.name` as const, name);
        } else {
          const typedField = field as "source" | "destination";
          setValue(`${typedField}.lat` as const, lat);
          setValue(`${typedField}.lng` as const, lng);
          setValue(`${typedField}.name` as const, name);
        }
      },
      [setValue]
    );

    const addPoint = (type: "boardingPoints" | "droppingPoints" | "stops") => {
      const append =
        type === "boardingPoints"
          ? appendBoarding
          : type === "droppingPoints"
            ? appendDropping
            : appendStop;
      append({ name: "", lat: 0, lng: 0, time: "", landmark: "" });
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

    // ✅ Fetch route details if editing
    useEffect(() => {
      const fetchRouteDetails = async () => {
        if (!routeId) return;
        try {
          const response = await api.get(`/myroute/route-detail/${routeId}`);
          if (response.status === 200 && response.data.data) {
            reset(response.data.data);
          }
        } catch (error) {
          handleApiError(error);
        }
      };

      fetchRouteDetails();
    }, [routeId, reset]);


    // ✅ Expose method for parent component
    useImperativeHandle(ref, () => ({
      createRoute: async () => {
        let createdId: string | undefined = undefined;
        await handleSubmit(async (data) => {
          if (!busId) {
            toast.error("Bus ID not found!");
            return;
          }

          const payload = { ...data, busId };
          setLoadingCreate(true);
          try {
            if (routeId) {
              const response = await api.put(`/myroute/update-busroute/${routeId}`, payload);
              if (response.status === 200) {
                toast.success("Route updated successfully!");
                createdId = routeId;
              }
            } else {
              const response = await api.post("/myroute/create-new-busroute", payload);
              if (response.status === 200) {
                toast.success("Route created successfully!");
                createdId = response.data.data._id;
              }
            }
          } catch (error) {
            handleApiError(error);
          } finally {
            setLoadingCreate(false);
          }
        })();
        return createdId;
      },
    }));

    if (!isLoaded) {
      return (
        <div className="flex items-center justify-center h-64 text-gray-500">
          Loading Google Maps...
        </div>
      );
    }

    return (
      <form className="bg-gray-100/50 rounded-md px-8 py-5 flex gap-10 justify-between">
        {/* Left side: Form */}
        <div className="flex-1 w-1/2">
          <RouteForm
            control={control}
            sourceRef={sourceRef}
            destinationRef={destinationRef}
            handlePlaceSelect={handlePlaceSelect}
            boardingFields={boardingFields}
            droppingFields={droppingFields}
            stopsFields={stopsFields}
            addPoint={addPoint}
            removePoint={removePoint}
            boardingRefs={boardingRefs}
            droppingRefs={droppingRefs}
            stopsRefs={stopsRefs}
          />
        </div>

        {/* Right side: Map & Summary */}
        <div className="flex-1 w-1/2">
          <RouteMap
            source={source}
            destination={destination}
            boardingPoints={getValues("boardingPoints")}
            droppingPoints={getValues("droppingPoints")}
            stops={stops}
          />

          {/* ✅ Distance & Duration Display */}
          <div className="flex items-center gap-5 text-sm text-gray-700 mt-3">
            <p>
              <strong>Distance:</strong>{" "}
              {getValues("distance") > 0
                ? `${getValues("distance").toFixed(2)} km`
                : "N/A"}
            </p>
            <p>
              <strong>Duration:</strong> {getValues("duration") || "N/A"}
            </p>
          </div>

          {/* Save Button */}
          {loadingCreate && <div className="flex justify-end mt-4">
            <button
              type="button"
              className="bg-blue-600 flex items-center justify-center gap-2 px-4 py-1.5 rounded-md text-gray-50 min-w-[120px] transition hover:bg-blue-700 disabled:opacity-70"
              disabled={loadingCreate}
              onClick={async () => {
                const id = await (
                  ref as React.RefObject<StepRouteDetailsRef>
                )?.current?.createRoute?.();
                if (id) console.log("Created route ID:", id);
              }}
            >
              <div className="flex items-center gap-2">
                <FaBus className="text-white text-xl animate-busRun" />
                <span>Uploading...</span>
              </div>
            </button>
          </div>}
        </div>
      </form>
    );
  }
);

StepRouteDetails.displayName = "StepRouteDetails";
export default StepRouteDetails;
