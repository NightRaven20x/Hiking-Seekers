"use client"; //It enables interactivity.

import Link from "next/link";
import { usePathname } from "next/navigation"; //Hook to check current page
import Image from "next/image";

export default function Navbar() {
    const pathname = usePathname();

    // function to check if a link is active
    const isActive = (path: string) => pathname === path;

    return (
        <nav className="fixed top-0 w-full z-50 transition-all duration-300 py-4 px-6">
            <div className="max-w-7xl mx-auto flex items-center justify-between bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 shadow-lg">

                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-1 group">
                    {/* The Logo Image */}
                    <div className="relative w-10 h-10">
                        <Image
                            src="/images/Logo.svg"
                            alt="Hiking Seekers Logo"
                            fill
                            className="object-contain"
                            priority
                            
                        />
                    </div>
                    {/* The Text*/}
                    <span className="text-white font-serif font-bold tracking-wide text-lg drop-shadow-md">
                        Hiking Seekers
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden justify-evenly md:flex items-center gap-8 text-sm font-medium">
                    <Link
                        href="/"
                        className={`transition-all duration-300 ${isActive("/")
                                ? "text-white font-bold"
                                : "text-gray-300 hover:text-white"
                            }`}
                    >
                        Home
                    </Link>

                    <Link
                        href="/trips" // separate trips page later
                        className={`transition-all duration-300 ${isActive("/trips")
                                ? "text-white font-bold [text-shadow:_0_0_3px_rgb(255_255_255_/_60%)]"
                                : "text-gray-300 hover:text-white"
                            }`}
                    >
                        Trips
                    </Link>

                    <Link
                        href="/about"
                        className={`transition-all duration-300 ${isActive("/about")
                                ? "text-white font-bold [text-shadow:_0_0_3px_rgb(255_255_255_/_60%)]"
                                : "text-gray-300 hover:text-white"
                            }`}
                    >
                        About
                    </Link>

                    <Link
                        href="/contact"
                        className={`transition-all duration-300 ${isActive("/contact")
                                ? "text-white font-bold [text-shadow:_0_0_3px_rgb(255_255_255_/_60%)]"
                                : "text-gray-300 hover:text-white"
                            }`}
                    >
                        Contact
                    </Link>
                </div>

                {/* CTA Button */}
                <button className="bg-white text-gray-900 px-5 py-2 rounded-full text-sm font-semibold hover:bg-primary hover:text-white transition transform hover:scale-95">
                    Book Now
                </button>
            </div>
        </nav>
    );
}