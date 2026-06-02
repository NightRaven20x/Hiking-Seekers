import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[80px] w-full overflow-hidden rounded-b-[50px]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/Background1.jpg"
          alt="Algerian Mountains"
          fill
          className="object-cover rounded-b-[50px] scale-110"
          priority
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/20 via-transparent to-black/40 rounded-b-[50px]" />

      {/* Title Section */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-start pt-[30vh] sm:pt-[30vh] md:pt-[25vh] lg:pt-[22vh] px-4 sm:px-6">
        <h1 className="w-full max-w-7xl font-playfair font-bold italic text-white tracking-tighter drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)] leading-[0.9] sm:leading-[0.9] md:leading-[0.85]">
          
          {/* HIKING - increased size, removed heavy left margin */}
          <span className="block text-left ml-2 md:ml-4 text-[clamp(4.5rem,15vw,16rem)]">
            HIKING
          </span>
          
          {/* SEEKERS - increased size, removed heavy right margin, tighter negative margin */}
          <span className="block text-right mr-2 md:mr-4 text-[clamp(4rem,12vw,13rem)] -mt-4 sm:-mt-6 md:-mt-8 lg:-mt-10">
            SEEKERS
          </span>
          
        </h1>
      </div>
 
      {/* Bottom Content */}
      <div className="absolute bottom-[22%] sm:bottom-[20%] md:bottom-[15%] left-0 right-0 z-10 flex flex-col items-center justify-center text-center px-6 gap-5 sm:gap-5 md:gap-6">
        <p className="font-montserrat font-medium text-white text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-wide drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] max-w-2xl">
          Where Adventure Meets Heritage
        </p>
 
        <Link href="/trips">
          <button className="font-montserrat px-7 sm:px-8 md:px-10 py-3 sm:py-3 md:py-3.5 text-base sm:text-base md:text-lg font-bold text-white tracking-[1.5px] sm:tracking-[1.5px] md:tracking-[2px] rounded-full bg-[#E67E22]/70 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.3),inset_0_2px_4px_rgba(255,255,255,0.4)] transition-all duration-300 hover:scale-105 hover:bg-[#E67E22]/85 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#E67E22]/50">
            View Upcoming Trips
          </button>
        </Link>
      </div>
    </section>
  );
}