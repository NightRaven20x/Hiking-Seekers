"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  // Function to check if a link is exactly active
  const isActive = (path: string) => pathname === path;
  
  // Check if we are currently on the homepage
  const isHomePage = pathname === "/";

  // Determine if we should apply the solid background style
  const applySolidStyle = isScrolled || !isHomePage;

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
    // Outer Nav Tag: Fixed at top, centered content, padding at the top so it floats
    <nav className="fixed top-0 w-full z-50 pt-6 px-4 flex justify-center transition-all duration-300">
      
      {/* THE PILL CONTAINER: Holds everything and has the glass/solid background */}
      <div 
        className={`w-full max-w-7xl flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300 shadow-lg ${
          applySolidStyle 
            ? "bg-white/95 backdrop-blur-md shadow-gray-200/50" 
            : "bg-white/10 backdrop-blur-md border border-white/20"
        }`}
      >

        {/* 1. LEFT: Logo Section */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9">
            <Image
              src="/images/Logo.svg"
              alt="Hiking Seekers Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className={`font-serif font-bold tracking-wide text-xl transition-colors duration-300 ${
            applySolidStyle ? "text-gray-900" : "text-white drop-shadow-sm"
          }`}>
            Hiking Seekers
          </span>
        </Link>

        {/* 2. CENTER: Links Container  */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className={`text-sm transition-all duration-300 ${isActive("/") 
              ? (applySolidStyle ? "text-gray-900 font-bold" : "text-white font-bold") 
              : (applySolidStyle ? "text-gray-500 hover:text-gray-900" : "text-gray-200 hover:text-white")}`}
          >
            Home
          </Link>

          <Link
            href="/trips"
            className={`text-sm transition-all duration-300 ${isActive("/trips") || pathname.startsWith("/trips")
              ? (applySolidStyle ? "text-gray-900 font-bold" : "text-white font-bold") 
              : (applySolidStyle ? "text-gray-500 hover:text-gray-900" : "text-gray-200 hover:text-white")}`}
          >
            Trips
          </Link>

          <Link
            href="/about"
            className={`text-sm transition-all duration-300 ${isActive("/about") 
              ? (applySolidStyle ? "text-gray-900 font-bold" : "text-white font-bold") 
              : (applySolidStyle ? "text-gray-500 hover:text-gray-900" : "text-gray-200 hover:text-white")}`}
          >
            About
          </Link>

          <Link
            href="/contact"
            className={`text-sm transition-all duration-300 ${isActive("/contact") 
              ? (applySolidStyle ? "text-gray-900 font-bold" : "text-white font-bold") 
              : (applySolidStyle ? "text-gray-500 hover:text-gray-900" : "text-gray-200 hover:text-white")}`}
          >
            Contact
          </Link>
        </div>

        {/* 3. RIGHT: CTA Button */}
        {/* Note: I kept your color transition logic so it matches the background state */}
        <button className={`px-6 py-2.5 rounded-full text-sm font-semibold transition transform hover:scale-95 ${
          applySolidStyle 
            ? "bg-gray-900 text-white hover:bg-gray-800" 
            : "bg-white text-gray-900 hover:bg-gray-100 shadow-md"
        }`}>
          Book Now
        </button>

      </div>
    </nav>
  );
}