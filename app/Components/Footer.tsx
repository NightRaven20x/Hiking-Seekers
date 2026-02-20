import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#1e1e24] text-white pt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 pb-12">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Brand & Tagline */}
          <div className="flex flex-col items-start">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="relative w-8 h-8">
                <Image
                  src="/images/Logo.svg"
                  alt="Hiking Seekers Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-serif font-bold tracking-wide text-lg text-white">
                Hiking Seekers
              </span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed max-w-[200px]">
              Exploring Algeria, one trail at a time
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-[#FF7B29] font-bold text-lg mb-5 font-serif">Quick Links</h3>
            <div className="flex flex-col gap-3">
              <Link href="/" className="text-[#FF7B29] text-sm hover:text-white transition-colors">Home</Link>
              <Link href="/trips" className="text-[#FF7B29] text-sm hover:text-white transition-colors">Upcoming Trips</Link>
              <Link href="/about" className="text-[#FF7B29] text-sm hover:text-white transition-colors">About Us</Link>
              <Link href="/gallery" className="text-[#FF7B29] text-sm hover:text-white transition-colors">Gallery</Link>
            </div>
          </div>

          {/* Column 3: Contact Us */}
          <div>
            <h3 className="text-[#FF7B29] font-bold text-lg mb-5 font-serif">Contact Us</h3>
            <div className="flex flex-col gap-4 text-[#FF7B29] text-sm">
              <div className="flex items-center gap-3">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.216-3.916-6.812-6.812l1.293-.97c.362-.271.527-.733.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <span>+213 123 123 1222</span>
              </div>
              <div className="flex items-center gap-3">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span>Hikingseekers@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span>Algiers, Algeria</span>
              </div>
            </div>
          </div>

          {/* Column 4: Follow Us */}
          <div>
            <h3 className="text-[#FF7B29] font-bold text-lg mb-5 font-serif">Follow Us</h3>
            <div className="flex items-center gap-4 text-[#FF7B29]">
              {/* Instagram Icon */}
              <a href="#" className="hover:text-white transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              {/* Facebook Icon */}
              <a href="#" className="hover:text-white transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              {/* TikTok Icon */}
              <a href="#" className="hover:text-white transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 15.68a6.34 6.34 0 0010.86 4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="bg-black py-5 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 text-center text-xs text-gray-400">
          <p>© 2026 Hiking Seekers. All rights reserved. | We accept CCP & BaridiMob.</p>
        </div>
      </div>
    </footer>
  );
}