import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Navbar from "@/components/custom/Navbar";
import Loading from "./loading";

const nunito = Nunito({
  weight: ["300", "400", "600"],
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Anyone can learn DynamoDB",
  description:
    "This application aims to teach DynamoDB to anyone who is interested to this amazing database.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} px-8 font-nunito font-light`}>
        <Navbar />
        <Suspense fallback={<Loading />}>{children}</Suspense>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
