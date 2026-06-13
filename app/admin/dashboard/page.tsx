"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import DashboardHeader from "./components/DashboardHeader";
import StatsCards from "./components/StatsCards";
import BookingsTab from "./components/BookingsTab";
import ScheduleTab from "./components/ScheduleTab";
import TripDetailModal from "./components/TripDetailModal";

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

export default function Dashboard() {
    const router = useRouter();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [scheduledTrips, setScheduledTrips] = useState<ScheduledTrip[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"bookings" | "schedule">("bookings");
    const [selectedTrip, setSelectedTrip] = useState<ScheduledTrip | null>(null);

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
                                : null,
                        }))
                    ),
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
            .eq("status", "active")
            .order("date", { ascending: true });

        if (!error) setScheduledTrips(data || []);
    };

    const updateStatus = async (bookingId: string, newStatus: string) => {
        const booking = bookings.find((b) => b.id === bookingId);
        if (!booking) return;

        const { error } = await supabase
            .from("bookings")
            .update({ status: newStatus })
            .eq("id", bookingId);

        if (!error) {
            // Update local state immediately
            setBookings((prev) =>
                prev.map((b) =>
                    b.id === bookingId ? { ...b, status: newStatus } : b
                )
            );

            // Handle spots decrement/increment
            if (booking.scheduled_trip_id) {
                if (newStatus === "approved") {
                    await supabase.rpc("decrement_spots", {
                        trip_id: booking.scheduled_trip_id,
                        seat_count: booking.seats,
                    });
                } else if (booking.status === "approved" && newStatus !== "approved") {
                    await supabase.rpc("increment_spots", {
                        trip_id: booking.scheduled_trip_id,
                        seat_count: booking.seats,
                    });
                }
                // Refresh scheduled trips to reflect updated spots
                fetchScheduledTrips();
            }
        }
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push("/admin");
    };

    const handleTripCancelled = (id: string) => {
        setScheduledTrips((prev) => prev.filter((t) => t.id !== id));
        if (selectedTrip?.id === id) setSelectedTrip(null);
    };

    return (
        <main className="min-h-screen bg-[#F3F4F6]">

            {/* Header */}
            <DashboardHeader
                onRefresh={fetchBookings}
                onSignOut={handleSignOut}
            />

            <div className="max-w-7xl mx-auto px-6 py-8">

                {/* Stats */}
                <StatsCards bookings={bookings} loading={loading} />

                {/* Tab Switcher */}
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
                    <BookingsTab
                        bookings={bookings}
                        loading={loading}
                        onStatusUpdate={updateStatus}
                    />
                )}

                {/* Schedule Tab */}
                {activeTab === "schedule" && (
                    <ScheduleTab
                        scheduledTrips={scheduledTrips}
                        onTripScheduled={fetchScheduledTrips}
                        onTripCancelled={handleTripCancelled}
                        onViewDetails={(trip) => setSelectedTrip(trip)}
                    />
                )}
            </div>

            {/* Trip Detail Modal */}
            {selectedTrip && (
                <TripDetailModal
                    trip={selectedTrip}
                    bookings={bookings}
                    onClose={() => setSelectedTrip(null)}
                    onStatusUpdate={updateStatus}
                />
            )}
        </main>
    );
}