"use client";

import { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import TripCard from "../Components/TripCard";
import { TripsData } from "../data/Trips";
import Image from "next/image";

export default function TripsPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");

  // Filter Trips based on selected difficulty
  const filteredTrips = selectedDifficulty === "All"
    ? TripsData
    : TripsData.filter(trip => trip.difficulty === selectedDifficulty);

  return (
    <main className="min-h-screen bg-[#F3F4F6]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/Background1.jpg"
            alt="Explore Algeria"
            fill
            className="object-cover rounded-b-3xl"
            priority
          />
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-0" />

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-playfair font-medium italic text-white text-5xl md:text-7xl mb-4 drop-shadow-lg">
            Explore Our Destinations
          </h1>
          <p className="font-montserrat text-white text-lg md:text-xl max-w-2xl drop-shadow-md">
            Choose your next adventure from our curated collection of Algeria's most breathtaking trails
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="max-w-6xl mx-auto px-6 py-12">

        {/* Filter Heading */}
        <div className="text-center mb-8">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Find Your Perfect Destinations
          </h2>
          <p className="text-gray-500 text-lg">
            Filter by difficulty level to match your experience
          </p>
        </div>

        {/* Difficulty Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedDifficulty("All")}
            className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${selectedDifficulty === "All"
              ? "bg-gray-900 text-white shadow-lg scale-105"
              : "bg-white text-gray-600 border border-gray-200 hover:border-gray-400"
              }`}
          >
            All Destinations ({TripsData.length})
          </button>

          <button
            onClick={() => setSelectedDifficulty("Easy")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${selectedDifficulty === "Easy"
              ? "bg-green-600 text-white shadow-lg scale-105"
              : "bg-white text-gray-600 border border-gray-200 hover:border-green-400"
              }`}
          >
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
            Easy ({TripsData.filter(t => t.difficulty === "Easy").length})
          </button>

          <button
            onClick={() => setSelectedDifficulty("Medium")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${selectedDifficulty === "Medium"
              ? "bg-yellow-500 text-white shadow-lg scale-105"
              : "bg-white text-gray-600 border border-gray-200 hover:border-yellow-400"
              }`}
          >
            <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block" />
            Medium ({TripsData.filter(t => t.difficulty === "Medium").length})
          </button>

          <button
            onClick={() => setSelectedDifficulty("Hard")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${selectedDifficulty === "Hard"
              ? "bg-red-600 text-white shadow-lg scale-105"
              : "bg-white text-gray-600 border border-gray-200 hover:border-red-400"
              }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
            Hard ({TripsData.filter(t => t.difficulty === "Hard").length})
          </button>
        </div>

        {/* Results Count */}
        <div className="text-center mb-8">
          <p className="text-gray-600 text-sm">
            Showing <span className="font-bold text-gray-900">{filteredTrips.length}</span> {filteredTrips.length === 1 ? 'trip' : 'Trips'}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {filteredTrips.map((trip, index) => (
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

        {/* Empty State */}
        {filteredTrips.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🏔️</div>
            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-2">
              No Trips found
            </h3>
            <p className="text-gray-500 mb-6">
              Try selecting a different difficulty level
            </p>
            <button
              onClick={() => setSelectedDifficulty("All")}
              className="px-6 py-3 bg-[#FF7B29] text-white font-semibold rounded-full hover:bg-orange-600 transition-colors"
            >
              Show All Trips
            </button>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}