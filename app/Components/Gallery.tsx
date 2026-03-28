import React from "react";
import { PiMountainsLight } from "react-icons/pi";

// trip images as placeholders.
const galleryImages = [
  "/Gallery/1.jpg",
  "/Gallery/2.jpg",
  "/Gallery/3.jpg",
  "/Gallery/4.jpg",
  "/Gallery/5.jpg",
  "/Gallery/6.jpg",
  "/Gallery/7.jpg",
  "/Gallery/8.jpg",
];

export default function Gallery() {
  return (
    <section className="py-20 bg-[#F3F4F6]">
      {/*line mountain thing*/}
      <div className="flex items-center justify-center gap-4 md:gap-6 mb-[30px] text-[#1B4332]/60">
        {/* Left Line & Diamond */}
        <div className="flex items-center w-24 md:w-40 lg:w-56">
          <div className="w-2 h-2 shrink-0 rotate-45 bg-current"></div>
          <div className="h-[1.5px] w-full bg-current"></div>
        </div>

        {/* Mountain Icon */}
        <PiMountainsLight className="text-4xl md:text-5xl shrink-0 mb-5" />

        {/* Right Line & Diamond */}
        <div className="flex items-center w-24 md:w-40 lg:w-56">
          <div className="h-[1.5px] w-full bg-current"></div>
          <div className="w-2 h-2 shrink-0 rotate-45 bg-current"></div>
        </div>
      </div>

      {/* Main Container - Constrains the width of everything below */}
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-6xl font-playfair font-medium text-black uppercase tracking-wide">
            EXPLORE THE  <span className="text-[#1B4332]">TRAILS</span>
          </h2>
        </div>

        {/* Carousel Section - Now securely inside the max-w-7xl container */}
        <div className="relative w-full py-12 z-0 overflow-hidden">
          
          {/* The Figma Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-[500px] h-[130px] bg-[#FF7800]/70 blur-[100px] rounded-full pointer-events-none -z-10"></div>

          {/* Scrollable Track - Removed horizontal padding so it aligns with the header */}
          <div className="flex gap-4 md:gap-6 overflow-x-auto pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {galleryImages.map((src, index) => (
              <div
                key={index}
                className="relative shrink-0 w-[220px] md:w-[260px] h-[320px] md:h-[380px] overflow-hidden rounded-[24px] group cursor-pointer shadow-md snap-center transform-gpu"
              >
                <img
                  src={src}
                  alt={`Hiking Seekers Adventure ${index + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 will-change-transform"
                />
                {/* Subtle dark overlay effect on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-[24px] pointer-events-none"></div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}