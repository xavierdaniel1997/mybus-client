"use client"

import { IconType } from "react-icons";

interface StatCardProps {
  label: string;
  value: number;
  trendColor?: string;
  change?: string;
  Icon?: IconType;
  TrendIcon?: IconType;
}

export default function StatCard({
  label,
  value,
  trendColor,
  change,
  Icon,
  TrendIcon,
}: StatCardProps) {
  return (
    <div className="w-full bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-2">{value}</h3>
        </div>

        <div className="p-3 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
          {Icon && <Icon size={24} />}
        </div>
      </div>

      <div className="flex items-center mt-4">
        <span className={`flex items-center text-xs font-semibold ${trendColor}`}>
          {TrendIcon && <TrendIcon size={14} className="mr-1" />}
          {change}
        </span>
        <span className="text-xs text-slate-400 ml-2">vs last month</span>
      </div>
    </div>
  );
}
