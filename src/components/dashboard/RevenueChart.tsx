"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const dataMap = {
  daily: [
    { label: "Mon", revenue: 1200 },
    { label: "Tue", revenue: 900 },
    { label: "Wed", revenue: 1800 },
    { label: "Thu", revenue: 1400 },
    { label: "Fri", revenue: 2200 },
    { label: "Sat", revenue: 2500 },
    { label: "Sun", revenue: 1900 },
  ],
  weekly: [
    { label: "W1", revenue: 7800 },
    { label: "W2", revenue: 8500 },
    { label: "W3", revenue: 9200 },
    { label: "W4", revenue: 8800 },
  ],
  monthly: [
    { label: "Jan", revenue: 38000 },
    { label: "Feb", revenue: 35000 },
    { label: "Mar", revenue: 41000 },
    { label: "Apr", revenue: 47000 },
    { label: "May", revenue: 52000 },
    { label: "Jun", revenue: 49000 },
  ],
  yearly: [
    { label: "2021", revenue: 380000 },
    { label: "2022", revenue: 420000 },
    { label: "2023", revenue: 510000 },
    { label: "2024", revenue: 580000 },
  ],
};

export default function RevenueChart() {
  const [mode, setMode] = useState<"daily" | "weekly" | "monthly" | "yearly">(
    "monthly"
  );

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-auto">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold text-slate-700">Revenue Overview</h2>

        <div className="flex gap-2">
          {["daily", "weekly", "monthly", "yearly"].map((item) => (
            <button
              key={item}
              onClick={() => setMode(item)}
              className={`px-3 py-1.5 text-sm rounded-lg border transition
                ${
                  mode === item
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white border-slate-300 text-slate-600 hover:bg-slate-100"
                }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dataMap[mode]}>
            <CartesianGrid strokeDasharray="4 4" opacity={0.4} />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
