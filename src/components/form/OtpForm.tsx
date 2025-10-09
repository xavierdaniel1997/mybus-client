"use client";

import { useEffect, useState } from "react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { otpSchema, OtpData } from "@/lib/validations/auth";
import { resolve } from "path";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { AxiosError } from "axios";

type Mode = "verifyEmail" | "login" | "signup" | "otp";

interface OtpFormProps {
  setMode: (mode: Mode) => void;
}

export default function OtpForm({setMode}:  OtpFormProps) {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");

  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
    reset
  } = useForm<OtpData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  })

   useEffect(() => {
    const storedEmail = sessionStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, [])

  const onSubmit = async (data: OtpData) => {
    if(!email){
      throw new Error("Email not fount");
      return
    }
    try{
      const response = await api.post("/auth/verify-otp", {
        otp: data.otp,
        email
      })
      if(response.status === 200){
        setMode("signup") 
      }
    }catch(error){
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError.response?.data?.message) {
      toast.error(axiosError.response.data.message);
    } else {
      toast.error("Something went wrong. Please try again.");
    }
    }
  };

  return (
     <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-xs mx-auto flex flex-col items-center gap-6"
    >
      <Controller
        name="otp"
        control={control}
        render={({ field }) => (
          <InputOTP
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS}
            value={field.value}
            onChange={field.onChange}
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
        )}
      />

      {errors.otp && (
        <p className="text-red-500 text-sm">{errors.otp.message}</p>
      )}

      <button
        className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-xl hover:from-blue-600 hover:to-blue-800 transition"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Verifying..." : "Validate OTP"}
      </button>
    </form>
  );
}
