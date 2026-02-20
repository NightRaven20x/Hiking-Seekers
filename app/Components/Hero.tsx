import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden">
      {/* 1. Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/background.svg" 
          alt="Algerian Mountains" 
          fill 
          className="object-cover rounded-b-3xl"
          priority
        />
        {/* Dark Gradient Overlay so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent"></div>
      </div>

      {/* 2. Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
        
        {/* Main Headline */}
        <h1 className="font-serif text-5xl md:text-7xl text-white font-semibold drop-shadow-md max-w-4xl leading-tight">
          Extraordinary nature and <br /> cultural charm
        </h1>

        {/* Subheadline */}
        <p className="mt-4 text-gray-200 text-lg md:text-xl font-light tracking-wide">
          Explore the Beauty of Algeria
        </p>

        {/* CTA Button */}
        <button className="mt-8 bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-full font-medium transition-all shadow-lg transform hover:scale-105">
          View Adventures
        </button>

      </div>
    </section>
  );
}