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

const iconMap: Record<string, JSX.Element> = {
  bus: <FaBusAlt />,
  wallet: <GiWallet />,
  "credit-card": <MdCreditCard />,
};

export default function Home() {
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
      <CouponList />

      <StatsBanner />

      <LocationList />

      <MyBusFeatures />

      <FAQSection />
    </section>
  );
}
