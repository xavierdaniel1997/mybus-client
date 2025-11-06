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

const iconMap: Record<string, JSX.Element> = {
  bus: <FaBusAlt />,
  wallet: <GiWallet />,
  "credit-card": <MdCreditCard />,
};

export default function Home() {
  const coupons: Coupon[] = couponsData.coupons;

  // show 4 cards per page
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 4;

  const handleScroll = (direction: "left" | "right") => {
    const newIndex =
      direction === "left"
        ? Math.max(0, startIndex - visibleCount)
        : Math.min(coupons.length - visibleCount, startIndex + visibleCount);

    setStartIndex(newIndex);
  };

  // slice coupons to display only visible ones
  const visibleCoupons = coupons.slice(startIndex, startIndex + visibleCount);

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
        <SearchForm />
      </div>

      {/* ===== Coupon Section ===== */}
      <CouponList/>
      <div className="bg-gray-100">
      <StatsBanner/>
      </div>

      <div>
        <LocationList/>
      </div>
    </section>
  );
}
