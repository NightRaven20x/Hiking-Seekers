"use client";

interface Person {
    id: string;
    name: string;
    phone: string | null;
    is_contact: boolean;
    signedPhotoUrl?: string | null;
}

interface Booking {
    id: string;
    booking_ref: string;
    trip_title: string;
    seats: number;
    status: string;
    created_at: string;
    scheduled_trip_id: string | null;
    persons: Person[];
}

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

interface TripDetailModalProps {
    trip: ScheduledTrip;
    bookings: Booking[];
    onClose: () => void;
    onStatusUpdate: (bookingId: string, newStatus: string) => void;
}

const statusConfig: Record<string, { label: string; color: string }> = {
    pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
    approved: { label: "Approved", color: "bg-green-100 text-green-800" },
    rejected: { label: "Rejected", color: "bg-red-100 text-red-800" },
};

export default function TripDetailModal({
    trip,
    bookings,
    onClose,
    onStatusUpdate,
}: TripDetailModalProps) {
    // Only bookings for this specific scheduled trip
    const tripBookings = bookings.filter(
        (b) => b.scheduled_trip_id === trip.id
    );

    const bookedSeats = tripBookings
        .filter((b) => b.status === "approved")
        .reduce((sum, b) => sum + b.seats, 0);

    const pendingSeats = tripBookings
        .filter((b) => b.status === "pending")
        .reduce((sum, b) => sum + b.seats, 0);

    const totalBooked = trip.capacity - trip.spots_remaining;
    const capacityPercent = (totalBooked / trip.capacity) * 100;
    const revenue = bookedSeats * trip.price;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">

                {/* Header */}
                <div className="sticky top-0 bg-[#1B4332] text-white p-6 rounded-t-2xl z-10">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-serif font-bold mb-1">
                                {trip.destination_title}
                            </h2>
                            <p className="text-white/80 text-sm">
                                {new Date(trip.date).toLocaleDateString("en-GB", {
                                    weekday: "long",
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}
                                {" — "}
                                {trip.meeting_time} at {trip.meeting_point}
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                            aria-label="Close modal"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="p-6 space-y-6">

                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-gray-50 rounded-xl p-4 text-center">
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Capacity</p>
                            <p className="text-2xl font-bold font-serif text-gray-900">{trip.capacity}</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 text-center">
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Booked</p>
                            <p className="text-2xl font-bold font-serif text-[#1B4332]">{totalBooked}</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 text-center">
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Pending</p>
                            <p className="text-2xl font-bold font-serif text-yellow-600">{pendingSeats}</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 text-center">
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Revenue</p>
                            <p className="text-2xl font-bold font-serif text-green-600">
                                {revenue.toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-400">DZD</p>
                        </div>
                    </div>

                    {/* Capacity Bar */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500 font-medium">Capacity filled</span>
                            <span className="font-bold text-gray-900">
                                {totalBooked}/{trip.capacity} seats
                            </span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-3">
                            <div
                                className={`h-3 rounded-full transition-all ${capacityPercent >= 90
                                        ? "bg-red-500"
                                        : capacityPercent >= 60
                                            ? "bg-orange-400"
                                            : "bg-[#1B4332]"
                                    }`}
                                style={{ width: `${Math.min(capacityPercent, 100)}%` }}
                            />
                        </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-[#1B4332]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-semibold">{trip.price.toLocaleString()} DZD per person</span>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-100" />

                    {/* Bookings for this trip */}
                    <div>
                        <h3 className="font-serif text-xl font-bold text-gray-900 mb-4">
                            Bookings ({tripBookings.length})
                        </h3>

                        {tripBookings.length === 0 ? (
                            <div className="text-center py-12 bg-gray-50 rounded-2xl">
                                <p className="text-4xl mb-3">📋</p>
                                <p className="text-gray-500 font-medium">No bookings for this trip yet</p>
                                <p className="text-gray-400 text-sm mt-1">Bookings will appear here once submitted</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {tripBookings.map((booking) => (
                                    <div key={booking.id} className="bg-gray-50 rounded-xl p-4">

                                        {/* Booking Header */}
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <span className="font-bold text-gray-900 font-montserrat text-sm">
                                                    {booking.booking_ref}
                                                </span>
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusConfig[booking.status]?.color}`}>
                                                    {statusConfig[booking.status]?.label}
                                                </span>
                                                <span className="text-gray-400 text-xs">
                                                    {booking.seats} seat{booking.seats > 1 ? "s" : ""}
                                                </span>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex gap-2">
                                                {booking.status !== "approved" && (
                                                    <button
                                                        onClick={() => onStatusUpdate(booking.id, "approved")}
                                                        className="px-3 py-1.5 bg-green-600 text-white text-xs font-semibold rounded-full hover:bg-green-700 transition-colors"
                                                    >
                                                        Approve
                                                    </button>
                                                )}
                                                {booking.status !== "rejected" && (
                                                    <button
                                                        onClick={() => onStatusUpdate(booking.id, "rejected")}
                                                        className="px-3 py-1.5 bg-red-500 text-white text-xs font-semibold rounded-full hover:bg-red-600 transition-colors"
                                                    >
                                                        Reject
                                                    </button>
                                                )}
                                                {booking.status !== "pending" && (
                                                    <button
                                                        onClick={() => onStatusUpdate(booking.id, "pending")}
                                                        className="px-3 py-1.5 bg-gray-200 text-gray-700 text-xs font-semibold rounded-full hover:bg-gray-300 transition-colors"
                                                    >
                                                        Reset
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        {/* Participants */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {booking.persons.map((person) => (
                                                <div key={person.id} className="bg-white rounded-lg p-3 flex items-center gap-3">
                                                    {/* Photo */}
                                                    <div className="shrink-0">
                                                        {person.signedPhotoUrl ? (
                                                            <a
                                                                href={person.signedPhotoUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                <img
                                                                    src={person.signedPhotoUrl}
                                                                    alt="ID"
                                                                    className="w-12 h-14 object-cover rounded-lg border border-gray-200 hover:opacity-80 transition-opacity"
                                                                />
                                                            </a>
                                                        ) : (
                                                            <div className="w-12 h-14 bg-gray-100 rounded-lg flex items-center justify-center">
                                                                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                                </svg>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Info */}
                                                    <div>
                                                        <p className="font-semibold text-gray-900 text-sm">
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
                                                                className="text-xs text-green-600 hover:underline flex items-center gap-1 mt-0.5"
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
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}