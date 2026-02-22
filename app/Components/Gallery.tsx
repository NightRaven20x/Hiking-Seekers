import React from "react";

// For now, we will use your existing trip images as placeholders.
// You can easily swap these out later with real .jpg or .png photos from your trips!
const galleryImages = [
  "/images/tikjda.svg",
  "/images/lakhdaria.svg",
  "/images/djurdjura.svg",
  "/images/lake_dhaya.svg",
  "/images/tikjda.svg", 
  "/images/lakhdaria.svg",
];

export default function Gallery() {
  return (
    <section className="py-20 bg-[#F3F4F6]">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-gray-900 uppercase tracking-wide">
            Recent <span className="text-[#FF7B29]">Gallery</span>
          </h2>
          <p className="text-gray-500 mt-4 text-lg">
            Glimpses of our past adventures across Algeria's beautiful landscapes
          </p>
        </div>

        {/* Uniform Grid Section */}
        {/* Changed from 'columns' to 'grid' to enforce equal heights and widths */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryImages.map((src, index) => (
            <div 
              key={index} 
              // Added h-64 for a set height, and w-full for full width
              className="relative w-full h-64 overflow-hidden rounded-[20px] group cursor-pointer shadow-sm"
            >
              <img
                src={src}
                alt={`Hiking Seekers Adventure ${index + 1}`}
                // h-full ensures the image perfectly fills the h-64 container
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Subtle dark overlay effect on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-[20px]"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}