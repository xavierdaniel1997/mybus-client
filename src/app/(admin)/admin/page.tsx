"use client";

import ReusableTable from "@/components/common/ReusableTable";
import BusRouteDonutChart from "@/components/dashboard/BusRouteDonutChart";
import RevenueChart from "@/components/dashboard/RevenueChart";
import StatCard from "@/components/dashboard/StatCard";
import { FaRupeeSign, FaArrowUp, FaArrowDown, FaBusAlt } from "react-icons/fa";
import { LuCalendarDays } from "react-icons/lu";
import { BsPeople } from "react-icons/bs";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import {
  BackendRevenueItem,
  Booking,
  BusCountByRoutes,
  DashboardCards,
  PassengerRow,
  RevenueOverview,
} from "@/app/types/dashboard";
import { IUser } from "@/app/types/user";

const columnsBooking = [
  { label: "Passenger", field: "passengerName" },
  { label: "Seat", field: "seatId" },
  { label: "Route", field: "route" },
  { label: "Bus", field: "busName" },
  { label: "Travel Date", field: "travelDate" },
  { label: "Boarding", field: "boarding" },
  { label: "Dropping", field: "dropping" },
];

const columnsUser = [
  { label: "Name", field: "name" },
  { label: "Email", field: "email" },
  { label: "Phone", field: "phone" },
];

type Mode = "daily" | "weekly" | "monthly" | "yearly";

interface ChartItem {
  label: string;
  revenue: number;
  bookings: number;
}

