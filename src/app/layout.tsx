import "./globals.css";
import type { Metadata } from "next";
import { GlobalToaster } from "@/components/common/GlobalToaster";
import AppLoader from "@/components/layouts/AppLoader";

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
      <body className="relative">
        {/* <AppLoader /> */}
        {children}
        <GlobalToaster/>
      </body>
    </html>
  );
}
