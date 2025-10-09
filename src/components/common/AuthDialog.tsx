"use client";

import {useState} from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Image from "next/image";
import logincover from "../../../public/logincover.png";
import SignupForm from "../form/SignupForm";
import OtpForm from "../form/OtpForm";
import LoginForm from "../form/LoginForm";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {verifyEmailSchema, VerifyEmailData} from "@/lib/validations/auth";
import { api } from "@/lib/api";
import { toast } from "sonner";

interface AuthDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function AuthDialog({open, onOpenChange}: AuthDialogProps) {
  const [mode, setMode] = useState<"verifyEmail" | "login" | "signup" | "otp">(
    "signup"
  );
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = open !== undefined;
  const isDialogOpen = isControlled ? open : internalOpen;

  const handleOpenChange = isControlled
    ? onOpenChange
    : (v: boolean) => setInternalOpen(v);

  const toggleMode = () =>
    setMode((prev) =>
      prev === "login"
        ? "verifyEmail"
        : prev === "verifyEmail"
        ? "login"
        : "login"
    );

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    reset
  } = useForm<VerifyEmailData>({
    resolver: zodResolver(verifyEmailSchema),
  });

  const onSubmit = async (data: VerifyEmailData) => {
    try{
      const response = await api.post("/auth/register", data);
      if(response.status === 200){
        toast.success("Otp send successfully")
        reset()
        setMode("otp")
        sessionStorage.setItem("userEmail", data.email)
      }
      console.log("the response fo the verify email", response)
    }catch(error){
      toast.error("Failed to verify the mail")
      console.log("Failed to verify the user email", error)
    }   
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className={`${
          mode === "signup" ? "lg:max-w-5xl" : "lg:max-w-4xl min-h-[500px]"
        } !w-[95vw] !md:w-[60vw]  p-0 overflow-hidden rounded-2xl shadow-2xl`}
      >
        <div className="flex flex-col md:flex-row h-full">
          {/* ===== LEFT: Form Section ===== */}
          <div className="w-full md:w-1/2 bg-white p-6 sm:p-8 flex flex-col justify-center">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl font-semibold">
                {mode === "login"
                  ? "Welcome Back"
                  : mode === "signup"
                  ? "Create Account"
                  : mode === "verifyEmail"
                  ? "Continue with Email"
                  : "Verify Your Email"}
              </DialogTitle>

              <DialogDescription className="text-center text-gray-500">
                {mode === "login"
                  ? "Sign in to continue booking your trips"
                  : mode === "signup"
                  ? "Join MyBus to start your journey"
                  : mode === "verifyEmail"
                  ? "Enter your email address to receive a one-time password (OTP)"
                  : "Enter the 6-digit OTP sent to your email"}
              </DialogDescription>
            </DialogHeader>

            {/* ===== FORMS ===== */}
            <div className="mt-6">
              {mode === "verifyEmail" && (
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center space-y-4">
                  <div className="w-full">
                    <div className="flex items-center mb-1">
                    <label className="text-sm text-gray-700">
                      Email <span className="text-red-600">*</span>
                    </label>
                     {errors.email && (
                      <p className="text-red-500 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                    </div>
                    <input
                      {...register("email")}
                      // type="email"
                      placeholder="you@example.com"
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-fit bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-xl hover:from-blue-600 hover:to-blue-800 transition"
                  >
                    {isSubmitting ? "Sending..." : "Continue"}
                  </button>
                </form>
              )}

              {/* {mode !== "otp" && (
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="space-y-4"
                ></form>
              )} */}

              {mode === "otp" && (
                <div className="flex flex-col items-center justify-center mt-4">
                  <OtpForm setMode={setMode}/>
                  <p className="text-gray-500 text-sm mt-3 text-center">
                    Didn’t receive the code?{" "}
                    <span className="text-blue-600 hover:underline cursor-pointer">
                      Resend OTP
                    </span>
                  </p>
                </div>
              )}

              {mode === "signup" && <SignupForm mode="signup" />}

              {mode === "login" && <LoginForm />}
            </div>

            {/* ===== FOOTER TEXT ===== */}
            {mode !== "otp" && (
              <div className="text-center text-sm text-gray-600 mt-4">
                {mode === "login" ? (
                  <>
                    Don’t have an account?{" "}
                    <span
                      onClick={toggleMode}
                      className="text-blue-600 hover:underline cursor-pointer"
                    >
                      Sign up
                    </span>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <span
                      onClick={toggleMode}
                      className="text-blue-600 hover:underline cursor-pointer"
                    >
                      Log in
                    </span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* ===== RIGHT: IMAGE SECTION ===== */}
          <div className="hidden md:block w-1/2 relative">
            <Image
              src={logincover}
              alt="Bus illustration"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white p-6">
              <h2 className="text-3xl font-bold mb-2 text-center">
                Your Journey Starts Here
              </h2>
              <p className="text-sm max-w-xs text-center text-gray-200">
                Book buses easily, manage trips, and explore new destinations
                with MyBus.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
