"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../../app/globals.css";
import ProtectedAdminRoute from "@/components/auth/ProtectedAdminRoute";
import { Suspense } from "react";
import dynamic from "next/dynamic";

// Lazy load heavy components
const SideBar = dynamic(() => import("@/components/layouts/Sidebar"), {
  loading: () => (
    <div className="w-60 h-full bg-white shadow-md animate-pulse">
      <div className="p-4 space-y-4">
        <div className="h-8 bg-gray-200 rounded"></div>
        <div className="h-8 bg-gray-200 rounded"></div>
        <div className="h-8 bg-gray-200 rounded"></div>
      </div>
    </div>
  ),
  ssr: false,
});

const AdminNavbar = dynamic(() => import("@/components/layouts/AdminNavbar"), {
  loading: () => (
    <div className="h-16 bg-white shadow-sm animate-pulse">
      <div className="h-full flex items-center justify-between px-6">
        <div className="h-6 w-32 bg-gray-200 rounded"></div>
        <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  ),
  ssr: false,
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedAdminRoute>
      <div
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-gray-50`}
      >
        <div className="w-60 fixed left-0 top-0 h-full bg-white shadow-md z-10">
          <Suspense fallback={<div className="h-full bg-white animate-pulse" />}>
            <SideBar />
          </Suspense>
        </div>

        <div className="flex-1 ml-60 flex flex-col">
          {/* Admin Navbar */}
          <div className="sticky top-0 z-20 shadow-sm">
            <Suspense fallback={<div className="h-16 bg-white animate-pulse" />}>
              <AdminNavbar />
            </Suspense>
          </div>

          {/* Page Content with transition */}
          <main className="flex-1 p-6">
            <Suspense fallback={
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
              </div>
            }>
              {children}
            </Suspense>
          </main>
        </div>
      </div>
    </ProtectedAdminRoute>
  );
}
