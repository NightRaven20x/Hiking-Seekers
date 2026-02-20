"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  // Function to check if a link is active
  const isActive = (path: string) => pathname === path;

  // Listen for scroll to trigger the solid background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // Outer Nav Tag: Handles the sticky position and background change
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "py-3 bg-white/95 backdrop-blur-md shadow-sm" : "py-6 bg-transparent"}`}>
      
      {/* Inner Container: 
        Changed to w-full with responsive padding (px-6 to lg:px-20) 
        to push the logo and button all the way to the edges.
      */}
      <div className="w-full px-6 md:px-12 lg:px-20 flex items-center justify-between">

        {/* 1. LEFT: Logo Section */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10">
            <Image
              src="/images/Logo.svg"
              alt="Hiking Seekers Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className={`font-serif font-bold tracking-wide text-xl transition-colors duration-300 ${isScrolled ? "text-gray-900" : "text-white drop-shadow-md"}`}>
            Hiking Seekers
          </span>
        </Link>

        {/* 2. CENTER: Floating Pill Links Container (Absolute positioned to stay dead center) */}
        <div className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
            
            {/* The transparent pill box */}
            <div className={`flex items-center gap-8 px-8 py-2.5 rounded-full transition-all duration-300 ${isScrolled ? "bg-gray-100" : "bg-white/10 backdrop-blur-md border border-white/20"}`}>
              
              <Link
                href="/"
                className={`text-sm transition-all duration-300 ${isActive("/") 
                  ? (isScrolled ? "text-gray-900 font-bold" : "text-white font-bold") 
                  : (isScrolled ? "text-gray-500 hover:text-gray-900" : "text-gray-300 hover:text-white")}`}
              >
                Home
              </Link>

              <Link
                href="/trips"
                className={`text-sm transition-all duration-300 ${isActive("/trips") 
                  ? (isScrolled ? "text-gray-900 font-bold" : "text-white font-bold") 
                  : (isScrolled ? "text-gray-500 hover:text-gray-900" : "text-gray-300 hover:text-white")}`}
              >
                Trips
              </Link>

              <Link
                href="/about"
                className={`text-sm transition-all duration-300 ${isActive("/about") 
                  ? (isScrolled ? "text-gray-900 font-bold" : "text-white font-bold") 
                  : (isScrolled ? "text-gray-500 hover:text-gray-900" : "text-gray-300 hover:text-white")}`}
              >
                About
              </Link>

              <Link
                href="/contact"
                className={`text-sm transition-all duration-300 ${isActive("/contact") 
                  ? (isScrolled ? "text-gray-900 font-bold" : "text-white font-bold") 
                  : (isScrolled ? "text-gray-500 hover:text-gray-900" : "text-gray-300 hover:text-white")}`}
              >
                Contact
              </Link>
            </div>
        </div>

        {/* 3. RIGHT: CTA Button */}
        <button className={`px-6 py-2.5 rounded-full text-sm font-semibold transition transform hover:scale-95 ${isScrolled ? "bg-gray-900 text-white hover:bg-gray-800" : "bg-white text-gray-900 hover:bg-gray-100"}`}>
          Book Now
        </button>

      </div>
    </nav>
  );
}