import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rental-car-pied-nine.vercel.app/"),

  title: "Rental Car",
  description: "Rent the best cars at the best prices at Rental Car",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "RentalCar | Car Rental Service",
    description: "A platform for renting cars with ease and convenience",
    url: "https://rental-car-pied-nine.vercel.app/",
    images: [
      {
        url: "/images/hero-picture@1x.webp",
        width: 1200,
        height: 630,
        alt: "RentalCar Hero Image",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <TanStackProvider>
          <Header />
          {children}
        </TanStackProvider>
      </body>
    </html>
  );
}
