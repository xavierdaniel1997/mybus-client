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
import mybuslogo from "../../../public/mybuslogo.png";
import Link from "next/link";
import AuthDialog from "../common/AuthDialog";

interface NavbarProps {
  isAdmin?: boolean;
}

export default function Navbar({ isAdmin = false }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Define dynamic classes
  const containerPadding = isAdmin ? "px-0" : "px-6 lg:px-8";
  const navHeight = isAdmin ? "h-14" : "h-16";
  const logoSize = isAdmin ? 70 : 90;

  return (
    <nav
      className={`bg-gray-100 shadow-md sticky top-0 z-50 ${
        isAdmin ? "py-2" : "py-3"
      }`}
    >
      <div className={`max-w-7xl mx-auto ${containerPadding}`}>
        {/* Navbar Container */}
        <div className={`flex justify-between items-center ${navHeight}`}>
          {/* Logo Section */}
          <Image
            src={mybuslogo}
            alt="MyBusGo Logo"
            width={logoSize}
            height={logoSize}
            priority
            className="object-cover object-center"
          />

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {!isAdmin && (
              <>
                <Link
                  href="#"
                  className="flex items-center text-gray-700 hover:text-blue-600 transition"
                >
                  <FaTicketAlt className="mr-1" />
                  My Bookings
                </Link>
                <Link
                  href="#"
                  className="flex items-center text-gray-700 hover:text-blue-600 transition"
                >
                  <FaHeadset className="mr-1" />
                  Help
                </Link>
              </>
            )}
            <button className="cursor-pointer flex items-center text-gray-700 hover:text-blue-600 transition"
            onClick={() => setIsDialogOpen(true)}>
              <FaUser className="mr-2" />
              {isAdmin ? "Admin Login" : "Login/Sign In"}
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
        {!isAdmin && mobileMenuOpen && (
          <div className="md:hidden mt-2 space-y-2 pb-4 animate-fade-in">
            <Link
              href="#"
              className="flex items-center text-gray-700 hover:text-blue-600 transition px-2 py-2"
            >
              <FaTicketAlt className="mr-2" /> My Bookings
            </Link>
            <Link
              href="#"
              className="flex items-center text-gray-700 hover:text-blue-600 transition px-2 py-2"
            >
              <FaHeadset className="mr-2" /> Help
            </Link>
            <button className="w-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-full hover:from-blue-600 hover:to-blue-800 transition">
              <FaUser className="mr-2" /> Sign In
            </button>
          </div>
        )}
      </div>
      <AuthDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </nav>
  );
}
