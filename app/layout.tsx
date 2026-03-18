import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat , Playfair } from "next/font/google";
import "./globals.css";


const playfair = Playfair({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 1. We configure Montserrat right here
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

// 2. Updated your site title and description!
export const metadata: Metadata = {
  title: "Hiking Seekers",
  description: "Where Adventure Meets Heritage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 3. We inject all those font variables into the body className */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}