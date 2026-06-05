"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import { tripsData } from "../../data/trips";

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
    persons: Person[];
}

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
    status: string;
}

export default function Dashboard() {
    const router = useRouter();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [scheduledTrips, setScheduledTrips] = useState<ScheduledTrip[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const [expandedBooking, setExpandedBooking] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<"bookings" | "schedule">("bookings");

    // Schedule form state
    const [scheduleForm, setScheduleForm] = useState({
        destination_id: 1,
        date: "",
        meeting_time: "07:00",
        meeting_point: "Algiers, Place Audin",
        price: 2000,
        capacity: 30,
    });
    const [scheduleLoading, setScheduleLoading] = useState(false);
    const [scheduleSuccess, setScheduleSuccess] = useState(false);
    const [scheduleError, setScheduleError] = useState("");

    useEffect(() => {
        checkAuth();
        fetchBookings();
        fetchScheduledTrips();
    }, []);

    const checkAuth = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) router.push("/admin");
    };

    const getSignedUrl = async (path: string): Promise<string> => {
        const { data, error } = await supabase.storage
            .from("id-photos")
            .createSignedUrl(path, 3600);
        if (error || !data) return "";
        return data.signedUrl;
    };

    const fetchBookings = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("bookings")
            .select(`*, persons (*)`)
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching bookings:", error);
        } else {
            const bookingsWithPhotos = await Promise.all(
                (data || []).map(async (booking) => ({
                    ...booking,
                    persons: await Promise.all(
                        booking.persons.map(async (person: Person) => ({
                            ...person,
                            signedPhotoUrl: person.id_photo_url
                                ? await getSignedUrl(person.id_photo_url)
                                : null
                        }))
                    )
                }))
            );
            setBookings(bookingsWithPhotos);
        }
        setLoading(false);
    };

    const fetchScheduledTrips = async () => {
        const { data, error } = await supabase
            .from("scheduled_trips")
            .select("*")
            .order("date", { ascending: true });

        if (!error) setScheduledTrips(data || []);
    };

    const handleScheduleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setScheduleLoading(true);
        setScheduleError("");

        const destination = tripsData.find(t => t.id === Number(scheduleForm.destination_id));
        if (!destination) {
            setScheduleError("Invalid destination");
            setScheduleLoading(false);
            return;
        }

        const { error } = await supabase
            .from("scheduled_trips")
            .insert({
                destination_id: destination.id,
                destination_title: destination.title,
                date: scheduleForm.date,
                meeting_time: scheduleForm.meeting_time,
                meeting_point: scheduleForm.meeting_point,
                price: scheduleForm.price,
                capacity: scheduleForm.capacity,
                spots_remaining: scheduleForm.capacity,
                status: "active"
            });

        if (error) {
            setScheduleError(error.message);
        } else {
            setScheduleSuccess(true);
            fetchScheduledTrips();
            setTimeout(() => setScheduleSuccess(false), 3000);
        }

        setScheduleLoading(false);
    };

    const cancelScheduledTrip = async (id: string) => {
        const { error } = await supabase
            .from("scheduled_trips")
            .update({ status: "cancelled" })
            .eq("id", id);

        if (!error) fetchScheduledTrips();
    };

    const updateStatus = async (bookingId: string, newStatus: string) => {
        const { error } = await supabase
            .from("bookings")
            .update({ status: newStatus })
            .eq("id", bookingId);

        if (!error) {
            setBookings(prev =>
                prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b)
            );
        }
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push("/admin");
    };

    const filteredBookings = filter === "all"
        ? bookings
        : bookings.filter(b => b.status === filter);

    const statusConfig: Record<string, { label: string; color: string }> = {
        pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
        approved: { label: "Approved", color: "bg-green-100 text-green-800" },
        rejected: { label: "Rejected", color: "bg-red-100 text-red-800" },
    };

    return (
        <main className="min-h-screen bg-[#F3F4F6]">

            {/* Header */}
            <div className="bg-[#1B4332] text-white px-6 py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-serif font-bold">Hiking Seekers</h1>
                        <p className="text-white/70 text-sm">Admin Dashboard</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={fetchBookings}
                            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium transition-colors"
                        >
                            Refresh
                        </button>
                        <button
                            onClick={handleSignOut}
                            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium transition-colors"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: "Total Bookings", value: bookings.length, color: "text-gray-900" },
                        { label: "Pending", value: bookings.filter(b => b.status === "pending").length, color: "text-yellow-600" },
                        { label: "Approved", value: bookings.filter(b => b.status === "approved").length, color: "text-green-600" },
                        { label: "Rejected", value: bookings.filter(b => b.status === "rejected").length, color: "text-red-600" },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white rounded-2xl p-5 shadow-sm">
                            <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
                            {loading ? (
                                <div className="h-9 w-16 bg-gray-200 rounded-full animate-pulse mt-2" />
                            ) : (
                                <p className={`text-3xl font-bold font-serif ${stat.color}`}>{stat.value}</p>
                            )}
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6">
                    <button
                        onClick={() => setActiveTab("bookings")}
                        className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${activeTab === "bookings"
                                ? "bg-[#1B4332] text-white"
                                : "bg-white text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        Bookings
                    </button>
                    <button
                        onClick={() => setActiveTab("schedule")}
                        className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${activeTab === "schedule"
                                ? "bg-[#1B4332] text-white"
                                : "bg-white text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        Schedule Trips
                    </button>
                </div>

                {/* Bookings Tab */}
                {activeTab === "bookings" && (
                    <>
                        {/* Filter Tabs */}
                        <div className="flex gap-2 mb-6">
                            {["all", "pending", "approved", "rejected"].map(f => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-4 py-2 rounded-full text-sm font-semibold capitalize transition-all ${filter === f
                                            ? "bg-[#FF7B29] text-white"
                                            : "bg-white text-gray-600 hover:bg-gray-100"
                                        }`}
                                >
                                    {f === "all" ? `All (${bookings.length})` : `${f} (${bookings.filter(b => b.status === f).length})`}
                                </button>
                            ))}
                        </div>

                        {loading ? (
                            <div className="space-y-4">
                                {[1, 2, 3].map(i => (
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
                            <div className="text-center py-20 text-gray-500">No bookings found</div>
                        ) : (
                            <div className="space-y-4">
                                {filteredBookings.map(booking => (
                                    <div key={booking.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                                        <div
                                            className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-gray-50 transition-colors"
                                            onClick={() => setExpandedBooking(
                                                expandedBooking === booking.id ? null : booking.id
                                            )}
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
                                                        day: "numeric", month: "short", year: "numeric",
                                                        hour: "2-digit", minute: "2-digit"
                                                    })}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                                                {booking.status !== "approved" && (
                                                    <button
                                                        onClick={() => updateStatus(booking.id, "approved")}
                                                        className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-full hover:bg-green-700 transition-colors"
                                                    >
                                                        Approve
                                                    </button>
                                                )}
                                                {booking.status !== "rejected" && (
                                                    <button
                                                        onClick={() => updateStatus(booking.id, "rejected")}
                                                        className="px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-full hover:bg-red-600 transition-colors"
                                                    >
                                                        Reject
                                                    </button>
                                                )}
                                                {booking.status !== "pending" && (
                                                    <button
                                                        onClick={() => updateStatus(booking.id, "pending")}
                                                        className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-semibold rounded-full hover:bg-gray-300 transition-colors"
                                                    >
                                                        Reset
                                                    </button>
                                                )}
                                                <span className="text-gray-400 ml-2">
                                                    {expandedBooking === booking.id ? "▲" : "▼"}
                                                </span>
                                            </div>
                                        </div>

                                        {expandedBooking === booking.id && (
                                            <div className="border-t border-gray-100 p-5 bg-gray-50">
                                                <h4 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">
                                                    Participants ({booking.persons.length})
                                                </h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {booking.persons.map((person) => (
                                                        <div key={person.id} className="bg-white rounded-xl p-4 flex gap-4">
                                                            <div className="shrink-0">
                                                                {person.signedPhotoUrl ? (
                                                                    <a href={person.signedPhotoUrl} target="_blank" rel="noopener noreferrer" className="block">
                                                                        <img
                                                                            src={person.signedPhotoUrl}
                                                                            alt="ID"
                                                                            className="w-20 h-24 object-cover rounded-lg border border-gray-200 hover:opacity-80 transition-opacity"
                                                                        />
                                                                    </a>
                                                                ) : (
                                                                    <div className="w-20 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                                                                        <span className="text-gray-400 text-xs text-center px-1">No photo</span>
                                                                    </div>
                                                                )}
                                                            </div>
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

                                                                    <a href={`https://wa.me/${person.phone.replace(/\D/g, "")}`}
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
                                ))}
                            </div>
                        )}
                    </>
                )}

                {/* Schedule Tab */}
                {activeTab === "schedule" && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        {/* Schedule Form */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h2 className="text-xl font-serif font-bold text-gray-900 mb-6">
                                Schedule a New Trip
                            </h2>

                            <form onSubmit={handleScheduleSubmit} className="space-y-4">

                                {/* Destination */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Destination *
                                    </label>
                                    <select
                                        value={scheduleForm.destination_id}
                                        onChange={e => setScheduleForm(prev => ({ ...prev, destination_id: Number(e.target.value) }))}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4332] focus:border-transparent outline-none transition-all"
                                    >
                                        {tripsData.map(trip => (
                                            <option key={trip.id} value={trip.id}>{trip.title}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Date */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Date *
                                    </label>
                                    <input
                                        type="date"
                                        value={scheduleForm.date}
                                        onChange={e => setScheduleForm(prev => ({ ...prev, date: e.target.value }))}
                                        required
                                        min={new Date().toISOString().split('T')[0]}
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
                                        value={scheduleForm.meeting_time}
                                        onChange={e => setScheduleForm(prev => ({ ...prev, meeting_time: e.target.value }))}
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
                                        value={scheduleForm.meeting_point}
                                        onChange={e => setScheduleForm(prev => ({ ...prev, meeting_point: e.target.value }))}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4332] focus:border-transparent outline-none transition-all"
                                        placeholder="Algiers, Place Audin"
                                    />
                                </div>

                                {/* Price and Capacity */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Price (DZD) *
                                        </label>
                                        <input
                                            type="number"
                                            value={scheduleForm.price}
                                            onChange={e => setScheduleForm(prev => ({ ...prev, price: Number(e.target.value) }))}
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
                                            value={scheduleForm.capacity}
                                            onChange={e => setScheduleForm(prev => ({ ...prev, capacity: Number(e.target.value) }))}
                                            required
                                            min={1}
                                            max={100}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4332] focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                {scheduleError && (
                                    <p className="text-red-500 text-sm">{scheduleError}</p>
                                )}

                                {scheduleSuccess && (
                                    <p className="text-green-600 text-sm font-semibold">✓ Trip scheduled successfully!</p>
                                )}

                                <button
                                    type="submit"
                                    disabled={scheduleLoading}
                                    className={`w-full py-3 rounded-full font-bold text-white transition-all ${scheduleLoading
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-[#1B4332] hover:bg-[#153526] hover:scale-105"
                                        }`}
                                >
                                    {scheduleLoading ? "Scheduling..." : "Schedule Trip"}
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
                                    No trips scheduled yet
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {scheduledTrips.map(trip => (
                                        <div key={trip.id} className="border border-gray-100 rounded-xl p-4">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="font-bold text-gray-900">{trip.destination_title}</p>
                                                    <p className="text-sm text-gray-600 mt-0.5">
                                                        {new Date(trip.date).toLocaleDateString("en-GB", {
                                                            weekday: "long",
                                                            day: "numeric",
                                                            month: "long",
                                                            year: "numeric"
                                                        })}
                                                    </p>
                                                    <p className="text-sm text-gray-500 mt-0.5">
                                                        {trip.meeting_time} — {trip.meeting_point}
                                                    </p>
                                                    <div className="flex items-center gap-3 mt-2">
                                                        <span className="text-sm font-semibold text-[#1B4332]">
                                                            {trip.price.toLocaleString()} DZD
                                                        </span>
                                                        <span className="text-xs text-gray-400">
                                                            {trip.spots_remaining}/{trip.capacity} spots left
                                                        </span>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => cancelScheduledTrip(trip.id)}
                                                    className="text-red-500 hover:text-red-700 text-sm font-semibold transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}