"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

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

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Navbar - Hidden on mobile when menu is open */}
      <nav className="fixed top-0 w-full z-50 pt-6 px-4 flex justify-center transition-all duration-300">
        <div 
          className={`w-full max-w-7xl flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 ${
            isMobileMenuOpen ? 'md:flex opacity-0 md:opacity-100 pointer-events-none md:pointer-events-auto' : 'flex opacity-100'
          } ${
            isScrolled 
              ? "bg-white/95 backdrop-blur-md shadow-lg" 
              : "bg-[#F9FDFF]/15 backdrop-blur-2xl border border-white/15 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]"
          }`}
          style={!isScrolled && !isMobileMenuOpen ? {
            boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3), 0 8px 32px 0 rgba(31,38,135,0.15)'
          } : undefined}
        >

          {/* Logo */}
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

          {/* Desktop Links */}
          <div className="hidden md:flex items-center font-Montserrat font-medium gap-8">
            <Link
              href="/"
              className={`text-m font-medium transition-all duration-300 ${isActive("/") 
                ? (isScrolled ? "text-gray-900 font-bold" : "text-white font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]") 
                : (isScrolled ? "text-gray-500 hover:text-gray-900" : "text-white/90 hover:text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]")}`}
            >
              Home
            </Link>
            <Link
              href="/trips"
              className={`text-m font-medium transition-all duration-300 ${isActive("/trips") || pathname.startsWith("/trips")
                ? (isScrolled ? "text-gray-900 font-bold" : "text-white font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]") 
                : (isScrolled ? "text-gray-500 hover:text-gray-900" : "text-white/90 hover:text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]")}`}
            >
              Trips
            </Link>
            <Link
              href="/about"
              className={`text-m font-medium transition-all duration-300 ${isActive("/about") 
                ? (isScrolled ? "text-gray-900 font-bold" : "text-white font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]") 
                : (isScrolled ? "text-gray-500 hover:text-gray-900" : "text-white/90 hover:text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]")}`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`text-m font-medium transition-all duration-300 ${isActive("/contact") 
                ? (isScrolled ? "text-gray-900 font-bold" : "text-white font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]") 
                : (isScrolled ? "text-gray-500 hover:text-gray-900" : "text-white/90 hover:text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]")}`}
            >
              Contact
            </Link>
          </div>

          {/* Desktop Book Now Button */}
          <button className={`hidden md:block px-8 py-2.5 rounded-full text-m font-Montserrat font-semibold transition-all duration-300 hover:scale-105 ${
            isScrolled 
              ? "bg-gray-900 text-white hover:bg-gray-800 shadow-md" 
              : "bg-[#1B4332] text-white hover:bg-[#153526] shadow-[0_4px_16px_rgba(0,0,0,0.2)] backdrop-blur-sm"
          }`}>
            Book Now
          </button>

          {/* Mobile Hamburger - Hidden when navbar hidden */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden z-50 p-2"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              } ${isScrolled ? 'bg-gray-900' : 'bg-white'}`}></span>
              <span className={`w-full h-0.5 transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
              } ${isScrolled ? 'bg-gray-900' : 'bg-white'}`}></span>
              <span className={`w-full h-0.5 transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              } ${isScrolled ? 'bg-gray-900' : 'bg-white'}`}></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Floating Hamburger Button - Only visible when menu is open */}
      <button
        onClick={() => setIsMobileMenuOpen(false)}
        className={`fixed top-8 right-8 z-50 md:hidden p-3 bg-white rounded-full shadow-lg transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'
        }`}
        aria-label="Close menu"
      >
        <div className="w-6 h-5 flex flex-col justify-between">
          <span className="w-full h-0.5 bg-gray-900 rotate-45 translate-y-2"></span>
          <span className="w-full h-0.5 bg-gray-900 opacity-0"></span>
          <span className="w-full h-0.5 bg-gray-900 -rotate-45 -translate-y-2"></span>
        </div>
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-white shadow-2xl z-40 transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full pt-24 px-6">
          <div className="flex flex-col gap-6 font-Montserrat font-medium">
            <Link
              href="/"
              className={`text-lg transition-colors ${
                isActive("/") ? "text-gray-900 font-bold" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Home
            </Link>
            <Link
              href="/trips"
              className={`text-lg transition-colors ${
                isActive("/trips") || pathname.startsWith("/trips") ? "text-gray-900 font-bold" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Trips
            </Link>
            <Link
              href="/about"
              className={`text-lg transition-colors ${
                isActive("/about") ? "text-gray-900 font-bold" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`text-lg transition-colors ${
                isActive("/contact") ? "text-gray-900 font-bold" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Contact
            </Link>
          </div>

          <div className="mt-8">
            <button className="w-full px-6 py-3 bg-[#1B4332] text-white font-Montserrat font-semibold rounded-full hover:bg-[#153526] transition-colors">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}