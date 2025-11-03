"use client";

import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import {useForm, useFieldArray} from "react-hook-form";
import TripForm from "../busCreationForms/TripForm";
import {FormDataTrip} from "@/app/types/bustrip";
import dayjs from "dayjs";
import MiniCalendar from "../busCreationForms/MiniCalendar";
import {RouteDetailsRes} from "@/app/types/busroute";
import {api} from "@/lib/api";
import {handleApiError} from "@/lib/utils/handleApiError";
import { FaBus } from "react-icons/fa6";

export interface StepTripSchedulerRef {
  createTrip: () => Promise<string | null>;
}

interface StepTripDetailsProps {
  busId?: string | null;
  routeId?: string | null;
  routeDetail?: RouteDetailsRes | null;
  tripId?: string | null;
}

const StepTripScheduler = forwardRef<
  StepTripSchedulerRef,
  StepTripDetailsProps
>(({busId, routeId, routeDetail, tripId}, ref) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {control, handleSubmit, watch, reset} = useForm<FormDataTrip>({
    defaultValues: {
      bus: busId || "",
      route: routeId || "",
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

  const {fields, append, remove} = useFieldArray({
    control,
    name: "seatPricing",
  });

  const [scheduledDates, setScheduledDates] = useState<Date[]>([]);



  useEffect(() => {
    const fetchTripDetails = async () => {
      if (!tripId) return;
      try {
        const response = await api.get(`/mytrips/scheduled-trips/${tripId}`);
        if (response.status === 200 && response.data.data) {
          reset(response.data.data);
        }
      } catch (error) {
        handleApiError(error);
      }
    };

    fetchTripDetails();
  }, [tripId, reset]);

  useEffect(() => {
    if (routeDetail) {
      reset({
        bus: routeDetail.bus?._id || busId || "",
        route: routeDetail._id || routeId || "",
        departureTime: routeDetail.source?.time || "",
        arrivalTime: routeDetail.destination?.time || "",
        basePrice: 0,
        frequency: "daily",
        startDate: "",
        endDate: "",
        active: true,
        seatPricing: [],
        status: "scheduled",
      });
    }
  }, [routeDetail, reset, busId, routeId]);

  // 📅 Handle date selection for mini calendar
  const handleDateSelect = (date: Date) => {
  if (watchFrequency !== "custom") return; // disable manual clicks for daily/weekdays

  setScheduledDates((prev) => {
    const exists = prev.some((d) => dayjs(d).isSame(date, "day"));
    return exists
      ? prev.filter((d) => !dayjs(d).isSame(date, "day"))
      : [...prev, date];
  });
};


  // 🗓️ Auto-generate full date range
  const watchStart = watch("startDate");
  const watchEnd = watch("endDate");
    const watchFrequency = watch("frequency");

  // useEffect(() => {
  //   if (watchStart && watchEnd) {
  //     const start = dayjs(watchStart);
  //     const end = dayjs(watchEnd);
  //     if (!start.isValid() || !end.isValid()) return;

  //     const range: Date[] = [];
  //     let d = start;
  //     while (d.isBefore(end) || d.isSame(end, "day")) {
  //       range.push(d.toDate());
  //       d = d.add(1, "day");
  //     }
  //     setScheduledDates(range);
  //   }
  // }, [watchStart, watchEnd]);


  useEffect(() => {
  if (!watchStart || !watchEnd) return;
  const start = dayjs(watchStart);
  const end = dayjs(watchEnd);
  if (!start.isValid() || !end.isValid()) return;

  if (watchFrequency === "daily") {
    // all days in range
    const range: Date[] = [];
    let d = start;
    while (d.isBefore(end) || d.isSame(end, "day")) {
      range.push(d.toDate());
      d = d.add(1, "day");
    }
    setScheduledDates(range);
  } 
  else if (watchFrequency === "weekdays") {
    // only Mon–Fri
    const range: Date[] = [];
    let d = start;
    while (d.isBefore(end) || d.isSame(end, "day")) {
      if (d.day() >= 1 && d.day() <= 5) {
        range.push(d.toDate());
      }
      d = d.add(1, "day");
    }
    setScheduledDates(range);
  }
  else if (watchFrequency === "custom") {
    // don't auto-generate anything — user will pick dates manually
    setScheduledDates((prev) => prev); // keep user’s manual selection
  }
}, [watchStart, watchEnd, watchFrequency]);


  // ⚙️ Define the save function (used by parent)
  useImperativeHandle(ref, () => ({
    async createTrip() {
      setIsLoading(true);
      const data = watch(); // get current form values
      const payload = {
        ...data,
        bus: busId,
        route: routeId,
        scheduledDates: scheduledDates.map((d) =>
          dayjs(d).format("YYYY-MM-DD")
        ),
      };

      try {
        const res = await api.post("/mytrips/schedule-trip", payload);
        if (res.status === 200 && res.data?.schedule?._id) {
          return res.data.schedule._id;
        }
      } catch (error) {
        setIsLoading(false);
        handleApiError(error);
        return null;
      }
    },
  }));

  return (
    <div className="p-6 flex justify-between flex-row gap-16">
      <div className="flex-2 w-full">
        <form onSubmit={handleSubmit(() => {})} className="space-y-5">
          <TripForm
            control={control}
            seatFieldsCount={fields.length}
            appendSeat={append}
            removeSeat={remove}
          />
        </form>
      </div>

      <div className="flex-1">
        <MiniCalendar
          selectedDates={scheduledDates}
          onDateSelect={handleDateSelect}
          disabled={watchFrequency !== "custom"}
        />
        <div className="flex justify-end mt-9">
                    {isLoading && (
                      <button
                        className="bg-blue-600 flex items-center justify-center gap-2 px-4 py-1.5 rounded-md text-gray-50 min-w-[120px] transition hover:bg-blue-700 disabled:opacity-70"
                        disabled={isLoading}
                      >
                        <div className="flex items-center gap-2">
                          <FaBus className="text-white text-xl animate-busRun" />
                          <span>Uploading...</span>
                        </div>
                      </button>
                    )} 
                  </div>
      </div>
    </div>
  );
});

StepTripScheduler.displayName = "StepTripScheduler";
export default StepTripScheduler;
