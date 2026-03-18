import Image from "next/image";
import Link from "next/link";
 
export default function Hero() {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/Background1.jpg"
          alt="Algerian Mountains"
          fill
          className="object-cover rounded-b-3xl"
          priority
        />
      </div>
 
      {/* Title Section */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-start pt-[14vh] px-4 pointer-events-none">
        <h1 className="flex flex-col w-full max-w-[1100px] xl:max-w-[1300px] font-playfair font-medium italic text-white tracking-tighter drop-shadow-[0_10px_15px_rgba(0,0,0,0.4)] leading-[0.65] mt-12">
          <span className="text-left text-[90px] sm:text-[120px] md:text-[160px] lg:text-[190px] xl:text-[220px]">
            HIKING
          </span>
          <span className="text-right text-[70px] sm:text-[100px] md:text-[140px] lg:text-[170px] xl:text-[180px]">
            SEEKERS
          </span>
        </h1>
      </div>
 
      {/* Bottom Content - Subheadline & CTA */}
      <div className="absolute bottom-[17%] left-0 right-0 z-10 flex flex-col items-center justify-center text-center px-4 pointer-events-auto">
        <p className="font-montserrat font-medium mt-2 text-white text-xl md:text-3xl tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-6">
          Where Adventure Meets Heritage
        </p>
 
        <Link href="/trips">
          <button className="font-montserrat px-10 py-3.5 text-lg md:text-xl font-bold text-white tracking-[2px] rounded-[60px] bg-[#E67E22]/70 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.3),inset_0_2px_4px_rgba(255,255,255,0.4)] transition-transform duration-300 hover:scale-105 hover:bg-[#E67E22]/80 focus:outline-none focus:ring-4 focus:ring-[#E67E22]/50">
            View Upcoming Trips
          </button>
        </Link>
      </div>
    </section>
  );
}