import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { FaBus, FaCalendarAlt, FaSearch } from "react-icons/fa";
import { MdSwapVert } from "react-icons/md";
import '../../app/globals.css'
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MyBus",
  description: "Book your bus tickets easily",
   icons: {
    icon: "/mybuslogo.png",
  },
};

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <html lang="en">
      <div
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col bg-gray-50`}
      >
        <Navbar/>
         <main className="flex-grow">{children}</main>
         <Footer/>
      </div>
    // </html>
  );
}
