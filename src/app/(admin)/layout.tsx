import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/layouts/Navbar";
import SideBar from "@/components/layouts/Sidebar";
import "../../app/global.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin Dashboard | MyBusGo",
  description: "Admin management panel",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-gray-100`}
      >
        {/* ======= Top Navbar ======= */}
        <Navbar isAdmin={true} />

        {/* ======= Sidebar + Content Wrapper ======= */}
        <div className="flex min-h-[calc(100vh-3rem)]"> 
          {/* Sidebar (fixed width) */}
          <aside className="w-64 bg-white border-r shadow-sm">
            <SideBar />
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 p-6 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
