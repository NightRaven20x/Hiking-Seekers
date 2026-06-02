import Hero from "./Components/Hero";
import StatsBar from "./Components/StatsBar";
import Navbar from "./Components/Navbar";
import TripCard from "./Components/TripCard";
import Footer from "./Components/Footer";
import Gallery from "./Components/Gallery";
import QuoteSection from "./Components/QuoteSection";
import { tripsData } from "./data/trips";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F3F4F6]">
      <Navbar />
      <Hero />
      <StatsBar />
      <QuoteSection />

      {/* Trips Section */}
      <section className="mt-20 px-6">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="text-center mb-4 ">
            <h2 className="font-playfair font-medium text-[4rem] md:text-[5rem] text-[#000000] uppercase tracking-wide">
              Our Hiking{" "}
              <span className="text-[#1B4332] font-bold">Packages</span>
            </h2>
          </div>

          {/* Difficulty Legend */}
          <div className="flex items-center justify-center gap-3 mb-14 border border-gray-300 rounded-full py-2 px-4 w-max mx-auto">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 ">
              <span className="w-2 h-2 rounded-full bg-[#12B872]/80 inline-block" />
              Easy
            </span>
            <span className="text-gray-300 text-sm">|</span>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-600">
              <span className="w-2 h-2 rounded-full bg-[#FF7800]/80 inline-block" />
              Medium
            </span>
            <span className="text-gray-300 text-sm">|</span>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 ">
              <span className="w-2 h-2 rounded-full bg-[#DD3131]/80 inline-block" />
              Hard
            </span>
          </div>

          {/* Flexbox Layout - Cards can have different widths */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {tripsData.map((trip, index) => (
              <TripCard
                key={trip.id}
                id={trip.id}
                title={trip.title}
                imageUrl={trip.imageUrl}
                difficulty={trip.difficulty}
                variant={index % 2 === 0 ? 'compact' : 'wide'}
              />
            ))}
          </div>

        </div>
      </section>

      <Gallery />
      <Footer />
    </main>
  );
}