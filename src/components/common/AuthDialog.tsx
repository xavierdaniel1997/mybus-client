"use client";

import { useState } from "react";
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

interface AuthDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function AuthDialog({ open, onOpenChange }: AuthDialogProps) {
  const [mode, setMode] = useState<"login" | "signup" | "otp">("login");
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = open !== undefined;
  const isDialogOpen = isControlled ? open : internalOpen;

  const handleOpenChange = isControlled
    ? onOpenChange
    : (v: boolean) => setInternalOpen(v);

  const toggleMode = () =>
    setMode((prev) =>
      prev === "login" ? "signup" : prev === "signup" ? "login" : "login"
    );

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className="lg:max-w-3xl !w-[95vw] !md:w-[60vw]  p-0 overflow-hidden rounded-2xl shadow-2xl"
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
                  : "Verify Your Email"}
              </DialogTitle>

              <DialogDescription className="text-center text-gray-500">
                {mode === "login"
                  ? "Sign in to continue booking your trips"
                  : mode === "signup"
                  ? "Join MyBus to start your journey"
                  : "Enter the 6-digit OTP sent to your email"}
              </DialogDescription>
            </DialogHeader>

            {/* ===== FORMS ===== */}
            <div className="mt-6">
              {mode === "signup" && <SignupForm />}

              {mode !== "otp" && (
                <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-xl hover:from-blue-600 hover:to-blue-800 transition"
                  >
                    {mode === "login" ? "Sign In" : "Sign Up"}
                  </button>
                </form>
              )}

              {mode === "otp" && (
                <div className="flex flex-col items-center justify-center mt-4">
                  <OtpForm />
                  <p className="text-gray-500 text-sm mt-3 text-center">
                    Didn’t receive the code?{" "}
                    <span className="text-blue-600 hover:underline cursor-pointer">
                      Resend OTP
                    </span>
                  </p>
                </div>
              )}
            </div>

            {/* ===== FOOTER TEXT ===== */}
            {mode !== "otp" && (
              <div className="text-center text-sm text-gray-600 mt-6">
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
