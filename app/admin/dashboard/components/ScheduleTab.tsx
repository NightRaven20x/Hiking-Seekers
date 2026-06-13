"use client";

import { useState } from "react";
import { supabase } from "../../../lib/supabase";
import { TripsData } from "../../../data/Trips";
import ScheduledTripCard from "./ScheduledTripCard";

interface ScheduledTrip {
    id: string;
    destination_title: string;
    date: string;
    meeting_time: string;
    meeting_point: string;
    price: number;
    capacity: number;
    spots_remaining: number;
    status: string;
}

interface ScheduleTabProps {
    scheduledTrips: ScheduledTrip[];
    onTripScheduled: () => void;
    onTripCancelled: (id: string) => void;
    onViewDetails: (trip: ScheduledTrip) => void;
}

export default function ScheduleTab({
    scheduledTrips,
    onTripScheduled,
    onTripCancelled,
    onViewDetails,
}: ScheduleTabProps) {
    const [form, setForm] = useState({
        destination_id: 1,
        date: "",
        meeting_time: "07:00",
        meeting_point: "Algiers, Place Audin",
        price: 2000,
        capacity: 30,
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const destination = TripsData.find(
            (t) => t.id === Number(form.destination_id)
        );

        if (!destination) {
            setError("Invalid destination");
            setLoading(false);
            return;
        }

        const { error: insertError } = await supabase
            .from("scheduled_trips")
            .insert({
                destination_id: destination.id,
                destination_title: destination.title,
                date: form.date,
                meeting_time: form.meeting_time,
                meeting_point: form.meeting_point,
                price: form.price,
                capacity: form.capacity,
                spots_remaining: form.capacity,
                status: "active",
            });

        if (insertError) {
            setError(insertError.message);
        } else {
            setSuccess(true);
            onTripScheduled();
            setTimeout(() => setSuccess(false), 3000);
        }

        setLoading(false);
    };

    const handleCancel = async (id: string) => {
        const { error: cancelError } = await supabase
            .from("scheduled_trips")
            .update({ status: "cancelled" })
            .eq("id", id);

        if (!cancelError) onTripCancelled(id);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Schedule Form */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-serif font-bold text-gray-900 mb-6">
                    Schedule a New Trip
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Destination */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Destination *
                        </label>
                        <select
                            aria-label="Select destination"
                            value={form.destination_id}
                            onChange={(e) =>
                                setForm((prev) => ({
                                    ...prev,
                                    destination_id: Number(e.target.value),
                                }))
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4332] focus:border-transparent outline-none transition-all"
                        >
                            {TripsData.map((trip) => (
                                <option key={trip.id} value={trip.id}>
                                    {trip.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Date *
                        </label>
                        <input
                            aria-label="Trip date"
                            type="date"
                            value={form.date}
                            onChange={(e) =>
                                setForm((prev) => ({ ...prev, date: e.target.value }))
                            }
                            required
                            min={new Date().toISOString().split("T")[0]}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4332] focus:border-transparent outline-none transition-all"
                        />
                    </div>

                    {/* Meeting Time */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Meeting Time *
                        </label>
                        <input
                            type="time"
                            aria-label="Meeting time"
                            value={form.meeting_time}
                            onChange={(e) =>
                                setForm((prev) => ({ ...prev, meeting_time: e.target.value }))
                            }
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4332] focus:border-transparent outline-none transition-all"
                        />
                    </div>

                    {/* Meeting Point */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Meeting Point *
                        </label>
                        <input
                            type="text"
                            value={form.meeting_point}
                            onChange={(e) =>
                                setForm((prev) => ({ ...prev, meeting_point: e.target.value }))
                            }
                            required
                            placeholder="Algiers, Place Audin"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4332] focus:border-transparent outline-none transition-all"
                        />
                    </div>

                    {/* Price and Capacity */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Price (DZD) *
                            </label>
                            <input
                                aria-label="Price in DZD"
                                type="number"
                                value={form.price}
                                onChange={(e) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        price: Number(e.target.value),
                                    }))
                                }
                                required
                                min={0}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4332] focus:border-transparent outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Capacity *
                            </label>
                            <input
                                type="number"
                                aria-label="Trip capacity"
                                value={form.capacity}
                                onChange={(e) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        capacity: Number(e.target.value),
                                    }))
                                }
                                required
                                min={1}
                                max={100}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4332] focus:border-transparent outline-none transition-all"
                            />
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    {success && (
                        <p className="text-green-600 text-sm font-semibold">
                            ✓ Trip scheduled successfully!
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded-full font-bold text-white transition-all ${loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-[#1B4332] hover:bg-[#153526] hover:scale-105"
                            }`}
                    >
                        {loading ? "Scheduling..." : "Schedule Trip"}
                    </button>
                </form>
            </div>

            {/* Active Scheduled Trips */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-serif font-bold text-gray-900 mb-6">
                    Active Scheduled Trips
                </h2>

                {scheduledTrips.length === 0 ? (
                    <div className="text-center py-10 text-gray-400">
                        <p className="text-4xl mb-3">🏔️</p>
                        <p className="font-medium">No trips scheduled yet</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {scheduledTrips.map((trip) => (
                            <ScheduledTripCard
                                key={trip.id}
                                trip={trip}
                                onCancel={handleCancel}
                                onViewDetails={onViewDetails}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}