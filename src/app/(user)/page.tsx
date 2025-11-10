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

// const iconMap: Record<string, JSX.Element> = {
//   bus: <FaBusAlt />,
//   wallet: <GiWallet />,
//   "credit-card": <MdCreditCard />,
// };

export default function Home() {
   const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);

    const handleSearch = async (params: { from: string; to: string; date: string; seatType: string }) => {
    setIsSearching(true);
    setSearchError(null);
    setSearchResults([]);
    console.log("checking the params from the handleSearch", params)
    try {
      const res = await api.get("mytrips/search-trip", { params });
      console.log("checking the search result in the home page.....", res)
      setSearchResults(res.data.buses ?? []);
    } catch (err) {
      console.error("search error", err);
      handleApiError(err)
    } finally {
      setIsSearching(false);
    }
  };

  const hasActiveResults = isSearching || searchResults.length > 0;
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
        <SearchForm onSearch={handleSearch}/>
      </div>

      {/* ===== Coupon Section ===== */}
      
      {/* <CouponList />

      <StatsBanner />

      <LocationList />

      <MyBusFeatures />

      <FAQSection /> */}

       {hasActiveResults ? (
        <div className="mx-auto w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] max-w-6xl mt-6">
          <TripCard
        busName="Surya Connect"
        busType="Bharat Benz A/C Sleeper (2+1)"
        rating={4.5}
        totalRatings={297}
        departure="21:45"
        arrival="06:59"
        duration="9h 14m"
        seatsAvailable={19}
        singleSeats={3}
        originalPrice={1500}
        discountedPrice={1400}
      />
        </div>
      ) : (
        // SHOW these only when not searching / no results
        <>
          <CouponList />
          <StatsBanner />
          <LocationList />
          <MyBusFeatures />
          <FAQSection />
        </>
      )}
    </section>
  );
}
