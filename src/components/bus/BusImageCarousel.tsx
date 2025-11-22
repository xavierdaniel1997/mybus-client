"use client";

import { useRef } from "react";
import Image from "next/image";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

interface Props {
  images: string[];
  width?: number;
  height?: number;
}

export default function BusImageCarousel({
  images,
  width = 240,
  height = 180,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = width + 20; // adjust this spacing if needed
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Left Button */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full shadow bg-white/20 hover:bg-white z-10"
      >
        <BsChevronLeft size={18} />
      </button>

      {/* Image Row */}
      <div
        ref={scrollRef}
        className="flex overflow-x-hidden scroll-smooth gap-3 px-2"
      >
        {images.map((img) => (
          <Image
            key={img}
            src={img}
            alt="Bus"
            width={width}
            height={height}
            unoptimized
            className="object-cover rounded-md"
          />
        ))}
      </div>

      {/* Right Button */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full shadow bg-white/20 hover:bg-white z-10"
      >
        <BsChevronRight size={18} />
      </button>
    </div>
  );
}
