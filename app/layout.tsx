import type { Metadata } from "next";
import type { ReactNode } from "react";
import React from "react";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import Header from "@/components/Navbar/Navbar";
import StoreProvider from "@/app/provider/StoreProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Axis Trade Market",
  description: "Market Intelligence Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased scroll-smooth`}
      >
        <StoreProvider>
          <Header />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}