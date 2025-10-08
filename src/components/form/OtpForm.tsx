"use client";

import { useState } from "react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function OtpForm() {
  const [otp, setOtp] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("OTP Submitted:", otp);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xs mx-auto flex flex-col items-center gap-6"
    >
      <InputOTP
        maxLength={6}
        pattern={REGEXP_ONLY_DIGITS}
        value={otp}
        onChange={setOtp}
      >
        <InputOTPGroup className="flex gap-2 sm:gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <InputOTPSlot
              key={i}
              index={i}
              className="h-12 w-12 sm:w-10 sm:h-10 rounded-md border border-gray-300 text-center text-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </InputOTPGroup>
      </InputOTP>

      <button
        className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-xl hover:from-blue-600 hover:to-blue-800 transition"
        type="submit"
      >
        Validate OTP
      </button>
    </form>
  );
}
