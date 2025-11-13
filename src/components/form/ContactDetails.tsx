"use client";

import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function ContactDetails() {
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5 transition-all">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800">
          Contact Details
        </h2>
        <p className="text-xs sm:text-sm text-gray-500">
          Ticket details will be sent to
        </p>
      </div>

      {/* Phone Section */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-3 sm:mb-4">
        <select className="w-full sm:w-36 border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-blue-500">
          <option value="+91">+91 (IND)</option>
          <option value="+1">+1 (USA)</option>
          <option value="+44">+44 (UK)</option>
        </select>
        <input
          type="text"
          placeholder="Phone *"
          className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Email ID */}
      <input
        type="email"
        placeholder="Email ID"
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base mb-3 sm:mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />

      {/* State of Residence */}
      <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base mb-1 sm:mb-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
        <option value="">State of Residence *</option>
        <option value="AP">Andhra Pradesh</option>
        <option value="AR">Arunachal Pradesh</option>
        <option value="AS">Assam</option>
        <option value="BR">Bihar</option>
        <option value="CH">Chandigarh</option>
        <option value="CG">Chhattisgarh</option>
        <option value="DL">Delhi</option>
        <option value="GA">Goa</option>
        <option value="GJ">Gujarat</option>
        <option value="HR">Haryana</option>
        <option value="HP">Himachal Pradesh</option>
        <option value="JK">Jammu and Kashmir</option>
        <option value="JH">Jharkhand</option>
        <option value="KA">Karnataka</option>
        <option value="KL">Kerala</option>
        <option value="LA">Ladakh</option>
        <option value="LD">Lakshadweep</option>
        <option value="MP">Madhya Pradesh</option>
        <option value="MH">Maharashtra</option>
        <option value="MN">Manipur</option>
        <option value="ML">Meghalaya</option>
        <option value="MZ">Mizoram</option>
        <option value="NL">Nagaland</option>
        <option value="OD">Odisha</option>
        <option value="PY">Puducherry</option>
        <option value="PB">Punjab</option>
        <option value="RJ">Rajasthan</option>
        <option value="SK">Sikkim</option>
        <option value="TN">Tamil Nadu</option>
        <option value="TS">Telangana</option>
        <option value="TR">Tripura</option>
        <option value="UP">Uttar Pradesh</option>
        <option value="UK">Uttarakhand</option>
        <option value="WB">West Bengal</option>
      </select>

      <p className="text-xs sm:text-sm text-gray-500 mb-4">
        Required for GST Tax Invoicing
      </p>

      {/* WhatsApp Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 bg-gray-50 rounded-lg p-3 sm:p-4">
        <div className="flex items-start sm:items-center gap-2">
          <FaWhatsapp className="text-green-500 text-lg sm:text-xl mt-0.5" />
          <p className="text-sm sm:text-base text-gray-700 leading-snug">
            Send booking details and trip updates on WhatsApp
          </p>
        </div>
        <button
          onClick={() => setWhatsappEnabled(!whatsappEnabled)}
          className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
            whatsappEnabled ? "bg-blue-500" : "bg-gray-300"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
              whatsappEnabled ? "translate-x-5" : ""
            }`}
          ></span>
        </button>
      </div>
    </div>
  );
}
