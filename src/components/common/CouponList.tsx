import { Coupon } from "@/app/types/coupon";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import couponsData from "../../data/couponsData.json"
import CouponCard from "./CouponCard";
import { BiSolidOffer } from "react-icons/bi";

export default function CouponList(){
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
    return(
        <div className="px-6 sm:px-10 lg:px-96 py-12  text-gray-800">
                {/* Title + Arrows */}
                <div className="flex items-center justify-between mb-6">
                  <h1 className="font-semibold text-xl flex items-center gap-2">
                    <span><BiSolidOffer size={25}/></span>
                    Bus Booking Discount Offers
                  </h1>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleScroll("left")}
                      disabled={startIndex === 0}
                      className={`p-2 rounded-full transition ${
                        startIndex === 0
                          ? "bg-gray-100 cursor-not-allowed opacity-50"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      <FaChevronLeft className="text-gray-700" />
                    </button>
                    <button
                      onClick={() => handleScroll("right")}
                      disabled={startIndex + visibleCount >= coupons.length}
                      className={`p-2 rounded-full transition ${
                        startIndex + visibleCount >= coupons.length
                          ? "bg-gray-100 cursor-not-allowed opacity-50"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      <FaChevronRight className="text-gray-700" />
                    </button>
                  </div>
                </div>
        
                {/* 4 visible Coupon Cards */}
                <div className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory">
          {visibleCoupons.map((coupon, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[250px] sm:w-[250px] md:w-[275px] snap-start"
            >
              <CouponCard
                title={coupon.title}
                description={coupon.description}
                validTill={coupon.validTill}
                code={coupon.code}
              />
            </div>
          ))}
        </div>
        
              </div>
    )
}