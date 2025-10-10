import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SideBar from "@/components/layouts/Sidebar";
import '../../../app/globals.css'
import AdminNavbar from "@/components/layouts/AdminNavbar";

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
    // <html lang="en">
      <div
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-gray-50`}
      >
         <div className="w-60 fixed left-0 top-0 h-full bg-white shadow-md z-10">
        <SideBar />
      </div>

         <div className="flex-1 ml-60 flex flex-col">
        {/* Admin Navbar */}
        <div className="sticky top-0 z-20 shadow-sm">
          <AdminNavbar />
        </div>

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
          
      </div>
    // </html>
  );
}
