"use client";

import Image from "next/image";
import coverbanner from "../../../public/coverbanner.png";
import SearchForm from "../../components/search/SearchForm";
import TripCard from "@/components/bus/TripCard";
import { TripData } from "../types/tripSearchResponse";
import { FaBus } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useTripStore } from "../(store)/useTripStore";
import { useState, useCallback, useTransition } from "react";
import dynamic from "next/dynamic";

// Lazy load heavy components that aren't needed immediately
const CouponList = dynamic(() => import("@/components/common/CouponList"), {
  loading: () => <div className="h-32 animate-pulse bg-gray-200" />,
});
const StatsBanner = dynamic(() => import("@/components/common/StatsBanner"), {
  loading: () => <div className="h-64 animate-pulse bg-gray-200" />,
});
const LocationList = dynamic(() => import("@/components/common/LocationList"), {
  loading: () => <div className="h-64 animate-pulse bg-gray-200" />,
});
const MyBusFeatures = dynamic(() => import("@/components/bus/MyBusFeatures"), {
  loading: () => <div className="h-64 animate-pulse bg-gray-200" />,
});
const FAQSection = dynamic(() => import("@/components/common/FAQSection"), {
  loading: () => <div className="h-64 animate-pulse bg-gray-200" />,
});

export default function Home() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { searchResults, setSearchResults, setSelectedTrip } = useTripStore();

  // Memoized handlers for better performance
  const handleViewSeats = useCallback(
    (trip: TripData) => {
      startTransition(() => {
        // Store the selected trip to avoid refetching
        setSelectedTrip(trip);
        router.push(`/trip/${trip._id}`);
      });
    },
    [router, setSelectedTrip]
  );

  const handleSearch = useCallback(
    async (params: { from: string; to: string; date: string; seatType: string }) => {
      setIsSearching(true);
      setSearchError(null);

      try {
        // Use dynamic import for api to reduce initial bundle
        const { api } = await import("@/lib/api");
        const res = await api.get("mytrips/search-trip", { params });
        setSearchResults(res.data.data);
      } catch (err) {
        console.error("search error", err);
        setSearchError("No trips found for this search.");
      } finally {
        setIsSearching(false);
      }
    },
    [setSearchResults]
  );

  // Memoized helper functions
  const availableSeats = useCallback((trip: TripData) => {
    return trip.seatPricing.filter(
      (s) => s.seatId !== "Aisle" && s.isBooked === false
    ).length;
  }, []);

  const formatDuration = useCallback((str: string) => {
    return str.replace("hours", "h").replace("mins", "m");
  }, []);

  // Show loading overlay during navigation
  const showLoadingOverlay = isPending;

  return (
    <section className="relative w-full bg-gray-100">
      {/* Loading overlay during navigation */}
      {showLoadingOverlay && (
        <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white rounded-lg p-6 shadow-xl flex items-center gap-4">
            <FaBus className="text-blue-500 text-2xl animate-busRun" />
            <span className="font-medium">Loading trip details...</span>
          </div>
        </div>
      )}

      {/* ===== Banner Section ===== */}
      <div className="relative w-full h-[200px] sm:h-[280px] md:h-[350px] lg:h-[380px] overflow-hidden">
        <Image
          src={coverbanner}
          alt="Bus Banner"
          fill
          priority
          className="object-cover"
          sizes="100vw"
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
            <div
              key={trip._id}
              onClick={() => handleViewSeats(trip)}
              className="cursor-pointer"
            >
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
