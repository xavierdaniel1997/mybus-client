import "./globals.css";
import type { Metadata } from "next";
import { GlobalToaster } from "@/components/common/GlobalToaster";

export const metadata: Metadata = {
  title: "Bus Booking App",
  description: "Book your bus tickets easily",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50"> 
        {children}
        <GlobalToaster/>
      </body>
    </html>
  );
}
