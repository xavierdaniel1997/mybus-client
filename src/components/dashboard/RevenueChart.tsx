"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

interface ChartItem {
  label: string;
  revenue: number;
  bookings: number;
}

type Mode = "daily" | "weekly" | "monthly" | "yearly";

interface Props {
  data: ChartItem[];
  mode: Mode;
  onModeChange: (m: Mode) => void;
}

export default function RevenueChart({ data, mode, onModeChange }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-80 flex flex-col gap-4">

      {/* BUTTONS */}
      <div className="flex gap-3 justify-end">
        {(["daily", "weekly", "monthly", "yearly"] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => onModeChange(m)}
            className={
              `px-3 py-1.5 rounded-md text-sm font-medium border transition ` +
              (mode === m
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-blue-500 border-blue-300 hover:border-blue-500")
            }
          >
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid opacity={0.4} strokeDasharray="4 4" />
          <XAxis dataKey="label" className="text-xs" />
          <YAxis className="text-xs" />
          <Tooltip formatter={(v: number) => `₹${v.toLocaleString("en-IN")}`} />
          <Line type="monotone" dataKey="revenue" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}
