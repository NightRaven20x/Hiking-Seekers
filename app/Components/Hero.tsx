import Image from "next/image";
import Link from "next/link";
 
export default function Hero() {
  return (
    <section className="relative h-[90vh] min-h-[600px] w-full overflow-hidden rounded-b-[50px]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/Background1.jpg"
          alt="Algerian Mountains"
          fill
          className="object-cover rounded-b-3xl scale-110"
          priority
        />
      </div>
 
      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/20 via-transparent to-black/40" />

      {/* Title Section - Pushed Higher */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-start pt-[18vh] md:pt-[20vh] px-6 ">
        <h1 className="w-full max-w-7xl font-playfair font-bold italic text-white tracking-tighter drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] leading-[0.8]">
          {/* HIKING on top - larger */}
          <span className="block text-left text-[clamp(5rem,14vw,16rem)]">
            HIKING
          </span>
          {/* SEEKERS below - smaller, right-aligned */}
          <span className="block text-right text-[clamp(4rem,11vw,12rem)] -mt-4 md:-mt-6 lg:-mt-8">
            SEEKERS
          </span>
        </h1>
      </div>
 
      {/* Bottom Content - Subheadline & CTA */}
      <div className="absolute bottom-[12%] md:bottom-[15%] left-0 right-0 z-10 flex flex-col items-center justify-center text-center px-6 gap-6">
        <p className="font-montserrat font-medium text-white text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-wide drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] max-w-2xl">
          Where Adventure Meets Heritage
        </p>
 
        <Link href="/trips">
          <button className="font-montserrat px-8 md:px-10 py-3 md:py-3.5 text-base md:text-lg font-bold text-white tracking-[1.5px] md:tracking-[2px] rounded-full bg-[#E67E22]/70 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.3),inset_0_2px_4px_rgba(255,255,255,0.4)] transition-all duration-300 hover:scale-105 hover:bg-[#E67E22]/85 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#E67E22]/50">
            View Upcoming Trips
          </button>
        </Link>
      </div>
    </section>
  );
}