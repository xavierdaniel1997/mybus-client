// components/common/MiniCalendar.tsx
"use client";

import React, {useState} from "react";
import dayjs from "dayjs";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";

interface MiniCalendarProps {
  selectedDates: Date[];
  onDateSelect: (date: Date) => void;
}

export default function MiniCalendar({
  selectedDates,
  onDateSelect,
}: MiniCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

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

  const handleDateClick = (date: dayjs.Dayjs) => onDateSelect(date.toDate());

  return (
    <div>
      <h3 className="font-semibold text-sm mb-2">
        Scheduled Days
      </h3>
      <p className="w-full text-xs text-gray-500 mb-4">Select dates from the calendar</p>
      <div className="w-[350px] h-[320px] border rounded-md p-2 shadow-sm">
        {/* Header */}
        <div className="flex justify-between items-center mb-1.5">
          <button
            className="p-3 hover:bg-gray-100 rounded-full"
            onClick={() => setCurrentMonth(currentMonth.subtract(1, "month"))}
          >
            <IoIosArrowBack size={16} />
          </button>
          <span className="text-md font-semibold">
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
        <div className="grid grid-cols-7 text-center text-[14px] text-gray-500 mb-2">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 text-center text-[14px] gap-3">
          {days.map((date) => {
            const inMonth = date.isSame(currentMonth, "month");
            const selected = isSelected(date);
            return (
              <div
                key={date.toString()}
                onClick={() => handleDateClick(date)}
                className={`cursor-pointer py-[3px] rounded-sm ${
                  selected
                    ? "bg-blue-600 text-white"
                    : inMonth
                    ? "hover:bg-blue-50 text-gray-800"
                    : "text-gray-300"
                }`}
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
