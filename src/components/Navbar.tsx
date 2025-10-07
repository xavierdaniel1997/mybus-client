"use client";

import Image from "next/image";
import { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaTicketAlt,
  FaHeadset,
  FaUser,
} from "react-icons/fa";
import logoMyBus from "../../public/logoMyBus.png"; // ✅ Better import path for Next.js projects

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-100 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl py-3 mx-auto px-2 sm:px-6 lg:px-8">
        {/* Navbar Container */}
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          
            <Image
              src={logoMyBus}
              alt="MyBusGo Logo"
              width={130}
              height={130}
              priority
              className="object-contain"
            />
         

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="flex items-center text-gray-700 hover:text-blue-600 transition"
            >
              <FaTicketAlt className="mr-1" />
              My Bookings
            </a>
            <a
              href="#"
              className="flex items-center text-gray-700 hover:text-blue-600 transition"
            >
              <FaHeadset className="mr-1" />
              Help
            </a>
            <button className="flex items-center bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-full hover:from-blue-600 hover:to-blue-800 transition">
              <FaUser className="mr-2" />
              Sign In
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700 hover:text-blue-600 transition"
          >
            {mobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 space-y-2 pb-4 animate-fade-in">
            <a
              href="#"
              className="flex items-center text-gray-700 hover:text-blue-600 transition px-2 py-2"
            >
              <FaTicketAlt className="mr-2" /> My Bookings
            </a>
            <a
              href="#"
              className="flex items-center text-gray-700 hover:text-blue-600 transition px-2 py-2"
            >
              <FaHeadset className="mr-2" /> Help
            </a>
            <button className="w-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-full hover:from-blue-600 hover:to-blue-800 transition">
              <FaUser className="mr-2" /> Sign In
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
