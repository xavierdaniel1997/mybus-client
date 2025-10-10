"use client";

import { useState } from "react";
import { FaSearch, FaChevronDown, FaUserCircle } from "react-icons/fa";
import { IoWalletOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";

export default function AdminNavbar() {
  const [selectedPeriod, setSelectedPeriod] = useState("This Year");

  return (
    <nav className="flex items-center justify-between bg-gray-50 px-6 py-4">
      {/* Left Section */}
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Search */}
        {/* <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-48 pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <FaSearch className="absolute top-2.5 left-3 text-gray-400" />
        </div> */}


        <FaRegBell size={20}/>

        {/* Profile */}
        <FaUserCircle className="text-3xl text-gray-600 cursor-pointer hover:text-gray-800" />
      </div>
    </nav>
  );
}
