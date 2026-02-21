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
  
  // NEW: Check if we are currently on the homepage
  const isHomePage = pathname === "/";

  // NEW: Apply the dark text / solid background if we scrolled OR if we aren't on the homepage
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
    // Outer Nav Tag uses applySolidStyle instead of isScrolled
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${applySolidStyle ? "py-3 bg-white/95 backdrop-blur-md shadow-sm" : "py-6 bg-transparent"}`}>
      
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
          <span className={`font-serif font-bold tracking-wide text-xl transition-colors duration-300 ${applySolidStyle ? "text-gray-900" : "text-white drop-shadow-md"}`}>
            Hiking Seekers
          </span>
        </Link>

        {/* 2. CENTER: Floating Pill Links Container */}
        <div className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
            
            <div className={`flex items-center gap-8 px-8 py-2.5 rounded-full transition-all duration-300 ${applySolidStyle ? "bg-gray-100" : "bg-white/10 backdrop-blur-md border border-white/20"}`}>
              
              <Link
                href="/"
                className={`text-sm transition-all duration-300 ${isActive("/") 
                  ? (applySolidStyle ? "text-gray-900 font-bold" : "text-white font-bold") 
                  : (applySolidStyle ? "text-gray-500 hover:text-gray-900" : "text-gray-300 hover:text-white")}`}
              >
                Home
              </Link>

              {/* Notice the pathname.startsWith check so "Trips" stays active on trip detail pages! */}
              <Link
                href="/trips"
                className={`text-sm transition-all duration-300 ${isActive("/trips") || pathname.startsWith("/trips")
                  ? (applySolidStyle ? "text-gray-900 font-bold" : "text-white font-bold") 
                  : (applySolidStyle ? "text-gray-500 hover:text-gray-900" : "text-gray-300 hover:text-white")}`}
              >
                Trips
              </Link>

              <Link
                href="/about"
                className={`text-sm transition-all duration-300 ${isActive("/about") 
                  ? (applySolidStyle ? "text-gray-900 font-bold" : "text-white font-bold") 
                  : (applySolidStyle ? "text-gray-500 hover:text-gray-900" : "text-gray-300 hover:text-white")}`}
              >
                About
              </Link>

              <Link
                href="/contact"
                className={`text-sm transition-all duration-300 ${isActive("/contact") 
                  ? (applySolidStyle ? "text-gray-900 font-bold" : "text-white font-bold") 
                  : (applySolidStyle ? "text-gray-500 hover:text-gray-900" : "text-gray-300 hover:text-white")}`}
              >
                Contact
              </Link>
            </div>
        </div>

        {/* 3. RIGHT: CTA Button */}
        <button className={`px-6 py-2.5 rounded-full text-sm font-semibold transition transform hover:scale-95 ${applySolidStyle ? "bg-gray-900 text-white hover:bg-gray-800" : "bg-white text-gray-900 hover:bg-gray-100"}`}>
          Book Now
        </button>

      </div>
    </nav>
  );
}