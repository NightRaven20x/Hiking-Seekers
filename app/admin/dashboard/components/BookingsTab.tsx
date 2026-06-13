"use client";

import { useState } from "react";
import BookingCard from "./BookingCard";

interface Person {
    id: string;
    name: string;
    phone: string | null;
    id_photo_url: string | null;
    is_contact: boolean;
    signedPhotoUrl?: string | null;
}

interface Booking {
    id: string;
    booking_ref: string;
    trip_title: string;
    seats: number;
    payment_method: string;
    status: string;
    created_at: string;
    scheduled_trip_id: string | null;
    persons: Person[];
}

interface BookingsTabProps {
    bookings: Booking[];
    loading: boolean;
    onStatusUpdate: (bookingId: string, newStatus: string) => void;
}

export default function BookingsTab({ bookings, loading, onStatusUpdate }: BookingsTabProps) {
    const [filter, setFilter] = useState("all");

    const filteredBookings = filter === "all"
        ? bookings
        : bookings.filter((b) => b.status === filter);

    const filterButtons = [
        { key: "all", label: `All (${bookings.length})` },
        { key: "pending", label: `Pending (${bookings.filter((b) => b.status === "pending").length})` },
        { key: "approved", label: `Approved (${bookings.filter((b) => b.status === "approved").length})` },
        { key: "rejected", label: `Rejected (${bookings.filter((b) => b.status === "rejected").length})` },
    ];

    return (
        <div>
            {/* Filter Buttons */}
            <div className="flex gap-2 mb-6 flex-wrap">
                {filterButtons.map((btn) => (
                    <button
                        key={btn.key}
                        onClick={() => setFilter(btn.key)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold capitalize transition-all ${filter === btn.key
                                ? "bg-[#FF7B29] text-white"
                                : "bg-white text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        {btn.label}
                    </button>
                ))}
            </div>

            {/* Loading Skeleton */}
            {loading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white rounded-2xl shadow-sm p-5 animate-pulse">
                            <div className="flex justify-between items-center">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="h-5 w-24 bg-gray-200 rounded-full" />
                                        <div className="h-5 w-16 bg-gray-200 rounded-full" />
                                    </div>
                                    <div className="h-4 w-32 bg-gray-200 rounded-full" />
                                    <div className="h-3 w-48 bg-gray-200 rounded-full" />
                                </div>
                                <div className="flex gap-2">
                                    <div className="h-9 w-20 bg-gray-200 rounded-full" />
                                    <div className="h-9 w-20 bg-gray-200 rounded-full" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : filteredBookings.length === 0 ? (
                /* Empty State */
                <div className="text-center py-20 text-gray-500">
                    No bookings found
                </div>
            ) : (
                /* Bookings List */
                <div className="space-y-4">
                    {filteredBookings.map((booking) => (
                        <BookingCard
                            key={booking.id}
                            booking={booking}
                            onStatusUpdate={onStatusUpdate}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}