"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import BookingModal from "./BookingModal";
import { supabase } from "../lib/supabase";

interface Trip {
  id: number;
  title: string;
  price: number;
  difficulty: string;
  imageUrl: string;
  distance: string;
  duration: string;
  elevation: string;
  description: string;
  included: string[];
  notIncluded?: string[];
  mapUrl?: string;
}

interface ScheduledTrip {
  id: string;
  date: string;
  meeting_time: string;
  meeting_point: string;
  price: number;
  capacity: number;
  spots_remaining: number;
}

export default function TripDetailClient({ trip }: { trip: Trip }) {
  const [scheduledTrips, setScheduledTrips] = useState<ScheduledTrip[]>([]);
  const [loadingSchedule, setLoadingSchedule] = useState(true);
  const [selectedScheduledTrip, setSelectedScheduledTrip] = useState<ScheduledTrip | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    fetchScheduledTrips();
  }, [trip.id]);

  const fetchScheduledTrips = async () => {
    const today = new Date().toISOString().split("T")[0];
    const { data, error } = await supabase
      .from("scheduled_trips")
      .select("*")
      .eq("destination_id", trip.id)
      .eq("status", "active")
      .gte("date", today)
      .order("date", { ascending: true });

    if (!error) setScheduledTrips(data || []);
    setLoadingSchedule(false);
  };

  const handleBookClick = (scheduledTrip: ScheduledTrip) => {
    setSelectedScheduledTrip(scheduledTrip);
    setIsBookingModalOpen(true);
  };

  return (
    <>
      {/* Hero Banner */}
      <div className="relative w-full h-[45vh] min-h-[400px] overflow-hidden rounded-b-[70px]">
        <Image
          src={trip.imageUrl}
          alt={trip.title}
          fill
          className="object-cover scale-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-6xl mx-[100px] px-8 pb-[100px]">
          <h1 className="text-5xl md:text-7xl font-playfair font-bold text-white drop-shadow-lg uppercase tracking-tight">
            {trip.title.toUpperCase()}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-32">

          {/* Left Column */}
          <div className="w-full lg:w-[45%] space-y-10">

            <p className="text-gray-700 text-lg font-montserrat font-medium leading-relaxed">
              {trip.description}
            </p>

            {/* Stats Pill */}
            <div className="inline-flex items-center border border-[#1B3A4B]/70 font-montserrat font-semibold rounded-full bg-white">
              <div className="text-center px-6 py-3">
                <p className="text-[#1B3A4B]/60 uppercase tracking-widest text-xs mb-1">Distance</p>
                <p className="text-lg text-[#1B3A4B]">{trip.distance}</p>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div className="text-center px-6 py-3">
                <p className="text-[#1B3A4B]/60 uppercase tracking-widest text-xs mb-1">Duration</p>
                <p className="text-lg text-[#1B3A4B]">{trip.duration}</p>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div className="text-center px-6 py-3">
                <p className="text-[#1B3A4B]/60 uppercase tracking-widest text-xs mb-1">Elevation</p>
                <p className="text-lg text-[#1B3A4B]">{trip.elevation}</p>
              </div>
            </div>

            {/* Included / Not Included */}
            <div className="space-y-3 font-medium font-montserrat text-[#1B3A4B]">
              {trip.included.map((item: string, index: number) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-base">{item}</span>
                </div>
              ))}
              {trip.notIncluded?.map((item: string, index: number) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-red-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                  <span className="text-[#960909] text-base font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-[45%] flex flex-col gap-6">

            {/* Decorative rule */}
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full border-2 border-gray-400 shrink-0" />
              <div className="flex-1 h-px bg-gray-300" />
              <div className="w-3 h-3 rounded-full border-2 border-gray-400 shrink-0" />
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

            {/* Upcoming Dates Section */}
            <div className="space-y-3">
              <h3 className="font-serif text-2xl font-bold text-gray-900">
                Upcoming Dates
              </h3>

              {loadingSchedule ? (
                <div className="space-y-3">
                  {[1, 2].map(i => (
                    <div key={i} className="bg-white rounded-2xl p-4 animate-pulse">
                      <div className="h-4 w-40 bg-gray-200 rounded-full mb-3" />
                      <div className="h-3 w-56 bg-gray-200 rounded-full mb-3" />
                      <div className="h-3 w-32 bg-gray-200 rounded-full" />
                    </div>
                  ))}
                </div>
              ) : scheduledTrips.length === 0 ? (
                <div className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100">
                  <p className="text-gray-500 font-montserrat text-sm mb-1">No upcoming dates scheduled</p>
                  <p className="text-gray-400 text-xs">Check back soon or contact us on WhatsApp</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {scheduledTrips.map(scheduled => {
                    const spotsPercent = (scheduled.spots_remaining / scheduled.capacity) * 100;
                    const isAlmostFull = spotsPercent <= 30;
                    const isFull = scheduled.spots_remaining === 0;

                    return (
                      <div key={scheduled.id} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex-1 space-y-1.5">

                            {/* Date */}
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-[#1B4332] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span className="font-semibold text-gray-900 font-montserrat text-sm">
                                {new Date(scheduled.date).toLocaleDateString("en-GB", {
                                  weekday: "long",
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric"
                                })}
                              </span>
                            </div>

                            {/* Meeting point */}
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-[#1B4332] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span className="text-gray-500 text-xs font-montserrat">
                                {scheduled.meeting_point} at {scheduled.meeting_time}
                              </span>
                            </div>

                            {/* Spots bar */}
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                                <div
                                  className={`h-1.5 rounded-full transition-all ${isFull ? "bg-red-500" : isAlmostFull ? "bg-orange-400" : "bg-[#1B4332]"}`}
                                  style={{ width: `${100 - spotsPercent}%` }}
                                />
                              </div>
                              <span className={`text-xs font-semibold font-montserrat shrink-0 ${isFull ? "text-red-500" : isAlmostFull ? "text-orange-500" : "text-gray-500"}`}>
                                {isFull ? "Full" : `${scheduled.spots_remaining} spots left`}
                              </span>
                            </div>
                          </div>

                          {/* Price + Book */}
                          <div className="flex flex-col items-end gap-2 shrink-0">
                            <span className="font-bold text-gray-900 font-montserrat text-sm">
                              {scheduled.price.toLocaleString()} DZD
                            </span>
                            <button
                              onClick={() => handleBookClick(scheduled)}
                              disabled={isFull}
                              className={`px-5 py-2 rounded-full text-sm font-bold font-montserrat transition-all ${isFull
                                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                  : "bg-[#FF7B29] text-white hover:bg-orange-600 hover:scale-105"
                                }`}
                            >
                              {isFull ? "Full" : "Book Now"}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {selectedScheduledTrip && (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => {
            setIsBookingModalOpen(false);
            setSelectedScheduledTrip(null);
          }}
          tripTitle={trip.title}
          tripPrice={selectedScheduledTrip.price}
          tripId={trip.id}
          scheduledTripId={selectedScheduledTrip.id}
        />
      )}
    </>
  );
}