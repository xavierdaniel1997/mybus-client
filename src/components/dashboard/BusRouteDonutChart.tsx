"use client";

import { BusCountByRoutes } from "@/app/types/dashboard";
import generateColors from "@/lib/utils/generateColors";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";


export default function BusRouteDonutChart({totalRoutesInfo}: {totalRoutesInfo: BusCountByRoutes}) {
;

  const chartData = totalRoutesInfo.routes.map(r => {
  const cleanRoute = r.routeName.trim();
  return {
    route: cleanRoute,
    buses: r.busCount,
    color: generateColors(cleanRoute)
  };
});


  return (
    <div className="w-full h-[350px] md:h-[385px] pl-4 pt-4 bg-white rounded-2xl shadow text-gray-600">
      <h2 className="text-xl font-semibold">Bus Count by Routes</h2>

      <div className="relative w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="buses"
              nameKey="route"
              cx="50%"
              cy="50%"
              innerRadius={70}        
              outerRadius={120}
              paddingAngle={4}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`slice-${index}`}
                  fill={entry.color}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Label */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="text-3xl font-bold">{totalRoutesInfo.totalBuses}</p>
          <p className="text-sm text-gray-500">Total Buses</p>
        </div>
      </div>
    </div>
  );
}
