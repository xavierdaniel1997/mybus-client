// components/common/MiniCalendar.tsx
"use client";

import React, {useState} from "react";
import dayjs from "dayjs";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";

interface MiniCalendarProps {
  selectedDates: Date[];
  onDateSelect: (date: Date) => void;
  disabled?: boolean;
  showHeading?: boolean;
}

export default function MiniCalendar({
  selectedDates,
  onDateSelect,
  disabled = false,
  showHeading = true,
}: MiniCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [activeDate, setActiveDate] = useState<Date | null>(null);

  const startOfMonth = currentMonth.startOf("month");
  const endOfMonth = currentMonth.endOf("month");
  const startDate = startOfMonth.startOf("week");
  const endDate = endOfMonth.endOf("week");

  const days: dayjs.Dayjs[] = [];
  let day = startDate;
  while (day.isBefore(endDate) || day.isSame(endDate, "day")) {
    days.push(day);
    day = day.add(1, "day");
  }

  const isSelected = (date: dayjs.Dayjs) =>
    selectedDates.some((d) => dayjs(d).isSame(date, "day"));

    const isScheduled = (date: dayjs.Dayjs) =>
    selectedDates.some((d) => dayjs(d).isSame(date, "day"));


   const isActive = (date: dayjs.Dayjs) =>
    activeDate && dayjs(activeDate).isSame(date, "day");

  // const handleDateClick = (date: dayjs.Dayjs) => {
  //   if (!disabled) onDateSelect(date.toDate());
  // };

  const handleDateClick = (date: dayjs.Dayjs) => {
  if (!disabled) {
    const jsDate = date.toDate();
    setActiveDate(jsDate);
    onDateSelect(jsDate);
  }
};

  return (
    <div>
      {showHeading && <h3 className="font-semibold text mb-2">
        Scheduled Days
      </h3>}
      {showHeading && <p className="w-full text-sm text-gray-500 mb-4">Select dates from the calendar</p>}
      <div className="w-[400px] h-[420px] border rounded-md p-3 shadow-sm">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <button
            className="p-3 hover:bg-gray-100 rounded-full"
            onClick={() => setCurrentMonth(currentMonth.subtract(1, "month"))}
          >
            <IoIosArrowBack size={16} />
          </button>
          <span className="text-lg font-semibold">
            {currentMonth.format("MMMM YYYY")}
          </span>
          <button
            className="p-1 hover:bg-gray-100 rounded-full"
            onClick={() => setCurrentMonth(currentMonth.add(1, "month"))}
          >
            <IoIosArrowForward size={16} />
          </button>
        </div>

        {/* Weekdays */}
        <div className="grid grid-cols-7 text-center text-[16px] text-gray-500 mb-4">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 text-center text-[14px] gap-3">
          {days.map((date) => {
            const inMonth = date.isSame(currentMonth, "month");
            const selected = isSelected(date);
            const scheduled = isScheduled(date);
            const active = isActive(date);
            return (
              <div
                key={date.toString()}
                onClick={() => handleDateClick(date)}
                  className={`cursor-pointer p-1.5 rounded-sm
                  ${
                    active ? "bg-red-500 text-white" : ""
                  }  <!-- Selected by user -->
                  ${
                    !active && scheduled
                      ? "bg-blue-600 text-white"
                      : ""
                  }  <!-- Scheduled trip date -->
                  ${
                    !active && !scheduled && inMonth
                      ? "hover:bg-blue-50 text-gray-800"
                      : ""
                  } <!-- Normal days -->
                  ${!inMonth ? "text-gray-300" : ""} <!-- Outside month -->
                `}
              >
                {date.date()}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
