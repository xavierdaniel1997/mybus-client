import "./globals.css";
import type { Metadata } from "next";
import { GlobalToaster } from "@/components/common/GlobalToaster";
import AppLoader from "@/components/layouts/AppLoader";

export const metadata: Metadata = {
  title: "MyBus",
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
        {children}
        <GlobalToaster/>
      </body>
    </html>
  );
}
