"use client";

import { useTripBookingStore } from "@/app/(store)/useTripBookingStore";
import Card from "@/components/payment/Card";
import SectionTitle from "@/components/payment/SectionTitle";
import TripSummaryPanel from "@/components/tripBooking/TripSummaryPanel";
import { api } from "@/lib/api";
import { useEffect } from "react";
import { FiCreditCard, FiChevronRight } from "react-icons/fi";
import { GrStripe } from "react-icons/gr";
import { LuBanknote} from "react-icons/lu";
import { MdOutlineContactMail } from "react-icons/md";
import { SiRazorpay } from "react-icons/si";
import { toast } from "sonner";
import { useRouter } from "next/navigation";



interface RazorpayHandlerResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}


interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayHandlerResponse) => void;
  theme: {
    color: string;
  };
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
    };
  }
}


export default function PaymentDetails() {
  const {tripData, selectedSeats, seatPrice, boardingPoint, droppingPoint, contact, passengers, razorpayOrder, resetBooking} = useTripBookingStore()
  const router = useRouter()
    const stops = [boardingPoint, droppingPoint].filter(
    (p): p is NonNullable<typeof boardingPoint> => Boolean(p)
  );


   useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

   console.log("process.env.NEXT_PUBLIC_RAZORPAY_KEY", process.env.NEXT_PUBLIC_RAZORPAY_KEY)


  const openRazorpay = () => {
  if (!razorpayOrder) {
    toast.error("Unable to start payment: missing order.");
    return;
  }

  if (!tripData?._id || selectedSeats.length === 0) {
    toast.error("Missing trip information or seat selection.");
    return;
  }

  if (!contact?.email || !contact?.phone) {
     toast.error("Please provide valid contact details (Email & Phone)");
     return;
  }

  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY!,
    amount: razorpayOrder.amount,
    currency: razorpayOrder.currency,
    order_id: razorpayOrder.id,
    name: "Trip Booking",
    description: "Bus Ticket Payment",

    prefill: {
      name: passengers?.[0]?.name || "Traveler",
      email: contact.email, 
      contact: contact.phone,
    },

    handler: async (response: RazorpayHandlerResponse) => {
      try {
        const res = await api.post("/booking/verify-payment", {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          bookingId: razorpayOrder.receipt,
          tripId: tripData._id,
          seatIds: selectedSeats,
        });

        if (res.data.success) {
          resetBooking();
          toast.success("Payment Success! Booking Confirmed.");
          router.push("/booking");
        } else {
          toast.error("Payment verification failed.");
        }
      } catch (err) {
        console.error("Verification error:", err);
        toast.error("Server verification failed. Please contact support.");
      }
    },
    modal: {
      ondismiss: () => {
        toast.info("Payment cancelled");
      }
    },
    theme: { color: "#1A73E8" },
  };

  try {
    const rzp = new window.Razorpay(options);
    
    rzp.open();
  } catch (error) {
    console.error("Razorpay initialization error:", error);
    toast.error("Failed to open payment gateway");
  }
};



  return (
    <main className="w-full bg-gray-50 min-h-screen">
      <div
        className="mx-auto w-[95%] sm:w-[90%] lg:w-[85%] max-w-6xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12
        grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 lg:gap-14"
      >

        {/* ✅ MOBILE: summary first */}
        <section className="md:order-1 order-1 w-full space-y-4">
          {tripData && (
            <TripSummaryPanel
              tripData={tripData}
              stops={stops}
              selectedSeats={selectedSeats}
              seatPrice={seatPrice || 0}
              contact={contact}
              passengers={passengers}
            />
          )}
        </section>

        {/* ✅ MOBILE: payment last / DESKTOP: payment right */}
        <section className="md:order-1 order-2 w-full space-y-4">

          {/* Badges */}
          <div className="flex flex-wrap justify-between text-gray-600 text-xs sm:text-sm gap-2">
            <span>🔒 Secure Payment</span>
            <span>⚡ Fast Refunds</span>
            <span>🌟 Trusted Platform</span>
          </div>

          {/* Coupon */}
          <div className="bg-white rounded-xl shadow p-3 sm:p-4 flex justify-between items-center cursor-pointer">
            <div className="flex items-center gap-2 font-semibold text-gray-700">
              <MdOutlineContactMail size={18} />
              <span className="text-sm sm:text-base">Have a coupon code</span>
            </div>
            <FiChevronRight size={20} />
          </div>

          {/* Payment block */}
          <Card>
            <header className="pb-2">
              <SectionTitle title="Pay with Razorpay" />
            </header>

            <div className="p-2 sm:p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SiRazorpay size={28} className="text-blue-600" />
                <div>
                  <h3 className="text-sm sm:text-base font-bold">Razorpay Secure Checkout</h3>
                  <p className="text-[10px] sm:text-xs text-gray-500">
                    Cards, UPI, Wallets & Netbanking
                  </p>
                </div>
              </div>

              <button
                onClick={openRazorpay}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg
                text-xs sm:text-sm font-medium transition"
              >
                Pay Now
              </button>
            </div>
          </Card>
        </section>

      </div>
    </main>
  );
}
