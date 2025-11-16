"use client";

import Image from "next/image";
import coverbanner from "../../../public/coverbanner.png";
import SearchForm from "../../components/search/SearchForm";
import CouponCard from "@/components/common/CouponCard";
import couponsData from "../../data/couponsData.json";
import { FaBusAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { GiWallet } from "react-icons/gi";
import { MdCreditCard } from "react-icons/md";
import { useState } from "react";
import { JSX } from "react";
import { Coupon } from "../types/coupon";
import CouponList from "@/components/common/CouponList";
import StatsBanner from "@/components/common/StatsBanner";
import LocationList from "@/components/common/LocationList";
import MyBusFeatures from "@/components/bus/MyBusFeatures";
import FAQSection from "@/components/common/FAQSection";
import { handleApiError } from "@/lib/utils/handleApiError";
import { api } from "@/lib/api";
import TripCard from "@/components/bus/TripCard";
import { TripData } from "../types/tripSearchResponse";
import { FaBus } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useTripStore } from "../(store)/useTripStore";

// const iconMap: Record<string, JSX.Element> = {
//   bus: <FaBusAlt />,
//   wallet: <GiWallet />,
//   "credit-card": <MdCreditCard />,
// };

export default function Home() {
  const [isSearching, setIsSearching] = useState(false);
  // const [searchResults, setSearchResults] = useState<TripData[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);
   const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);
  const { searchResults, setSearchResults } = useTripStore();

  const handleViewSeats = async (tripId: string) => {
  setIsNavigating(true);
  router.push(`/trip/${tripId}`);
};

  const handleSearch = async (params: { from: string; to: string; date: string; seatType: string }) => {
    setIsSearching(true);
    setSearchError(null);
    // setSearchResults([]);
    try {
      const res = await api.get("mytrips/search-trip", { params });
      setSearchResults(res.data.data);
    } catch (err) {
      console.error("search error", err);
      setSearchError("No trips found for this search.")
    } finally {
      setIsSearching(false);
    }
  };

  const availableSeats = (trip: TripData) =>
    trip.seatPricing.filter((s) => !s.isBooked).length;

  /* Helper – format duration (optional) */
  const formatDuration = (str: string) => {
    // "10 hours 42 mins" → "10h 42m"
    return str.replace("hours", "h").replace("mins", "m");
  };

  console.log("checking the checking availableSeats...", availableSeats)
  return (
    <section className="relative w-full bg-gray-100">
      {/* ===== Banner Section ===== */}
      <div className="relative w-full h-[200px] sm:h-[280px] md:h-[350px] lg:h-[380px] overflow-hidden">
        <Image
          src={coverbanner}
          alt="Bus Banner"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/60"></div>
      </div>

      {/* ===== Booking Card ===== */}
      <div className="relative flex justify-center -mt-10 sm:-mt-14 md:-mt-20 z-20">
        <SearchForm onSearch={handleSearch} />
      </div>

      <CouponList />

      {/* ===== Conditional Rendering ===== */}
      {isSearching ? (
        <div className="flex justify-center items-center py-12">
          {/* <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600" /> */}
          <div className="flex items-center gap-4">
            <FaBus className="text-blue-500 text-xl animate-busRun" />
            <span>Fetching Data...</span>
          </div>
        </div>
      ) : searchError ? (
        <div className="text-center py-12 text-red-600">{searchError}</div>
      ) : searchResults.length > 0 ? (
        /* ---- RESULTS ---- */
        <div className="mx-auto w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] max-w-6xl mt-6 space-y-6 pb-10">
          {searchResults.map((trip) => (
            <div key={trip._id} onClick={() => handleViewSeats(trip._id)}>
            <TripCard
              busName={trip.bus.name}
              busType={trip.bus.layoutName}
              layoutName={trip.bus.layoutName}
              information={trip.bus.information}
              departure={trip.departureTime}
              arrival={trip.arrivalTime}
              duration={formatDuration(trip.route.duration)}
              seatsAvailable={availableSeats(trip)}
              singleSeats={availableSeats(trip)}
              originalPrice={trip.basePrice}
              features={trip.bus.features}
              discountedPrice={trip.basePrice}
            />
            </div>
          ))}
        </div>
      ) : (
        <>
          <StatsBanner />
          <LocationList />
          <MyBusFeatures />
          <FAQSection />
        </>
      )}

    </section>
  );
}
