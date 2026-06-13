"use client";

import { useState } from "react";

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

interface BookingCardProps {
    booking: Booking;
    onStatusUpdate: (bookingId: string, newStatus: string) => void;
}

const statusConfig: Record<string, { label: string; color: string }> = {
    pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
    approved: { label: "Approved", color: "bg-green-100 text-green-800" },
    rejected: { label: "Rejected", color: "bg-red-100 text-red-800" },
};

export default function BookingCard({ booking, onStatusUpdate }: BookingCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

            {/* Main Row */}
            <div
                className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <span className="font-bold text-gray-900 font-montserrat">
                            {booking.booking_ref}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusConfig[booking.status]?.color}`}>
                            {statusConfig[booking.status]?.label}
                        </span>
                    </div>
                    <p className="text-gray-600 text-sm">{booking.trip_title}</p>
                    <p className="text-gray-400 text-xs mt-0.5">
                        {booking.seats} seat{booking.seats > 1 ? "s" : ""} •{" "}
                        {new Date(booking.created_at).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </p>
                </div>

                {/* Action Buttons */}
                <div
                    className="flex items-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                >
                    {booking.status !== "approved" && (
                        <button
                            onClick={() => onStatusUpdate(booking.id, "approved")}
                            className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-full hover:bg-green-700 transition-colors"
                        >
                            Approve
                        </button>
                    )}
                    {booking.status !== "rejected" && (
                        <button
                            onClick={() => onStatusUpdate(booking.id, "rejected")}
                            className="px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-full hover:bg-red-600 transition-colors"
                        >
                            Reject
                        </button>
                    )}
                    {booking.status !== "pending" && (
                        <button
                            onClick={() => onStatusUpdate(booking.id, "pending")}
                            className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-semibold rounded-full hover:bg-gray-300 transition-colors"
                        >
                            Reset
                        </button>
                    )}
                    <span className="text-gray-400 ml-2">
                        {isExpanded ? "▲" : "▼"}
                    </span>
                </div>
            </div>

            {/* Expanded Participants */}
            {isExpanded && (
                <div className="border-t border-gray-100 p-5 bg-gray-50">
                    <h4 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">
                        Participants ({booking.persons.length})
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {booking.persons.map((person) => (
                            <div key={person.id} className="bg-white rounded-xl p-4 flex gap-4">

                                {/* ID Photo */}
                                <div className="shrink-0">
                                    {person.signedPhotoUrl ? (
                                        <a
                                            href={person.signedPhotoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block"
                                        >
                                            <img
                                                src={person.signedPhotoUrl}
                                                alt="ID"
                                                className="w-20 h-24 object-cover rounded-lg border border-gray-200 hover:opacity-80 transition-opacity"
                                            />
                                        </a>
                                    ) : (
                                        <div className="w-20 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                                            <span className="text-gray-400 text-xs text-center px-1">
                                                No photo
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Person Info */}
                                <div>
                                    <p className="font-semibold text-gray-900">
                                        {person.name}
                                        {person.is_contact && (
                                            <span className="ml-2 text-xs bg-[#1B4332]/10 text-[#1B4332] px-2 py-0.5 rounded-full">
                                                Contact
                                            </span>
                                        )}
                                    </p>
                                    {person.phone && (
                                        <a
                                            href={`https://wa.me/${person.phone.replace(/\D/g, "")}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-green-600 hover:underline flex items-center gap-1 mt-1"
                                        >
                                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                            </svg>
                                            {person.phone}
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}