"use client";

import ReusableTable from "@/components/common/ReusableTable";
import BusRouteDonutChart from "@/components/dashboard/BusRouteDonutChart";
import RevenueChart from "@/components/dashboard/RevenueChart";
import StatCard from "@/components/dashboard/StatCard";
import { FaRupeeSign, FaArrowUp, FaArrowDown, FaBusAlt } from "react-icons/fa";
import { LuCalendarDays } from "react-icons/lu";
import { BsPeople } from "react-icons/bs";

const columnsBooing = [
  { label: "Image", field: "image" },
  { label: "Name", field: "name" },
  { label: "Registration No", field: "registrationNo" },
  { label: "Type", field: "busType" },
  { label: "Brand", field: "brand" },
  {label: "Route", field: "route"},
  { label: "Layout", field: "layoutName" },
  { label: "Actions", field: "actions" },
];

 const columnsUser = [
    { label: "Name", field: "name" },
    { label: "Email", field: "email" },
    { label: "Phone", field: "phone" },
    { label: "Status", field: "status" },
    { label: "Action", field: "action" },
  ]

export default function Dashboard() {


     const bookingData = []

  return (
    <div className="text-gray-100 p-8 space-y-8">
      <div className="w-full flex justify-between gap-10">
        <StatCard
          label="Revenue"
          value={45000}
          change="+12%"
          trendColor="text-green-600"
          Icon={FaRupeeSign}
          TrendIcon={FaArrowUp}
        />

        <StatCard
          label="Total Bookings"
          value={1200}
          change="-5%"
          trendColor="text-red-600"
          Icon={LuCalendarDays}
          TrendIcon={FaArrowDown}
        />

        <StatCard
          label="Active Buses"
          value={1200}
          change="-5%"
          trendColor="text-red-600"
          Icon={FaBusAlt}
          TrendIcon={FaArrowDown}
        />

        <StatCard
          label="Avg. Occupancy"
          value={1200}
          change="-5%"
          trendColor="text-red-600"
          Icon={BsPeople}
          TrendIcon={FaArrowDown}
        />
      </div>

      <div className="flex justify-between gap-10">
        <div className="w-2/3">
          <RevenueChart />
        </div>
        <div className="w-1/3">
          <BusRouteDonutChart />
        </div>
      </div>

      <div className="flex justify-between gap-10">
        <div className="w-2/3">
          <ReusableTable
            columns={columnsBooing}
            data={[]}
            page={1}
            rowsPerPage={10}
            totalCount={bookingData.length}
            onPageChange={() => {}}
            isPagination={false}
          />
        </div>
        <div className="w-1/3">
           <ReusableTable
            columns={columnsUser}
            data={[]}
            page={1}
            rowsPerPage={10}
            totalCount={bookingData.length}
            onPageChange={() => {}}
            isPagination={false}
          />
        </div>
      </div>
    </div>
  );
}
