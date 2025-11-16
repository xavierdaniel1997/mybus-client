"use client";

import { useTripBookingStore } from "@/app/(store)/useTripBookingStore";
import Card from "@/components/payment/Card";
import SectionTitle from "@/components/payment/SectionTitle";
import TripSummaryPanel from "@/components/tripBooking/TripSummaryPanel";
import { FiCreditCard, FiChevronRight } from "react-icons/fi";
import { LuBanknote} from "react-icons/lu";
import { MdOutlineContactMail } from "react-icons/md";
import { SiRazorpay } from "react-icons/si";

export default function PaymentDetails() {
  const {tripData, selectedSeats, seatPrice, boardingPoint, droppingPoint, contact, passengers, razorpayOrder} = useTripBookingStore()

    const stops = [boardingPoint, droppingPoint].filter(
    (p): p is NonNullable<typeof boardingPoint> => Boolean(p)
  );


  console.log("checking the razorpayOrder.............", razorpayOrder)

  return (
    <div className="mx-auto w-[95%] sm:w-[90%] lg:w-[85%] max-w-6xl px-8 py-12 flex flex-row gap-14">
      <div className="w-1/2 space-y-4">
        {/* Top badges */}
        <div className="flex justify-between text-gray-600 text-sm">
          <span className="flex gap-2 items-center">🔒 Secure Payment</span>
          <span className="flex gap-2 items-center">⚡ Superfast Refunds</span>
          <span className="flex gap-2 items-center">
            🌟 Trusted by 3.6+ crore Users
          </span>
        </div>

        {/* Coupon */}
        <div className="bg-white rounded-xl shadow p-4 flex justify-between items-center cursor-pointer">
          <div className="flex items-center gap-2 font-medium">
            <MdOutlineContactMail size={20} />
            Have a coupon code
          </div>
          <FiChevronRight />
        </div>

        <Card>
          <SectionTitle title="Pay with Razorpay" />

          <div className="p-3 flex items-center justify-between cursor-pointer">
            {/* Left Side */}
            <div className="flex items-center gap-3">
              <SiRazorpay size={26} className="text-blue-600" />

              <div>
                <p className="font-medium">Razorpay Secure Checkout</p>
                <p className="text-xs text-gray-500">
                  Cards, UPI, Wallets & Netbanking
                </p>
              </div>
            </div>

            {/* Pay Now Button */}
            <button
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition"
              onClick={() => console.log("Open Razorpay")}
            >
              Pay Now
            </button>
          </div>
        </Card>

        {/* Credit / Debit Card */}
        <Card className="cursor-pointer">
          <SectionTitle title="Credit/Debit card" />
          <div className="flex justify-between items-center p-3">
            <div className="flex items-center gap-3">
              <FiCreditCard size={20} />
              <div>
                <p className="font-medium">Add credit/debit card</p>
                <p className="text-xs text-gray-500">
                  VISA, MasterCard and more
                </p>
              </div>
            </div>
            <FiChevronRight />
          </div>
        </Card>

        {/* Netbanking */}
        <Card className="cursor-pointer">
          <SectionTitle title="Netbanking" />
          <div className="flex justify-between items-center p-3">
            <div className="flex items-center gap-3">
              <LuBanknote size={20} />
              <div>
                <p className="font-medium">Search all banks</p>
                <p className="text-xs text-gray-500">
                  All major banks available
                </p>
              </div>
            </div>
            <FiChevronRight />
          </div>
        </Card>
      </div>

      <div className="w-1/2">
       {tripData && <TripSummaryPanel
            tripData={tripData}
            stops={stops || []}
            selectedSeats={selectedSeats}
            seatPrice={seatPrice || 0}
            contact={contact}
            passengers={passengers}
          />}
      </div>
    </div>
  );
}
