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
      
      {/* THE PILL CONTAINER: Glass effect with Figma filters */}
      <div 
        className={`w-full max-w-7xl flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-md shadow-lg" 
            : "bg-[#F9FDFF]/15 backdrop-blur-2xl border border-white/15 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]"
        }`}
        style={!isScrolled ? {
          boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3), 0 8px 32px 0 rgba(31,38,135,0.15)'
        } : undefined}
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
            isScrolled ? "text-gray-900" : "text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
          }`}>
            Hiking Seekers
          </span>
        </Link>

        {/* 2. CENTER: Links Container  */}
        <div className="hidden md:flex items-center font-Montserrat font-medium gap-8">
          <Link
            href="/"
            className={`text-sm font-medium transition-all duration-300 ${isActive("/") 
              ? (isScrolled ? "text-gray-900 font-bold" : "text-white font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]") 
              : (isScrolled ? "text-gray-500 hover:text-gray-900" : "text-white/90 hover:text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]")}`}
          >
            Home
          </Link>

          <Link
            href="/trips"
            className={`text-sm font-medium transition-all duration-300 ${isActive("/trips") || pathname.startsWith("/trips")
              ? (isScrolled ? "text-gray-900 font-bold" : "text-white font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]") 
              : (isScrolled ? "text-gray-500 hover:text-gray-900" : "text-white/90 hover:text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]")}`}
          >
            Trips
          </Link>

          <Link
            href="/about"
            className={`text-sm font-medium transition-all duration-300 ${isActive("/about") 
              ? (isScrolled ? "text-gray-900 font-bold" : "text-white font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]") 
              : (isScrolled ? "text-gray-500 hover:text-gray-900" : "text-white/90 hover:text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]")}`}
          >
            About
          </Link>

          <Link
            href="/contact"
            className={`text-sm font-medium transition-all duration-300 ${isActive("/contact") 
              ? (isScrolled ? "text-gray-900 font-bold" : "text-white font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]") 
              : (isScrolled ? "text-gray-500 hover:text-gray-900" : "text-white/90 hover:text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]")}`}
          >
            Contact
          </Link>
        </div>

        {/* 3. RIGHT: CTA Button */}
        <button className={`px-6 py-2.5 rounded-full text-sm font-Montserrat font-semibold transition-all duration-300 hover:scale-105 ${
          isScrolled 
            ? "bg-gray-900 text-white hover:bg-gray-800 shadow-md" 
            : "bg-[#1B4332] text-white hover:bg-[#153526] shadow-[0_4px_16px_rgba(0,0,0,0.2)] backdrop-blur-sm"
        }`}>
          Book Now
        </button>

      </div>
    </nav>
  );
}