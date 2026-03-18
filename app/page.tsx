import Hero from "./Components/Hero";
import StatsBar from "./Components/StatsBar";
import "./globals.css";
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
          <div className="text-center mb-4">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 uppercase tracking-wide">
              Our Hiking{" "}
              <span className="text-[#4A7C59]">Packages</span>
            </h2>
          </div>

          {/* Difficulty Legend */}
          <div className="flex items-center justify-center gap-3 mb-14">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-white border border-gray-200 rounded-full px-3 py-1.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
              EASY
            </span>
            <span className="text-gray-300 text-sm">|</span>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-white border border-gray-200 rounded-full px-3 py-1.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block" />
              MEDIUM
            </span>
            <span className="text-gray-300 text-sm">|</span>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-white border border-gray-200 rounded-full px-3 py-1.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
              HARD
            </span>
          </div>

          {/* 2x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tripsData.map((trip) => (
              <TripCard key={trip.id} {...trip} />
            ))}
          </div>

        </div>
      </section>

      <Gallery />
      <Footer />
    </main>
  );
}