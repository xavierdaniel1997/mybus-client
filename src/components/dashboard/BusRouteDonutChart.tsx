"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// Dummy data
const data = [
  { route: "Trivandrum → Nagercoil", buses: 12 },
  { route: "Nagercoil → Tirunelveli", buses: 7 },
  { route: "Tirunelveli → Madurai", buses: 5 },
  { route: "Madurai → Chennai", buses: 9 },
  { route: "Chennai → Bangalore", buses: 4 },
];

const COLORS = ["#4C82F7", "#00C49F", "#FFB547", "#FF6B6B", "#845EC2"];

export default function BusRouteDonutChart() {
  const total = data.reduce((sum, item) => sum + item.buses, 0);

  return (
    <div className="w-full h-[350px] md:h-[385px] pl-4 pt-4 bg-white rounded-2xl shadow text-gray-600">
      <h2 className="text-xl font-semibold">Bus Count by Routes</h2>

      <div className="relative w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="buses"
              nameKey="route"
              cx="50%"
              cy="50%"
              innerRadius={70}        
              outerRadius={120}
              paddingAngle={4}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`slice-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Label */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="text-3xl font-bold">{total}</p>
          <p className="text-sm text-gray-500">Total Buses</p>
        </div>
      </div>
    </div>
  );
}
