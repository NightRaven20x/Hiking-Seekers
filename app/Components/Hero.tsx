import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden">
      {/* 1. Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/Background1.jpg"
          alt="Algerian Mountains"
          fill
          className="object-cover rounded-b-3xl"
          priority
        />
      </div>

      {/* 1.5 Title */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-start pt-[14vh] px-4 pointer-events-none">

        {/* 2. Title */}
        <h1 className="flex flex-col w-full max-w-275 xl:max-w-325 font-serif font-semibold italic text-white tracking-tighter drop-shadow-[0_10px_15px_rgba(0,0,0,0.4)] leading-[0.70] mt-12">

          {/* Just added 'text-left' - it will lock directly to the left side of the box! */}
          <span className="text-left text-[70px] sm:text-[100px] md:text-[140px] lg:text-[170px] xl:text-[200px] font-playfair font-light italic">
            HIKING
          </span>

          {/* Just added 'text-right' - it will lock directly to the right side of the box! */}
          <span className="text-right text-[70px] sm:text-[100px] md:text-[140px] lg:text-[170px] xl:text-[180px] font-playfair font-light italic">
            SEEKERS
          </span>

        </h1>
      </div>
  

      {/* 2. Content */}

      {/* 2. Content - Pinned to the bottom */}
      <div className="absolute bottom-[17%] left-0 right-0 z-10 flex flex-col items-center justify-center text-center px-4">

        {/* Subheadline */}
        <p className="font-Montserrat font-medium mt-2 text-white text-xl md:text-3xl font-stroked tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-6">
          Where Adventure Meets Heritage
        </p>

        {/* CTA Button */}
        <button
          className="font-Montserrat px-13 py-3.5 text-lg md:text-xl font-bold text-white tracking-[2px] rounded-[60px] bg-[#E67E22]/68 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.3),inset_0_2px_4px_rgba(255,255,255,0.4)] transition-transform duration-300 hover:scale-105 hover:bg-[#E67E22]/80 focus:outline-none focus:ring-4 focus:ring-[#E67E22]/50"
        >
          View Upcoming Trips
        </button>

      </div>

    </section>
  );
}