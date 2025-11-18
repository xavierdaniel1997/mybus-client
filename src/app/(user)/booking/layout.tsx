
import ProtectedUserRoute from "@/components/auth/ProtectedUserRouter";
import React from "react";

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedUserRoute>
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* MAIN CONTENT */}
      <main className="flex-1 py-8 px-4 sm:px-8 flex justify-center">
        <div className="w-full max-w-5xl">{children}</div>
      </main>
    </div>
    </ProtectedUserRoute>
  );
}
