"use client";

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

interface ScheduledTripCardProps {
    trip: ScheduledTrip;
    onCancel: (id: string) => void;
    onViewDetails: (trip: ScheduledTrip) => void;
}

export default function ScheduledTripCard({
    trip,
    onCancel,
    onViewDetails,
}: ScheduledTripCardProps) {
    const totalBooked = trip.capacity - trip.spots_remaining;
    const capacityPercent = (totalBooked / trip.capacity) * 100;
    const isAlmostFull = trip.spots_remaining <= Math.floor(trip.capacity * 0.3);

    return (
        <div className="border border-gray-100 rounded-xl p-4 hover:border-gray-200 transition-colors">
            <div className="flex justify-between items-start gap-4">

                {/* Trip Info */}
                <div className="flex-1 space-y-1.5">
                    <p className="font-bold text-gray-900 font-serif text-lg">
                        {trip.destination_title}
                    </p>

                    {/* Date */}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-[#1B4332] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>
                            {new Date(trip.date).toLocaleDateString("en-GB", {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </span>
                    </div>

                    {/* Meeting point */}
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <svg className="w-4 h-4 text-[#1B4332] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{trip.meeting_point} at {trip.meeting_time}</span>
                    </div>

                    {/* Price + spots */}
                    <div className="flex items-center gap-4 pt-1">
                        <span className="text-sm font-semibold text-[#1B4332]">
                            {trip.price.toLocaleString()} DZD
                        </span>
                        <span className={`text-xs font-medium ${isAlmostFull ? "text-red-500" : "text-gray-400"}`}>
                            {trip.spots_remaining}/{trip.capacity} spots left
                        </span>
                    </div>

                    {/* Capacity bar */}
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div
                            className={`h-1.5 rounded-full transition-all ${capacityPercent >= 90
                                    ? "bg-red-500"
                                    : capacityPercent >= 60
                                        ? "bg-orange-400"
                                        : "bg-[#1B4332]"
                                }`}
                            style={{ width: `${Math.min(capacityPercent, 100)}%` }}
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 shrink-0">
                    <button
                        onClick={() => onViewDetails(trip)}
                        className="px-4 py-2 bg-[#1B4332] text-white text-sm font-semibold rounded-full hover:bg-[#153526] transition-colors"
                    >
                        View Details
                    </button>
                    <button
                        onClick={() => onCancel(trip.id)}
                        className="px-4 py-2 bg-red-50 text-red-500 text-sm font-semibold rounded-full hover:bg-red-100 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}