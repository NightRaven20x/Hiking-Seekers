"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { tripsData } from "../data/trips";
import Link from "next/link";

interface ScheduledTrip {
    id: string;
    destination_id: number;
    destination_title: string;
    date: string;
    meeting_time: string;
    meeting_point: string;
    price: number;
    capacity: number;
    spots_remaining: number;
}

export default function UpcomingTrips() {
    const [trips, setTrips] = useState<ScheduledTrip[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUpcomingTrips();
    }, []);

    const fetchUpcomingTrips = async () => {
        const today = new Date().toISOString().split("T")[0];

        const { data, error } = await supabase
            .from("scheduled_trips")
            .select("*")
            .eq("status", "active")
            .gte("date", today)
            .order("date", { ascending: true })
            .limit(2);

        if (!error) setTrips(data || []);
        setLoading(false);
    };

    if (loading) {
        return (
            <section className="max-w-6xl mx-auto px-6 py-20">
                <div className="text-center mb-12">
                    <h2 className="font-playfair font-medium text-5xl md:text-6xl text-black uppercase tracking-wide">
                        Upcoming <span className="text-[#1B4332]">Trips</span>
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2].map(i => (
                        <div key={i} className="bg-white rounded-3xl p-6 animate-pulse">
                            <div className="h-6 w-32 bg-gray-200 rounded-full mb-4" />
                            <div className="h-4 w-48 bg-gray-200 rounded-full mb-3" />
                            <div className="h-4 w-40 bg-gray-200 rounded-full mb-3" />
                            <div className="h-4 w-36 bg-gray-200 rounded-full" />
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    if (trips.length === 0) return null;

    return (
        <section className="max-w-6xl mx-auto px-6 py-20">
            <div className="text-center mb-12">
                <h2 className="font-playfair font-medium text-5xl md:text-6xl text-black uppercase tracking-wide">
                    Upcoming <span className="text-[#1B4332]">Trips</span>
                </h2>
                <p className="text-gray-500 mt-4 text-lg">
                    Book your spot before it fills up
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {trips.map(trip => {
                    const destination = tripsData.find(t => t.id === trip.destination_id);
                    const spotsPercent = (trip.spots_remaining / trip.capacity) * 100;
                    const isAlmostFull = spotsPercent <= 30;

                    return (
                        <div key={trip.id} className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

                            {/* Destination Image */}
                            {destination && (
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={destination.imageUrl}
                                        alt={trip.destination_title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                    <div className="absolute bottom-4 left-4">
                                        <span className="text-white font-bold text-2xl font-playfair">
                                            {trip.destination_title}
                                        </span>
                                    </div>
                                    {isAlmostFull && (
                                        <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                            Almost Full
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Trip Details */}
                            <div className="p-6 space-y-4">

                                {/* Date and Time */}
                                <div className="flex items-center gap-2 text-gray-700">
                                    <svg className="w-4 h-4 text-[#1B4332]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span className="font-semibold">
                                        {new Date(trip.date).toLocaleDateString("en-GB", {
                                            weekday: "long",
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric"
                                        })}
                                    </span>
                                </div>

                                {/* Meeting Point */}
                                <div className="flex items-center gap-2 text-gray-600 text-sm">
                                    <svg className="w-4 h-4 text-[#1B4332] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>{trip.meeting_point} at {trip.meeting_time}</span>
                                </div>

                                {/* Spots remaining */}
                                <div className="space-y-1.5">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Spots remaining</span>
                                        <span className={`font-semibold ${isAlmostFull ? "text-red-500" : "text-[#1B4332]"}`}>
                                            {trip.spots_remaining}/{trip.capacity}
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full transition-all ${isAlmostFull ? "bg-red-400" : "bg-[#1B4332]"}`}
                                            style={{ width: `${100 - spotsPercent}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Price and Book */}
                                <div className="flex items-center justify-between pt-2">
                                    <div>
                                        <span className="text-2xl font-bold text-gray-900">
                                            {trip.price.toLocaleString()}
                                        </span>
                                        <span className="text-gray-500 text-sm ml-1">DZD / person</span>
                                    </div>
                                    <Link href={`/trips/${trip.destination_id}`}>
                                        <button className="px-6 py-2.5 bg-[#FF7B29] text-white font-semibold rounded-full hover:bg-orange-600 transition-all hover:scale-105">
                                            Book Now
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}