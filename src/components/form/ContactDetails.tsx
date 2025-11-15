"use client";

import { useTripBookingStore } from "@/app/(store)/useTripBookingStore";
import { ContactFormValues } from "@/app/types/passangerFormValues";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaWhatsapp } from "react-icons/fa";


export default function ContactDetails() {
  const { contact, setContactDetails } = useTripBookingStore();

  const { register, watch, setValue } = useForm<ContactFormValues>({
    defaultValues: {
      phoneCode: contact?.phoneCode || "+91",
      phone: contact?.phone || "",
      email: contact?.email || "",
      state: contact?.state || "",
      whatsappEnabled: contact?.whatsappEnabled ?? true,
    },
  });

  const watchAll = watch();


  useEffect(() => {
    if (!watchAll) return;
    setContactDetails(watchAll);
  }, [watchAll, setContactDetails]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5 transition-all">

      {/* Header */}
      <div className="mb-4">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800">
          Contact Details
        </h2>
        <p className="text-xs sm:text-sm text-gray-500">Ticket details will be sent to</p>
      </div>

      {/* Phone Section */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-3 sm:mb-4">
        <select
          {...register("phoneCode")}
          className="w-full sm:w-36 border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base"
        >
          <option value="+91">+91 (IND)</option>
          <option value="+1">+1 (USA)</option>
          <option value="+44">+44 (UK)</option>
        </select>

        <input
          {...register("phone")}
          type="text"
          placeholder="Phone *"
          className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base"
        />
      </div>

      {/* Email */}
      <input
        {...register("email")}
        type="email"
        placeholder="Email ID"
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base mb-3 sm:mb-4"
      />

      {/* State */}
      <select
        {...register("state")}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base mb-1 sm:mb-2"
      >
        <option value="">State of Residence *</option>
        <option value="AP">Andhra Pradesh</option>
        <option value="MH">Maharashtra</option>
        <option value="KA">Karnataka</option>
        <option value="TN">Tamil Nadu</option>
        <option value="KL">Kerala</option>
        {/* Add all states */}
      </select>

      <p className="text-xs sm:text-sm text-gray-500 mb-4">
        Required for GST Tax Invoicing
      </p>

      {/* WhatsApp Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-gray-50 rounded-lg p-3 sm:p-4">
        <div className="flex items-start sm:items-center gap-2">
          <FaWhatsapp className="text-green-500 text-lg sm:text-xl" />
          <p className="text-sm sm:text-base text-gray-700">Send trip updates via WhatsApp</p>
        </div>

        <button
          type="button"
          onClick={() =>
            setValue("whatsappEnabled", !watchAll.whatsappEnabled)
          }
          className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
            watchAll.whatsappEnabled ? "bg-blue-500" : "bg-gray-300"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
              watchAll.whatsappEnabled ? "translate-x-5" : ""
            }`}
          ></span>
        </button>
      </div>
    </div>
  );
}
