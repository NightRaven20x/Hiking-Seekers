import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden">
      {/* 1. Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/Background.jpg" 
          alt="Algerian Mountains"
          quality={100} 
          fill 
          className="object-cover rounded-b-3xl"
          priority
        />  
      </div>

      {/* 2. Content */}  

      {/* 2. Content - Pinned to the bottom */}
      <div className="absolute bottom-[17%] left-0 right-0 z-10 flex flex-col items-center justify-center text-center px-4">

        {/* Subheadline */}
        <p className="font-Montserrat mt-2 text-white text-xl md:text-3xl font-stroked tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-6">
          Where Adventure Meets Heritage
        </p>

      {/* CTA Button */}
        <button 
          className="px-10 py-4 text-lg md:text-xl font-semibold text-white tracking-wide rounded-[60px] bg-[#E67E22]/[0.68] backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.3),inset_0_2px_4px_rgba(255,255,255,0.4)] transition-transform duration-300 hover:scale-105 hover:bg-[#E67E22]/[0.8] focus:outline-none focus:ring-4 focus:ring-[#E67E22]/[0.5]"
        >
          View Upcoming Trips
        </button>

      </div>

    </section>
  );
}