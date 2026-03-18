"use client";

import { useState } from "react";
import Image from "next/image";
import BookingModal from "./BookingModal";

interface Trip {
  id: number;
  title: string;
  price: string;
  difficulty: string;
  difficultyColor: string;
  imageUrl: string;
  distance: string;
  duration: string;
  elevation: string;
  description: string;
  included: string[];
  notIncluded?: string[];
  mapUrl?: string;
}

export default function TripDetailClient({ trip }: { trip: Trip }) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
      {/* Hero Banner */}
      <div className="relative w-full h-[45vh] min-h-[400px] overflow-hidden rounded-b-[40px]">
        <Image
          src={trip.imageUrl}
          alt={trip.title}
          fill
          className="object-cover"
          priority
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Title sits bottom-left */}
        <div className="absolute bottom-0 left-0 right-0 max-w-6xl mx-auto px-8 pb-10">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white drop-shadow-lg uppercase tracking-tight">
            {trip.title.toUpperCase()}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

          {/* Left Column: Description + Stats + Inclusions */}
          <div className="space-y-10">

            {/* Description */}
            <p className="text-gray-700 text-lg leading-relaxed">
              {trip.description}
            </p>

            {/* Stats Pill */}
            <div className="inline-flex items-center gap-0 border border-gray-300 rounded-full px-2 py-1 bg-white/60">
              <div className="text-center px-6 py-3">
                <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Distance</p>
                <p className="text-lg font-bold text-gray-800">{trip.distance}</p>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div className="text-center px-6 py-3">
                <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Duration</p>
                <p className="text-lg font-bold text-gray-800">{trip.duration}</p>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div className="text-center px-6 py-3">
                <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Elevation</p>
                <p className="text-lg font-bold text-gray-800">{trip.elevation}</p>
              </div>
            </div>

            {/* Included / Not Included */}
            <div className="space-y-3">
              {trip.included.map((item: string, index: number) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-gray-700 text-base">{item}</span>
                </div>
              ))}

              {trip.notIncluded?.map((item: string, index: number) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-red-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                  <span className="text-[#FF7B29] text-base font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Decorative line + Map + Book Button */}
          <div className="flex flex-col gap-6">

            {/* Decorative horizontal rule */}
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full border-2 border-gray-400 shrink-0" />
              <div className="flex-1 h-px bg-gray-300" />
            </div>

            {/* Map embed */}
            <div className="w-full rounded-[20px] overflow-hidden shadow-md border border-gray-100 bg-gray-100 h-[320px]">
              {trip.mapUrl ? (
                <iframe
                  src={trip.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm font-medium">
                  Map coming soon
                </div>
              )}
            </div>

            {/* Book button */}
            <div className="flex justify-end">
              <button 
                onClick={() => setIsBookingModalOpen(true)}
                className="bg-[#FF7B29] hover:bg-orange-600 active:scale-95 text-white font-bold text-lg px-10 py-4 rounded-full shadow-md transition-all duration-200"
              >
                Book for {trip.price}da
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        tripTitle={trip.title}
        tripPrice={trip.price}
        tripId={trip.id}
      />
    </>
  );
}