export default function Dashboard() {
  const [totalRoutesInfo, setTotalRoutesInfo] =
    useState<BusCountByRoutes | null>(null);
  const [newUsers, setNewUsers] = useState<IUser[] | []>([]);
  const [cardInfo, setCardInfo] = useState<DashboardCards | null>(null);
  const [revenueOverviewData, setRevenueOverviewData] = useState<
    RevenueOverview | []
  >([]);
  const [newBookings, setNewBookings] = useState<Booking[] | []>([]);
  const [revenueBuckets, setRevenueBuckets] = useState<BackendRevenueItem[]>(
    []
  );
  const [mode, setMode] = useState<Mode>("weekly");

  const [isLoading, setIsLoading] = useState(true);

  const formatLabel = (dateString: string, mode: Mode): string => {
    const d = new Date(dateString);
    if (mode === "daily")
      return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
    if (mode === "weekly") return `W${Math.ceil(d.getDate() / 7)}`;
    if (mode === "monthly")
      return d.toLocaleDateString("en-IN", { month: "short" });
    if (mode === "yearly") return d.getFullYear().toString();
    return d.toISOString().split("T")[0];
  };

  const groupAndSum = (data: BackendRevenueItem[], mode: Mode): ChartItem[] => {
    const map: Record<string, { revenue: number; bookings: number }> = {};
    for (const item of data) {
      const label = formatLabel(item.bucket, mode);
      if (!map[label]) map[label] = { revenue: 0, bookings: 0 };
      map[label].revenue += item.revenue;
      map[label].bookings += item.bookings;
    }
    return Object.entries(map).map(([label, v]) => ({
      label,
      revenue: v.revenue,
      bookings: v.bookings,
    }));
  };

  const chartData = {
    daily: groupAndSum(revenueBuckets, "daily"),
    weekly: groupAndSum(revenueBuckets, "weekly"),
    monthly: groupAndSum(revenueBuckets, "monthly"),
    yearly: groupAndSum(revenueBuckets, "yearly"),
  };

  const calculateChange = (current: number, previous: number): string => {
    if (!previous || previous === 0) return "0%";
    const diff = current - previous;
    const percent = ((diff / previous) * 100).toFixed(1);
    return `${diff > 0 ? "+" : ""}${percent}%`;
  };

  // const getDashboardData = async () => {
  //   const response = await api.get(`dashboard/overview`);
  //   setCardInfo(response.data.data.cards);
  //   setTotalRoutesInfo(response.data.data.busCountByRoutes);
  //   setNewUsers(response.data.data.newUsers);
  //   setNewBookings(response.data.data.recentBookings);
  //   setRevenueOverviewData(response.data.data.revenueOverview);
  // };
  // useEffect(() => {
  //   getDashboardData();
  // }, []);

  const getDashboardData = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`dashboard/overview`);

      setCardInfo(response.data.data.cards);
      setTotalRoutesInfo(response.data.data.busCountByRoutes);
      setNewUsers(response.data.data.newUsers);
      setNewBookings(response.data.data.recentBookings);
      setRevenueOverviewData(response.data.data.revenueOverview);

      // ✅ prepare chart raw buckets
      const buckets = response.data.data
        .revenueOverview as BackendRevenueItem[];
      setRevenueBuckets(buckets);
    } catch (err) {
      console.error("Dashboard API Error", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  const currentRevenue = revenueBuckets.at(-1)?.revenue || 0;
  const lastMonthRevenue = revenueBuckets.at(-2)?.revenue || 0;
  const revenueChange = calculateChange(currentRevenue, lastMonthRevenue);

  const currentBookings = revenueBuckets.at(-1)?.bookings || 0;
  const lastMonthBookings = revenueBuckets.at(-2)?.bookings || 0;
  const bookingChange = calculateChange(currentBookings, lastMonthBookings);

  const occupancyPercent = Number(
    ((cardInfo?.avgOccupancy || 0) * 100).toFixed(1)
  );
  const occupancyChange = calculateChange(occupancyPercent, 30);

  const newUserData = newUsers.map((user) => ({
    name: (
      <p>
        {user.firstName} {user.lastName}
      </p>
    ),
    email: user.email,
    phone: user.phone,
  }));

  const flatPassengerRows = newBookings.flatMap((booking) => {
    // console.log("Booking__", booking)
    return booking.passengers.map((p) => {
      // console.log("Passenger__", p);
      return {
        bookingId: booking._id,
        passengerName: p.name,
        seatId: p.seatId,
        route: booking.trip.route.routeName,
        busName: booking.trip.bus.name,
        travelDate: new Date(booking.trip.travelDate)
          .toISOString()
          .split("T")[0],
        boarding: booking.boardingPoint.landmark,
        dropping: booking.droppingPoint.landmark,
        contactEmail: booking.contact.email,
        contactPhone: booking.contact.phone,
        userName: `${booking.user.firstName} ${booking.user.lastName}`,
      };
    });
  });

  if (isLoading) {
    return (
      <div className="p-8 space-y-8 animate-pulse">
        <div className="w-full flex justify-between gap-10">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-full h-32 bg-gray-200 rounded-xl"></div>
          ))}
        </div>
        <div className="flex justify-between gap-10">
          <div className="w-2/3 h-80 bg-gray-200 rounded-xl"></div>
          <div className="w-1/3 h-80 bg-gray-200 rounded-xl"></div>
        </div>
        <div className="flex justify-between gap-10">
          <div className="w-2/3 h-64 bg-gray-200 rounded-xl"></div>
          <div className="w-1/3 h-64 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-gray-100 p-8 space-y-8">
      <div className="w-full flex justify-between gap-10">
        <StatCard
          label="Revenue"
          value={cardInfo?.totalRevenue}
          change={revenueChange}
          trendColor={
            revenueChange.startsWith("+") ? "text-green-600" : "text-red-600"
          }
          Icon={FaRupeeSign}
          TrendIcon={revenueChange.startsWith("+") ? FaArrowUp : FaArrowDown}
        />

        <StatCard
          label="Total Bookings"
          value={cardInfo?.totalBookings}
          change={bookingChange}
          trendColor={
            bookingChange.startsWith("+") ? "text-green-600" : "text-red-600"
          }
          Icon={LuCalendarDays}
          TrendIcon={bookingChange.startsWith("+") ? FaArrowUp : FaArrowDown}
        />

        <StatCard
          label="Active Buses"
          value={cardInfo?.activeBuses}
          change="-"
          Icon={FaBusAlt}
        />

        <StatCard
          label="Avg. Occupancy"
          value={occupancyPercent}
          change={occupancyChange}
          trendColor={
            occupancyChange.startsWith("+") ? "text-green-600" : "text-red-600"
          }
          Icon={BsPeople}
          TrendIcon={occupancyChange.startsWith("+") ? FaArrowUp : FaArrowDown}
        />
      </div>

      <div className="flex justify-between gap-10">
        <div className="w-2/3">
          <RevenueChart
            data={chartData[mode] ?? []}
            mode={mode}
            onModeChange={setMode}
          />
        </div>
        <div className="w-1/3">
          {totalRoutesInfo && (
            <BusRouteDonutChart totalRoutesInfo={totalRoutesInfo} />
          )}
        </div>
      </div>

      <div className="flex justify-between gap-10">
        <div className="w-2/3">
          <ReusableTable
            columns={columnsBooking}
            data={flatPassengerRows}
            page={1}
            rowsPerPage={10}
            totalCount={flatPassengerRows.length}
            onPageChange={() => { }}
            isPagination={false}
          />
        </div>
        <div className="w-1/3">
          <ReusableTable
            columns={columnsUser}
            data={newUserData}
            page={1}
            rowsPerPage={10}
            totalCount={newUserData.length}
            onPageChange={() => { }}
            isPagination={false}
          />
        </div>
      </div>
    </div>
  );
}
