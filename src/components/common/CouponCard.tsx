"use client";

import { FaTag } from "react-icons/fa";

interface CouponCardProps {
  title: string;
  description: string;
  validTill: string;
  code: string;
}

export default function CouponCard({
  title,
  description,
  validTill,
  code,
}: CouponCardProps) {
  return (
    <div
      className={`
        h-40 rounded-xl border border-blue-100 shadow-sm p-5
        flex flex-col justify-between transition-all duration-200
        bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200
        hover:shadow-md hover:-translate-y-0.5
      `}
    >
      {/* Header Section */}
      <div className="flex-1 flex flex-col justify-start">
        <span className="text-xs font-semibold text-blue-700 bg-white/70 px-2 py-0.5 rounded-md w-fit mb-1">
          Bus Offer
        </span>

        <h2 className="text-base font-semibold text-blue-900 leading-snug line-clamp-2">
          {title}
        </h2>

        {description && (
          <p className="text-sm text-blue-800/80 mt-1 line-clamp-3">
            {description}
          </p>
        )}

        <span className="text-xs text-blue-700 mt-auto block">
          Valid till {validTill}
        </span>
      </div>

      {/* Coupon Code Section */}
      <div className="mt-3">
        <span
          className="bg-blue-500 text-white font-semibold px-4 py-1 rounded-full flex items-center gap-1
          text-sm shadow-sm w-fit"
        >
          <FaTag className="text-white/90" />
          {code}
        </span>
      </div>
    </div>
  );
}
